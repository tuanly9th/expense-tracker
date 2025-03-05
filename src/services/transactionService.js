import supabase from '../utils/supabaseClient';

/**
 * Lấy danh sách giao dịch
 * @param {string} userId - ID của người dùng
 * @param {Object} filters - Các bộ lọc (startDate, endDate, type, categoryId)
 * @returns {Promise<Array>} Danh sách giao dịch
 */
export const fetchTransactions = async (userId, filters = {}) => {
  if (!userId) {
    console.error('No user ID provided for fetching transactions');
    return { data: [], error: 'User ID is required' };
  }

  try {
    let query = supabase
      .from('transactions')
      .select('*, category:category_id(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    // Áp dụng các bộ lọc nếu có
    if (filters.startDate) {
      query = query.gte('created_at', new Date(filters.startDate).toISOString());
    }
    
    if (filters.endDate) {
      // Thêm 1 ngày để bao gồm cả ngày kết thúc
      const endDate = new Date(filters.endDate);
      endDate.setDate(endDate.getDate() + 1);
      query = query.lt('created_at', endDate.toISOString());
    }
    
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return { data: [], error: error.message };
  }
};

/**
 * Lấy thông tin giao dịch theo ID
 * @param {string} transactionId - ID của giao dịch
 * @returns {Promise<Object>} Thông tin giao dịch
 */
export const fetchTransactionById = async (transactionId) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, category:category_id(*)')
      .eq('id', transactionId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
};

/**
 * Thêm giao dịch mới
 * @param {Object} transactionData - Dữ liệu giao dịch
 * @returns {Promise<Object>} Giao dịch đã thêm
 */
export const addTransaction = async (transactionData) => {
  try {
    const newTransaction = {
      ...transactionData,
      created_at: new Date().toISOString()
    };

    // Kiểm tra xem đã có user_id chưa
    if (!newTransaction.user_id) {
      throw new Error('User ID is required');
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert([newTransaction])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

/**
 * Cập nhật thông tin giao dịch
 * @param {string} transactionId - ID của giao dịch
 * @param {Object} updatedData - Dữ liệu cập nhật
 * @returns {Promise<Object>} Giao dịch đã cập nhật
 */
export const updateTransaction = async (transactionId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .update(updatedData)
      .eq('id', transactionId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

/**
 * Xóa giao dịch
 * @param {string} transactionId - ID của giao dịch
 * @returns {Promise<void>}
 */
export const deleteTransaction = async (transactionId) => {
  try {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', transactionId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

/**
 * Lấy thống kê giao dịch theo khoảng thời gian
 * @param {string} userId - ID của người dùng
 * @param {string} startDate - Ngày bắt đầu
 * @param {string} endDate - Ngày kết thúc
 * @returns {Promise<Object>} Thống kê giao dịch
 */
export const getTransactionStats = async (userId, startDate, endDate) => {
  try {
    const { data, error } = await fetchTransactions(userId, { startDate, endDate });

    if (error) throw error;

    // Make sure data is an array before using filter
    if (!Array.isArray(data)) {
      console.error('Expected data to be an array but got:', data);
      return {
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        categoryStats: []
      };
    }

    const totalIncome = data
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalExpense = data
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Thống kê theo danh mục
    const categoryStats = {};
    data.forEach(transaction => {
      const categoryId = transaction.category_id;
      const categoryName = transaction.category?.name || 'Không có danh mục';
      const type = transaction.type;
      const amount = parseFloat(transaction.amount);

      if (!categoryStats[categoryId]) {
        categoryStats[categoryId] = {
          id: categoryId,
          name: categoryName,
          income: 0,
          expense: 0
        };
      }

      if (type === 'income') {
        categoryStats[categoryId].income += amount;
      } else {
        categoryStats[categoryId].expense += amount;
      }
    });

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      categoryStats: Object.values(categoryStats)
    };
  } catch (error) {
    console.error('Error getting transaction stats:', error);
    throw error;
  }
};
