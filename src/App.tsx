import StopwatchList from './components/StopwatchList';

export default function App() {
  return (
  <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white select-none">
    <div className="h-[10vh] flex items-end pb-5">
      <h1 className="text-3xl font-bold">Stopwatch App</h1>
    </div>
    <StopwatchList />
  </div>
  );
};
