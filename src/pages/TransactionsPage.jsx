import React, { useState, useEffect } from 'react';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';
import { getAllUsers } from '../services/userService';

const TransactionsPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tải danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAllUsers();
        setUsers(data);
        
        // Tự động chọn người dùng đầu tiên nếu có
        if (data.length > 0) {
          setSelectedUserId(data[0].id);
        }
        
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải danh sách người dùng:', err);
        setError('Không thể tải danh sách người dùng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Xử lý khi hoàn thành thêm/sửa giao dịch
  const handleTransactionComplete = () => {
    setShowForm(false);
    // Có thể thêm logic để refresh danh sách giao dịch ở đây
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Không có người dùng nào trong hệ thống.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Giao dịch</h1>

      <div className="mb-6">
        <label htmlFor="user-select" className="block text-gray-700 font-medium mb-2">
          Chọn người dùng:
        </label>
        <select
          id="user-select"
          value={selectedUserId || ''}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Chọn người dùng --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Thêm giao dịch mới
          </button>
        </div>
      )}

      {showForm && selectedUserId && (
        <div className="mb-8">
          <TransactionForm
            userId={selectedUserId}
            onComplete={handleTransactionComplete}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {selectedUserId && (
        <TransactionList userId={selectedUserId} />
      )}
    </div>
  );
};

export default TransactionsPage; 