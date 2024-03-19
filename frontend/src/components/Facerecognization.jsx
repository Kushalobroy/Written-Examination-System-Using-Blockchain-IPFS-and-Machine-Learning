import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function Facerecognization() {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const videoConstraints = {
        width: 230, 
        height: 250,
        facingMode: 'user',
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    };
    return (
        <div>
             <div class="wrapper">
       <div class="logo">
       {imageSrc && <img src={imageSrc} alt="Captured" />}
       </div>
       <div class="text-center mt-4 name">
           Face Verification
       </div>
     
           <div class="p-3 mt-3">
                <Webcam
                    audio={false}
                    height={videoConstraints.height}
                    width={videoConstraints.width}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    screenshotFormat="image/jpeg"
                />
           </div> 
           <div className='btn-group'>
           <button class="btn me-3" type="submit" onClick={capture}>Capture</button>
           <button class="btn" type="submit" >Proceed</button>
           </div>  
            </div>
        </div>
    )
}

export default Facerecognization
