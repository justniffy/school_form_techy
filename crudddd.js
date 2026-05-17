const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 5000;

const dbUrl = process.env.MONGODB_URI;


// ======================================================
// DATABASE CONNECTION
// ======================================================

const connectDB = async () => {

    try {

        await mongoose.connect(dbUrl);

        console.log("Connected to MongoDB");

    } catch (error) {

        console.error("Error connecting to MongoDB:", error);

        process.exit(1);
    }
};


// ======================================================
// PROVIDER SCHEMA
// ======================================================

const providerSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    skillCategory: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    address: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    }

});


// ======================================================
// MODEL
// ======================================================

const Provider = mongoose.model("Provider", providerSchema);



// ======================================================
// CREATE PROVIDER
// POST /providers
// ======================================================

app.post("/providers", async (req, res) => {

    const {
        fullName,
        email,
        phoneNumber,
        skillCategory,
        gender,
        address
    } = req.body;


    try {

        // CHECK REQUIRED FIELDS

        if (
            !fullName ||
            !email ||
            !phoneNumber ||
            !skillCategory ||
            !gender ||
            !address
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // CHECK DUPLICATE EMAIL

        const existingProvider = await Provider.findOne({ email });

        if (existingProvider) {

            return res.status(409).json({
                message: "Profile already exists with this email."
            });
        }


        // CREATE PROVIDER

        const newProvider = new Provider({
            fullName,
            email,
            phoneNumber,
            skillCategory,
            gender,
            address
        });

        await newProvider.save();


        return res.status(201).json({
            message: "Provider created successfully",
            provider: newProvider
        });

    } catch (error) {

        console.error("Error creating provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



// ======================================================
// GET ALL PROVIDERS
// GET /providers
// FILTER BY SKILL
// ======================================================

app.get("/providers", async (req, res) => {

    const { skill } = req.query;

    try {

        let providers;

        // FILTER BY SKILL CATEGORY

        if (skill) {

            providers = await Provider.find({
                skillCategory: skill
            });

        } else {

            providers = await Provider.find();
        }


        return res.status(200).json({
            providers
        });

    } catch (error) {

        console.error("Error fetching providers:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



// ======================================================
// GET SINGLE PROVIDER
// GET /providers/:id
// ======================================================

app.get("/providers/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const provider = await Provider.findById(id);

        if (!provider) {

            return res.status(404).json({
                message: "Provider not found"
            });
        }

        return res.status(200).json({
            provider
        });

    } catch (error) {

        console.error("Error fetching provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



// ======================================================
// UPDATE PROVIDER
// PATCH /providers/:id
// ======================================================

app.patch("/providers/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const updatedProvider = await Provider.findByIdAndUpdate(
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



// ======================================================
// VERIFY PROVIDER
// PATCH /providers/:id/verify
// ======================================================

app.patch("/providers/:id/verify", async (req, res) => {

    const { id } = req.params;

    try {

        const verifiedProvider = await Provider.findByIdAndUpdate(
            id,
            { isVerified: true },
            { new: true }
        );

        if (!verifiedProvider) {

            return res.status(404).json({
                message: "Provider not found"
            });
        }

        return res.status(200).json({
            message: "Provider verified successfully",
            provider: verifiedProvider
        });

    } catch (error) {

        console.error("Error verifying provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



// ======================================================
// DELETE PROVIDER
// DELETE /providers/:id
// ======================================================

app.delete("/providers/:id", async (req, res) => {

    const { id } = req.params;

    try {

        const deletedProvider = await Provider.findByIdAndDelete(id);

        if (!deletedProvider) {

            return res.status(404).json({
                message: "Provider not found"
            });
        }

        return res.status(200).json({
            message: "Provider deleted successfully"
        });

    } catch (error) {

        console.error("Error deleting provider:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
});



// ======================================================
// GLOBAL 404 HANDLER
// ======================================================

app.use((req, res) => {

    return res.status(404).json({
        message: "Route not found"
    });
});



// ======================================================
// SERVER
// ======================================================

app.listen(port, () => {

    connectDB();

    console.log(`Server is running on port ${port}`);
});