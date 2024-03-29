const Web3 = require('web3');
    const web3 = new Web3('http://127.0.0.1:7545');
    web3.eth.getAccounts()
      .then(accounts => console.log('Connected to Ethereum node. Accounts:', accounts))
      .catch(error => console.error('Error connecting to Ethereum node:', error));

    const contractData = require('./build/contracts/ExamScheduler.json');
    const contract = new web3.eth.Contract(contractData.abi);

    const deployContract = async () => {
      try {
        const deployedContract = await contract.deploy({
          data: contractData.bytecode,
          arguments: [/* constructor arguments if any */],
        }).send({
          from: '0xB105e254daF96EEDA18223dA1509E59e8C81f616',  // Replace with your account address from Ganache
          gas: '6721975',         // Replace with an appropriate gas limit
        });

        console.log('Contract deployed at address:', deployedContract.options.address);
      } catch (error) {
        console.error('Error deploying contract:', error);
      }
    };
    // Call the async function
    deployContract();
    const contractAddress = '0xeC12b046BD1Eb619C9A6d968cb8902A5f27726C9'; // Replace with your contract address
    // Create a contract instance
    const myContract = new web3.eth.Contract(contractData.abi, contractAddress);
    
contract.options.address = contractAddress;

// Dummy data for scheduling an exam

const examData = {
    course: 'Mathematics',
    branch: 'Computer Science',
    subject: 'Algebra',
    date: Math.floor(Date.now() / 1000), // Current timestamp
    time: 900, // 15:00 in seconds (15 * 60)
    duration: 3600, // 1 hour in seconds
    examType: 'Objective',
    semester: 'Spring 2024'
};
console.log(Math.floor(Date.now() / 1000));
// Function to schedule an exam
async function scheduleExam() {
    try {
        // Get accounts from the node
        const accounts = await web3.eth.getAccounts();

        // Prepare transaction data
        const txData = contract.methods.scheduleExam(
            examData.course,
            examData.branch,
            examData.subject,
            examData.date,
            examData.time,
            examData.duration,
            examData.examType,
            examData.semester
        ).encodeABI();

        // Send transaction
        const txReceipt = await web3.eth.sendTransaction({
            from: accounts[0], // Use first account for sending transaction
            to: contractAddress,
            data: txData,
            gas: 2000000 // Adjust gas limit as needed
        });

        console.log('Exam scheduled successfully!');
        console.log('Transaction receipt:', txReceipt);
    } catch (error) {
        console.error('Error scheduling exam:', error);
    }
}

// Call the scheduleExam function
// scheduleExam();

const testData = {
    course: 'Mathematics',
    branch: 'Computer Science',
    semester: 'Spring 2024',
    date:Math.floor(Date.now() / 1000)
};

// Function to check if an exam is scheduled
async function isExamScheduled() {
    try {
        // Call the contract function
        const isScheduled = await contract.methods.isExamScheduled(
            testData.course,
            testData.branch,
            testData.semester,
            testData.date,
        ).call();

        console.log('Is exam scheduled:', isScheduled);
    } catch (error) {
        console.error('Error checking exam schedule:', error);
    }
}
// Call the isExamScheduled function
isExamScheduled();
    require('dotenv').config();