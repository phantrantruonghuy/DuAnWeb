# 🛒 DỰ ÁN WEBSITE BÁN ĐIỆN THOẠI - THEGIOIDIDONG

Website thương mại điện tử bán điện thoại di động, máy tính bảng và phụ kiện với hệ thống quản lý admin đầy đủ.

---

## ⚡ QUICK START - DOCKER (KHUYẾN NGHỊ)

```bash
# 1. Cài Docker Desktop (nếu chưa có)
# 2. Mở terminal tại thư mục DuAnWebDIDong
cd DuAnWebDIDong

# 3. Chạy Docker
docker-compose up -d --build

# 4. Đợi 30-60 giây, sau đó truy cập
# http://localhost:8080
```

**Tài khoản admin:** `admin@test.com` / `admin123`

📖 **Chi tiết:** Xem file `DOCKER_SETUP.md`  
🔧 **Gặp lỗi?** Xem file `KHAC_PHUC_LOI_DOCKER.md`

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT VỚI XAMPP (TÙY CHỌN)

### ⚡ 3 Bước Đơn Giản

**Bước 1: Copy code**
```
Copy thư mục "DuAnWebDIDong" vào C:\xampp\htdocs\
```

**Bước 2: Import database**
1. Mở phpMyAdmin: `http://localhost/phpmyadmin`
2. Import file: `database/thegioididong_full.sql`

**Bước 3: Truy cập**
- Trang chủ: `http://localhost/DuAnWebDIDong/index.html`
- Admin: `http://localhost/DuAnWebDIDong/admin-login.html`

📖 **Chi tiết:** Xem file `HUONG_DAN_CAI_DAT.md`

### 🔐 Tài Khoản Mặc Định

**Admin:**
- Email: `admin@test.com`
- Password: `admin123`

**Users (Test):**
- `nguyenvana@gmail.com` / `123456`
- `tranthib@gmail.com` / `123456`

---

## 📚 TÀI LIỆU CHI TIẾT

- **[HUONG_DAN_CAI_DAT.md](HUONG_DAN_CAI_DAT.md)** ⭐ - Hướng dẫn cài đặt chi tiết từng bước
- **[DOCKER_SETUP.md](DOCKER_SETUP.md)** - Hướng dẫn chạy với Docker
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Tài liệu API đầy đủ

---

## 🎯 TÍNH NĂNG

### 👥 Cho Khách Hàng
- ✅ Xem 25+ sản phẩm (điện thoại, tablet, phụ kiện)
- ✅ Tìm kiếm, lọc sản phẩm theo nhiều tiêu chí
- ✅ Thêm vào giỏ hàng, cập nhật số lượng
- ✅ Đặt hàng online với nhiều phương thức thanh toán
- ✅ Xem lịch sử đơn hàng, theo dõi trạng thái
- ✅ Hủy đơn hàng (khi chưa xác nhận)
- ✅ Đánh giá sản phẩm
- ✅ Quản lý tài khoản cá nhân

### 👨‍💼 Cho Admin
- ✅ **Dashboard** với biểu đồ thống kê real-time
  - Doanh thu 7 ngày
  - Đơn hàng theo trạng thái
  - Top 10 sản phẩm bán chạy
  - Sản phẩm theo thương hiệu
- ✅ **Quản lý sản phẩm** (CRUD đầy đủ)
- ✅ **Quản lý đơn hàng** (duyệt, cập nhật trạng thái, xóa)
- ✅ **Quản lý khách hàng** (xem, xóa)
- ✅ **Quản lý danh mục** (thêm, sửa, xóa)
- ✅ **Quản lý thương hiệu** (thêm, sửa, xóa)
- ✅ **Quản lý phụ kiện**
- ✅ **Quản lý voucher**

---

## 🛠️ CÔNG NGHỆ

### Frontend
- **HTML5, CSS3, JavaScript** (ES6+)
- **Bootstrap 5** - Responsive framework
- **Font Awesome 6** - Icons
- **Chart.js** - Biểu đồ thống kê
- **Swiper.js** - Image slider

### Backend
- **PHP 7.4+** - Server-side scripting
- **MySQL 5.7+** - Database
- **RESTful API** - JSON format
- **PDO & MySQLi** - Database connections

### Database
- **8 bảng chính** với quan hệ đầy đủ
- **JSON data types** cho specs và items
- **Foreign keys** và constraints
- **Indexes** tối ưu performance

---

## 📊 CẤU TRÚC DATABASE

```
thegioididong (Database)
├── products (25 sản phẩm)
│   ├── 21 điện thoại (iPhone, Samsung, Xiaomi, OPPO, Vivo, Realme)
│   ├── 3 máy tính bảng (iPad, Samsung Tab, Xiaomi Pad)
│   └── 3 phụ kiện (AirPods, Galaxy Buds, Sạc)
├── users (4 users)
│   ├── 1 admin
│   └── 3 users test
├── orders (đơn hàng)
├── reviews (đánh giá)
├── accessories (phụ kiện)
├── categories (5 danh mục)
├── brands (6 thương hiệu)
└── vouchers (3 vouchers)
```

---

## 📁 CẤU TRÚC THƯ MỤC

```
DuAnWebDIDong/
├── api/                          # RESTful API
│   ├── config.php               # Database config
│   ├── products.php             # Products API
│   ├── orders.php               # Orders API
│   ├── users.php                # Users API
│   ├── categories.php           # Categories API
│   ├── brands.php               # Brands API
│   └── reviews.php              # Reviews API
├── css/
│   └── style.css                # Main stylesheet
├── js/
│   ├── main-api.js              # Core functions (v14.0)
│   ├── admin-api.js             # Admin functions (v23.0)
│   ├── auth-api.js              # Authentication
│   ├── checkout.js              # Checkout process (v5.0)
│   ├── account.js               # Account management (v2.0)
│   └── products.js              # Product listing
├── database/
│   ├── thegioididong_full.sql   # ⭐ Full database với data
│   └── import_all_products.php  # Import script (backup)
├── images/                       # Images folder
├── index.html                    # Homepage
├── sanpham.html                  # Products page
├── chitiet.html                  # Product detail
├── giohang.html                  # Shopping cart
├── checkout.html                 # Checkout page
├── account.html                  # User account
├── admin.html                    # Admin panel
├── admin-login.html              # Admin login
├── README.md                     # ⭐ This file
├── HUONG_DAN_CAI_DAT.md         # ⭐ Installation guide
├── DOCKER_SETUP.md              # Docker guide
└── docker-compose.yml           # Docker config
```

---

## ⚙️ YÊU CẦU HỆ THỐNG

### Tối Thiểu
- **XAMPP** (hoặc WAMP/LAMP/MAMP)
- **PHP** 7.4 trở lên
- **MySQL** 5.7 trở lên
- **Apache** Web Server
- **Trình duyệt** hiện đại (Chrome, Firefox, Edge)

### Khuyến Nghị
- PHP 8.0+
- MySQL 8.0+
- RAM: 4GB+
- Disk: 500MB+

---

## 🔧 CẤU HÌNH

### Thay Đổi Port MySQL

Nếu MySQL chạy port khác 3306, sửa file `api/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_PORT', '3307');  // ← Đổi port ở đây
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'thegioididong');
```

### Thay Đổi Password MySQL

```php
define('DB_PASS', 'your_password');  // ← Nhập password
```

### API Base URL

File `js/main-api.js` tự động detect, hoặc sửa thủ công:

```javascript
const API_BASE_URL = 'http://localhost/DuAnWebDIDong/api';
```

---

## 🐳 CHẠY VỚI DOCKER

```bash
cd DuAnWebDIDong
docker-compose up -d --build
```

**Truy cập:**
- Website: `http://localhost:8080`
- Database: `localhost:3307`

Chi tiết xem [DOCKER_SETUP.md](DOCKER_SETUP.md)

---

## 🎓 HƯỚNG DẪN SỬ DỤNG

### Đăng Ký Tài Khoản
1. Click "Đăng nhập" → "Đăng ký"
2. Điền thông tin (email, phone phải unique)
3. Click "Đăng ký"

### Mua Hàng
1. Xem sản phẩm → Click "Thêm vào giỏ"
2. Vào "Giỏ hàng" → Cập nhật số lượng
3. Click "Thanh toán"
4. Điền thông tin giao hàng
5. Chọn phương thức thanh toán
6. Click "Đặt hàng"

### Quản Lý Admin
1. Đăng nhập: `admin-login.html`
2. **Dashboard**: Xem thống kê, biểu đồ
3. **Sản phẩm**: Thêm/sửa/xóa sản phẩm
4. **Đơn hàng**: Duyệt đơn, cập nhật trạng thái
5. **Khách hàng**: Xem danh sách, xóa user

---

## 🆘 TROUBLESHOOTING

### ❌ Không kết nối được database

**Nguyên nhân:** Port hoặc password không đúng

**Giải pháp:**
1. Kiểm tra MySQL đã start trong XAMPP
2. Kiểm tra port: phpMyAdmin → góc trên phải
3. Sửa `api/config.php` cho đúng port
4. Kiểm tra password MySQL

### ❌ Trang không hiển thị sản phẩm

**Nguyên nhân:** Database chưa import hoặc API lỗi

**Giải pháp:**
1. Import file `database/thegioididong_full.sql`
2. Mở Console (F12) xem lỗi
3. Test API: `http://localhost/DuAnWebDIDong/api/products.php`
4. Clear cache (Ctrl + Shift + Delete)

### ❌ Lỗi 404 Not Found

**Nguyên nhân:** Đường dẫn không đúng

**Giải pháp:**
1. Kiểm tra thư mục trong `htdocs`
2. Truy cập: `http://localhost/DuAnWebDIDong/index.html`
3. Kiểm tra Apache đã start

### ❌ Admin không thấy đơn hàng

**Nguyên nhân:** Đơn hàng cũ từ LocalStorage

**Giải pháp:**
- Chỉ đơn hàng mới (đặt qua API) mới hiển thị
- Đơn hàng cũ từ LocalStorage không được lưu vào database

Chi tiết xem [HUONG_DAN_CAI_DAT.md](HUONG_DAN_CAI_DAT.md)

---

## 📝 GHI CHÚ QUAN TRỌNG

- ✅ Database đã bao gồm **25 sản phẩm mẫu**
- ✅ Tất cả hình ảnh sử dụng **CDN** (không cần download)
- ✅ API sử dụng **JSON format**
- ✅ Hỗ trợ **responsive design** (mobile, tablet, desktop)
- ✅ Tương thích với **các trình duyệt hiện đại**
- ⚠️ Đơn hàng cũ từ LocalStorage **không** hiển thị trong admin
- ⚠️ Chỉ đơn hàng mới (qua API) mới được lưu vào database

---

## 🎁 TÍNH NĂNG NỔI BẬT

### 🔥 Hot Features
- **Real-time Dashboard** với Chart.js
- **RESTful API** chuẩn JSON
- **Responsive Design** 100%
- **Shopping Cart** với LocalStorage
- **Order Management** đầy đủ
- **User Authentication** an toàn
- **Admin Panel** mạnh mẽ

### 🎨 UI/UX
- Giao diện hiện đại, thân thiện
- Animations mượt mà
- Loading states
- Notifications
- Breadcrumb navigation
- Back to top button

---

## 📞 HỖ TRỢ

### Tài Liệu
- [HUONG_DAN_CAI_DAT.md](HUONG_DAN_CAI_DAT.md) - Cài đặt chi tiết
- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Docker guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API docs

### Liên Hệ
- **Email**: info@thegioididong.com
- **Hotline**: 1800.6789

---

## 📄 LICENSE

Dự án học tập - Sử dụng tự do cho mục đích giáo dục.

---

## 🎉 HOÀN TẤT!

**Checklist trước khi chuyển giao:**
- ✅ Code đã copy vào htdocs
- ✅ Database đã import
- ✅ Config đã cấu hình đúng
- ✅ Website chạy thành công
- ✅ Admin panel hoạt động
- ✅ Đặt hàng thành công

**Truy cập:**
- 🏠 Trang chủ: `http://localhost/DuAnWebDIDong/index.html`
- 👨‍💼 Admin: `http://localhost/DuAnWebDIDong/admin-login.html`

---

**Phát triển bởi:** Thế Giới Di Động Team  
**Năm:** 2025  
**Phiên bản:** 2.0 (API-based with MySQL)  
**Made with ❤️ in Vietnam** 🇻🇳
