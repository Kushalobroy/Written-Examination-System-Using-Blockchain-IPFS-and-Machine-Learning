import React, { useState,useEffect } from "react";
import '../../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar"
import Nav from './Nav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          const response = await fetch('http://localhost:5000/api/admin/create', {
            method: 'POST',
            body: data,
          });
    
          if (response.ok) {
            // Handle success
            toast.success('Admin Added successfully');
            window.location.reload();
          } else {
            // Handle errors
            toast.error('Error: Admin registration failed');
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
        const response = await fetch('http://localhost:5000/api/admin',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAdmins(data);
          
        } else {
          toast.error('Error: Failed to fetch admin data');
        }
      } catch (error) {
        console.error('Network error: ' + error.message);
      }
    }

    fetchAdmins();
  }, []);
  const handleDelete = (adminId) => {
    // Send a DELETE request to your backend API
    fetch(`http://localhost:5000/api/admin/delete/${adminId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
      }
    })
    .then(response => {
      if (response.ok) {
        // If the delete request is successful, update the admins list in the state or re-fetch data
        // For example, you can filter out the deleted admin from the admins list
        setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== adminId));
        toast.success('Admin Deleted Successfully !');
        window.location.reload();
      } else {
        toast.error('Error deleting admin');
        console.error('Error deleting admin:', response.status);
      }
    })
    .catch(error => {
      toast.error('Error deleting admin');
      console.error('Error deleting admin:', error);
    });
  };
    
    return (
      <><ToastContainer position="top-right" autoClose='3000'/>
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
                        <div className="row">
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header text-center border-0">
                                        <h4 class="modal-title fw-bold text-center" id="exampleModalLabel">New Admin</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body border-3 border-secondary">
                                   
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
                              
                                    <div className="modal-footer border-0">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="reset" className="btn btn-danger ms-2">Reset</button>
                                    </div>
                                </form>
                                    </div>
                                   
                                    </div>
                                </div>
                                </div>
                            
                  <div className="row">
       
                            <div className="col-md-12">
                            <div className="row">
                                        <div className="col-md-5">

                                        </div>
                                        <div className="col-md-2">
                                        <h4 className="text-center fw-bold text-white">Admin List</h4>
                                        </div>
                                        <div className="col-md-5">
                                        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Admin
                                </button>
                                        </div>
                                    </div>
                                <div className="table table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                          <tr>
                                            <th scope="col">Username</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact No</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {admins.map((admin) => (
                                            <tr>
                                                
                                                <td>{admin.username}</td>
                                                <td>{admin.name}</td>
                                                <td>{admin.email}</td>
                                                <td>{admin.contact_no}</td>
                                                <td><button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(admin._id)}>
                                                  Delete
                                                </button></td>
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
        </div>
        </div>
        </>
    )
}

export default Aadd
