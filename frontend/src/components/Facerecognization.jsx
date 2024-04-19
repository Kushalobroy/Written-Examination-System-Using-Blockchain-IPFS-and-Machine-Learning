import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useLocation } from 'react-router-dom';
import PageLoader from './PageLoader';
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
        console.log(typeof imageSrc);
        setImageSrc(imageSrc);
    };
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [loading, setLoading] = useState(false);
     
    const handleVerification = async () => {
        // Make request to your backend API on port 5000
        setLoading(true);
        try {
            // Convert the Base64 string to an image element
            const img = new Image();
            img.src = imageSrc;
    
            // Wait for the image to load
            await new Promise(resolve => {
                img.onload = resolve;
            });
    
            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
    
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
    
            // Convert the canvas content to a blob (JPEG format)
            canvas.toBlob(async (blob) => {
                // Create FormData object and append data
                const formData = new FormData();
                formData.append('capturedImage', blob, 'capturedImage.jpg');
                formData.append('id', id);
    
                // Send POST request to backend API
                const response = await fetch('http://127.0.0.1:5000/api/faceVerification', {
                    method: 'POST',
                    body: formData
                });
                console.log('Response received from backend API:', response);
                if (!response.ok) {
                    throw new Error('Failed to send request to backend API');
                }
                const data = await response.json();
                console.log('Response from backend API:', data);
                setLoading(false);
            }, 'image/jpeg');
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };
    
    return (
        <div>
            <PageLoader loading={loading} />
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
           <button class="btn" type="submit" onClick={handleVerification}>Proceed</button>
           </div>  
            </div>
        </div>
    )
}

export default Facerecognization
