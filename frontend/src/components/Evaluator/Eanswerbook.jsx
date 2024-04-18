import React, { useState } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
function Eanswerbook() {
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
                                        <tr>
                                         
                                            <td>Data Structures</td>
                                            <td>2007360130031</td>
                                            <td className="text-warning">Unchecked</td>
                                            <td><a className="btn btn-success" href="">Check</a></td>
                                        </tr>
                                        <tr>
                                           
                                            <td>Data Structures</td>
                                            <td>2007360130031</td>
                                            <td className="text-warning">Unchecked</td>
                                            <td><a className="btn btn-success" href="">Check</a></td>
                                        </tr>
                                        <tr>
                                            
                                            <td>Data Structures</td>
                                            <td>2007360130031</td>
                                            <td className="text-warning">Unchecked</td>
                                            <td><a className="btn btn-success" href="">Check</a></td>
                                        </tr>
                                        <tr>
                                           
                                            <td>Data Structures</td>
                                            <td>2007360130031</td>
                                            <td className="text-warning">Unchecked</td>
                                            <td><a className="btn btn-success" href="">Check</a></td>
                                        </tr>
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
