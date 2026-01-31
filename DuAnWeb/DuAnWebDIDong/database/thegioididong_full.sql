-- =====================================================
-- THEGIOIDIDONG DATABASE - FULL SETUP WITH SAMPLE DATA
-- =====================================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS thegioididong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE thegioididong;

-- =====================================================
-- TABLES
-- =====================================================

-- Bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    oldPrice INT,
    discount INT DEFAULT 0,
    image TEXT,
    category VARCHAR(50) DEFAULT 'phone',
    ram INT,
    storage INT,
    rating INT DEFAULT 5,
    hot BOOLEAN DEFAULT FALSE,
    bestSelling BOOLEAN DEFAULT FALSE,
    stock INT DEFAULT 10,
    specs JSON,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    birthday DATE,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng đơn hàng
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    address TEXT NOT NULL,
    items JSON NOT NULL,
    subtotal INT NOT NULL,
    shipping_fee INT DEFAULT 0,
    discount INT DEFAULT 0,
    total INT NOT NULL,
    payment_method VARCHAR(50),
    payment_method_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Chờ xác nhận',
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng đánh giá
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng phụ kiện
CREATE TABLE IF NOT EXISTS accessories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    oldPrice INT,
    discount INT DEFAULT 0,
    image TEXT,
    category VARCHAR(50) DEFAULT 'accessory',
    type VARCHAR(50),
    compatible_with JSON,
    rating INT DEFAULT 5,
    stock INT DEFAULT 50,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng voucher
CREATE TABLE IF NOT EXISTS vouchers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    type ENUM('percent', 'fixed') DEFAULT 'percent',
    value INT NOT NULL,
    min_order INT DEFAULT 0,
    max_discount INT,
    quantity INT DEFAULT 100,
    used INT DEFAULT 0,
    expiry DATE,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng danh mục
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(50),
    description TEXT,
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng thương hiệu
CREATE TABLE IF NOT EXISTS brands (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo TEXT,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Admin user
INSERT INTO users (name, email, phone, password, role) VALUES
('Admin', 'admin@thegioididong.com', '0123456789', 'admin123', 'admin');

-- Sample users
INSERT INTO users (name, email, phone, password, role) VALUES
('Nguyễn Văn A', 'nguyenvana@gmail.com', '0901234567', '123456', 'user'),
('Trần Thị B', 'tranthib@gmail.com', '0912345678', '123456', 'user'),
('Lê Văn C', 'levanc@gmail.com', '0923456789', '123456', 'user');

-- Categories
INSERT INTO categories (name, slug, icon, description, display_order) VALUES
('Điện thoại', 'phone', 'fa-mobile-alt', 'Điện thoại di động các loại', 1),
('Máy tính bảng', 'tablet', 'fa-tablet-alt', 'Máy tính bảng iPad, Samsung Tab', 2),
('Laptop', 'laptop', 'fa-laptop', 'Laptop văn phòng, gaming', 3),
('Phụ kiện', 'accessory', 'fa-headphones', 'Tai nghe, sạc, ốp lưng', 4),
('Đồng hồ thông minh', 'smartwatch', 'fa-clock', 'Smartwatch, vòng đeo tay', 5);

-- Brands
INSERT INTO brands (name, slug, description) VALUES
('Apple', 'apple', 'Thương hiệu công nghệ hàng đầu thế giới'),
('Samsung', 'samsung', 'Tập đoàn điện tử Hàn Quốc'),
('Xiaomi', 'xiaomi', 'Thương hiệu công nghệ Trung Quốc'),
('OPPO', 'oppo', 'Thương hiệu điện thoại phổ biến'),
('Vivo', 'vivo', 'Thương hiệu điện thoại Trung Quốc'),
('Realme', 'realme', 'Thương hiệu điện thoại giá rẻ');

-- Vouchers
INSERT INTO vouchers (code, type, value, min_order, max_discount, quantity, expiry, description) VALUES
('SALE10', 'percent', 10, 0, 1000000, 100, '2025-12-31', 'Giảm 10% cho đơn hàng'),
('SALE20', 'percent', 20, 5000000, 2000000, 50, '2025-12-31', 'Giảm 20% cho đơn từ 5 triệu'),
('FREESHIP', 'fixed', 30000, 0, 30000, 200, '2025-12-31', 'Miễn phí vận chuyển');

-- Products (25 sản phẩm)
INSERT INTO products (name, brand, price, oldPrice, discount, image, category, ram, storage, rating, hot, bestSelling, stock, specs, description) VALUES
-- iPhone
('iPhone 15 Pro Max 256GB', 'Apple', 29990000, 34990000, 14, 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg', 'phone', 8, 256, 5, 1, 1, 15, '{"Màn hình": "6.7 inch, Super Retina XDR", "Camera sau": "48MP + 12MP + 12MP", "Camera trước": "12MP", "CPU": "Apple A17 Pro", "RAM": "8GB", "Bộ nhớ trong": "256GB", "Pin": "4422 mAh"}', 'iPhone 15 Pro Max - Đỉnh cao công nghệ từ Apple'),
('iPhone 14 Pro 128GB', 'Apple', 24990000, 27990000, 11, 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-vang-thumb-600x600.jpg', 'phone', 6, 128, 5, 1, 1, 20, '{"Màn hình": "6.1 inch, Super Retina XDR", "Camera sau": "48MP + 12MP + 12MP", "Camera trước": "12MP", "CPU": "Apple A16 Bionic", "RAM": "6GB", "Bộ nhớ trong": "128GB", "Pin": "3200 mAh"}', 'iPhone 14 Pro - Hiệu năng mạnh mẽ'),
('iPhone 13 128GB', 'Apple', 17990000, 20990000, 14, 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-pink-2-600x600.jpg', 'phone', 4, 128, 5, 0, 1, 25, '{"Màn hình": "6.1 inch, Super Retina XDR", "Camera sau": "12MP + 12MP", "Camera trước": "12MP", "CPU": "Apple A15 Bionic", "RAM": "4GB", "Bộ nhớ trong": "128GB", "Pin": "3240 mAh"}', 'iPhone 13 - Giá tốt, hiệu năng cao'),

-- Samsung
('Samsung Galaxy S24 Ultra 12GB 256GB', 'Samsung', 29990000, 33990000, 12, 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumbnew-600x600.jpg', 'phone', 12, 256, 5, 1, 1, 18, '{"Màn hình": "6.8 inch, Dynamic AMOLED 2X", "Camera sau": "200MP + 50MP + 12MP + 10MP", "Camera trước": "12MP", "CPU": "Snapdragon 8 Gen 3", "RAM": "12GB", "Bộ nhớ trong": "256GB", "Pin": "5000 mAh"}', 'Samsung Galaxy S24 Ultra - Flagship đỉnh cao'),
('Samsung Galaxy Z Fold5 12GB 256GB', 'Samsung', 35990000, 40990000, 12, 'https://cdn.tgdd.vn/Products/Images/42/305658/samsung-galaxy-z-fold5-kem-thumbnew-600x600.jpg', 'phone', 12, 256, 5, 1, 0, 10, '{"Màn hình": "7.6 inch, Dynamic AMOLED 2X", "Camera sau": "50MP + 12MP + 10MP", "Camera trước": "10MP + 4MP", "CPU": "Snapdragon 8 Gen 2", "RAM": "12GB", "Bộ nhớ trong": "256GB", "Pin": "4400 mAh"}', 'Samsung Galaxy Z Fold5 - Điện thoại gập cao cấp'),
('Samsung Galaxy A54 5G 8GB 128GB', 'Samsung', 9490000, 10990000, 14, 'https://cdn.tgdd.vn/Products/Images/42/301570/samsung-galaxy-a54-5g-xanh-thumb-600x600.jpg', 'phone', 8, 128, 5, 1, 1, 30, '{"Màn hình": "6.4 inch, Super AMOLED", "Camera sau": "50MP + 12MP + 5MP", "Camera trước": "32MP", "CPU": "Exynos 1380", "RAM": "8GB", "Bộ nhớ trong": "128GB", "Pin": "5000 mAh"}', 'Samsung Galaxy A54 5G - Tầm trung xuất sắc'),

-- Xiaomi
('Xiaomi 13T Pro 12GB 256GB', 'Xiaomi', 12990000, 14990000, 13, 'https://cdn.tgdd.vn/Products/Images/42/309816/xiaomi-13t-pro-xanh-thumb-600x600.jpg', 'phone', 12, 256, 5, 1, 1, 22, '{"Màn hình": "6.67 inch, AMOLED", "Camera sau": "50MP + 50MP + 12MP", "Camera trước": "20MP", "CPU": "MediaTek Dimensity 9200+", "RAM": "12GB", "Bộ nhớ trong": "256GB", "Pin": "5000 mAh"}', 'Xiaomi 13T Pro - Hiệu năng khủng, giá tốt'),
('Xiaomi Redmi Note 13 Pro 8GB 128GB', 'Xiaomi', 6990000, 7990000, 13, 'https://cdn.tgdd.vn/Products/Images/42/313203/xiaomi-redmi-note-13-pro-xanh-thumb-600x600.jpg', 'phone', 8, 128, 5, 1, 1, 35, '{"Màn hình": "6.67 inch, AMOLED", "Camera sau": "200MP + 8MP + 2MP", "Camera trước": "16MP", "CPU": "Snapdragon 7s Gen 2", "RAM": "8GB", "Bộ nhớ trong": "128GB", "Pin": "5100 mAh"}', 'Redmi Note 13 Pro - Camera 200MP ấn tượng'),
('Xiaomi Redmi 12 8GB 256GB', 'Xiaomi', 4490000, 4990000, 10, 'https://cdn.tgdd.vn/Products/Images/42/307174/xiaomi-redmi-12-bac-thumb-600x600.jpg', 'phone', 8, 256, 4, 0, 1, 40, '{"Màn hình": "6.79 inch, IPS LCD", "Camera sau": "50MP + 8MP + 2MP", "Camera trước": "8MP", "CPU": "MediaTek Helio G88", "RAM": "8GB", "Bộ nhớ trong": "256GB", "Pin": "5000 mAh"}', 'Redmi 12 - Giá rẻ, pin khủng'),

-- OPPO
('OPPO Find N3 Flip 12GB 256GB', 'OPPO', 19990000, 22990000, 13, 'https://cdn.tgdd.vn/Products/Images/42/309816/oppo-find-n3-flip-hong-thumb-600x600.jpg', 'phone', 12, 256, 5, 1, 0, 12, '{"Màn hình": "6.8 inch, AMOLED", "Camera sau": "50MP + 48MP + 32MP", "Camera trước": "32MP", "CPU": "MediaTek Dimensity 9200", "RAM": "12GB", "Bộ nhớ trong": "256GB", "Pin": "4300 mAh"}', 'OPPO Find N3 Flip - Điện thoại gập nhỏ gọn'),
('OPPO Reno10 Pro+ 5G 12GB 256GB', 'OPPO', 14990000, 16990000, 12, 'https://cdn.tgdd.vn/Products/Images/42/307174/oppo-reno10-pro-plus-tim-thumb-600x600.jpg', 'phone', 12, 256, 5, 1, 1, 20, '{"Màn hình": "6.74 inch, AMOLED", "Camera sau": "50MP + 64MP + 8MP", "Camera trước": "32MP", "CPU": "Snapdragon 8+ Gen 1", "RAM": "12GB", "Bộ nhớ trong": "256GB", "Pin": "4700 mAh"}', 'OPPO Reno10 Pro+ - Camera chân dung đỉnh cao'),
('OPPO A78 8GB 256GB', 'OPPO', 6490000, 6990000, 7, 'https://cdn.tgdd.vn/Products/Images/42/301570/oppo-a78-xanh-thumb-600x600.jpg', 'phone', 8, 256, 4, 0, 1, 28, '{"Màn hình": "6.43 inch, AMOLED", "Camera sau": "50MP + 2MP", "Camera trước": "8MP", "CPU": "Snapdragon 680", "RAM": "8GB", "Bộ nhớ trong": "256GB", "Pin": "5000 mAh"}', 'OPPO A78 - Màn hình AMOLED đẹp'),

-- Vivo
('Vivo V29e 5G 12GB 256GB', 'Vivo', 8990000, 9990000, 10, 'https://cdn.tgdd.vn/Products/Images/42/313203/vivo-v29e-xanh-thumb-600x600.jpg', 'phone', 12, 256, 5, 1, 1, 25, '{"Màn hình": "6.67 inch, AMOLED", "Camera sau": "64MP + 8MP + 2MP", "Camera trước": "50MP", "CPU": "Snapdragon 695", "RAM": "12GB", "Bộ nhớ trong": "256GB", "Pin": "4800 mAh"}', 'Vivo V29e - Camera selfie 50MP'),
('Vivo Y36 8GB 128GB', 'Vivo', 5490000, 5990000, 8, 'https://cdn.tgdd.vn/Products/Images/42/307174/vivo-y36-xanh-thumb-600x600.jpg', 'phone', 8, 128, 4, 0, 1, 32, '{"Màn hình": "6.64 inch, IPS LCD", "Camera sau": "50MP + 2MP", "Camera trước": "16MP", "CPU": "Snapdragon 680", "RAM": "8GB", "Bộ nhớ trong": "128GB", "Pin": "5000 mAh"}', 'Vivo Y36 - Thiết kế đẹp, giá tốt'),

-- Realme
('Realme 11 Pro+ 5G 12GB 512GB', 'Realme', 10990000, 11990000, 8, 'https://cdn.tgdd.vn/Products/Images/42/309816/realme-11-pro-plus-xanh-thumb-600x600.jpg', 'phone', 12, 512, 5, 1, 1, 20, '{"Màn hình": "6.7 inch, AMOLED", "Camera sau": "200MP + 8MP + 2MP", "Camera trước": "32MP", "CPU": "MediaTek Dimensity 7050", "RAM": "12GB", "Bộ nhớ trong": "512GB", "Pin": "5000 mAh"}', 'Realme 11 Pro+ - Camera 200MP, sạc nhanh 100W'),
('Realme C55 8GB 256GB', 'Realme', 4490000, 4990000, 10, 'https://cdn.tgdd.vn/Products/Images/42/301570/realme-c55-den-thumb-600x600.jpg', 'phone', 8, 256, 4, 0, 1, 35, '{"Màn hình": "6.72 inch, IPS LCD", "Camera sau": "64MP + 2MP", "Camera trước": "8MP", "CPU": "MediaTek Helio G88", "RAM": "8GB", "Bộ nhớ trong": "256GB", "Pin": "5000 mAh"}', 'Realme C55 - Giá rẻ, cấu hình tốt'),

-- Tablets
('iPad Pro M2 11 inch WiFi 128GB', 'Apple', 21990000, 24990000, 12, 'https://cdn.tgdd.vn/Products/Images/522/289700/ipad-pro-11-inch-m2-wifi-gray-thumb-600x600.jpg', 'tablet', 8, 128, 5, 1, 0, 10, '{"Màn hình": "11 inch, Liquid Retina", "Camera sau": "12MP + 10MP", "Camera trước": "12MP", "CPU": "Apple M2", "RAM": "8GB", "Bộ nhớ trong": "128GB", "Pin": "7538 mAh"}', 'iPad Pro M2 - Máy tính bảng mạnh nhất'),
('Samsung Galaxy Tab S9 FE 8GB 128GB', 'Samsung', 10990000, 12990000, 15, 'https://cdn.tgdd.vn/Products/Images/522/313203/samsung-galaxy-tab-s9-fe-xanh-thumb-600x600.jpg', 'tablet', 8, 128, 5, 1, 1, 15, '{"Màn hình": "10.9 inch, IPS LCD", "Camera sau": "8MP", "Camera trước": "12MP", "CPU": "Exynos 1380", "RAM": "8GB", "Bộ nhớ trong": "128GB", "Pin": "8000 mAh"}', 'Galaxy Tab S9 FE - Tablet tầm trung tốt nhất'),
('Xiaomi Pad 6 8GB 256GB', 'Xiaomi', 8990000, 9990000, 10, 'https://cdn.tgdd.vn/Products/Images/522/307174/xiaomi-pad-6-xanh-thumb-600x600.jpg', 'tablet', 8, 256, 5, 0, 1, 18, '{"Màn hình": "11 inch, IPS LCD", "Camera sau": "13MP", "Camera trước": "8MP", "CPU": "Snapdragon 870", "RAM": "8GB", "Bộ nhớ trong": "256GB", "Pin": "8840 mAh"}', 'Xiaomi Pad 6 - Giải trí đỉnh cao'),

-- Accessories
('AirPods Pro 2nd Gen', 'Apple', 5990000, 6990000, 14, 'https://cdn.tgdd.vn/Products/Images/54/289700/airpods-pro-2-thumb-600x600.jpg', 'accessory', 0, 0, 5, 1, 1, 50, '{"Loại": "Tai nghe True Wireless", "Thời gian sử dụng": "6 giờ", "Chống ồn": "Có", "Kết nối": "Bluetooth 5.3"}', 'AirPods Pro 2 - Tai nghe chống ồn tốt nhất'),
('Samsung Galaxy Buds2 Pro', 'Samsung', 3990000, 4990000, 20, 'https://cdn.tgdd.vn/Products/Images/54/301570/samsung-galaxy-buds2-pro-den-thumb-600x600.jpg', 'accessory', 0, 0, 5, 1, 1, 60, '{"Loại": "Tai nghe True Wireless", "Thời gian sử dụng": "5 giờ", "Chống ồn": "Có", "Kết nối": "Bluetooth 5.3"}', 'Galaxy Buds2 Pro - Âm thanh Hi-Fi'),
('Sạc nhanh Apple 20W USB-C', 'Apple', 490000, 590000, 17, 'https://cdn.tgdd.vn/Products/Images/58/289700/sac-nhanh-apple-20w-usbc-thumb-600x600.jpg', 'accessory', 0, 0, 5, 0, 1, 100, '{"Loại": "Sạc nhanh", "Công suất": "20W", "Cổng": "USB-C", "Tương thích": "iPhone, iPad"}', 'Sạc nhanh Apple 20W chính hãng'),

-- Test product
('Test Product', 'Apple', 1000000, 1500000, 33, 'https://via.placeholder.com/300', 'phone', 4, 64, 3, 0, 0, 5, '{"Màn hình": "Test", "Camera": "Test"}', 'Sản phẩm test');

-- =====================================================
-- END OF FILE
-- =====================================================
