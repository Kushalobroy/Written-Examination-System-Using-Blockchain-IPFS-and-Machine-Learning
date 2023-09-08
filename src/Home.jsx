import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
function Home(){
    return (
        <header className="App-header">
            <div className="">
            <h1>Login</h1>
            <form className="">
                <div className="mb-3">
                <select className="form-control">
                    <option value="-1">Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Evaluator">Evaluator</option>
                    <option value="Student">Student</option>
                </select>
                </div>
                <div className="mb-3">
                <input type="text" className="form-control" placeholder="User id"></input>
                </div>
                <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password"></input>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
            </div>
        </header>

    );
}
export default Home;