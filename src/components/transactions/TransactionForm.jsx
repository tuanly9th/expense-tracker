import React, { useState, useEffect } from 'react';
import { addTransaction, updateTransaction } from '../../services/transactionService';
import { fetchCategories } from '../../services/categoryService';
import './TransactionManagement.css';

const TransactionForm = ({ transaction, onComplete, onCancel, isEditing = false, userId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    type: transaction?.type || 'expense',
    amount: transaction?.amount || '',
    category_id: transaction?.category_id || '',
    note: transaction?.note || '',
    user_id: userId || transaction?.user_id
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Không thể tải danh mục. Vui lòng thử lại sau.');
        console.error('Error fetching categories:', err);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.amount || !formData.category_id) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (isEditing && transaction) {
        await updateTransaction(transaction.id, formData);
      } else {
        await addTransaction(formData);
      }
      
      onComplete();
    } catch (err) {
      setError('Có lỗi xảy ra khi lưu giao dịch. Vui lòng thử lại.');
      console.error('Error saving transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Lọc danh mục theo loại giao dịch (thu nhập hoặc chi tiêu)
  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <div className="transaction-form-container">
      <h3>{isEditing ? 'Chỉnh sửa giao dịch' : 'Thêm giao dịch mới'}</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="type">Loại giao dịch</label>
          <select 
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="expense">Chi tiêu</option>
            <option value="income">Thu nhập</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Số tiền</label>
          <input 
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Nhập số tiền"
            min="0"
            step="1000"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category_id">Danh mục</label>
          <select 
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {filteredCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="note">Ghi chú</label>
          <textarea 
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Nhập ghi chú (không bắt buộc)"
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
            disabled={loading}
          >
            Hủy
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : isEditing ? 'Cập nhật' : 'Thêm giao dịch'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm; 