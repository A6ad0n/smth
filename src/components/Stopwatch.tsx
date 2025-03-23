import { useState, useEffect } from 'react';
import Controls from './Controls';

interface StopwatchProps {
    id: number;
    removeStopwatch: (id: number) => void;
  }

export default function Stopwatch(props: StopwatchProps) {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
 
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !isPaused === true) {
        interval = setInterval(() => {
            setCounter((time) => time + 1);
        }, 1000);
    } else {
        clearInterval(interval!);
    }
    return () => {
        clearInterval(interval!);
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
      setIsRunning(true);
      setIsPaused(false);
  };

  const handlePause = () => {
      setIsPaused(true);
  };

  const handleResume = () => {
      setIsPaused(false);
  };

  const handleClear = () => {
      setIsRunning(false);
      setCounter(0);
  };

  const handleRemove = () => {
      props.removeStopwatch(props.id);
    };

  return (
    <div className={`bg-gray-800 p-4 rounded-lg flex justify-between items-center transition-opacity duration-400 
      bg-gray-800${isRunning && !isPaused ? '' : isPaused ? '/70' : '/30'} 
      transform hover:bg-gray-800`}
    >
      <span className="text-xl font-mono">
        {Math.floor(counter / 60)}:{String(counter % 60).padStart(2, "0")}
      </span>
      <Controls
        isRunning={isRunning}
        isPaused={isPaused}
        start={handleStart}
        stop={handlePause}
        resume={handleResume}
        reset={handleClear}
        remove={handleRemove}
      />
    </div>
  );
};
