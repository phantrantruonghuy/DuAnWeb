<?php
require_once 'config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lấy danh sách đánh giá
        if (isset($_GET['product_id'])) {
            // Lấy đánh giá theo sản phẩm
            $productId = intval($_GET['product_id']);
            $sql = "SELECT r.*, p.name as product_name FROM reviews r 
                    LEFT JOIN products p ON r.product_id = p.id 
                    WHERE r.product_id = ? AND r.status = 'approved' 
                    ORDER BY r.created_at DESC";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $productId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $reviews = [];
            while ($row = $result->fetch_assoc()) {
                $reviews[] = $row;
            }
            
            sendResponse(true, $reviews);
        } else {
            // Lấy tất cả đánh giá (cho admin)
            $sql = "SELECT r.*, p.name as product_name FROM reviews r 
                    LEFT JOIN products p ON r.product_id = p.id 
                    ORDER BY r.created_at DESC";
            $result = $conn->query($sql);
            
            $reviews = [];
            while ($row = $result->fetch_assoc()) {
                $reviews[] = $row;
            }
            
            sendResponse(true, $reviews);
        }
        break;
        
    case 'POST':
        // Thêm đánh giá mới
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = "INSERT INTO reviews (product_id, user_id, name, email, rating, content, status) 
                VALUES (?, ?, ?, ?, ?, ?, 'pending')";
        
        $stmt = $conn->prepare($sql);
        $userId = isset($data['userId']) ? $data['userId'] : null;
        
        $stmt->bind_param('iissis',
            $data['productId'],
            $userId,
            $data['name'],
            $data['email'],
            $data['rating'],
            $data['content']
        );
        
        if ($stmt->execute()) {
            $data['id'] = $conn->insert_id;
            $data['status'] = 'pending';
            sendResponse(true, $data, 'Gửi đánh giá thành công. Đánh giá sẽ được duyệt trong thời gian sớm nhất.');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    case 'PUT':
        // Cập nhật đánh giá (duyệt/từ chối)
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = "UPDATE reviews SET status = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('si', $data['status'], $data['id']);
        
        if ($stmt->execute()) {
            sendResponse(true, $data, 'Cập nhật trạng thái đánh giá thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    case 'DELETE':
        // Xóa đánh giá
        $data = json_decode(file_get_contents('php://input'), true);
        $id = intval($data['id']);
        
        $sql = "DELETE FROM reviews WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            sendResponse(true, null, 'Xóa đánh giá thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    default:
        sendResponse(false, null, 'Method không được hỗ trợ');
}

$conn->close();
?>
