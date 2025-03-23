import { useState, useRef } from 'react';
import Stopwatch from './Stopwatch';
import '../main.css'

export default function StopwatchList() {
  const [stopwatches, setStopwatches] = useState<{ id: number; }[]>([]);
  const isAddedRefs                   = useRef< Set<number> >(new Set<number>());
  const [isRemoving, setIsRemoving]   = useState< Set<number> >(new Set<number>());

  const addStopwatch = () => {
    const newId: number = Date.now();
    setStopwatches((prevStopwatches) => [
      ...prevStopwatches,
      { id: newId },
    ]);
    isAddedRefs.current.add(newId);
  };

  const removeStopwatch = (id: number) => {
    if (isRemoving.has(id)) return;
    setIsRemoving((prev) => new Set(prev).add(id));
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
        {stopwatches.map((stopwatch) => {
          const isAdded    = isAddedRefs.current.has(stopwatch.id);
          const toRemove   = isRemoving.has(stopwatch.id);
          return (
            <div 
              key={stopwatch.id}
              className={`transition ${
                isAdded ? "animate-slide-in" : toRemove ? "animate-slide-out" : ""
              }`}
              onAnimationEnd={() => {
                if (toRemove) {
                  setStopwatches((prevStopwatches) =>
                    prevStopwatches.filter((st) => st.id !== stopwatch.id)
                  );
                  setIsRemoving((prev) => { 
                    const newSet = new Set(prev);
                    prev.delete(stopwatch.id);
                    return newSet;
                  })
                }
                isAddedRefs.current.delete(stopwatch.id);
              }}
            >
              <Stopwatch id={stopwatch.id} removeStopwatch={removeStopwatch} />
            </div>
          )
        })}
      </div>
    </div>
  );
};
