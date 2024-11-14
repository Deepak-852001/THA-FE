const express = require('express');
const { getStudent, updateStudent } = require('../controllers/studentController');

const router = express.Router();

router.get('/:id', getStudent);
router.put('/:id', updateStudent);

module.exports = router;
