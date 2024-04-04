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
          from: '0x66182d7e86FF993D9c4831b15A283f263aF95878',  // Replace with your account address from Ganache
          gas: '10000000',         // Replace with an appropriate gas limit
        });

        console.log('Contract deployed at address:', deployedContract.options.address);
      } catch (error) {
        console.error('Error deploying contract:', error);
      }
    };
    // Call the async function
// deployContract();
    const contractAddress = '0xB298E63442FD5E84dFAaeF83E19e58899fA0Db30'; // Replace with your contract address
    // Create a contract instance
    const myContract = new web3.eth.Contract(contractData.abi, contractAddress);
    
contract.options.address = contractAddress;

// Dummy data for scheduling an exam

const examData = {
    course: 'Btech',
  branch: 'IT',
  subject: 'Design Thinking',
  date: Math.floor(new Date("2024-04-07").getTime() / 1000),
  time: 58860,
  duration: 3600,
  examType: 'subjective',
  semester: '3'
};


const examDate = new Date(examData.date);

// Check if the date is valid
if (!isNaN(examDate.getTime())) {
    console.log("Date:", examDate.toISOString().split('T')[0]); // Output the formatted date
} else {
    console.log("Invalid Date");
}
async function scheduleExam() {
    try {
        // Get accounts from the node
        const accounts = await web3.eth.getAccounts();

        // Prepare transaction data
        const txData = myContract.methods.scheduleExam(
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
scheduleExam();

const testData = {
    course: examData.course,
    branch: examData.branch,
    subject: examData.subject,
    semester: examData.semester,
    date: examData.date, // Use the same date as examData
    time: examData.time, // Use the same time as examData
};


// Function to check if an exam is scheduled
async function isExamScheduled() {
    try {
        // Call the contract function
        const isScheduled = await myContract.methods.isExamScheduled(
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

async function displayAllScheduledExams() {
    try {
        const scheduledExamIds = await myContract.methods.getAllScheduledExams().call();
        for (let i = 0; i < scheduledExamIds.length; i++) {
            const examId = scheduledExamIds[i];
            const examDetails = await myContract.methods.exams(examId).call();
            console.log("Exam ID:", examDetails.id);
            console.log("Course:", examDetails.course);
            console.log("Branch:", examDetails.branch);
            console.log("Subject:", examDetails.subject);
            console.log("Date:", new Date(examDetails.date * 1000)); // Convert UNIX timestamp to JavaScript Date object
            console.log("Time:", examDetails.time);
            console.log("Duration:", examDetails.duration);
            console.log("Exam Type:", examDetails.examType);
            console.log("Semester:", examDetails.semester);
            console.log("---------------------------");
            // You can display these details on your frontend UI as well
        }
    } catch (error) {
        console.error("Error fetching exam details:", error);
    }
}

// Call the function to display all scheduled exams
displayAllScheduledExams();

    require('dotenv').config();