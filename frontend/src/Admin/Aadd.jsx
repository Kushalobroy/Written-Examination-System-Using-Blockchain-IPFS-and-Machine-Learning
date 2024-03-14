import React, { useState,useEffect } from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
function Aadd() {
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact_no: '',
        username: '',
        password: '',
        photo: null,
      });
    
      const handleFileChange = (event) => {
        setFormData({
          ...formData,
          photo: event.target.files[0],
        });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const data = new FormData();
    
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            if (key === 'photo') {
              data.append('photo', formData[key]);
            } else {
              data.append(key, formData[key]);
            }
          }
        }
    
        try {
          const response = await fetch('http://localhost:3000/api/admin/create', {
            method: 'POST',
            body: data,
          });
    
          if (response.ok) {
            // Handle success
            alert('Admin Added successfully');
            window.location.reload();
          } else {
            // Handle errors
            alert('Error: Admin registration failed');
          }
        } catch (error) {
          console.error(error);
        }
      };
    //Display Admin List
    const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await fetch('http://localhost:3000/api/admin',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
          
        } else {
          console.error('Error: Failed to fetch admin data');
        }
      } catch (error) {
        console.error('Network error: ' + error.message);
      }
    }

    fetchAdmins();
  }, []);

    
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
                            <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <input className="form-control form-control-sm" type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input className="form-control form-control-sm" type="text" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input className="form-control form-control-sm" type="text" placeholder="Contact Number" onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input className="form-control form-control-sm" type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <input className="form-control form-control-sm" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="img" className="form-label text-white float-start">Photo</label>
                                <input className="form-control form-control-sm" type="file" name="photo" id="img" onChange={handleFileChange} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-sm" href="">Add</button>
                            </div>
                            </form>
                            </div>
                            <div className="col-md-6">
                            <h4 className="text-white text-center fs-4">Admin List</h4>
                                <div className="table table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                          <tr>
                                            <th scope="col">Profile</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact No</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {admins.map((admin) => (
                                            <tr>
                                                
                                                <td><img src={`http://localhost:3000/${admin.photo.filename}`} alt={`Image for ${admin.name}`} /></td>
                                                <td>{admin.name}</td>
                                                <td>{admin.email}</td>
                                                <td>{admin.contact_no}</td>
                                                <td><a className="btn btn-outline-danger btn-sm" href="">Delete</a></td>
                                            </tr>
                                              ))}
                                            <tr>
                                            
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
