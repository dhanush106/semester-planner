import React, { useState, useEffect } from "react";
import "../styles/Stopwatch.css"; // To apply custom animations and styles

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(30); // Default duration in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [inputDuration, setInputDuration] = useState(duration);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStartStop = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleDurationChange = (e) => {
    setInputDuration(e.target.value);
  };

  const setNewDuration = () => {
    const newDuration = parseInt(inputDuration);
    if (newDuration > 0) {
      setDuration(newDuration);
      setTimeLeft(newDuration);
      setInputDuration(newDuration);
    }
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="stopwatch-container">
      <div className="time-display">
        <div className="digit-box">{formatTime(Math.floor(timeLeft / 60))}</div>
        <span className="colon">:</span>
        <div className="digit-box">{formatTime(timeLeft % 60)}</div>
      </div>
      <div className="controls">
        <button className="start-stop" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="reset" onClick={handleReset}>Reset</button>
      </div>
      <div className="duration-setting">
        <input
          type="number"
          value={inputDuration}
          onChange={handleDurationChange}
          min="1"
        />
        <button onClick={setNewDuration}>Set Duration</button>
      </div>
    </div>
  );
};

export default Stopwatch;
