const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
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
  clg_code: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  branch_code: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  photo: {
    filename: String,
    path: String,
  },
});

// Hash the password before saving to the database
studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
