import logo from './logo.svg';
import supabase from './utils/supabaseClient';
import React, { useEffect } from 'react';
// Import React Router components
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Import the Category component (you'll need to create this)
import CategoryManagement from './components/categories/CategoryManagement';
// Import the UserManagement component (you'll need to create this)
import UserManagement from './components/users/UserManagement';
// Import the TransactionManagement component (you'll need to create this)
import TransactionManagement from './components/transactions/TransactionManagement';
import { AuthProvider } from './contexts/AuthContext';

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
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-blue-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="text-white hover:text-blue-300 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/users" className="text-white hover:text-blue-300 transition-colors">Users</Link>
              </li>
              <li>
                <Link to="/transactions" className="text-white hover:text-blue-300 transition-colors">Transactions</Link>
              </li>
            </ul>
          </nav>
          
          <Routes>
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/transactions" element={<TransactionManagement />} />
            <Route path="/" element={
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
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
