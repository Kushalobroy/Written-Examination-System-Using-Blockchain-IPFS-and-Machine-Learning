import React, { useState } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar"
import Nav from './Nav'
function Astudent() {
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
                                <div className="col-md-12">
                                    <h4 className="text-center fw-bold text-white">Student List</h4>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">S. No.</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Course</th>
                                                    <th scope="col">Branch</th>
                                                    <th scope="col">Year</th>
                                                    <th scope="col">Semester</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>B.tech</td>
                                                    <td>IT</td>
                                                    <td>2020-2024</td>
                                                    <td>7</td>
                                                    <td><a className="btn btn-success" href="">View Profile</a></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>B.tech</td>
                                                    <td>IT</td>
                                                    <td>2020-2024</td>
                                                    <td>7</td>
                                                    <td><a className="btn btn-success" href="">View Profile</a></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>B.tech</td>
                                                    <td>IT</td>
                                                    <td>2020-2024</td>
                                                    <td>7</td>
                                                    <td><a className="btn btn-success" href="">View Profile</a></td>
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
        </div>
    )
}

export default Astudent
