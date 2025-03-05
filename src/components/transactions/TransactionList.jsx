import React, { useState, useEffect } from 'react';
import { fetchTransactions, deleteTransaction } from '../../services/transactionService';
import TransactionItem from './TransactionItem';
import TransactionFilter from './TransactionFilter';
import './TransactionManagement.css';

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    type: '',
    categoryId: ''
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(userId, filters);
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách giao dịch. Vui lòng thử lại sau.');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [userId, filters]);

  const handleDeleteTransaction = async (transactionId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
      try {
        await deleteTransaction(transactionId);
        setTransactions(transactions.filter(t => t.id !== transactionId));
      } catch (err) {
        setError('Không thể xóa giao dịch. Vui lòng thử lại sau.');
        console.error('Error deleting transaction:', err);
      }
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Tính tổng thu nhập và chi tiêu
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div className="transaction-list-container">
      <h2>Danh sách giao dịch</h2>
      
      <div className="transaction-summary">
        <div className="summary-item income">
          <h3>Tổng thu nhập</h3>
          <p>{totalIncome.toLocaleString()} VND</p>
        </div>
        <div className="summary-item expense">
          <h3>Tổng chi tiêu</h3>
          <p>{totalExpense.toLocaleString()} VND</p>
        </div>
        <div className="summary-item balance">
          <h3>Số dư</h3>
          <p>{(totalIncome - totalExpense).toLocaleString()} VND</p>
        </div>
      </div>

      <TransactionFilter onFilterChange={handleFilterChange} />

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Đang tải dữ liệu...</div>
      ) : transactions.length > 0 ? (
        <div className="transaction-items">
          {transactions.map(transaction => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
              onDelete={handleDeleteTransaction} 
            />
          ))}
        </div>
      ) : (
        <div className="no-transactions">
          Không có giao dịch nào. Hãy thêm giao dịch mới!
        </div>
      )}
    </div>
  );
};

export default TransactionList; 