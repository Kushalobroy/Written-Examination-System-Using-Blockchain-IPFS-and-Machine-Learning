import React, { useState, useEffect } from 'react';
import Nav from './Nav'
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import '../Style.css';
function Home({ Toggle }) {
    const [totalStudent, setTotalStudent] = useState([]);
    const [totalEvaluator, setTotalEvaluator] = useState([]);
    const [totalAdmin, setTotalAdmin] = useState([]);
    // Add state for other data if needed
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/admin/home');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const { student, admin, evaluator /* Add other data here */ } = await response.json();
            setTotalStudent(student);
            setTotalEvaluator(evaluator);
            setTotalAdmin(admin);
            // Set state for other data if needed
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <>
        <Nav Toggle={Toggle} />
        <div className='px-3 '>
           
            <div className='container-fluid '>
                <div className='row g-3 my-2'>
                    <div className='col-md-3 '>
                        <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'lightgreen'}}>
                            <div >
                                <h3 className='fs-2'>10</h3>
                                <p className='fs-5'>Ongoing Exam</p>
                            </div>
                            <i className='bi bi-align-start p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'lightyellow'}}>
                            <div>
                                <h3 className='fs-2'>{totalEvaluator}</h3>
                                <p className='fs-5'>Evaluator</p>
                            </div>
                            <i className='bi bi-person-workspace p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'darksalmon'}}>
                            <div>
                                <h3 className='fs-2'>{totalStudent}</h3>
                                <p className='fs-5'>Student</p>
                            </div>
                            <i className='bi bi-people-fill fs-1 me-3'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>{totalAdmin}</h3>
                                <p className='fs-5'>Admin</p>
                            </div>
                            <i className='bi bi-person-circle me-3 fs-1'></i>
                        </div>
                    </div>

                </div>
                <div className='row g-3 my-2'>
                    <div className='col-md-3 '>
                        <div className='p-3  shadow-sm d-flex justify-content-around align-items-center rounded' style={{backgroundColor:'lightblue'}}>
                            <div >
                                <h3 className='fs-2'>10</h3>
                                <p className='fs-5'>Ongoing Exam</p>
                            </div>
                            <i className='bi bi-align-start p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>1000</h3>
                                <p className='fs-5'>Answer Books</p>
                            </div>
                            <i className='bi bi-journals p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>45602</h3>
                                <p className='fs-5'>Submitted</p>
                            </div>
                            <i className='bi bi-journal-check p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>200</h3>
                                <p className='fs-5'>Evaluator</p>
                            </div>
                            <i className='bi bi-person-workspace p-3 fs-1'></i>
                        </div>
                    </div>

                </div>
            </div>
            {/* <div className='row'>
                <div className='col-md-5 bg-white ms-1'>
                <BarChart />
                </div>
                <div className='col-md-5 bg-white ms-1'>
                <LineChart />
                </div>
            
            </div> */}


        </div>
        </>
    )
}
const BarChart = () => {
    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };
    return (
        <div>
            <Bar data={data} />
        </div>
    );
};
const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = () => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};
export default Home
