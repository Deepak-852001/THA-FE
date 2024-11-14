const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  timeSpent: Number,      // In minutes
  highestScore: Number,
  level: String,
  areasToImprove: [String],
});

module.exports = mongoose.model('Student', StudentSchema);
