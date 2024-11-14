// server/controllers/studentController.js
const Student = require('../models/Student');

// Define the getStudents function
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
