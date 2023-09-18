import React, { useState } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'

function Evaluator() {
  const [toggle, setToggle] = useState(true)
  const Toggle = () => {
    setToggle(!toggle)
  }
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
              <div className='row g-3 my-2'>
                <div className='col-md-5'>
                  <h4 className="text-white text-center fs-4">Add Evaluator</h4>
                  <form action="">
                    <div className="mb-3">
                      <input className="form-control" type="text" placeholder="Name" />
                    </div>
                    <div className="mb-3">
                      <select name="clg_name" className="form-control" id="">
                          <option value="-1" selected>College Name</option>
                          <option value="122">Agriculture Engineering College</option>
                          <option value="134">Anna University</option>
                          <option value="145">REC</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <select name="course" className="form-control" id="">
                          <option value="-1" selected>Course</option>
                          <option value="1">B.tech</option>
                          <option value="2">B.pharma</option>
                          <option value="3">B.A.</option>
                          <option value="3">B.S.C</option>
                          <option value="3">M.Tech</option>
                          <option value="3">M.pharma</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <select name="branch" className="form-control" id="">
                          <option value="-1" selected>Branch</option>
                          <option value="13">Information Technology</option>
                          <option value="40">Mechanical Engineering</option>
                          <option value="00">Civil Engineering</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <select name="subject" className="form-control" id="">
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
                    <div className="mb-3">
                      <button type="submit" className="btn btn-primary">Submit</button>
                      <button type="submit" className="btn btn-danger ms-2">Reset</button>
                    </div>
                  </form>
                </div>
                
                <div className="col-md-7">
                <h4 className="text-white text-center fs-4">Evaluators</h4>
                
                  <table class="table table-responsive caption-top bg-white rounded">
                    
                    <thead>
                      <tr>
                        <th scope="col">S. no.</th>
                        <th scope="col">Name</th>
                        <th scope="col">College Name</th>
                        <th scope="col">Course</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>REC</td>
                        <td>B.Tech</td>
                        <td>IT</td>
                        <td>DSA</td>
                        <td><a href="" className="btn btn-danger">Delete</a></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Abhinav</td>
                        <td>REC</td>
                        <td>B.Tech</td>
                        <td>CE</td>
                        <td>Surveying</td>
                        <td><a href="" className="btn btn-danger">Delete</a></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Shubham</td>
                        <td>REC</td>
                        <td>B.Tech</td>
                        <td>ME</td>
                        <td>MP</td>
                        <td><a href="" className="btn btn-danger">Delete</a></td>
                      </tr>
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
