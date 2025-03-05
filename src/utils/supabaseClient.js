import { createClient } from '@supabase/supabase-js';

// Lấy thông tin kết nối từ biến môi trường
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Kiểm tra và cung cấp giá trị mặc định hoặc thông báo lỗi rõ ràng
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration!');
  console.error('Please check your .env.local file and ensure that REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY variables are properly configured.');
  throw new Error('Missing Supabase configuration. Cannot connect to Supabase.');
}

// Tạo client Supabase
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export default supabase; 