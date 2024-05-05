import React, { useEffect, useState } from 'react';
import './BreathingCircle.css';
import Layout from '../Layout/Layout';

const BreathingCircle = () => {
  const [circleText, setCircleText] = useState('Breath In...');
  const [containerClassName, setContainerClassName] = useState('container grow');
  const totalTime = 6000; // Total time for one complete breath cycle (in milliseconds)
  const breathTime = totalTime / 2; // Time for one phase (either breath in or breath out)

  // Simulate camera recording (for demonstration)
  useEffect(() => {
    startCameraRecording();

    return () => {
      stopCameraRecording();
    };
  }, []); // Empty dependency array to run effect only once on mount and cleanup on unmount

  const startCameraRecording = () => {
    // Code to start camera recording (e.g., start recording video stream)
    console.log('Camera recording started');
  };

  const stopCameraRecording = () => {
    // Code to stop camera recording (e.g., stop recording video stream)
    console.log('Camera recording stopped');
  };

  const breathAnimation = () => {
    // Start with Breath In animation
    setCircleText('Breath In...');
    setContainerClassName('container grow');

    // Switch to Breath Out animation after breathTime
    setTimeout(() => {
      setCircleText('Breath Out...');
      setContainerClassName('container shrink');
    }, breathTime);
  };

  useEffect(() => {
    // Initial breath animation
    breathAnimation();

    // Set interval for continuous breath animations
    const interval = setInterval(breathAnimation, totalTime);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <Layout>
      <div className="breathBody" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="liveStreamContainer" style={{ flex: '1', padding: '10px' }}>
          {/* <h1>Live Streaming</h1> */}
          <div>
            <img src="http://127.0.0.1:5001/video" width="10%" alt="Live Video"/>
          </div>
        </div>
        <div className="relaxationContainer" style={{ flex: '1', padding: '10px' }}>
          {/* <h1 className="mainH1" style={{ color: 'white', marginBottom: '20px' }}>Relaxation App</h1> */}
          <div className={containerClassName}>
            <div className="circleDiv"></div>
            <p className="circleText">{circleText}</p>
            <div className="pointerContainer">
              <div className="pointer"></div>
            </div>
            <div className="gradientCircle"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BreathingCircle;
