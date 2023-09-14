import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/dropdown'
import '../components/sidebar.css'
function sidebar() {
  return (
    <div className='bg-white sidebar p-2'>
       <div className='m-2'>
            <i className='bi bi-bootstrap-fill me-3 fs-4'></i>
            <span className='brand-name fs-4'>Admin</span>
       </div>
       <hr className='text-dark'/>
       <div className='list-group list-group-flush '>
            <a className='list-group-item py-2 my-1' href="">
                <i className='bi bi-speedometer2 fs-5 me-3'></i>
                <span className='fs-5'> Dashboard</span>
            </a>
            <a className='list-group-item py-2' href="">
                <i className='bi bi-person-workspace fs-5 me-3'></i>
                <span className='fs-5'> Evaluators</span>
            </a>
            <a className='list-group-item py-2' href="">
                <i className='bi bi-people-fill fs-5 me-3'></i>
                <span className='fs-5'> Students</span>
            </a>
            <a className='list-group-item py-2' href="">
                <i className='bi bi-alarm-fill fs-5 me-3'></i>
                <span className='fs-5'> Exam</span>
            </a>
            <a className='list-group-item py-2' href="">
                <i className='bi bi-power fs-5 me-3'></i>
                <span className='fs-5'>Logout</span>
            </a>
       </div>
    </div>
  )
}

export default sidebar
