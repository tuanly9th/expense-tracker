-- Tạo ENUM cho cột type
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- Bảng users (Người dùng)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Bảng categories (Danh mục thu/chi)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Đảm bảo tên danh mục không trùng lặp cho mỗi người dùng
  UNIQUE(name, user_id)
);

-- Thêm một số danh mục mặc định
INSERT INTO categories (name, type, user_id) VALUES
  ('Lương', 'income', NULL),
  ('Thưởng', 'income', NULL),
  ('Đầu tư', 'income', NULL),
  ('Quà tặng', 'income', NULL),
  ('Ăn uống', 'expense', NULL),
  ('Di chuyển', 'expense', NULL),
  ('Mua sắm', 'expense', NULL),
  ('Giải trí', 'expense', NULL),
  ('Hóa đơn', 'expense', NULL),
  ('Sức khỏe', 'expense', NULL),
  ('Giáo dục', 'expense', NULL),
  ('Khác', 'expense', NULL);

-- Tạo policy để bảo mật dữ liệu
CREATE POLICY "Người dùng có thể xem danh mục mặc định và danh mục của họ" 
  ON categories FOR SELECT 
  USING (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Người dùng chỉ có thể thêm danh mục cho chính họ" 
  ON categories FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Người dùng chỉ có thể cập nhật danh mục của họ" 
  ON categories FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Người dùng chỉ có thể xóa danh mục của họ" 
  ON categories FOR DELETE 
  USING (user_id = auth.uid());

-- Bảng transactions (Giao dịch)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- Liên kết với users
  type transaction_type NOT NULL,  -- Chỉ có 'income' hoặc 'expense'
  amount DECIMAL(10,2) NOT NULL,   -- Số tiền (tối đa 10 số, 2 số thập phân)
  category_id UUID REFERENCES categories(id), -- Liên kết danh mục
  note TEXT,  -- Ghi chú thêm (nếu có)
  created_at TIMESTAMP DEFAULT now()
);