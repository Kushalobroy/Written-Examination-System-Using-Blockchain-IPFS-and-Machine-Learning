pragma solidity ^0.8.0;

contract ExamScheduler {
    struct Exam {
        uint256 date;
        uint256 startTime;
        uint256 duration; // Duration of the exam in seconds
        string questions; // Store a reference to the questions
        bool submitted;
    }

    mapping(string => mapping(string => mapping(string => Exam))) public exams;
    mapping(uint256 => bool) public scheduledExams;

    event ExamScheduled(address indexed student, string course, string branch, string subject, uint256 date, uint256 startTime, uint256 duration);
    event ExamSubmitted(address indexed student, string course, string branch, string subject);

    function scheduleExam(string memory _course, string memory _branch, string memory _subject, uint256 _date, uint256 _startTime, uint256 _duration, string memory _questions) public {
        require(!exams[_course][_branch][_subject].submitted, "Exam already scheduled");

        exams[_course][_branch][_subject] = Exam(_date, _startTime, _duration, _questions, false);
        scheduledExams[_date] = true;

        emit ExamScheduled(msg.sender, _course, _branch, _subject, _date, _startTime, _duration);
    }

    function submitExam(string memory _course, string memory _branch, string memory _subject) public {
        Exam storage exam = exams[_course][_branch][_subject];
        require(exam.date > 0, "No exam scheduled");
        require(block.timestamp >= exam.date + exam.startTime + exam.duration, "Exam not yet due");
        require(!exam.submitted, "Exam already submitted");
        
        exam.submitted = true;
        emit ExamSubmitted(msg.sender, _course, _branch, _subject);
    }

    function isExamScheduledForDate(uint256 _date) public view returns (bool) {
        return scheduledExams[_date];
    }
}
