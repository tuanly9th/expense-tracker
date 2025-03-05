-- Tạo ENUM cho cột type
CREATE TYPE transaction_type AS ENUM ('income', 'expense');

-- Bảng users (Người dùng)
-- Assume the table already exists, so we're altering it
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS email VARCHAR(255) UNIQUE,
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Trigger để tự động cập nhật thời gian khi update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists before creating it
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Bảng categories (Danh mục thu/chi)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  user_id UUID REFERENCES users(id),
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

-- Cập nhật bảng transactions để liên kết với user
ALTER TABLE transactions ADD COLUMN user_id UUID REFERENCES users(id);

-- Cập nhật bảng categories để liên kết với user (nếu muốn mỗi user có danh mục riêng)
ALTER TABLE categories ADD COLUMN user_id UUID REFERENCES users(id);