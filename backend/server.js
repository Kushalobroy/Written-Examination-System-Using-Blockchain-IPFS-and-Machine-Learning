const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000; // You can choose any port you prefer
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const evaluatorRoutes = require('./routes/evaluatorRoutes');
const Admin = require('./models/adminModel');
const Evaluator = require('./models/evaluatorModel');
const Student = require('./models/studentModel');
const multer = require('multer');
const path = require('path');
const adminController = require('./controllers/adminController');


    // const Web3 = require('web3');
    // const web3 = new Web3('http://127.0.0.1:7545');
    // web3.eth.getAccounts()
    //   .then(accounts => console.log('Connected to Ethereum node. Accounts:', accounts))
    //   .catch(error => console.error('Error connecting to Ethereum node:', error));

    // const contractData = require('./build/contracts/MyContract.json');
    // const contract = new web3.eth.Contract(contractData.abi);

    // const deployContract = async () => {
    //   try {
    //     const deployedContract = await contract.deploy({
    //       data: contractData.bytecode,
    //       arguments: [/* constructor arguments if any */],
    //     }).send({
    //       from: '0xB105e254daF96EEDA18223dA1509E59e8C81f616',  // Replace with your account address from Ganache
    //       gas: '6721975',         // Replace with an appropriate gas limit
    //     });

    //     console.log('Contract deployed at address:', deployedContract.options.address);
    //   } catch (error) {
    //     console.error('Error deploying contract:', error);
    //   }
    // };
    // // Call the async function
    // deployContract();
    // const contractAddress = '0xDB2FAa8BC408b952238c3F9446D24f1d61BE1FC3'; // Replace with your contract address
    // // Create a contract instance
    // const myContract = new web3.eth.Contract(contractData.abi, contractAddress);
    // const getMyVar = async () => {
    //   try {
    //     // Call the 'myVar' function
    //     const result = await myContract.methods.myVar().call();
    //     console.log('Value of myVar:', result);
    //   } catch (error) {
    //     console.error('Error reading myVar:', error);
    //   }
    // };

    // // Call the function to read myVar
    // getMyVar();


require('dotenv').config();

const PORT = process.env.DATABASE; // Access the MongoDB URI from the environment variable

async function connectToMongoDB() {
  try {
    await mongoose.connect(PORT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Define and use Mongoose models and schemas for database operations
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToMongoDB();

// Create a User model (you can customize the schema)



app.use(bodyParser.json());
app.use(cors());

// Registration Api
const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust the number of salt rounds as needed


app.use('/uploads', express.static('uploads'));
app.use('/uploads/admin', express.static('uploads/admin'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));


const axios = require('axios');
app.post('/api/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.pdf) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
  }
      const file = req.files.pdf; // Assuming you're using a middleware like 'express-fileupload' to handle file uploads
      
      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append('file', file.data, file.name);
      
      // Send a POST request to the IPFS public gateway API
      const response = await axios.post('http://127.0.0.1:5001/api/v0/add', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      // Parse the response to extract the IPFS hash of the uploaded file
      const ipfsHash = response.data.Hash;

      // Return the IPFS hash as the response
      res.json({ ipfsHash });
  } catch (error) {
      console.error('Error uploading file to IPFS:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});

app.use('/api/admin',  adminRoutes);
app.use('/api/evaluator',  evaluatorRoutes);
app.use('/api/student',  studentRoutes);

//login api
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check against Admin collection
    const admin = await Admin.findOne({ username });
    if (admin && await bcrypt.compare(password, admin.password)) {
      req.session.user = { id: admin._id, role: 'admin' };
      return res.json({ id: admin._id, role: 'admin',username: admin.username });
    }

    // Check against Evaluator collection
    const evaluator = await Evaluator.findOne({ username });
    if (evaluator && await bcrypt.compare(password, evaluator.password)) {
      req.session.user = { id: evaluator._id, role: 'evaluator' };
      return res.json({ id: evaluator._id, role: 'evaluator', username: evaluator.username, course:evaluator.course, subject:evaluator.subject });
    }

    // Check against Student collection
    const student = await Student.findOne({ username });
    if (student && await bcrypt.compare(password, student.password)) {
      req.session.user = { id: student._id, role: 'student' };
      return res.json({ id: student._id, role: 'student',name: student.name, username:student.username, course:student.course,semester:student.semester,branch:student.branch  });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Api for Face Verification
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/verification'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });
app.post('/api/faceVerification', upload.single('capturedImage'), async (req, res) => {
    const _id = req.body.id;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or file path not available' });
    }
  
  const capturedImage = req.file.path;
  console.log('Path of the uploaded file:', capturedImage);
   
    // Check against Admin collection
    const admin = await Admin.findOne({ _id });
    console.log(admin);
    if (admin) {
      const photoPath = admin.photo.path;
      const verificationResponse = await sendToFlaskForVerification(capturedImage, photoPath);
      console.log(verificationResponse);
      return res.json({ message:"Verification Successfull", id: admin._id, role: 'admin',username: admin.username });
    }
    // Check against Evaluator collection
    const evaluator = await Evaluator.findOne({ _id });
    if (evaluator) {
      const photoPath = evaluator.photo.path;
      const verificationResponse = await sendToFlaskForVerification(capturedImage, photoPath);
      console.log(verificationResponse);
      return res.json({ id: evaluator._id, role: 'evaluator', username: evaluator.username, course:evaluator.course, subject:evaluator.subject });
    }
    // Check against Student collection
    const student = await Student.findOne({ _id });
    if (student) {
      const photoPath = student.photo.path;
      const verificationResponse = await sendToFlaskForVerification(capturedImage, photoPath);
      console.log(verificationResponse);
      return res.json({ id: student._id, role: 'student',name: student.name, username:student.username, course:student.course,semester:student.semester,branch:student.branch  });
    }
});

async function sendToFlaskForVerification(capturedImage, photoPath) {
  try {
      const response = await axios.post('http://127.0.0.1:4000/recognize-face', {
          capturedImage: capturedImage,
          photoPath: photoPath
      });

      return response.data;
  } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to send data to Flask application');
  }
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
