import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal";
import FullScreen from "./FullScreen";
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Document, Page } from "@react-pdf/renderer";
import Ansbook from "./Ansbook";
import TextEditor from "./TextEditor";
import LiveProctoring from '../LiveProctoring';
import PageLoader from "../PageLoader";
import Swal from 'sweetalert2'; 

function Exam() {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [loading, setLoading] = useState(false);
  const handleAnsBook = async () => {
    setLoading(true);
    const element = document.getElementById('content-to-convert');
    const options = {
      margin: 10, // Set margin to 10mm
      padding:100,
      filename: 'converted.pdf', // Set PDF filename
      image: { type: 'jpeg', quality: 0.98 }, // Set image type and quality
      html2canvas: { scale: 2 }, // Set html2canvas scale to 2
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } // Set jsPDF unit, format, and orientation
    };

    const pdfBlob = await html2pdf().from(element).set(options).output('blob');
  
    // Save PDF to the database
    const formData = new FormData();
    formData.append('pdf', pdfBlob, 'converted.pdf');
   
    try {
      const response = await axios.post('http://127.0.0.1:5001/api/v0/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    // Parse the response to extract the IPFS hash of the uploaded file
    const ipfsHash = response.data.Hash;
  
    const additionalData = {
      student_id: userData.username,
      course: 'B.Tech',
      subject: 'DSA',
      branch: 'IT',
      semester: userData.semester,
      ipfsHash // Include the IPFS hash
    };

    // Send additional data to backend for storage
    await axios.post('http://127.0.0.1:5000/api/student/submitExam', additionalData);
   // Show SweetAlert for success
   Swal.fire({
    icon: 'success',
    title: 'Exam Submitted Successfully!',
    showConfirmButton: true,
  }).then((result) => {
    // Redirect to student dashboard if user clicks "OK"
    if (result.isConfirmed) {
      window.location.href = '/Student';
    }
  });
    setLoading(false);
    } catch (error) {
      alert("Something went wrong");
      console.error('Error uploading PDF:', error);
    }

    // Prompt the user to save the PDF locally
    // html2pdf().from(element).save('converted.pdf');
  };
  return (
    < >
     <PageLoader loading={loading} />
     
      <div className="container mt-5" id="content-to-convert">
        <FullScreen />
        <nav class="navbar fixed-top navbar-light bg-light text-center"></nav>

      <LiveProctoring />
            <div >
              <div className="mb-3 mt-5 pt-5 pb-5 bg-light rounded shadow-lg p-3 mb">
                <h4 className="fw-1 ">Section A</h4>
                <h6>Note: Attempt all the questions !</h6>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.1) What is the time complexity of bubble sort?
                </p>
                <TextEditor />
              </div>
              <div className="mb-3">
                <div>
                  <p className="fs-5 float-start">
                    Q.2) What is the time complexity of bubble sort?
                  </p>
                </div>
                <div>
                  <TextEditor />
                </div>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.3) What is the time complexity of bubble sort?
                </p>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.4) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 4"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.5) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 5"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.6) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 6"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.6) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 7"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.8) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 9"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.9) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 10"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.10) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="5"
                  placeholder="Answer 11"
                ></textarea>
              </div>
              <div className="mb-3 mt-5 pt-5 pb-5 bg-light rounded shadow-lg p-3 mb">
                <h4 className="fw-1">Section B</h4>
                <h6>Note: Attempt any three questions !</h6>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.1) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="10"
                  placeholder="Answer 1"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.2) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="10"
                  placeholder="Answer 2"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.3) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="10"
                  placeholder="Answer 3"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.4) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="10"
                  placeholder="Answer 4"
                ></textarea>
              </div>
              <div className="mb-3">
                <p className="fs-5 float-start">
                  Q.5) What is the time complexity of bubble sort?
                </p>
                <textarea
                  className="form-control"
                  name="ans1"
                  cols="130"
                  rows="10"
                  placeholder="Answer 5"
                ></textarea>
              </div>
            </div>
       
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={handleAnsBook}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Exam;
