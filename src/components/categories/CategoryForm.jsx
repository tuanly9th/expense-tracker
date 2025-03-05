import React, { useState, useEffect } from 'react';
import { addCategory, updateCategory } from '../../services/categoryService';
import './CategoryForm.css';

const CategoryForm = ({ userId, category, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense', // Mặc định là chi tiêu
    user_id: userId
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu đang chỉnh sửa danh mục, điền thông tin vào form
    if (category) {
      setFormData({
        name: category.name,
        type: category.type,
        user_id: userId
      });
    }
  }, [category, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name.trim()) {
        throw new Error('Vui lòng nhập tên danh mục');
      }

      if (category) {
        // Cập nhật danh mục
        await updateCategory(category.id, formData);
      } else {
        // Thêm danh mục mới
        await addCategory(formData);
      }

      onSubmitSuccess();
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
      console.error('Error saving category:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form">
      <h3>{category ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục Mới'}</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên danh mục:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Loại danh mục:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleChange}
              />
              Chi tiêu
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleChange}
              />
              Thu nhập
            </label>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-submit" 
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : (category ? 'Cập nhật' : 'Thêm mới')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm; 