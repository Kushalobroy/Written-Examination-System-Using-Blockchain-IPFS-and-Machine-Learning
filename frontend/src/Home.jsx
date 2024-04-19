import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
            const userId = event.target.elements.userIdInput.value;
            const password = event.target.elements.passwordInput.value;
            
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userId, password: password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                toast.success('Login Successful');
                window.location.href = '/Facerecognization?id=' + data.id;
                // sessionStorage.setItem('userData', JSON.stringify(data)); 
                // if (data.role === 'student') {
                //     window.location.href = '/Student?id=' + data.id;
                // } else if (data.role === 'admin') {
                //     window.location.href = '/Admin?id=' + data.id;
                // } else if (data.role === 'evaluator') {
                //     window.location.href = '/Evaluator?id=' + data.id;
                // }
            } else if (response.status === 401) {
                toast.error('Invalid credentials');
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error.message);
            toast.error(' Something went wrong');
        }
    };

    return (

           <>
            <ToastContainer position="top-right" autoClose='3000'/>
            {/* <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
      </a>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 link-secondary">WESUBTML</a></li>
      </ul>
    </header>
  </div> */}
            <div class="wrapper">
                
                 {/* <h1 className="text-primary fs-1 fw-1 mt-3 mb-2">Login</h1>
            <form id="loginForm" onSubmit={handleLogin} className="">
                <div className="mb-3">
                    <input type="text" className="form-control form-control-sm" placeholder="User id" id="userIdInput"></input>
                    <label className="form-label form-label-sm float-start ms-1">User Id</label>
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control form-control-sm" placeholder="Password" id="passwordInput"></input>
                    <label className="form-label form-label-sm float-start ms-1">Password</label>
                </div>
                <div className="mb-3">
                    <button type='submit' className="btn btn-outline-primary btn-sm">Login</button>
                    <button className="btn btn-outline-danger btn-sm ms-4" type="reset">Reset</button>
                </div>
            </form> */}
        <div class="logo">
            <img src="./img/login.png" alt="" />
        </div>
        <div class="text-center mt-4 name">
            Login
        </div>
        <form class="p-3 mt-3" id="loginForm" onSubmit={handleLogin}>
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userIdInput" placeholder="Username" required/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="passwordInput" placeholder="Password" required />
            </div>
            <button class="btn mt-3" type="submit">Login</button>
        </form>
        <div class="text-center fs-6">
            <a href="#">Forget password?</a>
        </div>
    </div>
    </>
    );
}

export default Home;
