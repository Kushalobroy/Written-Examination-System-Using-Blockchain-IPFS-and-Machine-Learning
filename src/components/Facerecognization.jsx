import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function Facerecognization() {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const videoConstraints = {
        width: 510, 
        height: 300,
        facingMode: 'user',
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    };
    return (
        <div>
            <div className='container mt-5'>
                <p className='text-center fs-3 fw-bold'>Face Verification</p>
                <div className='row justify-content-center mb-2 mt-0 pt-5 pb-5 bg-light rounded shadow-lg p-3 mb'>
                    <div className='mb-2'>
                    <p className="float-start  list-group-item text-danger mt-0 mb-0"><span className="list-item-bullet">&#9733;</span> Face should be clear,  </p>
                    <p className=" float-start list-group-item text-danger mt-0 mb-0"><span className="list-item-bullet">&#9733;</span> Don't wear colurfull glasses</p>
                    </div>
                    <div className='col-md-6'>
                        <div className="border border-3 border-success">
                            <Webcam
                                audio={false}
                                height={videoConstraints.height}
                                width={videoConstraints.width}
                                ref={webcamRef}
                                videoConstraints={videoConstraints}
                                screenshotFormat="image/jpeg"
                            />
                        </div>

                        <button className='btn btn-success mt-1' onClick={capture}>Capture Photo</button>
                    </div>
                    <div className='col-md-6'>
                        <div className='border border-3 border-primary'>
                        {imageSrc && <img src={imageSrc} alt="Captured" />}
                        </div>
                        <button type='submit' className='btn btn-primary float-end mt-1'>Proceed</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Facerecognization
