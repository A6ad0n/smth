import StopwatchList from './components/StopwatchList';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white select-none">
      <h1 className="text-3xl font-bold mb-4">Stopwatch App</h1>
      <StopwatchList />
    </div>
  );
};

