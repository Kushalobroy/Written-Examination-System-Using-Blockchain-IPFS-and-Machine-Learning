import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
function Home(){
    return (
        
            <div className="container-sm w-50 mb-3 mt-5 pt-5 pb-5 bg-light rounded shadow-lg p-3 mb">
            <h1 className="text-primary fs-1 fw-1 mt-3 mb-2">Login</h1>
            <form className="">
                <div className="mb-3">
                <select className="form-control mt-3">
                    <option value="-1">Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Evaluator">Evaluator</option>
                    <option value="Student">Student</option>
                </select>
                <label className="form-label float-start ms-1">Usertype</label>
                </div>
                <div className="mb-3">
                <input type="text" className="form-control" placeholder="User id"></input>
                <label className="form-label float-start ms-1">User Id</label>
                </div>
                <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password"></input>
                <label className="form-label float-start ms-1">Password</label>
                </div>
                <div className="mb-3">
                    <a href="/Facerecognization" className="btn btn-primary" type="submit">Login</a>
                    <button className="btn btn-danger ms-4" type="submit">Reset</button>
                </div>
            </form>
            </div>

    );
}
export default Home;