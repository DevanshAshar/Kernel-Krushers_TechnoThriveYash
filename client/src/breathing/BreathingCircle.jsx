import React, { useEffect, useState } from 'react';
import './BreathingCircle.css';

const BreathingCircle = () => {
  const [circleText, setCircleText] = useState('Breath In...');
  const [containerClassName, setContainerClassName] = useState('container grow');
  const totalTime = 7500;
  const breathTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;

  const breathAnimation = () => {
    setCircleText('Breath In...');
    setContainerClassName('container grow');

    setTimeout(() => {
      setCircleText('...Hold');
      setTimeout(() => {
        setCircleText('Breath Out...');
        setContainerClassName('container shrink');
      }, holdTime);
    }, breathTime);
  };

  useEffect(() => {
    breathAnimation();
    const interval = setInterval(breathAnimation, totalTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="mainH1">Relaxation App</h1>
      <div className={containerClassName}>
        <div className="circleDiv"></div>
        <p className="circleText">{circleText}</p>
        <div className="pointerContainer">
          <div className="pointer"></div>
        </div>
        <div className="gradientCircle"></div>
      </div>
    </div>
  );
};

export default BreathingCircle;
