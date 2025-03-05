import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import './TransactionManagement.css';
import { fetchTransactions } from '../../services/transactionService';

const TransactionManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sử dụng một userId cố định cho mục đích demo
  const demoUserId = '123e4567-e89b-12d3-a456-426614174000';
  
  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      
      try {
        const { data, error: fetchError } = await fetchTransactions(demoUserId);
        
        if (fetchError) {
          setError(fetchError);
        } else {
          setTransactions(data);
        }
      } catch (err) {
        setError('Failed to load transactions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTransactions();
  }, []);

  const handleAddTransaction = () => {
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleFormComplete = () => {
    setShowForm(false);
    // Trigger a refresh of the transaction list
    setRefreshList(prev => prev + 1);
  };

  return (
    <div className="transaction-management">
      <div className="transaction-header">
        <h1>Quản lý giao dịch</h1>
        <button 
          className="add-transaction-button"
          onClick={handleAddTransaction}
        >
          <i className="fas fa-plus"></i> Thêm giao dịch mới
        </button>
      </div>

      {showForm && (
        <TransactionForm 
          onComplete={handleFormComplete}
          onCancel={handleFormCancel}
          userId={demoUserId}
        />
      )}

      <TransactionList 
        userId={demoUserId}
        key={refreshList} // Force re-render when refreshList changes
      />
    </div>
  );
};

export default TransactionManagement; 