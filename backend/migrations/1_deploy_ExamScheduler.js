
const ExamScheduler = artifacts.require("ExamScheduler");

module.exports = function (deployer) {
  // Deploy the MyContract contract with an initial message
  deployer.deploy(ExamScheduler);
};
