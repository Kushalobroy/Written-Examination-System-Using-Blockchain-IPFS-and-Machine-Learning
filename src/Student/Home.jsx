import React from 'react'
import Nav from './Nav'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/js/dist/modal'
function Home({ Toggle }) {
    return (
        <div className='px-3'>
            <Nav Toggle={Toggle} />
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <div className='col-md-12'>
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Scheduled Exam</h5>
                                <h6 class="card-subtitle mt-2 fw-1">Subject: Data Structures</h6>
                                <h6 class="card-subtitle mt-2 fw-1">Subject Code: KNC 502</h6>
                                <h6 class="card-subtitle mt-2 fw-1">Duration: 3 hours</h6>
                                <p class="card-text"></p>

                                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Start
                                </button>


                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title text-danger" id="exampleModalLabel">Warning (read carefully before proceeding)</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p><span >1.</span>You can not exit as fullscreen before end of the examination.</p>
                                                <p><span >2.</span>If you are trying to exit more than 5 times exam will be autosubmitted.</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <a href="/exam" className='btn btn-primary'>Proceed</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>



        </div>

    )
}

export default Home
