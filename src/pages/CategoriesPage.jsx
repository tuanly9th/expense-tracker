import React from 'react';
import Categories from '../components/categories/CategoryManagement';

const CategoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Danh mục</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <Categories />
      </div>
    </div>
  );
};

export default CategoriesPage; 