const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const evaluatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_no: String,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  clg_name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  photo: {
    filename: String,
    path: String,
  },
});

// Hash the password before saving to the database
evaluatorSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Evaluator = mongoose.model('Evaluator', evaluatorSchema);

module.exports = Evaluator;
