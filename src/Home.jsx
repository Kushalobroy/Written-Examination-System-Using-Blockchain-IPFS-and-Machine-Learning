import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
function Home(){
    return (
        
            <div className="container-sm w-50 mb-3 mt-5 pt-5 pb-5 bg-light rounded shadow-lg p-3 mb">
            <h1 className="text-primary fs-1 fw-1 mt-3 mb-2">Login</h1>
            <form className="">
               
                <div className="mb-3">
                <input type="text" className="form-control form-control-sm" placeholder="User id"></input>
                <label className="form-label form-label-sm float-start ms-1">User Id</label>
                </div>
                <div className="mb-3">
                <input type="password" className="form-control form-control-sm" placeholder="Password"></input>
                <label className="form-label form-label-sm float-start ms-1">Password</label>
                </div>
                <div className="mb-3">
                    <a href="/Facerecognization" className="btn btn-outline-primary btn-sm" type="submit">Login</a>
                    <button className="btn btn-outline-danger btn-sm ms-4" type="submit">Reset</button>
                </div>
            </form>
            </div>

    );
}
export default Home;