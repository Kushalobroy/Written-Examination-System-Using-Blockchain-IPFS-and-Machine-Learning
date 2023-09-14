import React from 'react'
import Nav from './Nav'
function Home({Toggle}) {
    return (
        <div className='px-3'>
            <Nav Toggle={Toggle}/>
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>10</h3>
                                <p className='fs-5'>Ongoing Exam</p>
                            </div>
                            <i className='bi bi-align-start p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>1000</h3>
                                <p className='fs-5'>Answerbook</p>
                            </div>
                            <i className='bi bi-journals p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>45602</h3>
                                <p className='fs-5'>Submitted</p>
                            </div>
                            <i className='bi bi-journal-check p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>200</h3>
                                <p className='fs-5'>Evaluator</p>
                            </div>
                            <i className='bi bi-person-workspace p-3 fs-1'></i>
                        </div>
                    </div>

                </div>
            </div>
            
                
                <table class="table caption-top bg-white rounded mt-2">
                <caption className='text-white fs-4'>Student List</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
      
    )
}

export default Home
