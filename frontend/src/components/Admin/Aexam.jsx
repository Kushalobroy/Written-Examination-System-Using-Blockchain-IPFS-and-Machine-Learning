import React, { useState } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
import { Form, Button} from 'react-bootstrap';
import SubjectiveForm from "./SubjectiveForm";
import ObjectiveForm from "./ObjectiveForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
function Aexam() {
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }
    const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };
  const [examType, setExamType] = useState('');

  const handleExamTypeChange = (event) => {
    setExamType(event.target.value);
  };
  const [course, setCourse] = useState('');
  const [branch, setBranch] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(false);
  const [examId, setExamId] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
   const handleDurationChange = (e) => {
    const selectedDuration = parseInt(e.target.value); // Parse the selected value to an integer
    const durationInSeconds = selectedDuration * 3600; // Convert hours to seconds
    setDuration(durationInSeconds);
  };
  const handleTimeChange = (e) => {
    const inputTime = e.target.value; // input time in format "HH:MM"
    const [hours, minutes] = inputTime.split(':').map(Number); // split hours and minutes
    const timeInSeconds = (hours * 60 + minutes) * 60; // convert to seconds
    setTime(timeInSeconds);
  };
  const handleSchedule = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/examSchedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          course,
          branch,
          subject,
          date,
          time,
          duration,
          examType,
          semester
        })
      });
      
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          const id = responseData.examId;
          setExamId(id);
          toast.success(`Exam scheduled successfully with ID: ${id}`);
            console.log('Exam scheduled successfully!');
            // Additional handling if needed
            showWarningAlert();
            setIsScheduled(true);
        } else {
            toast.error('Failed to schedule exam:', responseData.error);
            // Handle failure scenario
        }
    } else {
        toast.error('Failed to schedule exam:', response.statusText);
        // Handle failure scenario
    }

    } catch (error) {
      console.error('Error scheduling exam:', error);
      toast('Failed to schedule exam. Please try again.');
    }

    setLoading(false);
  };
  const showWarningAlert = () => {
    Swal.fire({
        title: 'Warning',
        text: 'Add Questions !.',
        icon: 'warning',
        confirmButtonText: 'Ok'
    });
};
    return (
        <div className="container-fluid bg-secondary min-vh-100">
          <ToastContainer position="top-right" autoClose='3000'/>
            <div className="row">
                {toggle && <div className="col-4 col-md-2  bg-white vh-100 position-fixed">
                    <Sidebar />
                </div>}
                {toggle && <div className="col-4 col-md-2"></div>}
                
                <div className="col">
                <Nav Toggle={Toggle} />
                {!isScheduled ? (
                    <div className="px-3">
                       
                       
                        <h4 className="text-center fw-bold text-white">Schedule Exam</h4>
                        
        <Form onSubmit={handleSchedule} controlId="formStep1">
  
                              <div className="row mt-5">
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                         
                                            <select name="course" className="form-control" id="" value={course} onChange={(e) => setCourse(e.target.value)}>
                                                <option value="-1" selected>Course</option>
                                                <option value="Btech">B.tech</option>
                                                <option value="Bpharma">B.pharma</option>
                                                <option value="BA">B.A.</option>
                                                <option value="BSC">B.S.C</option>
                                                <option value="Mtech">M.Tech</option>
                                                <option value="Mpharma">M.pharma</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <select name="branch" className="form-control" id="" value={branch} onChange={(e) => setBranch(e.target.value)}>
                                                <option value="-1" selected>Branch</option>
                                                <option value="IT">Information Technology</option>
                                                <option value="ME">Mechanical Engineering</option>
                                                <option value="CE">Civil Engineering</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <select name="subject" className="form-control" id="" value={subject} onChange={(e) => setSubject(e.target.value)} >
                                                <option value="-1" selected>Subject</option>
                                                <option value="DSA">DSA</option>
                                                <option value="Computer Network">Computer Network</option>
                                                <option value="Design Thinking">Design Thinking</option>
                                                <option value="Cryptography">Cryptography</option>
                                                <option value="Constitution">Constitution</option>
                                                <option value="PPS">PPS</option>
                                                <option value="Math-4">Math-4</option>
                                            </select>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                            
                                        <div className="mb-3">
                                            <select name="semester" className="form-control" id=""  value={semester} onChange={(e) => setSemester(e.target.value)}>
                                                <option value="-1" selected>Semester</option>
                                                <option value="one">1</option>
                                                <option value="two">2</option>
                                                <option value="three">3</option>
                                                <option value="four">4</option>
                                                <option value="five">5</option>
                                                <option value="six">6</option>
                                                <option value="seven">7</option>
                                                <option value="eight">8</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control" type="date" name="date" id="" value={date} onChange={(e) => setDate(e.target.value)} />
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                       
        <select value={examType} onChange={handleExamTypeChange} className="form-select" required>
          <option value="-1" selected>Exam Type</option>
          <option value="subjective">Subjective</option>
          <option value="objective">Objective</option>
        </select>
     
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control" type="time" name="time" id="" value={time}  onChange={handleTimeChange}/>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="mb-3">

                                        <select id="duration" className="form-select" name="duration" value={duration}  onChange={handleDurationChange}>
                                        <option value="-1" selected>Duration</option>
                                          <option value="1">1 hour</option>
                                          <option value="2">2 hour</option>
                                          <option value="3">3 hour</option>
                                        
                                        </select>
                                        </div>
                                        </div>
                                    </div>
       
        <button type="submit" className="btn btn-warning"> Schedule</button>
        </Form>
{/* 
      
       <Form onSubmit={handleSubmit}>
     
        <Form.Group controlId="formStep2">
          <h5 className="text-white">Add Questions</h5>
          
      {examType === 'subjective' && <SubjectiveForm />}
      {examType === 'objective' && <ObjectiveForm />}
        </Form.Group>
    
      
      <div className="d-flex justify-content-between">
      
      </div>
    </Form> */}

                    </div>
  ) : (
  
      examType === 'subjective' ? <SubjectiveForm examId={examId} /> : <ObjectiveForm examId={examId}/>
   
   
)}
                </div>
            
            </div>
        </div>

    )
}

export default Aexam
