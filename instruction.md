# 📖 Expense Tracker - Hướng dẫn phát triển ứng dụng Web

## 🏗️ Giới thiệu
Expense Tracker là ứng dụng giúp người dùng **quản lý thu nhập & chi tiêu cá nhân**. Ứng dụng được xây dựng bằng **React.js** và sử dụng **Supabase (PostgreSQL)** làm database.

## 📌 Các chức năng chính

### **1️⃣ Quản lý giao dịch (Transactions)**
- **Lấy danh sách giao dịch**: Hiển thị danh sách thu/chi của người dùng theo thứ tự thời gian.
- **Thêm giao dịch mới**: Nhập số tiền, danh mục, ghi chú, và loại giao dịch (`income` hoặc `expense`).
- **Xóa giao dịch**: Xóa một giao dịch khỏi danh sách.
- **Chỉnh sửa giao dịch**: Cho phép cập nhật thông tin của một giao dịch đã nhập.
- **Lọc giao dịch**: Lọc theo khoảng thời gian, danh mục, hoặc loại (`income`, `expense`).
- **Thống kê tổng thu/chi**: Hiển thị tổng số tiền đã chi tiêu và thu nhập.

### **2️⃣ Quản lý danh mục giao dịch (Categories)**
- **Lấy danh sách danh mục**: Hiển thị danh sách các danh mục thu/chi mặc định.
- **Thêm danh mục mới**: Cho phép người dùng tạo danh mục thu nhập hoặc chi tiêu mới.
- **Chỉnh sửa danh mục**: Đổi tên hoặc loại (`income` hoặc `expense`) của danh mục.
- **Xóa danh mục**: Nếu danh mục bị xóa, cần đảm bảo không làm mất dữ liệu giao dịch liên quan.

### **3️⃣ Quản lý người dùng (User Management)**
- **Đăng ký người dùng mới**: Tạo user mới khi đăng ký lần đầu.
- **Lưu thông tin người dùng**: Họ tên, email, ảnh đại diện (nếu có).
- **Chỉnh sửa thông tin người dùng**: Người dùng có thể cập nhật thông tin cá nhân.
- **Liên kết giao dịch với user (`user_id`)**: Mỗi user chỉ có thể xem và thao tác trên dữ liệu của mình.
- **Xác thực đăng nhập (tùy chọn)**: Tích hợp Firebase Auth hoặc Supabase Auth để xác thực đăng nhập bằng Google hoặc Email.

### **4️⃣ Thống kê và báo cáo (Analytics & Reports)**
- **Biểu đồ thu/chi theo danh mục**: Sử dụng Chart.js để hiển thị biểu đồ tròn.
- **Thống kê theo tháng/năm**: Tính tổng số tiền thu nhập và chi tiêu trong từng khoảng thời gian.
- **So sánh thu nhập và chi tiêu**: Hiển thị báo cáo tổng quan để giúp người dùng quản lý tài chính tốt hơn.

### **5️⃣ Quản lý ngân sách (Budgets) - (Mở rộng)**
- **Đặt ngân sách cho từng danh mục**: Người dùng có thể đặt giới hạn chi tiêu cho từng danh mục (`expense`).
- **Cảnh báo khi vượt ngân sách**: Hiển thị thông báo nếu chi tiêu vượt mức đặt ra.
- **Theo dõi số tiền còn lại trong ngân sách**: Hiển thị số dư còn lại theo từng danh mục.

### **6️⃣ Cấu hình và tùy chỉnh (Settings & Preferences)**
- **Chế độ Dark Mode**: Hỗ trợ chuyển đổi giữa chế độ sáng và tối.
- **Chọn đơn vị tiền tệ**: Cho phép người dùng chọn tiền tệ hiển thị (VND, USD, EUR,...).
- **Xuất dữ liệu**: Hỗ trợ xuất báo cáo chi tiêu dưới dạng CSV hoặc PDF.
- **Lưu dữ liệu trên Cloud**: Đồng bộ hóa dữ liệu với Supabase để không bị mất khi đổi thiết bị.

## 📌 Các function chính trong code

### **Giao dịch (Transactions)**
- `fetchTransactions(userId)`: Lấy danh sách giao dịch của một người dùng.
- `addTransaction(transaction)`: Thêm một giao dịch mới vào database.
- `updateTransaction(transactionId, updatedData)`: Cập nhật thông tin của một giao dịch.
- `deleteTransaction(transactionId)`: Xóa một giao dịch khỏi database.

### **Danh mục (Categories)**
- `fetchCategories()`: Lấy danh sách danh mục thu nhập & chi tiêu.
- `addCategory(categoryData)`: Thêm danh mục mới vào database.
- `updateCategory(categoryId, updatedData)`: Cập nhật thông tin danh mục.
- `deleteCategory(categoryId)`: Xóa danh mục khỏi database.

### **Người dùng (Users)**
- `createUser(userData)`: Tạo tài khoản người dùng mới.
- `fetchUserData(userId)`: Lấy thông tin cá nhân của người dùng.
- `updateUser(userId, updatedData)`: Cập nhật thông tin cá nhân.

### **Thống kê (Analytics)**
- `calculateTotalIncome(transactions)`: Tính tổng thu nhập của user.
- `calculateTotalExpenses(transactions)`: Tính tổng chi tiêu của user.
- `generateCategoryReport(transactions)`: Phân tích giao dịch theo danh mục.

## 🎯 **Mở rộng**
- **Thêm thông báo nhắc nhở chi tiêu**: Gửi email hoặc push notification nếu chi tiêu vượt mức.
- **Tích hợp AI để phân tích chi tiêu**: Dự đoán thói quen chi tiêu dựa trên dữ liệu lịch sử.
- **Tích hợp API tỷ giá hối đoái**: Cho phép chuyển đổi tiền tệ theo thời gian thực.

