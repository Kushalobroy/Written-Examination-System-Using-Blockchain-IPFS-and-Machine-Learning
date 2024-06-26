import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/dropdown'
import '../sidebar.css'

function Sidebar() {

    const userData = JSON.parse(sessionStorage.getItem('userData'));
 
    const username = userData ? userData.username : null;
   
  return (
    <div className='bg-white sidebar p-2'>
       <div className='m-2'>
            <i className='bi bi-person-circle me-3 fs-4'></i>
            <span className='brand-name fs-4'>{username}</span>
       </div>
       <hr className='text-dark'/>
       <div className='list-group list-group-flush '>
            <a className='list-group-item py-2 my-1' href="/Admin">
                <i className='bi bi-speedometer2 fs-5 me-3'></i>
                <span > Dashboard</span>
            </a>
            <a className='list-group-item py-2' href="/AEvaluator">
                <i className='bi bi-person-workspace fs-5 me-3'></i>
                <span> Evaluators</span>
            </a>
            <a className='list-group-item py-2' href="/Astudent">
                <i className='bi bi-people-fill fs-5 me-3'></i>
                <span> Students</span>
            </a>
            <a className='list-group-item py-2' href="/Aexam">
                <i className='bi bi-alarm-fill fs-5 me-3'></i>
                <span > Exam</span>
            </a>
            <a className='list-group-item py-2' href="/Aadd">
                <i className='bi bi-person-circle fs-5 me-3'></i>
                <span>Add Admin</span>
            </a>
            <a className='list-group-item py-2' href='/Asetting'>
                <i className='bi bi-gear fs-5 me-3'></i>
                <span >Setting</span>
            </a>
       </div>
    </div>
    
  )
}

export default Sidebar
