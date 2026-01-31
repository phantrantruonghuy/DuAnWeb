<?php
/**
 * Script import tất cả sản phẩm vào MySQL
 * Chạy file này 1 lần để thêm dữ liệu sản phẩm
 */

require_once '../api/config.php';

$conn = getDBConnection();

// Xóa tất cả sản phẩm cũ (nếu muốn reset)
$resetData = isset($_GET['reset']) && $_GET['reset'] === 'true';
if ($resetData) {
    $conn->query("TRUNCATE TABLE products");
    echo "<p style='color: orange;'>✅ Đã xóa tất cả sản phẩm cũ</p>";
}

// Dữ liệu sản phẩm
$products = [
    [
        'name' => 'iPhone 15 Pro Max 256GB',
        'brand' => 'Apple',
        'price' => 29990000,
        'oldPrice' => 34990000,
        'discount' => 14,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg',
        'category' => 'phone',
        'ram' => 8,
        'storage' => 256,
        'rating' => 5,
        'hot' => 1,
        'bestSelling' => 1,
        'stock' => 50,
        'specs' => [
            'Màn hình' => '6.7", Super Retina XDR',
            'Camera sau' => '48MP, 12MP, 12MP',
            'Camera trước' => '12MP',
            'CPU' => 'Apple A17 Pro',
            'RAM' => '8GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '4422mAh, 20W'
        ],
        'description' => 'iPhone 15 Pro Max mang đến thiết kế khung viền từ titan chuẩn hàng không vũ trụ, cực nhẹ và bền bỉ, đi kèm với đó là nút bấm Action Button tinh tế cùng hiệu năng cực đỉnh từ chip A17 Pro.'
    ],
    [
        'name' => 'Samsung Galaxy S24 Ultra 5G 256GB',
        'brand' => 'Samsung',
        'price' => 27490000,
        'oldPrice' => 29990000,
        'discount' => 8,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumbnew-600x600.jpg',
        'category' => 'phone',
        'ram' => 12,
        'storage' => 256,
        'rating' => 5,
        'hot' => 1,
        'bestSelling' => 1,
        'stock' => 45,
        'specs' => [
            'Màn hình' => '6.8", Dynamic AMOLED 2X',
            'Camera sau' => '200MP, 50MP, 12MP, 10MP',
            'Camera trước' => '12MP',
            'CPU' => 'Snapdragon 8 Gen 3',
            'RAM' => '12GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '5000mAh, 45W'
        ],
        'description' => 'Galaxy S24 Ultra mang đến khả năng chụp ảnh zoom 100x ấn tượng, hiệu năng mạnh mẽ cùng Galaxy AI thông minh.'
    ],
    [
        'name' => 'Xiaomi 14 Ultra 5G 512GB',
        'brand' => 'Xiaomi',
        'price' => 24990000,
        'oldPrice' => 27990000,
        'discount' => 11,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/320722/xiaomi-14-ultra-white-thumbnew-600x600.jpg',
        'category' => 'phone',
        'ram' => 16,
        'storage' => 512,
        'rating' => 5,
        'hot' => 1,
        'bestSelling' => 1,
        'stock' => 30,
        'specs' => [
            'Màn hình' => '6.73", AMOLED',
            'Camera sau' => '50MP, 50MP, 50MP, 50MP',
            'Camera trước' => '32MP',
            'CPU' => 'Snapdragon 8 Gen 3',
            'RAM' => '16GB',
            'Bộ nhớ trong' => '512GB',
            'Pin' => '5000mAh, 90W'
        ],
        'description' => 'Xiaomi 14 Ultra với hệ thống camera Leica 4 ống kính 50MP, hiệu năng đỉnh cao và sạc nhanh 90W ấn tượng.'
    ],
    [
        'name' => 'OPPO Reno11 F 5G 8GB',
        'brand' => 'OPPO',
        'price' => 8490000,
        'oldPrice' => 9990000,
        'discount' => 15,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/320536/oppo-reno11-f-5g-xanh-thumb-600x600.jpg',
        'category' => 'phone',
        'ram' => 8,
        'storage' => 256,
        'rating' => 4,
        'hot' => 1,
        'bestSelling' => 1,
        'stock' => 60,
        'specs' => [
            'Màn hình' => '6.7", AMOLED',
            'Camera sau' => '64MP, 8MP, 2MP',
            'Camera trước' => '32MP',
            'CPU' => 'Dimensity 7050',
            'RAM' => '8GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '5000mAh, 67W'
        ],
        'description' => 'OPPO Reno11 F với camera selfie 32MP, sạc nhanh 67W và thiết kế đẹp mắt.'
    ],
    [
        'name' => 'Vivo V30e 5G 8GB',
        'brand' => 'Vivo',
        'price' => 9990000,
        'oldPrice' => 10990000,
        'discount' => 9,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/320466/vivo-v30e-xanh-thumb-600x600.jpg',
        'category' => 'phone',
        'ram' => 8,
        'storage' => 256,
        'rating' => 4,
        'hot' => 0,
        'bestSelling' => 1,
        'stock' => 55,
        'specs' => [
            'Màn hình' => '6.78", AMOLED',
            'Camera sau' => '50MP, 8MP',
            'Camera trước' => '50MP',
            'CPU' => 'Snapdragon 6 Gen 1',
            'RAM' => '8GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '5500mAh, 44W'
        ],
        'description' => 'Vivo V30e với camera trước 50MP, pin 5500mAh khủng và màn hình AMOLED sắc nét.'
    ],
    [
        'name' => 'Realme 12 Pro+ 5G 8GB',
        'brand' => 'Realme',
        'price' => 10990000,
        'oldPrice' => 11990000,
        'discount' => 8,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/318874/realme-12-pro-plus-xanh-thumb-600x600.jpg',
        'category' => 'phone',
        'ram' => 8,
        'storage' => 256,
        'rating' => 4,
        'hot' => 1,
        'bestSelling' => 1,
        'stock' => 40,
        'specs' => [
            'Màn hình' => '6.7", AMOLED',
            'Camera sau' => '50MP, 64MP, 8MP',
            'Camera trước' => '32MP',
            'CPU' => 'Snapdragon 7s Gen 2',
            'RAM' => '8GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '5000mAh, 67W'
        ],
        'description' => 'Realme 12 Pro+ với camera zoom tele 3x chất lượng cao và hiệu năng mạnh mẽ.'
    ],
    [
        'name' => 'iPhone 14 Pro Max 128GB',
        'brand' => 'Apple',
        'price' => 24990000,
        'oldPrice' => 27990000,
        'discount' => 11,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/289700/iphone-14-pro-max-den-thumb-600x600.jpg',
        'category' => 'phone',
        'ram' => 6,
        'storage' => 128,
        'rating' => 5,
        'hot' => 0,
        'bestSelling' => 0,
        'stock' => 35,
        'specs' => [
            'Màn hình' => '6.7", Super Retina XDR',
            'Camera sau' => '48MP, 12MP, 12MP',
            'Camera trước' => '12MP',
            'CPU' => 'Apple A16 Bionic',
            'RAM' => '6GB',
            'Bộ nhớ trong' => '128GB',
            'Pin' => '4323mAh, 20W'
        ],
        'description' => 'iPhone 14 Pro Max với Dynamic Island độc đáo và camera 48MP ấn tượng.'
    ],
    [
        'name' => 'Samsung Galaxy Z Fold5 5G 256GB',
        'brand' => 'Samsung',
        'price' => 32990000,
        'oldPrice' => 40990000,
        'discount' => 20,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/309831/samsung-galaxy-z-fold5-kem-256gb-thumb-600x600.jpg',
        'category' => 'phone',
        'ram' => 12,
        'storage' => 256,
        'rating' => 5,
        'hot' => 1,
        'bestSelling' => 0,
        'stock' => 25,
        'specs' => [
            'Màn hình' => '7.6", Dynamic AMOLED 2X',
            'Camera sau' => '50MP, 12MP, 10MP',
            'Camera trước' => '10MP & 4MP',
            'CPU' => 'Snapdragon 8 Gen 2',
            'RAM' => '12GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '4400mAh, 25W'
        ],
        'description' => 'Galaxy Z Fold5 là smartphone màn hình gập cao cấp với hiệu năng mạnh mẽ và đa nhiệm tuyệt vời.'
    ],
    [
        'name' => 'iPhone 15 Pro 128GB',
        'brand' => 'Apple',
        'price' => 25990000,
        'oldPrice' => 28990000,
        'discount' => 10,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/305660/iphone-15-pro-white-thumbnew-600x600.jpg',
        'category' => 'phone',
        'ram' => 8,
        'storage' => 128,
        'rating' => 5,
        'hot' => 1,
        'bestSelling' => 0,
        'stock' => 42,
        'specs' => [
            'Màn hình' => '6.1", Super Retina XDR',
            'Camera sau' => '48MP, 12MP, 12MP',
            'Camera trước' => '12MP',
            'CPU' => 'Apple A17 Pro',
            'RAM' => '8GB',
            'Bộ nhớ trong' => '128GB',
            'Pin' => '3274mAh, 20W'
        ],
        'description' => 'iPhone 15 Pro với khung titan nhẹ, nút Action Button và chip A17 Pro mạnh mẽ cho trải nghiệm đỉnh cao.'
    ],
    [
        'name' => 'Samsung Galaxy S24 Plus 5G 256GB',
        'brand' => 'Samsung',
        'price' => 22990000,
        'oldPrice' => 25990000,
        'discount' => 12,
        'image' => 'https://cdn.tgdd.vn/Products/Images/42/307176/samsung-galaxy-s24-plus-violet-thumbnew-600x600.jpg',
        'category' => 'phone',
        'ram' => 12,
        'storage' => 256,
        'rating' => 5,
        'hot' => 1,
        'bestSelling' => 0,
        'stock' => 38,
        'specs' => [
            'Màn hình' => '6.7", Dynamic AMOLED 2X',
            'Camera sau' => '50MP, 12MP, 10MP',
            'Camera trước' => '12MP',
            'CPU' => 'Exynos 2400',
            'RAM' => '12GB',
            'Bộ nhớ trong' => '256GB',
            'Pin' => '4900mAh, 45W'
        ],
        'description' => 'Galaxy S24 Plus với màn hình lớn 6.7 inch, Galaxy AI và hiệu năng mạnh mẽ từ Exynos 2400.'
    ]
];

// Insert products
$sql = "INSERT INTO products (name, brand, price, oldPrice, discount, image, category, ram, storage, rating, hot, bestSelling, stock, specs, description) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$successCount = 0;
$errorCount = 0;

echo "<h2>🚀 Đang import sản phẩm vào MySQL...</h2>";
echo "<hr>";

foreach ($products as $product) {
    $specs_json = json_encode($product['specs'], JSON_UNESCAPED_UNICODE);
    
    $stmt->bind_param('ssiiisissiiiiis',
        $product['name'],
        $product['brand'],
        $product['price'],
        $product['oldPrice'],
        $product['discount'],
        $product['image'],
        $product['category'],
        $product['ram'],
        $product['storage'],
        $product['rating'],
        $product['hot'],
        $product['bestSelling'],
        $product['stock'],
        $specs_json,
        $product['description']
    );
    
    if ($stmt->execute()) {
        $successCount++;
        echo "<p style='color: green;'>✅ Đã thêm: {$product['name']}</p>";
    } else {
        $errorCount++;
        echo "<p style='color: red;'>❌ Lỗi: {$product['name']} - {$stmt->error}</p>";
    }
}

echo "<hr>";
echo "<h3>📊 Kết quả:</h3>";
echo "<p><strong>✅ Thành công:</strong> $successCount sản phẩm</p>";
echo "<p><strong>❌ Lỗi:</strong> $errorCount sản phẩm</p>";
echo "<hr>";
echo "<p><a href='http://localhost/phpmyadmin' target='_blank'>👉 Kiểm tra trong phpMyAdmin</a></p>";
echo "<p><a href='../api/products.php' target='_blank'>👉 Xem API Products</a></p>";
echo "<p><a href='../index.html'>👉 Về trang chủ</a></p>";

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import Products</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        h2, h3 { color: #333; }
        p { margin: 5px 0; }
        a {
            display: inline-block;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 5px;
        }
        a:hover { background: #0056b3; }
    </style>
</head>
<body>
</body>
</html>
