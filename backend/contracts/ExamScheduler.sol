// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamScheduler {
    struct Exam {
        uint256 id;
        string course;
        string branch;
        string subject;
        string date; // Change uint256 to string
        uint256 time;
        uint256 duration;
        string examType; // subjective or objective
        string semester; // semester
    }

    mapping(uint256 => Exam) public exams;
    uint256 public examCount;

    // Events
    event ExamScheduled(uint256 indexed id, string course, string branch, string subject);

    // Function to schedule exams
    function scheduleExam(
        string memory _course,
        string memory _branch,
        string memory _subject,
        string memory _date, // Change uint256 to string
        uint256 _time,
        uint256 _duration,
        string memory _examType,
        string memory _semester
    ) external {
        examCount++;
        exams[examCount] = Exam(examCount, _course, _branch, _subject, _date, _time, _duration, _examType, _semester);
        emit ExamScheduled(examCount, _course, _branch, _subject);
    }

    // Function to check if an exam is scheduled for a particular date with specific course, branch, and semester
    function isExamScheduled(string memory _course, string memory _branch, string memory _semester, string memory _date) external view returns (bool) {
        for (uint256 i = 1; i <= examCount; i++) {
            if (
                keccak256(abi.encodePacked(exams[i].course)) == keccak256(abi.encodePacked(_course)) &&
                keccak256(abi.encodePacked(exams[i].branch)) == keccak256(abi.encodePacked(_branch)) &&
                keccak256(abi.encodePacked(exams[i].semester)) == keccak256(abi.encodePacked(_semester)) &&
                keccak256(abi.encodePacked(exams[i].date)) == keccak256(abi.encodePacked(_date))
            ) {
                return true;
            }
        }
        return false;
    }

    function getAllScheduledExams() external view returns (uint256[] memory) {
        uint256[] memory scheduledExamsIds = new uint256[](examCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= examCount; i++) {
            scheduledExamsIds[index] = exams[i].id;
            index++;
        }
        return scheduledExamsIds;
    }
}
