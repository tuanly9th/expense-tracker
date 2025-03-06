import React, { useState, useEffect } from 'react';
import { getTransactionsByUserId } from '../services/transactionService';
import { formatCurrency } from '../utils/formatters';

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactionsByUserId(userId);
        setTransactions(data);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải giao dịch:', err);
        setError('Không thể tải danh sách giao dịch. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-4">{error}</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center py-4">Chưa có giao dịch nào.</div>;
  }

  return (
    <div className="transaction-list">
      <h2 className="text-xl font-bold mb-4">Danh sách giao dịch</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Ngày</th>
              <th className="py-2 px-4 border-b text-left">Danh mục</th>
              <th className="py-2 px-4 border-b text-left">Ghi chú</th>
              <th className="py-2 px-4 border-b text-right">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {formatDate(transaction.created_at)}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.categories?.name || 'Không có danh mục'}
                </td>
                <td className="py-2 px-4 border-b">
                  {transaction.note || 'Không có ghi chú'}
                </td>
                <td className={`py-2 px-4 border-b text-right font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList; 