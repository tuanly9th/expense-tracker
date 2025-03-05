import supabase from '../utils/supabaseClient';

/**
 * Tạo người dùng mới trong database
 * @param {Object} userData - Thông tin người dùng (name, email, avatar_url)
 * @returns {Promise} - Kết quả từ database
 */
export const createUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Lấy thông tin người dùng theo ID
 * @param {string} userId - ID của người dùng
 * @returns {Promise} - Thông tin người dùng
 */
export const fetchUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Cập nhật thông tin người dùng
 * @param {string} userId - ID của người dùng
 * @param {Object} updatedData - Thông tin cần cập nhật
 * @returns {Promise} - Kết quả từ database
 */
export const updateUser = async (userId, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updatedData)
      .eq('id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Xác thực người dùng qua email
 * @param {string} email - Email đăng nhập
 * @param {string} password - Mật khẩu
 * @returns {Promise} - Kết quả đăng nhập
 */
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Đăng ký người dùng mới
 * @param {string} email - Email đăng ký
 * @param {string} password - Mật khẩu
 * @param {Object} userData - Thông tin người dùng
 * @returns {Promise} - Kết quả đăng ký
 */
export const signUpWithEmail = async (email, password, userData) => {
  try {
    // Đăng ký tài khoản auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) throw authError;
    
    // Tạo profile người dùng trong bảng users
    if (authData.user) {
      const newUser = {
        id: authData.user.id,
        email: email,
        name: userData.name || '',
        avatar_url: userData.avatar_url || null,
        created_at: new Date()
      };
      
      await createUser(newUser);
    }
    
    return authData;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Đăng xuất người dùng
 * @returns {Promise} - Kết quả đăng xuất
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Lấy thông tin người dùng hiện tại
 * @returns {Promise} - Thông tin người dùng hiện tại
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}; 