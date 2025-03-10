import { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import '../main.css'

export default function StopwatchList() {
  const [stopwatches, setStopwatches] = useState<{ id: number; }[]>([]);
  const [isAdded, setIsAdded] = useState<{ [key: number] : boolean }>([]);
  const [isRemoving, setIsRemoving] = useState<{ [key: number] : boolean }>([]);

  /**
   * FOR DEBUG
   */
  useEffect(() => {
    console.log("------------Updated stopwatches-------------");
    stopwatches.forEach((stopwatch) => {
      console.log(`${String(stopwatch.id).slice(-4)}`);
    });    
    console.log("------------------");
  }, [stopwatches]);

  useEffect(() => {
    console.log("-----------Updated ISREMOVING-----------");
    Object.entries(isRemoving).forEach(([key, value]) => {
      console.log(`${key.slice(-4)}: ${value}`);
    });
    console.log("------------------");
  }, [isRemoving]);
  

  const addStopwatch = () => {
    const newId = Date.now();
    console.log("ADDING ID " + newId % 10_000);
    setStopwatches((prevStopwatches) => [
      ...prevStopwatches,
      { id: newId },
    ]);
    setIsAdded((prev) => ({ ...prev, [newId]: true }));

    setTimeout(() => {
      setIsAdded((prev) => ({ ...prev, [newId]: false }));
    }, 500);
  };

  const removeStopwatch = (id: number) => {
    console.log("REMOVING ID " + id % 10_000);
    if (isRemoving[id]) return;
    
    setIsRemoving((prev) => ({ ...prev, [id]: true }));

    setTimeout(() => {
      setStopwatches((prevStopwatches) =>
        prevStopwatches.filter((stopwatch) => stopwatch.id !== id)
      );
      setIsRemoving((prev) => ({ ...prev, [id]: false }));
    }, 500);
  };

  return (
    <div className="w-full max-w-md">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mb-4"
        onClick={addStopwatch}
      >
        + Add Stopwatch
      </button>
      <div className="space-y-4">
        {stopwatches.map((stopwatch) => (
        <div className={`${isAdded[stopwatch.id] ?? false ? "transition animate-slide-in" 
          : isRemoving[stopwatch.id] ?? false ? "transition animate-slide-out" : ""}`}
        >
          <Stopwatch id={stopwatch.id} removeStopwatch={removeStopwatch} />
        </div>
        ))}
      </div>
    </div>
  );
};
