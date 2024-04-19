const Student = require('../models/studentModel');
const AnsBook = require('../models/ansBookModel');
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.submitExam = async (req, res) => {
  try {
    // Extract data from the request body
    const { student_id, course, subject, branch, semester, ipfsHash } = req.body;

    // Create a new FormData document
    const ansBook = new AnsBook({
      student_id,
      course,
      subject,
      branch,
      semester,
      ipfsHash
    });

    // Save the FormData document to the database
    await ansBook.save();

    res.status(201).json({ message: 'Exam Submitted successfully !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
