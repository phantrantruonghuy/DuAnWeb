# 📖 HƯỚNG DẪN CÀI ĐẶT DỰ ÁN - THEGIOIDIDONG

## 🎯 Yêu Cầu Hệ Thống

- **XAMPP** (hoặc WAMP/LAMP)
  - PHP 7.4 trở lên
  - MySQL 5.7 trở lên
  - Apache Web Server
- **Trình duyệt**: Chrome, Firefox, Edge (phiên bản mới nhất)

---

## 📦 BƯỚC 1: COPY CODE

### 1.1. Copy thư mục dự án
```
Copy thư mục "DuAnWebDIDong" vào:
- Windows: C:\xampp\htdocs\
- Mac/Linux: /Applications/XAMPP/htdocs/
```

### 1.2. Cấu trúc thư mục sau khi copy
```
C:\xampp\htdocs\DuAnWebDIDong\
├── api/
├── css/
├── database/
├── images/
├── js/
├── index.html
├── admin.html
└── ...
```

---

## 🗄️ BƯỚC 2: TẠO DATABASE

### 2.1. Khởi động XAMPP
1. Mở **XAMPP Control Panel**
2. Start **Apache**
3. Start **MySQL**

### 2.2. Tạo Database
**Cách 1: Qua phpMyAdmin (Khuyến nghị)**
1. Mở trình duyệt, truy cập: `http://localhost/phpmyadmin`
2. Click tab **"Import"**
3. Click **"Choose File"**
4. Chọn file: `DuAnWebDIDong/database/thegioididong_full.sql`
5. Click **"Go"** (Import)
6. Đợi đến khi thấy thông báo **"Import has been successfully finished"**

**Cách 2: Qua Command Line**
```bash
# Mở Command Prompt/Terminal
cd C:\xampp\mysql\bin

# Import database
mysql -u root -p < C:\xampp\htdocs\DuAnWebDIDong\database\thegioididong_full.sql

# Nhập password (mặc định để trống, nhấn Enter)
```

### 2.3. Kiểm tra Database
1. Vào phpMyAdmin: `http://localhost/phpmyadmin`
2. Click database **"thegioididong"** bên trái
3. Kiểm tra các bảng:
   - ✅ products (25 sản phẩm)
   - ✅ users (4 users: 1 admin + 3 users)
   - ✅ categories (5 danh mục)
   - ✅ brands (6 thương hiệu)
   - ✅ orders
   - ✅ reviews
   - ✅ accessories
   - ✅ vouchers

---

## ⚙️ BƯỚC 3: CẤU HÌNH KẾT NỐI DATABASE

### 3.1. Kiểm tra Port MySQL

**Cách 1: Qua XAMPP Control Panel**
- Nhìn vào dòng MySQL, sẽ thấy port (thường là 3306 hoặc 3307)

**Cách 2: Qua phpMyAdmin**
1. Vào `http://localhost/phpmyadmin`
2. Nhìn góc trên bên phải, sẽ thấy: `Server: localhost:3306` (hoặc 3307)

### 3.2. Sửa File Config

Mở file: `DuAnWebDIDong/api/config.php`

**Nếu MySQL chạy port 3306 (mặc định):**
```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');  // ← Port mặc định
define('DB_USER', 'root');
define('DB_PASS', '');      // ← Để trống nếu không có password
define('DB_NAME', 'thegioididong');
```

**Nếu MySQL chạy port 3307:**
```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3307');  // ← Đổi thành 3307
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'thegioididong');
```

**Nếu có password MySQL:**
```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_USER', 'root');
define('DB_PASS', 'your_password_here');  // ← Nhập password
define('DB_NAME', 'thegioididong');
```

### 3.3. Lưu file và đóng

---

## 🚀 BƯỚC 4: CHẠY DỰ ÁN

### 4.1. Truy cập Website

**Trang chủ:**
```
http://localhost/DuAnWebDIDong/index.html
```

**Trang Admin:**
```
http://localhost/DuAnWebDIDong/admin-login.html
```

### 4.2. Đăng nhập Admin

- **Email**: `admin@thegioididong.com`
- **Password**: `admin123`

### 4.3. Đăng nhập User (Test)

Có 3 tài khoản user mẫu:
- **Email**: `nguyenvana@gmail.com` | **Password**: `123456`
- **Email**: `tranthib@gmail.com` | **Password**: `123456`
- **Email**: `levanc@gmail.com` | **Password**: `123456`

---

## 🔧 TROUBLESHOOTING (Xử Lý Lỗi)

### ❌ Lỗi: "Không thể kết nối database"

**Nguyên nhân:** Port hoặc password không đúng

**Giải pháp:**
1. Kiểm tra MySQL đang chạy trong XAMPP
2. Kiểm tra port MySQL (3306 hoặc 3307)
3. Sửa file `api/config.php` cho đúng port
4. Kiểm tra password MySQL (thường để trống)

### ❌ Lỗi: "Access denied for user 'root'@'localhost'"

**Nguyên nhân:** Password MySQL không đúng

**Giải pháp:**
1. Mở phpMyAdmin
2. Vào tab "User accounts"
3. Kiểm tra password của user `root`
4. Cập nhật `DB_PASS` trong `api/config.php`

### ❌ Lỗi: "Database 'thegioididong' not found"

**Nguyên nhân:** Chưa import database

**Giải pháp:**
1. Vào phpMyAdmin: `http://localhost/phpmyadmin`
2. Import file `database/thegioididong_full.sql`

### ❌ Lỗi: "404 Not Found" khi truy cập

**Nguyên nhân:** Đường dẫn không đúng

**Giải pháp:**
1. Kiểm tra thư mục đã copy đúng vào `htdocs`
2. Truy cập: `http://localhost/DuAnWebDIDong/index.html`
3. Nếu vẫn lỗi, kiểm tra Apache đã start trong XAMPP

### ❌ Lỗi: "API không hoạt động"

**Nguyên nhân:** Apache hoặc MySQL chưa start

**Giải pháp:**
1. Mở XAMPP Control Panel
2. Start Apache
3. Start MySQL
4. Refresh trang web

---

## 📝 THÔNG TIN QUAN TRỌNG

### Tài Khoản Mặc Định

**Admin:**
- Email: `admin@thegioididong.com`
- Password: `admin123`
- Role: `admin`

**Users (Test):**
- `nguyenvana@gmail.com` / `123456`
- `tranthib@gmail.com` / `123456`
- `levanc@gmail.com` / `123456`

### Database Info

- **Database Name**: `thegioididong`
- **Host**: `localhost`
- **Port**: `3306` hoặc `3307` (tùy máy)
- **User**: `root`
- **Password**: (thường để trống)

### Dữ Liệu Mẫu

- **25 sản phẩm** (điện thoại, tablet, phụ kiện)
- **4 users** (1 admin + 3 users)
- **5 categories**
- **6 brands**
- **3 vouchers**

---

## 🎓 HƯỚNG DẪN SỬ DỤNG

### Cho User (Khách hàng)

1. **Đăng ký tài khoản**: Click "Đăng nhập" → "Đăng ký"
2. **Xem sản phẩm**: Trang chủ hoặc "Sản phẩm"
3. **Thêm vào giỏ hàng**: Click nút "Thêm vào giỏ"
4. **Đặt hàng**: Vào "Giỏ hàng" → "Thanh toán"
5. **Xem đơn hàng**: Click tên user → "Đơn hàng của tôi"

### Cho Admin

1. **Đăng nhập**: `admin-login.html`
2. **Dashboard**: Xem thống kê, biểu đồ
3. **Quản lý sản phẩm**: Thêm/sửa/xóa sản phẩm
4. **Quản lý đơn hàng**: Duyệt đơn, cập nhật trạng thái
5. **Quản lý khách hàng**: Xem danh sách khách hàng
6. **Quản lý danh mục/thương hiệu**: Thêm/sửa/xóa

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề, kiểm tra:
1. ✅ XAMPP Apache và MySQL đã start
2. ✅ Database đã import thành công
3. ✅ File `api/config.php` đã cấu hình đúng port
4. ✅ Truy cập đúng URL: `http://localhost/DuAnWebDIDong/`

---

## 🎉 HOÀN TẤT!

Dự án đã sẵn sàng sử dụng!

**Checklist:**
- ✅ XAMPP đã cài đặt và chạy
- ✅ Code đã copy vào htdocs
- ✅ Database đã import
- ✅ Config đã cấu hình đúng
- ✅ Website chạy thành công

**Truy cập:**
- 🏠 Trang chủ: `http://localhost/DuAnWebDIDong/index.html`
- 👨‍💼 Admin: `http://localhost/DuAnWebDIDong/admin-login.html`
