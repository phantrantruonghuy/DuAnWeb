<?php
// Test file để debug categories API
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Test Categories API</h2>";

// Test 1: Check if config.php exists
echo "<h3>1. Kiểm tra config.php</h3>";
if (file_exists('config.php')) {
    echo "✅ File config.php tồn tại<br>";
    require_once 'config.php';
    echo "✅ Đã load config.php<br>";
} else {
    echo "❌ File config.php KHÔNG tồn tại!<br>";
    exit;
}

// Test 2: Check database connection
echo "<h3>2. Kiểm tra kết nối database</h3>";
try {
    if (isset($conn)) {
        echo "✅ Biến \$conn đã được tạo<br>";
        echo "✅ Kết nối database thành công<br>";
    } else {
        echo "❌ Biến \$conn KHÔNG tồn tại!<br>";
        exit;
    }
} catch (Exception $e) {
    echo "❌ Lỗi: " . $e->getMessage() . "<br>";
    exit;
}

// Test 3: Check if categories table exists
echo "<h3>3. Kiểm tra bảng categories</h3>";
try {
    $stmt = $conn->query("SHOW TABLES LIKE 'categories'");
    $result = $stmt->fetch();
    
    if ($result) {
        echo "✅ Bảng 'categories' tồn tại<br>";
    } else {
        echo "❌ Bảng 'categories' KHÔNG tồn tại!<br>";
        echo "<p style='color: red;'>Bạn cần chạy SQL để tạo bảng categories. Xem file CAP_NHAT_DATABASE.md</p>";
        exit;
    }
} catch (PDOException $e) {
    echo "❌ Lỗi khi kiểm tra bảng: " . $e->getMessage() . "<br>";
    exit;
}

// Test 4: Get categories data
echo "<h3>4. Lấy dữ liệu từ bảng categories</h3>";
try {
    $stmt = $conn->prepare("SELECT * FROM categories ORDER BY display_order ASC");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "✅ Tìm thấy " . count($categories) . " danh mục<br>";
    
    if (count($categories) > 0) {
        echo "<table border='1' cellpadding='5' style='margin-top: 10px;'>";
        echo "<tr><th>ID</th><th>Name</th><th>Slug</th><th>Icon</th></tr>";
        foreach ($categories as $cat) {
            echo "<tr>";
            echo "<td>{$cat['id']}</td>";
            echo "<td>{$cat['name']}</td>";
            echo "<td>{$cat['slug']}</td>";
            echo "<td>{$cat['icon']}</td>";
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "<p style='color: orange;'>⚠️ Bảng categories trống! Cần INSERT dữ liệu.</p>";
    }
    
} catch (PDOException $e) {
    echo "❌ Lỗi khi lấy dữ liệu: " . $e->getMessage() . "<br>";
    exit;
}

// Test 5: Test JSON output
echo "<h3>5. Test JSON output</h3>";
try {
    $stmt = $conn->prepare("SELECT * FROM categories ORDER BY display_order ASC");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Count products for each category
    foreach ($categories as &$category) {
        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM products WHERE category = ?");
        $stmt->execute([$category['slug']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $category['product_count'] = (int)$result['count'];
    }
    
    $json = json_encode([
        'success' => true,
        'categories' => $categories
    ], JSON_PRETTY_PRINT);
    
    echo "<pre style='background: #f5f5f5; padding: 10px;'>";
    echo htmlspecialchars($json);
    echo "</pre>";
    
    echo "<p>✅ JSON output hợp lệ!</p>";
    
} catch (Exception $e) {
    echo "❌ Lỗi: " . $e->getMessage() . "<br>";
}

echo "<hr>";
echo "<p><strong>Nếu tất cả đều ✅, thì API categories.php sẽ hoạt động!</strong></p>";
?>
