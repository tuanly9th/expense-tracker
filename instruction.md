# 📖 Expense Tracker - Hướng dẫn phát triển ứng dụng Web

## 🏗️ Giới thiệu

Expense Tracker là ứng dụng giúp người dùng **quản lý thu nhập & chi tiêu cá nhân**. Ứng dụng được xây dựng bằng **React.js** và sử dụng **Supabase (PostgreSQL)** làm database.

## 📌 Các bước phát triển ứng dụng

### **1️⃣ Thiết lập môi trường**

#### Cài đặt project React

```sh
npx create-react-app expense-tracker
cd expense-tracker
npm install
```

#### Cài đặt các thư viện cần thiết

```sh
npm install @supabase/supabase-js react-router-dom tailwindcss postcss autoprefixer zustand chart.js
```

#### Cấu hình Tailwind CSS

```sh
npx tailwindcss init -p
```

Cập nhật ``:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

Cập nhật ``:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### **2️⃣ Kết nối với Supabase**

#### Cấu hình Supabase trong ``

- Kết nối với Supabase bằng `createClient`.
- Xuất các function để gọi database: `fetchTransactions`, `addTransaction`, `deleteTransaction`, `createUser`, `fetchUserData`.

#### Thiết lập biến môi trường `.env.local`

- Tạo file `.env.local` trong thư mục gốc của dự án.
- Thêm các biến môi trường sau:
  ```env
  REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
  REACT_APP_SUPABASE_ANON_KEY=your-anon-key
  ```
- Thêm `.env.local` vào `.gitignore` để tránh lộ API Key.
- Khởi động lại server để load biến môi trường.

#### Cấu hình biến môi trường trên Netlify khi deploy

1. Vào **Netlify Dashboard**.
2. Chọn **Settings** → **Environment Variables**.
3. Thêm các biến môi trường:
   - `REACT_APP_SUPABASE_URL`: `https://your-project-id.supabase.co`
   - `REACT_APP_SUPABASE_ANON_KEY`: `your-anon-key`
4. Nhấn **Save** và **Redeploy ứng dụng** để áp dụng thay đổi.

---

### **3️⃣ Xây dựng cấu trúc dự án**

#### **📂 Cấu trúc thư mục dự án**

```
expense-tracker/
│── public/
│── src/
│   ├── components/         # Các thành phần UI (Form, List, Navbar...)
│   ├── pages/              # Các trang chính (Dashboard, Settings, User Profile)
│   ├── api/                # Gọi API Supabase
│   ├── store/              # Quản lý trạng thái (Zustand)
│   ├── assets/             # Ảnh, icons...
│   ├── App.js              # Entry point React
│   ├── index.js            # Render React App
│── tailwind.config.js      # Cấu hình Tailwind
│── package.json            # Thông tin package
│── README.md
```

#### **Các function chính cần thực hiện**

- ``: Lấy danh sách giao dịch của user từ Supabase.
- ``: Thêm giao dịch mới vào database.
- ``: Xóa giao dịch khỏi database.
- ``: Lấy danh sách danh mục thu/chi.
- ``: Tạo thông tin người dùng mới.
- ``: Lấy thông tin người dùng từ Supabase.

---

### **4️⃣ Chức năng quản lý người dùng**

- **Đăng ký người dùng mới**: Tạo user mới khi đăng ký lần đầu.
- **Lưu thông tin người dùng**: Họ tên, email, ảnh đại diện (nếu có).
- **Chỉnh sửa thông tin người dùng**.
- **Liên kết giao dịch với user (**``**\*\*\*\*\*\*\*\*)** để mỗi user chỉ xem dữ liệu của mình.



---

## 🎯 **Mở rộng**

- **Thêm biểu đồ thống kê thu/chi** với Chart.js.
- **Thêm tính năng lọc giao dịch theo ngày / danh mục.**

💡 **Bạn có cần hướng dẫn chi tiết hơn về phần nào không?** 🚀

