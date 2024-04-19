import React, { useState, useEffect } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
function Eanswerbook() {
    const [toggle, setToggle] = useState(true);
    const [answerBooks, setAnswerBooks] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const Toggle = () => {
        setToggle(!toggle)
    }
    
   
    const fetchAnswerBooks = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/evaluator/answerBooks');
          if (!response.ok) {
            throw new Error('Failed to fetch answer books');
          }
          const data = await response.json();
          setAnswerBooks(data);
        } catch (error) {
          console.error('Error fetching answer books:', error);
        }
      };
    
      useEffect(() => {
        fetchAnswerBooks(); // Fetch answer books when the component mounts
      }, []);
    return (
        <div className="container-fluid bg-secondary min-vh-100">
            <div className="row">
                {toggle && <div className="col-4 col-md-2  bg-white vh-100 position-fixed">
                    <Sidebar />
                </div>}
                {toggle && <div className="col-4 col-md-2"></div>}
                <div className="col">
                    <div className="px-3">
                        <Nav Toggle={Toggle} />
                        <div className="row">
                            <div className="table table-responsive">
                                <h4 className="text-center text-white fw-bold">Answer Books</h4>
                                <table className="table table-striped">
                                    <thead>
                                       
                                        <th>Subject</th>
                                        <th>Roll No.</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </thead>
                                    <tbody>
                                    {answerBooks && answerBooks.map((answerBook) => (
                                        <tr key={answerBook._id}>
                                     
                                            {/* Render answer book details here */}
                                            <td>{answerBook.student_id}</td>
                                            <td>{answerBook.course}</td>
                                            <td>{answerBook.subject}</td>
                                            <td><a href={`/Answerbook?hash=${answerBook.ipfsHash}`} className="btn btn-success btn-sm">Check</a> </td>
                                            {/* Add other fields as needed */}
                                    
       
                                        </tr>
                                         ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Eanswerbook
