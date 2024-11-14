const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    parentPhone: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
