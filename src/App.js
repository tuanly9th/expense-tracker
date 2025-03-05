import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <img src={logo} className="h-64 w-64 animate-spin" alt="logo" />
        <p className="mt-8 text-xl">
          Edit <code className="bg-gray-800 px-2 py-1 rounded">src/App.js</code> and save to reload.
        </p>
        <a
          className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
