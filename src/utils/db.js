// Kết nối với Supabase (đơn giản, không cần authentication phức tạp)
import { createClient } from '@supabase/supabase-js';

// Thay thế bằng URL và anon key của bạn từ Supabase
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 