<?php
require_once 'config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lấy danh sách sản phẩm hoặc chi tiết 1 sản phẩm
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM products WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $product = $result->fetch_assoc();
                $product['specs'] = json_decode($product['specs'], true);
                $product['hot'] = (bool)$product['hot'];
                $product['bestSelling'] = (bool)$product['bestSelling'];
                sendResponse(true, $product);
            } else {
                sendResponse(false, null, 'Không tìm thấy sản phẩm');
            }
        } else {
            // Lấy tất cả sản phẩm
            $sql = "SELECT * FROM products ORDER BY id DESC";
            $result = $conn->query($sql);
            
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $row['specs'] = json_decode($row['specs'], true);
                $row['hot'] = (bool)$row['hot'];
                $row['bestSelling'] = (bool)$row['bestSelling'];
                $products[] = $row;
            }
            
            sendResponse(true, $products);
        }
        break;
        
    case 'POST':
        // Thêm sản phẩm mới
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = "INSERT INTO products (name, brand, price, oldPrice, discount, image, category, ram, storage, rating, hot, bestSelling, stock, specs, description) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $specs_json = json_encode($data['specs'], JSON_UNESCAPED_UNICODE);
        
        $stmt->bind_param('ssiiisissiiiiis',
            $data['name'],
            $data['brand'],
            $data['price'],
            $data['oldPrice'],
            $data['discount'],
            $data['image'],
            $data['category'],
            $data['ram'],
            $data['storage'],
            $data['rating'],
            $data['hot'],
            $data['bestSelling'],
            $data['stock'],
            $specs_json,
            $data['description']
        );
        
        if ($stmt->execute()) {
            $data['id'] = $conn->insert_id;
            sendResponse(true, $data, 'Thêm sản phẩm thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    case 'PUT':
        // Cập nhật sản phẩm
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = "UPDATE products SET name=?, brand=?, price=?, oldPrice=?, discount=?, image=?, category=?, ram=?, storage=?, rating=?, hot=?, bestSelling=?, stock=?, specs=?, description=? WHERE id=?";
        
        $stmt = $conn->prepare($sql);
        $specs_json = json_encode($data['specs'], JSON_UNESCAPED_UNICODE);
        
        $stmt->bind_param('ssiiisissiiiiisi',
            $data['name'],
            $data['brand'],
            $data['price'],
            $data['oldPrice'],
            $data['discount'],
            $data['image'],
            $data['category'],
            $data['ram'],
            $data['storage'],
            $data['rating'],
            $data['hot'],
            $data['bestSelling'],
            $data['stock'],
            $specs_json,
            $data['description'],
            $data['id']
        );
        
        if ($stmt->execute()) {
            sendResponse(true, $data, 'Cập nhật sản phẩm thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    case 'DELETE':
        // Xóa sản phẩm
        $data = json_decode(file_get_contents('php://input'), true);
        $id = intval($data['id']);
        
        $sql = "DELETE FROM products WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            sendResponse(true, null, 'Xóa sản phẩm thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    default:
        sendResponse(false, null, 'Method không được hỗ trợ');
}

$conn->close();
?>
