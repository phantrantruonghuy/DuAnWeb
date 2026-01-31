<?php
require_once 'config.php';

$conn = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lấy danh sách đơn hàng
        if (isset($_GET['id'])) {
            // Lấy chi tiết 1 đơn hàng
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM orders WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $order = $result->fetch_assoc();
                $order['items'] = json_decode($order['items'], true);
                sendResponse(true, $order);
            } else {
                sendResponse(false, null, 'Không tìm thấy đơn hàng');
            }
        } elseif (isset($_GET['user_id'])) {
            // Lấy đơn hàng theo user
            $userId = intval($_GET['user_id']);
            $sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('i', $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $orders = [];
            while ($row = $result->fetch_assoc()) {
                $row['items'] = json_decode($row['items'], true);
                $orders[] = $row;
            }
            
            sendResponse(true, $orders);
        } else {
            // Lấy tất cả đơn hàng (cho admin)
            $sql = "SELECT * FROM orders ORDER BY created_at DESC";
            $result = $conn->query($sql);
            
            $orders = [];
            while ($row = $result->fetch_assoc()) {
                $row['items'] = json_decode($row['items'], true);
                $orders[] = $row;
            }
            
            sendResponse(true, $orders);
        }
        break;
        
    case 'POST':
        // Tạo đơn hàng mới
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Set charset UTF-8
        $conn->set_charset('utf8mb4');
        
        // Tạo mã đơn hàng
        $orderNumber = 'DH' . time();
        
        $sql = "INSERT INTO orders (user_id, order_number, customer_name, customer_phone, customer_email, address, items, subtotal, shipping_fee, discount, total, payment_method, payment_method_name, status, note) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $items_json = json_encode($data['items'], JSON_UNESCAPED_UNICODE);
        $userId = isset($data['userId']) ? $data['userId'] : null;
        $status = 'Chờ xác nhận';
        
        $stmt->bind_param('issssssiiiiisss',
            $userId,
            $orderNumber,
            $data['customerName'],
            $data['customerPhone'],
            $data['customerEmail'],
            $data['address'],
            $items_json,
            $data['subtotal'],
            $data['shippingFee'],
            $data['discount'],
            $data['total'],
            $data['paymentMethod'],
            $data['paymentMethodName'],
            $status,
            $data['note']
        );
        
        if ($stmt->execute()) {
            $orderId = $conn->insert_id;
            $data['id'] = $orderId;
            $data['orderNumber'] = $orderNumber;
            $data['status'] = $status;
            
            sendResponse(true, $data, 'Đặt hàng thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    case 'PUT':
        // Cập nhật đơn hàng (thường là cập nhật trạng thái)
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (isset($data['status'])) {
            // Cập nhật trạng thái
            $sql = "UPDATE orders SET status = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('si', $data['status'], $data['id']);
        } else {
            // Cập nhật toàn bộ
            $sql = "UPDATE orders SET customer_name=?, customer_phone=?, customer_email=?, address=?, items=?, subtotal=?, shipping_fee=?, discount=?, total=?, payment_method=?, payment_method_name=?, status=?, note=? WHERE id=?";
            
            $stmt = $conn->prepare($sql);
            $items_json = json_encode($data['items'], JSON_UNESCAPED_UNICODE);
            
            $stmt->bind_param('sssssiiiissssi',
                $data['customerName'],
                $data['customerPhone'],
                $data['customerEmail'],
                $data['address'],
                $items_json,
                $data['subtotal'],
                $data['shippingFee'],
                $data['discount'],
                $data['total'],
                $data['paymentMethod'],
                $data['paymentMethodName'],
                $data['status'],
                $data['note'],
                $data['id']
            );
        }
        
        if ($stmt->execute()) {
            sendResponse(true, $data, 'Cập nhật đơn hàng thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    case 'DELETE':
        // Xóa đơn hàng
        $data = json_decode(file_get_contents('php://input'), true);
        $id = intval($data['id']);
        
        $sql = "DELETE FROM orders WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $id);
        
        if ($stmt->execute()) {
            sendResponse(true, null, 'Xóa đơn hàng thành công');
        } else {
            sendResponse(false, null, 'Lỗi: ' . $stmt->error);
        }
        break;
        
    default:
        sendResponse(false, null, 'Method không được hỗ trợ');
}

$conn->close();
?>
