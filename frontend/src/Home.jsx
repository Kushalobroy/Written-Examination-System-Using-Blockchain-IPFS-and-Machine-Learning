import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    const handleLogin = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const userId = document.getElementById('userIdInput').value;
        const password = document.getElementById('passwordInput').value;
        console.log('Received login request:', { userId, password });
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userId,
                password: password,
            }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    throw new Error('Unauthorized: Invalid credentials');
                } else {
                    throw new Error('Error: Something went wrong');
                }
            })
            .then(data => {
                alert('Logged In Successfully');
                // Redirect based on userType (if needed)
                if (data.role === 'student') {
                    window.location.href = '/Student?id=' + data.id;
                } else if (data.role === 'admin') {
                    window.location.href = '/Admin?id=' + data.id;
                } else if (data.role === 'evaluator') {
                    window.location.href = '/Evaluator?id=' + data.id;
                }
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);
            });
    };

    return (
        <div className="container-sm w-50 mb-3 mt-5 pt-5 pb-5 bg-light rounded shadow-lg p-3 mb">
            <h1 className="text-primary fs-1 fw-1 mt-3 mb-2">Login</h1>
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
            </form>
        </div>
    );
}

export default Home;
