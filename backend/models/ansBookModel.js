const mongoose = require('mongoose');

// Define schema
const ansBookSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true
  },
  branch: {
    type: String,
  },
  subject: {
    type: String,
    required: true
  },
  student_id: {
    type: String,
    required: true
  },
  date:{
    type : Date,
    default : Date.now()
  },
  ipfsHash: {
    type: String,
    required: true,
    unique: true
  }
});

// Create model
const AnsBook = mongoose.model('AnsBook', ansBookSchema);

module.exports = AnsBook;
