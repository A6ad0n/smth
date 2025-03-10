interface ControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  stop: () => void;
  resume: () => void;
  reset: () => void;
  remove: () => void;
}

export default function Controls(props: ControlsProps) {
  return (
    <div className="flex space-x-2">
    {!props.isRunning ? (
      <button className="text-xl text-green-400 hover:text-green-600" onClick={props.start}>
        ▶
      </button>
    ) : props.isPaused ? (
      <>
        <button className="text-xl text-yellow-400 hover:text-yellow-600" onClick={props.resume}>
          ▶
        </button>
        <button className="text-gray-400 hover:text-gray-600" onClick={props.reset}>
          🔄
        </button>
      </>
    ) : (
      <>
        <button className="text-yellow-400 hover:text-yellow-600" onClick={props.stop}>
          ❚❚
        </button>
        <button className="text-gray-400 hover:text-gray-600" onClick={props.reset}>
          🔄
        </button>
      </>
    )}
    <button className="z-[1000] opacity-100 text-xl text-red-400 hover:text-red-600" onClick={props.remove}>
      ✖
    </button>
  </div>
  );
};
