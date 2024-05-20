import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const LiveProctoring = () => {
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    // Access webcam and capture video stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setVideoStream(stream);
        const video = document.getElementById("video");
        if (video) {
          video.srcObject = stream;
        }
      })
      .catch((error) => console.error("Error accessing webcam:", error));

    return () => {
      // Cleanup: stop video stream
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const sendVideoFrame = async () => {
    if (!videoStream) return;

    const videoElement = document.getElementById("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL("image/jpeg");

    // Send the frame to the Flask backend
    try {
      const response = await fetch("http://localhost:4000/liveProctoring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ frame: frame }),
      });
      if (!response.ok) {
        throw new Error("Failed to send frame to backend");
      }
    } catch (error) {
      console.error("Error sending frame to backend:", error);
    }

    // Send the next frame recursively
    requestAnimationFrame(sendVideoFrame);
  };

  useEffect(() => {
    // Start sending video frames to the backend
    sendVideoFrame();
  }, []);
  const videoRef = useRef(null);
  const [motionDetected, setMotionDetected] = useState(false);

  useEffect(() => {
    const constraints = {
      video: true,
    };

    const handleMotionDetection = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

      //     if (previousFrame) {
      //       let totalDiff = 0;

      //       for (let i = 0; i < currentFrame.data.length; i += 4) {
      //         const diff = Math.abs(currentFrame.data[i] - previousFrame.data[i]) +
      //           Math.abs(currentFrame.data[i + 1] - previousFrame.data[i + 1]) +
      //           Math.abs(currentFrame.data[i + 2] - previousFrame.data[i + 2]);
      //         totalDiff += diff;
      //       }

      //       const averageDiff = totalDiff / (currentFrame.data.length / 4);
      //       if (averageDiff > motionDetectionThreshold) {
      //         toast.error("Motion Detected");
      //         setMotionDetected(true);
      //       } else {
      //         setMotionDetected(false);
      //       }
      //     }

      //     previousFrame = currentFrame;
      //   };

      //   navigator.mediaDevices.getUserMedia(constraints)
      //     .then(stream => {
      //       videoRef.current.srcObject = stream;
      //       setInterval(handleMotionDetection, motionDetectionInterval); // Call motion detection function at regular intervals
      //     })
      //     .catch(error => {
      //       console.error('Error accessing webcam:', error);
      //     });

      //   return () => {
      //     const stream = videoRef.current.srcObject;
      //     if (stream) {
      //       const tracks = stream.getTracks();
      //       tracks.forEach(track => {
      //         track.stop();
      //       });
      //     }
    };
  }, []);

  const motionDetectionThreshold = 100; // Adjust as needed
  const motionDetectionInterval = 800; // Adjust as needed
  let previousFrame = null;

  return (
    <>
      <ToastContainer position="top-right" autoClose="3000" />
      <div className="live-proctoring-container">
        {/* ref={videoRef}  */}
        <video id="video" autoPlay muted className="webcam-feed"></video>
        {/* {motionDetected && <div className="motion-warning">Warning: Motion Detected!</div>} */}
        <Timer />
      </div>
    </>
  );
};

const Timer = () => {
  const initialTime = 3 * 60 * 60; // 3 hours in seconds
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const formatTime = (value) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="timer">
      <span className="fs-6 fw-bold">{formatTime(time)}</span>
    </div>
  );
};

export default LiveProctoring;
