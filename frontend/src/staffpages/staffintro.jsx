import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const VideoPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/clockin');
    }, 10000); // 5 seconds

    return () => clearTimeout(timer); // Clean up on unmount
  }, [navigate]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => {
        videoRef.current.muted = false;
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="intro.mp4"
        autoPlay
        
      />
    </div>
  );
};

export default VideoPage;
