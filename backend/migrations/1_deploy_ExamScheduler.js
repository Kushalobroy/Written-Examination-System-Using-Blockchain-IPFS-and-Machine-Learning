const ExamScheduler = artifacts.require("ExamScheduler");
module.exports = function (deployer) {
  deployer.deploy(ExamScheduler);
};
