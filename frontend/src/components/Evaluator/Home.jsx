import React from 'react'
import Nav from './Nav'
function Home({ Toggle }) {
    return (
        <div className='px-3'>
            <Nav Toggle={Toggle} />
            <div className='container-fluid'>
            {/* <iframe src="http://127.0.0.1:8080/ipfs/QmWQYif8UrdMpX3g1UtZtP7P4kv368Z1piGaFTiHAFS9s2" width="100%" height={500} seamless></iframe> */}
                <div className='row g-3 my-2'>
                    <div className='col-md-4'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>10</h3>
                                <p className='fs-5'>Checked</p>
                            </div>
                            <i className='bi bi-journal-check p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>1000</h3>
                                <p className='fs-5'>Remaining</p>
                            </div>
                            <i className='bi bi-journals p-3 fs-1'></i>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>45602</h3>
                                <p className='fs-5'>Total AnsBook</p>
                            </div>
                            <i className='bi bi-journal-check p-3 fs-1'></i>
                        </div>
                    </div>

                </div>
            </div>



        </div>

    )
}

export default Home
