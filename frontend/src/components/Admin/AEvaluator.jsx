import React, { useState,useEffect } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'

function Evaluator() {
  const [toggle, setToggle] = useState(true)
  const Toggle = () => {
    setToggle(!toggle)
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact_no: '',
    username: '',
    password: '',
    clg_name:'',
    branch:'',
    course:'',
    subject:'',
    photo: null,
  });
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      photo: event.target.files[0],
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === 'photo') {
          data.append('photo', formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      }
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/addEvaluator', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        // Handle success
        alert('Evaluator Added successfully');
        window.location.reload();
      } else {
        // Handle errors
        alert('Error: evaluator registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
//Display Admin List
const [evaluators, setEvaluators] = useState([]);
useEffect(() => {
  async function fetchEvaluators() {
    try {
      const response = await fetch('http://localhost:5000/api/admin/getAllEvaluator',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvaluators(data);
        
      } else {
        console.error('Error: Failed to fetch evaluator data');
      }
    } catch (error) {
      console.error('Network error: ' + error.message);
    }
  }

  fetchEvaluators();
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
           
              <div className='row'>
                <div className='col-md-6'>
                  <h4 className="text-white text-center fs-4">Add Evaluator</h4>
                  <form action="" onSubmit={handleFormSubmit}>
                    <div className="mb-2">
                      <input className="form-control form-control-sm" type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input className="form-control form-control-sm" type="text" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input className="form-control form-control-sm" type="text" placeholder="Contact Number" onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input className="form-control form-control-sm" type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input className="form-control form-control-sm" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div className="mb-2">
                    <label htmlFor="img" className="form-label text-white float-start">College Name</label>
                      <select name="clg_name" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, clg_name: e.target.value })}>
                          <option value="" disabled selected>College Name</option>
                          <option value="736">Rajkiya Engineering College Azamgarh</option>
                          <option value="735">Rajkiya Engineering College Mainpuri</option>
                          <option value="734">Rajkiya Engineering College Banda</option>
                          <option value="733">Rajkiya Engineering College Ambedkar Nagar</option>
                          <option value="732">Rajkiya Engineering College Sonbhadra</option>
                          <option value="100">IET Lucknow</option>
                      </select>
                    </div>
                    <div className="mb-2">
                    <label htmlFor="img" className="form-label text-white float-start">Course</label>
                      <select name="course" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, course: e.target.value })}>
                          <option value="" disabled selected>Course</option>
                          <option value="1">B.tech</option>
                          <option value="2">M.tech</option>
                          <option value="3">B.pharma</option>
                          <option value="4">M.pharma</option>
                          <option value="5">B.A.</option>
                          <option value="4">B.S.C</option>
                      </select>
                    </div>
                    <div className="mb-2">
                    <label htmlFor="img" className="form-label text-white float-start">Branch</label>
                      <select name="branch" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
                          <option value="" disabled selected>Branch</option>
                          <option value="13">Information Technology</option>
                          <option value="40">Mechanical Engineering</option>
                          <option value="00">Civil Engineering</option>
                      </select>
                    </div>
                    <div className="mb-2">
                    <label htmlFor="img" className="form-label text-white float-start">Subject</label>
                      <select name="subject" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                          <option value="-1" selected>Subject</option>
                          <option value="11">DSA</option>
                          <option value="22">Computer Network</option>
                          <option value="33">Design Thinking</option>
                          <option value="44">Cryptography</option>
                          <option value="55">Constitution</option>
                          <option value="66">PPS</option>
                          <option value="77">Math-4</option>
                      </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="img" className="form-label text-white float-start">Photo</label>
                        <input className="form-control form-control-sm" type="file" name="photo" id="img" onChange={handleFileChange} />
                    </div>
                    <div className="mb-2">
                      <button type="submit" className="btn btn-primary">Submit</button>
                      <button type="submit" className="btn btn-danger ms-2">Reset</button>
                    </div>
                  </form>
                </div>
                
                <div className="col-md-6">
                <h4 className="text-white text-center fs-4">Evaluators</h4>
                <div className="table-responsive">

                  <table class="table  caption-top bg-white rounded">
                    
                    <thead>
                      <tr>
                        <th scope="col">S. no.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">College Name</th>
                        <th scope="col">Course</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {evaluators.map((evaluator,index) => (
                          <tr>
                              <td>{index + 1}</td>
                              <td><img src={`http://localhost:5000/uploads/admin/${evaluator.photo.filename}`} alt={`Image for ${evaluator.name}`} style={{width:'80px', height:'80px',borderRadius:'50%', border: '1px solid black', }}/></td>
                              <td>{evaluator.email}</td>
                              <td>{evaluator.contact_no}</td>
                              <td>{evaluator.clg_name}</td>
                              <td>{evaluator.course}</td>
                              <td>{evaluator.branch}</td>
                              <td>{evaluator.subject}</td>
                              
                              <td><a className="btn btn-outline-danger btn-sm" href="">Delete</a></td>
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
      </div>
 
  )
}


export default Evaluator
