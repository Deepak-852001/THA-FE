// server/routes/voiceRoutes.js
const express = require('express');
const { textToSpeech } = require('../controllers/voiceController');

const router = express.Router();

router.post('/text-to-speech', textToSpeech);

module.exports = router;
