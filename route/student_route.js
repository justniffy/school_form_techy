const express = require('express');
const { addStudent, getAllStudents, getStudentById, findStudentsByName, updateStudent, deleteStudent } = require('../controllers/students.controller');
const router = express.Router();


router.post('/add-student', addStudent);
router.get('/get-all-students', getAllStudents);
router.get('/get-student-by-id/:id', getStudentById);
router.get('/find-students-by-name', findStudentsByName);
router.put('/update-student/:id', updateStudent);
router.delete('/delete-student/:id', deleteStudent);

module.exports = router;