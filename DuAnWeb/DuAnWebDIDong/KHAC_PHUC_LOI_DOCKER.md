# 🔧 KHẮC PHỤC LỖI DOCKER - ERR_CONNECTION_REFUSED

## ❌ Lỗi: `ERR_CONNECTION_REFUSED` khi đăng ký/đăng nhập

### Nguyên nhân:
1. File `api/auth.php` mới được tạo **CHƯA có trong Docker container**
2. Docker container đang chạy image cũ (không có auth.php)
3. Cần rebuild Docker image để bao gồm file mới

---

## ✅ GIẢI PHÁP - REBUILD DOCKER

### Bước 1: Dừng và xóa container cũ
```bash
docker-compose down
```

### Bước 2: Rebuild image với file mới
```bash
docker-compose up -d --build
```

Lệnh này sẽ:
- Build lại Docker image với tất cả file mới (bao gồm `api/auth.php`)
- Tạo và chạy container mới
- Import database tự động

### Bước 3: Kiểm tra container đang chạy
```bash
docker-compose ps
```

Kết quả mong đợi:
```
NAME                          STATUS
duanwebdidong-web-1          Up
duanwebdidong-db-1           Up
```

### Bước 4: Kiểm tra logs nếu có lỗi
```bash
docker-compose logs web
docker-compose logs db
```

---

## 🧪 KIỂM TRA API

### Test API trực tiếp trong trình duyệt:

1. **Test auth.php có hoạt động không:**
   ```
   http://localhost:8080/api/auth.php
   ```
   Kết quả: `{"success":false,"message":"Action không hợp lệ"}`

2. **Test đăng ký (dùng Postman hoặc curl):**
   ```bash
   curl -X POST http://localhost:8080/api/auth.php?action=register \
   -H "Content-Type: application/json" \
   -d '{"name":"Test User","email":"test@test.com","phone":"0901234567","password":"123456"}'
   ```

3. **Test đăng nhập:**
   ```bash
   curl -X POST http://localhost:8080/api/auth.php?action=login \
   -H "Content-Type: application/json" \
   -d '{"username":"admin@test.com","password":"admin123"}'
   ```

---

## 🔍 CÁC LỖI THƯỜNG GẶP

### 1. Port 8080 đã được sử dụng
**Lỗi:** `Bind for 0.0.0.0:8080 failed: port is already allocated`

**Giải pháp:** Sửa port trong `docker-compose.yml`
```yaml
services:
  web:
    ports:
      - "8081:80"  # Đổi từ 8080 sang 8081
```

Sau đó truy cập: `http://localhost:8081`

### 2. Port 3307 đã được sử dụng
**Lỗi:** `Bind for 0.0.0.0:3307 failed: port is already allocated`

**Giải pháp:** Sửa port MySQL trong `docker-compose.yml`
```yaml
services:
  db:
    ports:
      - "3308:3306"  # Đổi từ 3307 sang 3308
```

### 3. Database chưa được import
**Triệu chứng:** Không thể đăng nhập, không có sản phẩm

**Giải pháp:**
```bash
# Xóa volume cũ và rebuild
docker-compose down -v
docker-compose up -d --build
```

### 4. File auth.php không tồn tại trong container
**Kiểm tra:**
```bash
docker-compose exec web ls -la /var/www/html/api/
```

Nếu không thấy `auth.php`, cần rebuild:
```bash
docker-compose down
docker-compose up -d --build
```

---

## 📋 CHECKLIST TRIỂN KHAI TRÊN MÁY KHÁC

Khi chuyển dự án sang máy khác:

- [ ] Copy toàn bộ thư mục `DuAnWebDIDong`
- [ ] Đảm bảo có Docker Desktop đã cài đặt và đang chạy
- [ ] Mở terminal tại thư mục `DuAnWebDIDong`
- [ ] Chạy: `docker-compose up -d --build`
- [ ] Đợi 30-60 giây để database import xong
- [ ] Truy cập: `http://localhost:8080`
- [ ] Test đăng nhập với: `admin@test.com` / `admin123`

---

## 🚀 LỆNH DOCKER HỮU ÍCH

```bash
# Xem container đang chạy
docker-compose ps

# Xem logs
docker-compose logs -f web
docker-compose logs -f db

# Restart container
docker-compose restart

# Dừng container
docker-compose stop

# Dừng và xóa container
docker-compose down

# Dừng, xóa container và volume (xóa database)
docker-compose down -v

# Rebuild và chạy lại
docker-compose up -d --build

# Vào terminal của container
docker-compose exec web bash
docker-compose exec db bash

# Xem resource usage
docker stats
```

---

## 💡 LƯU Ý QUAN TRỌNG

1. **Luôn rebuild khi có file mới:** Mỗi khi thêm/sửa file PHP, cần rebuild Docker
2. **Port conflict:** Nếu port 8080 hoặc 3307 bị chiếm, đổi sang port khác
3. **Database persistence:** Data được lưu trong Docker volume, không mất khi restart
4. **Xóa volume:** Chỉ dùng `docker-compose down -v` khi muốn reset database hoàn toàn

---

## 📞 HỖ TRỢ

Nếu vẫn gặp lỗi, kiểm tra:
1. Docker Desktop có đang chạy không?
2. Port 8080 và 3307 có bị chiếm không?
3. File `api/auth.php` có tồn tại không?
4. Logs có báo lỗi gì không? (`docker-compose logs`)
