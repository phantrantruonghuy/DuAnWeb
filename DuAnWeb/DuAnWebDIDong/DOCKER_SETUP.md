# 🐳 HƯỚNG DẪN TRIỂN KHAI DỰ ÁN VỚI DOCKER

## 📋 YÊU CẦU HỆ THỐNG

- Docker Desktop (Windows/Mac) hoặc Docker Engine (Linux)
- 2GB RAM trống
- 5GB dung lượng ổ cứng

---

## 🚀 CÀI ĐẶT DOCKER

### Windows:
1. Tải Docker Desktop: https://www.docker.com/products/docker-desktop
2. Cài đặt và khởi động Docker Desktop
3. Đảm bảo WSL 2 đã được cài đặt

### Mac:
1. Tải Docker Desktop: https://www.docker.com/products/docker-desktop
2. Cài đặt và khởi động Docker Desktop

### Linux:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
```

---

## 📦 TRIỂN KHAI DỰ ÁN

### Bước 1: Chuẩn bị
```bash
# Di chuyển vào thư mục dự án
cd DuAnWebDIDong
```

### Bước 2: Build và chạy Docker
```bash
docker-compose up -d --build
```

Lệnh này sẽ:
- Build Docker image với PHP 8.1 + Apache
- Tạo MySQL container
- Import database tự động từ `database/thegioididong_full.sql`
- Khởi động web server trên port 8080

### Bước 3: Đợi database import (30-60 giây)
```bash
# Xem logs để theo dõi quá trình import
docker-compose logs -f db
```

Khi thấy dòng này là đã xong:
```
MySQL init process done. Ready for start up.
```

### Bước 4: Truy cập website
```
http://localhost:8080
```

---

## 🔐 TÀI KHOẢN MẶC ĐỊNH

### Admin:
- Email: `admin@test.com`
- Password: `admin123`
- Truy cập: http://localhost:8080/admin-login.html

### User test:
- Email: `user1@test.com` / Password: `123456`
- Email: `user2@test.com` / Password: `123456`
- Email: `user3@test.com` / Password: `123456`

---

## 🛠️ CÁC LỆNH DOCKER HỮU ÍCH

### Quản lý container:
```bash
# Xem container đang chạy
docker-compose ps

# Dừng container
docker-compose stop

# Khởi động lại
docker-compose start

# Dừng và xóa container
docker-compose down

# Rebuild khi có thay đổi code
docker-compose up -d --build
```

### Xem logs:
```bash
# Logs web server
docker-compose logs -f web

# Logs database
docker-compose logs -f db

# Logs tất cả
docker-compose logs -f
```

### Truy cập container:
```bash
# Vào terminal của web container
docker-compose exec web bash

# Vào MySQL
docker-compose exec db mysql -u root -p
# Password: root123
```

---

## 🔧 CẤU HÌNH

### Thay đổi port web (nếu 8080 bị chiếm):
Sửa file `docker-compose.yml`:
```yaml
services:
  web:
    ports:
      - "8081:80"  # Đổi 8080 thành 8081
```

### Thay đổi port MySQL (nếu 3307 bị chiếm):
```yaml
services:
  db:
    ports:
      - "3308:3306"  # Đổi 3307 thành 3308
```

Sau khi sửa, chạy lại:
```bash
docker-compose down
docker-compose up -d
```

---

## 🐛 KHẮC PHỤC LỖI

### Lỗi: Port already allocated
**Nguyên nhân:** Port 8080 hoặc 3307 đã được sử dụng

**Giải pháp:** Đổi port trong `docker-compose.yml` (xem phần Cấu hình)

### Lỗi: Cannot connect to database
**Nguyên nhân:** Database chưa import xong

**Giải pháp:**
```bash
# Xem logs database
docker-compose logs db

# Nếu cần reset database
docker-compose down -v
docker-compose up -d --build
```

### Lỗi: ERR_CONNECTION_REFUSED khi đăng ký/đăng nhập
**Nguyên nhân:** File `api/auth.php` chưa có trong container

**Giải pháp:**
```bash
# Rebuild Docker image
docker-compose down
docker-compose up -d --build
```

### Lỗi: 404 Not Found cho API
**Kiểm tra:** File API có tồn tại trong container không
```bash
docker-compose exec web ls -la /var/www/html/api/
```

**Giải pháp:** Rebuild nếu thiếu file
```bash
docker-compose down
docker-compose up -d --build
```

---

## 📊 KIỂM TRA HỆ THỐNG

### Test API endpoints:
```bash
# Test products API
curl http://localhost:8080/api/products.php?action=getAll

# Test auth API
curl http://localhost:8080/api/auth.php

# Test categories API
curl http://localhost:8080/api/categories.php?action=getAll
```

### Kiểm tra database:
```bash
# Vào MySQL
docker-compose exec db mysql -u root -proot123

# Trong MySQL shell
USE thegioididong;
SHOW TABLES;
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM users;
```

---

## 🔄 RESET DỰ ÁN

### Reset hoàn toàn (xóa database):
```bash
docker-compose down -v
docker-compose up -d --build
```

### Chỉ rebuild code (giữ database):
```bash
docker-compose down
docker-compose up -d --build
```

---

## 📦 TRIỂN KHAI TRÊN MÁY KHÁC

### Bước 1: Copy dự án
Copy toàn bộ thư mục `DuAnWebDIDong` sang máy mới

### Bước 2: Cài Docker Desktop
Tải và cài đặt Docker Desktop trên máy mới

### Bước 3: Chạy Docker
```bash
cd DuAnWebDIDong
docker-compose up -d --build
```

### Bước 4: Đợi và truy cập
Đợi 30-60 giây, sau đó truy cập `http://localhost:8080`

**LƯU Ý:** Không cần cài XAMPP, PHP, MySQL. Docker đã bao gồm tất cả!

---

## 🎯 CẤU TRÚC DOCKER

### Services:
1. **web** - Apache + PHP 8.1
   - Port: 8080 → 80
   - Document root: `/var/www/html`
   - Extensions: mysqli, pdo_mysql

2. **db** - MySQL 8.0
   - Port: 3307 → 3306
   - Database: `thegioididong`
   - User: `root` / Password: `root123`
   - Auto-import: `database/thegioididong_full.sql`

### Volumes:
- `db_data`: Lưu trữ database (persistent)

### Networks:
- `app-network`: Kết nối giữa web và db

---

## 💡 LƯU Ý QUAN TRỌNG

1. **Luôn rebuild khi có file mới:** Mỗi khi thêm/sửa file PHP, chạy `docker-compose up -d --build`
2. **Database persistence:** Data được lưu trong Docker volume, không mất khi restart
3. **Port conflict:** Nếu port bị chiếm, đổi sang port khác trong `docker-compose.yml`
4. **Logs là bạn:** Khi có lỗi, luôn kiểm tra logs trước: `docker-compose logs`

---

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. Kiểm tra Docker Desktop có đang chạy không
2. Xem logs: `docker-compose logs`
3. Kiểm tra port conflict
4. Thử rebuild: `docker-compose down && docker-compose up -d --build`
5. Xem file `KHAC_PHUC_LOI_DOCKER.md` để biết thêm chi tiết

---

## 🎉 HOÀN TẤT

Dự án đã sẵn sàng! Truy cập:
- **Website:** http://localhost:8080
- **Admin:** http://localhost:8080/admin-login.html
- **phpMyAdmin:** Có thể thêm service trong `docker-compose.yml` nếu cần
