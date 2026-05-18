const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const studentsRoutes = require("./route/student_route");
dotenv.config();

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const port = process.env.PORT;

app.use("/api/students", studentsRoutes);
//const dbUrl = process.env.MONGODB_URL;

// const connectDB = async () => {
//     try {
//         await mongoose.connect(dbUrl);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1);
//     }
// };
// process exit 1: when you want to call error
// process exit 2: when yu want success
// 0 means success, 1 means failure
 // putting schema in a varaible



app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});
