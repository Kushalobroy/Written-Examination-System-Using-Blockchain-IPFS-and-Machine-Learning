const Admin = require('../models/adminModel');
const Evaluator = require('../models/evaluatorModel');
const Student = require('../models/studentModel');
const ExamSchedulerContract = require('../build/contracts/ExamScheduler.json');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const examSchedulerAddress = '0xB298E63442FD5E84dFAaeF83E19e58899fA0Db30';
const examSchedulerContract = new web3.eth.Contract(ExamSchedulerContract.abi, examSchedulerAddress);

// Controller function to create a new student
exports.home = async(req, res) => {
  try {
   
    const student = await Student.countDocuments();
    const evaluator = await Evaluator.countDocuments();
    const admin = await Admin.countDocuments();
    res.json({ student, evaluator, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      contact_no,
      username,
      password,
      clg_code,
      course_code,
      branch_code,
      semester,
    } = req.body;

    // Check if the username is already taken
    const existingStudent = await Student.findOne({ username });
    if (existingStudent) {
      return res.status(400).json({ error: 'Roll Number is already taken' });
    }

    // Create a new student instance
    const newStudent = new Student({
      name,
      email,
      contact_no,
      username,
      password, // Ensure to hash the password before saving (bcrypt)
      clg_code,
      course_code,
      branch_code,
      semester,
    });

    // Save the new student to the database
    await newStudent.save();

    // Respond with a success message
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//Function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();

    // Respond with the list of students
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);

    // Respond with an error message
    const errorMessage = 'Internal Server Error';
    res.status(500).json({ error: errorMessage });
  }
};
// Function to create a new evaluator with photo upload
exports.createEvaluator = async (req, res) => {
  try {
    const { name, email, contact_no, username, password, clg_name, branch, course, subject } = req.body;

    // Check if the username is already taken
    const existingEvaluator = await Evaluator.findOne({ username });
    if (existingEvaluator) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Get the filename from the uploaded photo
    const photo = req.file ? { filename: req.file.filename, path: req.file.path } : undefined;

    const newEvaluator = new Evaluator({
      name,
      email,
      contact_no,
      username,
      password,
      clg_name,
      branch,
      course,
      subject,
      photo,
    });

    await newEvaluator.save();

    res.status(201).json({ message: 'Evaluator created successfully' });
  } catch (error) {
    console.error('Error creating evaluator:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get the list of evaluators
exports.getEvaluators = async (req, res) => {
  try {
    const evaluators = await Evaluator.find({}, { password: 0 }); // Exclude password field
    res.json(evaluators);
  } catch (error) {
    console.error('Error fetching evaluators:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).send('Internal Server Error');
  }
};



// Function to create a new admin with photo upload
 exports.createAdmin = async (req, res) => {
    try {
      const { name, email, contact_no, username, password } = req.body;
  
      // Check if the username is already taken
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
  
      // Get the filename from the uploaded photo
      const photo = req.file ? { filename: req.file.filename, path: req.file.path } : undefined;
  
      const newAdmin = new Admin({
        name,
        email,
        contact_no,
        username,
        password,
        photo,
      });
  
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getAdminById = async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json(admin);
    } catch (error) {
      console.error('Error fetching admin by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  };

exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteAdmin = async (req, res) => {
  try {

    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).send('Internal Server Error');
  }
};
exports.examSchedule = async(req,res) =>{
  let { course, branch, subject, date, time, duration, examType, semester } = req.body;
console.log(req.body);
date = Math.floor(new Date(date).getTime() / 1000);

  try {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length < 2) {
      throw new Error('Insufficient accounts available for transaction');
    }
    const result = await examSchedulerContract.methods
      .scheduleExam(course, branch, subject, date, time, duration, examType, semester)
      .send({ from: accounts[0] });

    res.status(200).json({ success: true, transactionHash: result.transactionHash });
  } catch (error) {
    console.error('Error scheduling exam:', error);
    res.status(500).json({ success: false, error: 'Failed to schedule exam' });
  }
};