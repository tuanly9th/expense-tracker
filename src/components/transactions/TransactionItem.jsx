import React, { useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import TransactionForm from './TransactionForm';
import './TransactionManagement.css';

const TransactionItem = ({ transaction, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  // Format số tiền với dấu phân cách hàng nghìn
  const formattedAmount = parseFloat(transaction.amount).toLocaleString();

  if (isEditing) {
    return (
      <TransactionForm 
        transaction={transaction} 
        onCancel={handleCancelEdit}
        onComplete={handleEditComplete}
        isEditing={true}
      />
    );
  }

  return (
    <div className={`transaction-item ${transaction.type}`}>
      <div className="transaction-date">
        {formatDate(transaction.created_at)}
      </div>
      
      <div className="transaction-details">
        <div className="transaction-category">
          {transaction.category ? transaction.category.name : 'Không có danh mục'}
        </div>
        <div className="transaction-note">
          {transaction.note || 'Không có ghi chú'}
        </div>
      </div>
      
      <div className="transaction-amount">
        {transaction.type === 'income' ? '+' : '-'} {formattedAmount} VND
      </div>
      
      <div className="transaction-actions">
        <button 
          className="edit-button" 
          onClick={handleEditClick}
          aria-label="Chỉnh sửa giao dịch"
        >
          <i className="fas fa-edit"></i>
        </button>
        <button 
          className="delete-button" 
          onClick={() => onDelete(transaction.id)}
          aria-label="Xóa giao dịch"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TransactionItem; 