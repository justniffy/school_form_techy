const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    studentsClass: String,
    gender: String,
    address: String,
    isAdmitted: Boolean
})

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;