# Ứng dụng Quản lý Chi tiêu

Ứng dụng đơn giản giúp theo dõi thu nhập và chi tiêu cá nhân.

## Tính năng

- Quản lý thu nhập và chi tiêu
- Phân loại giao dịch theo danh mục
- Xem lịch sử giao dịch
- Thống kê chi tiêu theo thời gian

## Cài đặt

### Yêu cầu

- Node.js (v14 trở lên)
- npm hoặc yarn
- Supabase account (miễn phí)

### Các bước cài đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/expense-tracker-app.git
cd expense-tracker-app
```

2. Cài đặt các dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo project trên Supabase:
   - Đăng ký tài khoản tại [supabase.com](https://supabase.com)
   - Tạo project mới
   - Lấy URL và anon key từ project settings

4. Cấu hình Supabase:
   - Tạo file `.env.local` tại thư mục gốc của project
   - Thêm các biến môi trường:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. Thiết lập database:
   - Mở SQL Editor trong Supabase dashboard
   - Chạy script SQL từ file `database/simple_schema.sql`

6. Khởi chạy ứng dụng:
```bash
npm start
# hoặc
yarn start
```

## Cấu trúc dự án

```
expense-tracker-app/
├── database/                # SQL scripts
│   └── simple_schema.sql    # Database schema
├── public/                  # Static files
├── src/
│   ├── components/          # React components
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application
│   └── index.js             # Entry point
└── package.json             # Dependencies
```

## Cấu trúc database

### Bảng `users`
- `id`: ID người dùng (primary key)
- `name`: Tên người dùng
- `email`: Email (unique)
- `created_at`: Thời gian tạo

### Bảng `categories`
- `id`: ID danh mục (primary key)
- `name`: Tên danh mục
- `type`: Loại danh mục ('income' hoặc 'expense')
- `created_at`: Thời gian tạo

### Bảng `transactions`
- `id`: ID giao dịch (primary key)
- `user_id`: ID người dùng (foreign key)
- `category_id`: ID danh mục (foreign key)
- `amount`: Số tiền
- `type`: Loại giao dịch ('income' hoặc 'expense')
- `note`: Ghi chú
- `created_at`: Thời gian tạo

## Hướng dẫn sử dụng

1. Chọn người dùng từ dropdown
2. Nhấn nút "Thêm giao dịch mới" để tạo giao dịch
3. Điền thông tin giao dịch và lưu
4. Xem danh sách giao dịch ở phía dưới

## Phát triển

### Thêm tính năng mới

1. Thêm chức năng lọc và tìm kiếm giao dịch
2. Thêm biểu đồ thống kê
3. Thêm chức năng xuất báo cáo

### Cải thiện hiệu suất

1. Thêm phân trang cho danh sách giao dịch
2. Tối ưu hóa các truy vấn database

## Giấy phép

MIT
