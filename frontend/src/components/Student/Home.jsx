import React from 'react'
import Nav from './Nav'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/modal'
import Swal from 'sweetalert2';
import '../Style.css';
function Home({ Toggle }) {
    
    const handleClick = () => {
        Swal.fire({
          title: 'Warning',
          text: 'You can not exit as fullscreen before end of the examination If you are trying to exit more than 5 times exam will be autosubmitted',
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to another page using window.location
                window.location.href = '/exam';
              }
          });;
      };
    return (
        <div className='px-3'>
            <Nav Toggle={Toggle} />
            <div className='container-fluid'>
            <div class="card custom-card">
                <div class="card-body">
                    <h5 class="card-title">Scheduled Exam</h5>
                    <h6 class="card-subtitle mt-2 fw-1">Subject: Data Structures</h6>
                    <h6 class="card-subtitle mt-2 fw-1">Subject Code: KNC 502</h6>
                    <h6 class="card-subtitle mt-2 fw-1">Duration: 3 hours</h6>
                    <p class="card-text"></p>

                    <button type="button" class="button" onClick={handleClick} >
                        Start
                    </button>
                </div>
            </div>
            </div>



        </div>

    )
}

export default Home
