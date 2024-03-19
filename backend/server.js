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
    //       from: '0x2eB48e9bBbB18e95E1e6766fcfa83b35B879e49f',  // Replace with your account address from Ganache
    //       gas: '6721975',         // Replace with an appropriate gas limit
    //     });

    //     console.log('Contract deployed at address:', deployedContract.options.address);
    //   } catch (error) {
    //     console.error('Error deploying contract:', error);
    //   }
    // };
    // // Call the async function
    // deployContract();

    // const contractAddress = '0x8B403027f81Fd28A41FAd404BD0440d8a5023CD9'; // Replace with your contract address

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
      return res.json({ id: admin._id, role: 'admin' });
    }

    // Check against Evaluator collection
    const evaluator = await Evaluator.findOne({ username });
    if (evaluator && await bcrypt.compare(password, evaluator.password)) {
      req.session.user = { id: evaluator._id, role: 'evaluator' };
      return res.json({ id: evaluator._id, role: 'evaluator' });
    }

    // Check against Student collection
    const student = await Student.findOne({ username });
    if (student && await bcrypt.compare(password, student.password)) {
      req.session.user = { id: student._id, role: 'student' };
      return res.json({ id: student._id, role: 'student' });
    }

    res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
