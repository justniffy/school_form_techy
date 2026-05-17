const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
// process exit 1: when you want to call error
// process exit 2: when yu want success
// 0 means success, 1 means failure
const studentSchema = new mongoose.Schema({
    // defining our database
    fullName: String,
    email: String,
    phoneNumber: String, // cos of countrycode
    studentsClass: String,
    gender: String,
    address: String,
    isAdmitted: Boolean
})

const Student = mongoose.model("Student", studentSchema); // putting schema in a varaible

app.post("/add-student", async (req, res)=> {// post is to create
    const { fullName, email, phoneNumber, studentsClass, gender, address, isAdmitted } = req.body; // object destructuring
    try {
        if (!fullName || !email || !phoneNumber || !studentsClass || !gender || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newStudent = new Student({
            fullName,
            email,
            phoneNumber,
            studentsClass,
            gender,
            address,
            isAdmitted
        });
        await newStudent.save();
        return res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        console.error("Error adding student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/students/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ student });
    } catch (error) {
        console.error("Error fetching student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/find-students-by-name", async (req, res) => {
    const { name } = req.query;
    try {
        const students = await Student.find({ fullName: { $regex: name, $options: "i" } });
        return res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/update-student/:id", async (req, res) => {
    const { id } = req.params;
    const { fullName, email, phoneNumber, studentsClass, gender, address, isAdmitted } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { fullName, email, phoneNumber, studentsClass, gender, address, isAdmitted },
            { new: true }
        );
        return res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.delete("/delete-student/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Student.findByIdAndDelete(id);
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
