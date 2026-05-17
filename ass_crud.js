// Project Scenario
// You have been hired as a Junior Backend Developer for GigFlow,
// A platform connecting independent contractors (freelancers) with local clients. 
// Your task is to build a robust Service Provider Management System.
// Instead of a traditional school system, this API handles professional profiles, skill categorization, and a verification
// workflow.

// Import Express framework for building the server
const express = require("express");

// Import Morgan for logging HTTP requests
const morgan = require("morgan");

const  dotenv = require("dotenv");
// Import Mongoose for MongoDB connection and schema handling
const mongoose = require("mongoose");
dotenv.config();

const app = express()

app.use(express.json())
app.use(morgan('dev')) // logs every request to the terminal

const port = process.env.PORT;
const db_url = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(db_url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
        // 0 : exited successsfully
        //1: exited cos of an errror
    }
}

const workers_schema = new mongoose.Schema({
    // database for freelancers
    full_name:String,
    email:String,
    phone_numb:String,
    skill_category:String,
    gender:String,
    address:String,
    is_verified : Boolean
})

const Freelance = mongoose.model("Freelancer", workers_schema); // putting schema in a varaible

app.post("/providers", async (req, res)=> {// post is to create
    const { full_name, email, phone_numb, skill_category, gender, address, is_verified} = req.body; // object destructuring
    try {
        if (!full_name || !email || !phone_numb || !skill_category || !gender || !address ) {
            return res.status(400).json({ message: "All fields are required" });
        }

         // check duplicate email
        
        const dup_email = await Freelance.findOne({email}); 
        if (dup_email) {

            return res.status(409).json({
                message: "Profile already exists with this email."
            });
        }
        const new_worker = new Freelance({
            full_name,
            email,
            phone_numb,
            skill_category,
            gender,
            address,
            is_verified
        });
        await new_worker.save();
        return res.status(201).json({ message: "Work profile created successfully", worker: new_worker });
    } catch (error) {
        console.error("Error creating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

})

   
app.get("/providers", async (req, res) => { 
    // GET is used to READ or retrieve data from the database

    try {
         const { skill } = req.query;
         let workers;
         if (skill) {workers = await Freelance.find({skill_category: skill});
        } else 
            {workers = await Freelance.find();

        }

        return res.status(200).json({
            workers
        });

    } catch (error) {

        console.error("Error fetching workers:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
});

app.get("/providers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const workers = await Freelance.findById(id);
        return res.status(200).json({ workers });
    } catch (error) {
        console.error("Error  in verifying worker :", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.patch("/providers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProvider = await Freelance.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updatedProvider) {
            return res.status(404).json({
                message: "Provider not found"
            });

        }

        return res.status(200).json({
            message: "Provider updated successfully",
            provider: updatedProvider
        });

    } catch (error) {
        console.error("Error updating provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }

});

app.patch("/providers/:id/verify", async (req, res) => {
    const { id } = req.params;
    try {

        const upd_prov = await Freelance.findByIdAndUpdate(
            id,
            {
                is_verified: true
            },
            {
                new: true
            }
        );

        if (!upd_prov) {

            return res.status(404).json({
                message: "Provider not found"
            });
        }

        return res.status(200).json({
            message: "Provider verified successfully",
            provider: upd_prov
        });

    } catch (error) {

        console.error("Error verifying provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


app.delete("/providers/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const del_prov = await Freelance.findByIdAndDelete(id);

        if (!del_prov) {

            return res.status(404).json({
                message: "Worker not found"
            });
        }

        return res.status(200).json({
            message: "worker deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});


// 404 Middleware
app.use((req, res) => {

    return res.status(404).json({
        message: "Route not found"
    });

});

// 500 Middleware
app.use((err, req, res, next) => {

    console.error(err.stack);

    return res.status(500).json({
        message: "Internal server error"
    });

});
app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})