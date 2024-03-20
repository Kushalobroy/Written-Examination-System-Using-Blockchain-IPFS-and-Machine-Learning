import React, { useEffect, useRef, useState } from 'react';

const LiveProctoring = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: true,
    };

    // Access webcam feed
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing webcam:', error);
      });

    return () => {
      // Stop video stream when component unmounts
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div className="live-proctoring-container">
      <video ref={videoRef} autoPlay muted className="webcam-feed"></video>
      <Timer />
    </div>
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
        setTime(prevTime => prevTime - 1);
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
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="timer">
      <span>Remaining Time: {formatTime(time)}</span>
    </div>
  );
};

export default LiveProctoring;
