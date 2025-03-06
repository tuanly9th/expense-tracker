import supabase from '../utils/supabaseClient';

/**
 * Lấy danh sách danh mục
 * @param {string} userId - ID của người dùng
 * @returns {Promise<Array>} Danh sách danh mục
 */
export const fetchCategories = async (userId) => {
  try {
    let query = supabase
      .from('categories')
      .select('*')
      .order('name');

    // Nếu có userId, lọc theo user_id hoặc lấy các danh mục mặc định (user_id is null)
    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Thêm danh mục mới
 * @param {Object} categoryData - Dữ liệu danh mục
 * @returns {Promise<Object>} Danh mục đã thêm
 */
export const addCategory = async (categoryData) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

/**
 * Cập nhật thông tin danh mục
 * @param {string} categoryId - ID của danh mục
 * @param {Object} updatedData - Dữ liệu cập nhật
 * @returns {Promise<Object>} Danh mục đã cập nhật
 */
export const updateCategory = async (categoryId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update(updatedData)
      .eq('id', categoryId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

/**
 * Xóa danh mục
 * @param {string} categoryId - ID của danh mục
 * @returns {Promise<void>}
 */
export const deleteCategory = async (categoryId) => {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Lấy tất cả danh mục
export const getAllCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách danh mục:', error);
    throw error;
  }
};

// Lấy danh mục theo loại (thu nhập/chi tiêu)
export const getCategoriesByType = async (type) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('type', type)
      .order('name');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Lỗi khi lấy danh mục loại ${type}:`, error);
    throw error;
  }
};

// Lấy thông tin danh mục theo ID
export const getCategoryById = async (categoryId) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin danh mục:', error);
    throw error;
  }
}; 