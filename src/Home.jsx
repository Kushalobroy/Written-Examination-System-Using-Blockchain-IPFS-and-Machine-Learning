import React from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
function Home(){
    return (
        <header className="App-header">
            <h1>Login</h1>
            <form>
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
        </header>
    );
}
export default Home;