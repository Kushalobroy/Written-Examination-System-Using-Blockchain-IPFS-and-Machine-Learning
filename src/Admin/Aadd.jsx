import React, { useState } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar"
import Nav from './Nav'
function Aadd() {
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
                            <div className="col-md-6">
                            <h4 className="text-white text-center fs-4">Add Admin</h4>
                            <form action="">
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Name" />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="email" />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Contact No." />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="User id" />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="Password" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white float-start">Photo</label>
                                <input className="form-control" type="file"/> 
                                </div>
                                <div className="mb-3">
                                    <a className="btn btn-primary" href="">Add</a>
                                </div>
                            </form>
                            </div>
                            <div className="col-md-6">
                            <h4 className="text-white text-center fs-4">Admin List</h4>
                                <div className="table table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact No</th>
                                            <th>Action</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Kushal</td>
                                                <td>kushalobroy@gmail.com</td>
                                                <td>7800286558</td>
                                                <td><a className="btn btn-danger" href="">Delete</a></td>
                                            </tr>
                                            <tr>
                                                <td>Sandeep Kumar</td>
                                                <td>sk5873@gmail.com</td>
                                                <td>9305525008</td>
                                                <td><a className="btn btn-danger" href="">Delete</a></td>
                                            </tr>
                                            <tr>
                                                <td>Ajay</td>
                                                <td>........@gmail.com</td>
                                                <td>........</td>
                                                <td><a className="btn btn-danger" href="">Delete</a></td>
                                            </tr>
                                            <tr>
                                                <td>Diksha</td>
                                                <td>.........@gmail.com</td>
                                                <td>...........</td>
                                                <td><a className="btn btn-danger" href="">Delete</a></td>
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

export default Aadd
