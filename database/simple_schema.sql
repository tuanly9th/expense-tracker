-- Tạo bảng users (đơn giản, không cần authentication phức tạp)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tạo bảng categories (danh mục thu/chi)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Thêm một số danh mục mặc định
INSERT INTO categories (name, type) VALUES
  ('Lương', 'income'),
  ('Thưởng', 'income'),
  ('Đầu tư', 'income'),
  ('Quà tặng', 'income'),
  ('Ăn uống', 'expense'),
  ('Di chuyển', 'expense'),
  ('Mua sắm', 'expense'),
  ('Giải trí', 'expense'),
  ('Hóa đơn', 'expense'),
  ('Sức khỏe', 'expense'),
  ('Giáo dục', 'expense'),
  ('Khác', 'expense');

-- Tạo bảng transactions (giao dịch)
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES categories(id),
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tạo index để tăng tốc truy vấn
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Thêm một số dữ liệu mẫu cho users
INSERT INTO users (name, email) VALUES
  ('Nguyễn Văn A', 'nguyenvana@example.com'),
  ('Trần Thị B', 'tranthib@example.com');

-- Thêm một số giao dịch mẫu
INSERT INTO transactions (user_id, category_id, amount, type, note) VALUES
  (1, 1, 10000000, 'income', 'Lương tháng 5'),
  (1, 5, 200000, 'expense', 'Ăn trưa'),
  (1, 8, 500000, 'expense', 'Xem phim cuối tuần'),
  (2, 2, 5000000, 'income', 'Thưởng dự án'),
  (2, 7, 2000000, 'expense', 'Mua quần áo'); 