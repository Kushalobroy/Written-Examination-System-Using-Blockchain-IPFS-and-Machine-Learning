import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/dropdown'
import '../components/sidebar.css'
function sidebar() {
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='bg-dark col-auto col-md-2 min-vh-100 d-flex justify-content-between flex-column'>
                <div>
                <a className='text-decoration-none text-white d-none d-sm-inline d-flex align-itemcenter ms-3 mt-3'>
                    <i className='fs-4 bi bi-people'> </i>
                    <span className='ms-1 fs-4 d-none d-sm-inline'>Student</span>
                </a>
                <hr className='text-secondary d-none d-sm-block'/>
                <ul className='nav nav-pills flex-column mt-3 mt-sm-0'>
                    <li className='nav-item text-white fs-4 my-1 py-2 py-sm-0'>
                        <a href="" className='nav-link text-white fs-4' area-content='page'>
                            <i className='bi bi-alarm'></i>
                            <span className='ms-3 d-none d-sm-inline'>Exam</span>
                        </a>
                    </li>
                </ul>
                </div>
                <div class="dropdown open">
                    <a class="text-decoration-none text-white dropdown-toggle p-3" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                               <i className='bi bi-person-circle '></i><span className='ms-2 d-none d-sm-inline'>Student</span>
                            </a>
                    <div class="dropdown-menu" aria-labelledby="triggerId">
                        <a class="dropdown-item" href="">
                    <span className=''> Log out</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default sidebar
