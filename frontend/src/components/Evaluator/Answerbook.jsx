import React, { useState, useEffect } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
import { useLocation } from 'react-router-dom';
function Answerbook() {
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
      const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hash = queryParams.get('hash');

  // Now you have the hash value available

  // You can construct the dynamic URL using the hash value
  const dynamicUrl = `http://127.0.0.1:8080/ipfs/${hash}#toolbar=0`;
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
                        <iframe src={dynamicUrl} width="100%" height={580} seamless ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Answerbook
