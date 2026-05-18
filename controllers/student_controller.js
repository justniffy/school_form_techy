const Student = require("../models/students.schema");



const addStudent = async (req, res) => {
    const { fullName, email, phoneNumber, studentsClass, gender, address, isAdmitted } = req.body;
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
}

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getStudentById = async (req, res) => {
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
};

const findStudentsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const students = await Student.find({ fullName: { $regex: name, $options: "i" } });
        return res.status(200).json({ students });
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateStudent = async (req, res) => {
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
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        await Student.findByIdAndDelete(id);
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    findStudentsByName,
    updateStudent,
    deleteStudent
}