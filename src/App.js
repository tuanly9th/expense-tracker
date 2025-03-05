import logo from './logo.svg';
import supabase from './utils/supabaseClient';
import React, { useEffect } from 'react';

function App() {
  // Ví dụ về cách sử dụng supabase client
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        console.error('Lỗi khi truy vấn dữ liệu:', error);
        return;
      }

      console.log('Dữ liệu nhận được:', data);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  // Gọi fetchData khi component được mount
  useEffect(() => {
    fetchData();
  }, []);

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
