import React, { useState, useEffect } from 'react';

const Timer = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
      
      // Update document title for pseudo dynamic-island effect
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.title = `⏱ ${minutes}:${seconds < 10 ? '0' : ''}${seconds} - GrowBit`;
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      document.title = "🎉 Session Complete! - GrowBit";
      onComplete();
    } else {
      document.title = "GrowBit Web MVP";
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    document.title = "GrowBit Web MVP";
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="card" style={{ textAlign: 'center', marginBottom: '24px' }}>
      <h2>Study Module (Pomodoro)</h2>
      <div className="timer-display">
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </div>
      <div className="timer-controls">
        <button className={isActive ? 'danger' : 'primary'} onClick={toggleTimer}>
          {isActive ? 'Pause' : 'Start Focus'}
        </button>
        <button className="secondary" onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
