import supabase from '../utils/supabaseClient';

/**
 * Lấy danh sách giao dịch
 * @param {string} userId - ID của người dùng
 * @param {Object} filters - Các bộ lọc (startDate, endDate, type, categoryId)
 * @returns {Promise<Array>} Danh sách giao dịch
 */
export const getTransactionsByUserId = async (userId, filters = {}) => {
  try {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        categories(id, name, type),
        users(id, name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Áp dụng các bộ lọc nếu có
    if (filters.startDate) {
      query = query.gte('created_at', new Date(filters.startDate).toISOString());
    }

    if (filters.endDate) {
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
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giao dịch:', error);
    throw error;
  }
};

/**
 * Lấy thông tin giao dịch theo ID
 * @param {string} transactionId - ID của giao dịch
 * @returns {Promise<Object>} Thông tin giao dịch
 */
export const getTransactionById = async (transactionId) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        categories(id, name, type),
        users(id, name)
      `)
      .eq('id', transactionId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin giao dịch:', error);
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
    const { data, error } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Lỗi khi thêm giao dịch:', error);
    throw error;
  }
};

/**
 * Cập nhật thông tin giao dịch
 * @param {string} transactionId - ID của giao dịch
 * @param {Object} transactionData - Dữ liệu cập nhật
 * @returns {Promise<Object>} Giao dịch đã cập nhật
 */
export const updateTransaction = async (transactionId, transactionData) => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .update(transactionData)
      .eq('id', transactionId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Lỗi khi cập nhật giao dịch:', error);
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
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa giao dịch:', error);
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
    const transactions = await getTransactionsByUserId(userId, { startDate, endDate });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Thống kê theo danh mục
    const categoryStats = {};
    transactions.forEach(transaction => {
      const categoryId = transaction.category_id;
      const categoryName = transaction.categories?.name || 'Không có danh mục';
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
    console.error('Lỗi khi lấy thống kê giao dịch:', error);
    throw error;
  }
};

/**
 * Lấy danh sách giao dịch với phân trang và sắp xếp
 * @param {string} userId - ID của người dùng
 * @param {Object} options - Các tùy chọn truy vấn
 * @param {Object} options.filters - Các bộ lọc (startDate, endDate, type, categoryId)
 * @param {number} options.page - Số trang (bắt đầu từ 1)
 * @param {number} options.pageSize - Số lượng giao dịch mỗi trang
 * @param {string} options.sortBy - Trường để sắp xếp (mặc định: 'created_at')
 * @param {boolean} options.ascending - Sắp xếp tăng dần hay không (mặc định: false)
 * @returns {Promise<Object>} Danh sách giao dịch và thông tin phân trang
 */
export const fetchTransactions = async (userId, options = {}) => {
  try {
    const {
      filters = {},
      page = 1,
      pageSize = 10,
      sortBy = 'created_at',
      ascending = false
    } = options;

    // Tính toán phân trang
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('transactions')
      .select(`
        *,
        categories(id, name, type),
        users(id, name)
      `, { count: 'exact' })
      .eq('user_id', userId)
      .order(sortBy, { ascending });

    // Áp dụng các bộ lọc nếu có
    if (filters.startDate) {
      query = query.gte('created_at', new Date(filters.startDate).toISOString());
    }

    if (filters.endDate) {
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

    // Áp dụng phân trang
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    // Tính toán thông tin phân trang
    const totalPages = Math.ceil(count / pageSize);

    return {
      transactions: data,
      pagination: {
        page,
        pageSize,
        totalItems: count,
        totalPages,
        hasMore: page < totalPages
      }
    };
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giao dịch:', error);
    throw error;
  }
};
