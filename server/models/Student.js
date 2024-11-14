const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timeSpent: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    currentLevel: { type: String, default: 'Junior Level 1' },
    weakAreas: { type: [String], default: [] },
    progress: [{ date: { type: Date, default: Date.now }, score: Number }]
});

module.exports = mongoose.model('Student', studentSchema);
