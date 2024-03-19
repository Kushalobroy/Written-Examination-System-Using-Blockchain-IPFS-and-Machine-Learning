import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/modal";
import FullScreen from "./FullScreen";
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { Document, Page } from "@react-pdf/renderer";
import Ansbook from "./Ansbook";
import TextEditor from "./TextEditor";
import { Editor } from "draft-js";



function Exam() {
  const handleAnsBook = async () => {
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
      const response = await axios.post('http://localhost:5000/api/student/ansbook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      alert("Something went wrong");
      console.error('Error uploading PDF:', error);
    }

    // Prompt the user to save the PDF locally
    //html2pdf().from(element).save('converted.pdf');
  };
  return (
    < >
      <div className="container mt-5" id="content-to-convert">
        <FullScreen />
        <nav class="navbar fixed-top navbar-light bg-light text-center"></nav>
       
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
