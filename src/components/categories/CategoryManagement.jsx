import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from '../../services/categoryService';
import CategoryForm from './CategoryForm';

const CategoryManagement = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [userId]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await fetchCategories(userId);
      setCategories(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách danh mục. Vui lòng thử lại sau.');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await deleteCategory(categoryId);
        setCategories(categories.filter(cat => cat.id !== categoryId));
      } catch (err) {
        setError('Không thể xóa danh mục. Vui lòng thử lại sau.');
        console.error('Error deleting category:', err);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleFormSubmit = () => {
    loadCategories();
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="category-management">
      <div className="category-header">
        <h2>Quản lý Danh mục</h2>
        <button 
          className="btn-add-category" 
          onClick={() => setShowForm(true)}
        >
          Thêm Danh mục
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Đang tải danh mục...</div>
      ) : (
        <div className="category-list">
          <div className="category-list-header">
            <div className="category-name">Tên danh mục</div>
            <div className="category-type">Loại</div>
            <div className="category-actions">Thao tác</div>
          </div>
          
          {categories.length === 0 ? (
            <div className="no-categories">Chưa có danh mục nào. Hãy thêm danh mục mới!</div>
          ) : (
            categories.map(category => (
              <div key={category.id} className="category-item">
                <div className="category-name">{category.name}</div>
                <div className="category-type">
                  <span className={`type-badge ${category.type}`}>
                    {category.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}
                  </span>
                </div>
                <div className="category-actions">
                  <button 
                    className="btn-edit" 
                    onClick={() => handleEdit(category)}
                  >
                    Sửa
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(category.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showForm && (
        <div className="category-form-modal">
          <div className="category-form-container">
            <button className="close-btn" onClick={handleFormClose}>×</button>
            <CategoryForm 
              userId={userId}
              category={editingCategory} 
              onSubmitSuccess={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement; 