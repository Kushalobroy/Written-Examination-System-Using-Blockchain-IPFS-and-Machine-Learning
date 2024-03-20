import React, { useState,useEffect } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
function Astudent() {
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
        clg_code:'',
        branch_code:'',
        course_code:'',
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
          const response = await fetch('http://localhost:3000/api/admin/addStudent', {
            method: 'POST',
            body: data,
          });
    
          if (response.ok) {
            // Handle success
            alert('Student Added successfully');
            window.location.reload();
          } else {
            // Handle errors
            alert('Error: Student Registration failed');
          }
        } catch (error) {
          console.error(error);
        }
      };
    //Display Admin List
    const [students, setStudents] = useState([]);
    useEffect(() => {
      async function fetchStudents() {
        try {
          const response = await fetch('http://localhost:3000/api/admin/getAllStudent',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStudents(data);
            
          } else {
            console.error('Error: Failed to fetch student data');
          }
        } catch (error) {
          console.error('Network error: ' + error.message);
        }
      }
    
      fetchStudents();
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
                        <div className='container-fluid'>
                            <div className="row">
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header text-center border-0">
                                        <h4 class="modal-title fw-bold text-center" id="exampleModalLabel">New Student</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body border-3 border-secondary">
                                    <form action="" onSubmit={handleFormSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                                <label htmlFor="img" className="form-label  float-start">Name</label>
                                                <input className="form-control form-control-sm" type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })}  required/>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                                <label htmlFor="img" className="form-label  float-start">Email</label> 
                                                <input className="form-control form-control-sm" type="text" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                            <label htmlFor="img" className="form-label  float-start">Contact No</label>
                                                <input className="form-control form-control-sm" type="text" placeholder="Contact Number" onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })} required/>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                            <label htmlFor="img" className="form-label  float-start">Roll Number</label>
                                                <input className="form-control form-control-sm" type="text" placeholder="Roll Number" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                            <label htmlFor="img" className="form-label  float-start">Password</label>
                                                <input className="form-control form-control-sm" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                            <label htmlFor="img" className="form-label  float-start">College Name</label>
                                            <select name="clg_name" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, clg_code: e.target.value })} required>
                                                <option value="" disabled selected>College Name</option>
                                                <option value="736">Rajkiya Engineering College Azamgarh</option>
                                                <option value="735">Rajkiya Engineering College Mainpuri</option>
                                                <option value="734">Rajkiya Engineering College Banda</option>
                                                <option value="733">Rajkiya Engineering College Ambedkar Nagar</option>
                                                <option value="732">Rajkiya Engineering College Sonbhadra</option>
                                                <option value="100">IET Lucknow</option>
                                            </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                            <label htmlFor="img" className="form-label  float-start">Course</label>
                                            <select name="course" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, course_code: e.target.value })} required>
                                                <option value="" disabled selected>Course</option>
                                                <option value="1">B.tech</option>
                                                <option value="2">M.tech</option>
                                                <option value="3">B.pharma</option>
                                                <option value="4">M.pharma</option>
                                                <option value="5">B.A.</option>
                                                <option value="4">B.S.C</option>
                                            </select>
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                            <label htmlFor="img" className="form-label  float-start">Branch</label>
                                            <select name="branch" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, branch_code: e.target.value })} required>
                                                <option value="" disabled selected>Branch</option>
                                                <option value="13">Information Technology</option>
                                                <option value="40">Mechanical Engineering</option>
                                                <option value="00">Civil Engineering</option>
                                            </select>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                           
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                                <label htmlFor="img" className="form-label  float-start">Semester</label>
                                                <select name="subject" className="form-select form-select-sm" id="" onChange={(e) => setFormData({ ...formData, semester: e.target.value })} required>
                                                    <option value="" disabled selected>Semester</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className="mb-1">
                                                <label htmlFor="img" className="form-label  float-start">Photo</label>
                                                <input className="form-control form-control-sm" type="file" name="photo" id="img" onChange={handleFileChange} required/>
                                            </div>
                                            </div>
                                        </div>
                                        
                                    <div className="modal-footer border-0">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="reset" className="btn btn-danger ms-2">Reset</button>
                                    </div>
                                </form>
                                    </div>
                                   
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className='row g-3 my-2'>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-5">

                                        </div>
                                        <div className="col-md-2">
                                        <h4 className="text-center fw-bold text-white">Student List</h4>
                                        </div>
                                        <div className="col-md-5">
                                        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Student
                                </button>
                                        </div>
                                    </div>
                                    
                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S. No.</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Roll Number</th>
                                                    <th scope="col">Contact Number</th>
                                                    <th scope="col">Course</th>
                                                    <th scope="col">Branch</th>
                                                    <th scope="col">Semester</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {students.map((student,index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{student.name}</td>
                                                    <td>{student.username}</td>
                                                    <td>{student.contact_no}</td>
                                                    <td>{student.course_code}</td>
                                                    <td>{student.branch_code}</td>
                                                    <td>{student.semester}</td>
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
        </div>
    )
}

export default Astudent
