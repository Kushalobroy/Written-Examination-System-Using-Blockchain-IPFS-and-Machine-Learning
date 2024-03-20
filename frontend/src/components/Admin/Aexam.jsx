import React, { useState } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
function Aexam() {
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
                                    <h4 className="text-center fw-bold text-white">Schedule Exam</h4>
                                    <form action="">
                                    <div className="row">
                                        <div className="col-md-6">
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
                                        </div>
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <select name="branch" className="form-control" id="">
                                                <option value="-1" selected>Branch</option>
                                                <option value="13">Information Technology</option>
                                                <option value="40">Mechanical Engineering</option>
                                                <option value="00">Civil Engineering</option>
                                            </select>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
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
                                        </div>
                                        <div className="col-md-6">
                                            
                                        <div className="mb-3">
                                            <select name="semester" className="form-control" id="">
                                                <option value="-1" selected>Semester</option>
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
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control" type="date" name="date" id="" />
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="mb-3">
                                            <input className="form-control" type="time" name="time"/>
                                        </div>
                                        </div>
                                    </div>
                                        <div className="mb-3">
                                            <a href="/AaddQuestions" type="submit" className="btn btn-primary">Schedule</a>
                                            <button type="submit" className="btn btn-danger ms-2">Reset</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Aexam
