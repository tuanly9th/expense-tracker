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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type transaction_type NOT NULL  -- Chỉ có thể là 'income' hoặc 'expense'
);

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