// server/routes/api.js
const express = require('express');
const router = express.Router();
const { getStudents } = require('../controllers/studentController'); // Ensure this path is correct

// Ensure the function is defined and imported correctly
router.get('/students', getStudents);

module.exports = router;
