import React from 'react'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
function nav({Toggle}) {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
            <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                    <i className='bi bi-justify'></i>
                </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav  mt-2 mt-lg-0">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Admin
                        </a>
                       <div className="dropdown-menu" aria-labelledby="dropdownId">
                           <li><a className="dropdown-item" href="">Profile</a></li> 
                           <li><a className="dropdown-item" href="">Logout</a></li> 
                        </div>
                        
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default nav

