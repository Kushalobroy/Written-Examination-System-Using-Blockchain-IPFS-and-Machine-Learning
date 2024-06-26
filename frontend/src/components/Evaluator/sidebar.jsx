import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/dropdown'
import '../sidebar.css'

function sidebar() {
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
            <a className='list-group-item py-2 my-1' href="/Evaluator">
                <i className='bi bi-speedometer2 fs-5 me-3'></i>
                <span > Dashboard</span>
            </a>
            <a className='list-group-item py-2 my-1' href="/Eanswerbook">
                <i className='bi bi-journals fs-5 me-3'></i>
                <span > Answerbook</span>
            </a>
           
       </div>
    </div>
    
  )
}

export default sidebar
