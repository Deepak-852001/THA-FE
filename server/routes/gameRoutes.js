const express = require('express');
const { submitAnswer } = require('../controllers/gameController');

const router = express.Router();

router.post('/submit', submitAnswer);

module.exports = router;
