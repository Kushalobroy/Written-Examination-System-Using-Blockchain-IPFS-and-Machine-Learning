const mongoose = require('mongoose');
// Define the Exam schema
const examModel = new mongoose.Schema({
  examId: { type: String, required: true, unique: true },
  questions: [String], // Array of questions
});

const Exam = mongoose.model('Exam', examModel);

module.exports = Exam;