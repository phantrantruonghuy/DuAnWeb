<?php
require_once 'config.php';

$action = $_GET['action'] ?? '';

if ($action === 'register') {
    // Đăng ký user mới
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = validateInput($data['name'] ?? '');
    $email = validateInput($data['email'] ?? '');
    $phone = validateInput($data['phone'] ?? '');
    $password = $data['password'] ?? '';
    
    // Validate
    if (empty($name) || empty($email) || empty($phone) || empty($password)) {
        sendResponse(false, null, 'Vui lòng điền đầy đủ thông tin');
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, null, 'Email không hợp lệ');
    }
    
    // Validate phone (10 digits)
    if (!preg_match('/^[0-9]{10}$/', $phone)) {
        sendResponse(false, null, 'Số điện thoại phải có 10 chữ số');
    }
    
    try {
        // Check email exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            sendResponse(false, null, 'Email đã được sử dụng');
        }
        
        // Check phone exists
        $stmt = $conn->prepare("SELECT id FROM users WHERE phone = ?");
        $stmt->execute([$phone]);
        if ($stmt->fetch()) {
            sendResponse(false, null, 'Số điện thoại đã được sử dụng');
        }
        
        // Insert new user
        $stmt = $conn->prepare("INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, 'user')");
        $stmt->execute([$name, $email, $phone, $password]);
        
        $userId = $conn->lastInsertId();
        
        sendResponse(true, [
            'id' => $userId,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'role' => 'user'
        ], 'Đăng ký thành công');
        
    } catch (PDOException $e) {
        sendResponse(false, null, 'Lỗi database: ' . $e->getMessage());
    }
    
} elseif ($action === 'login') {
    // Đăng nhập
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = validateInput($data['username'] ?? '');
    $password = $data['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        sendResponse(false, null, 'Vui lòng điền đầy đủ thông tin');
    }
    
    try {
        // Login with email or phone
        $stmt = $conn->prepare("SELECT id, name, email, phone, password, role FROM users WHERE email = ? OR phone = ?");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();
        
        if (!$user) {
            sendResponse(false, null, 'Email hoặc số điện thoại không tồn tại');
        }
        
        // Check password (plain text - not recommended for production)
        if ($user['password'] !== $password) {
            sendResponse(false, null, 'Mật khẩu không đúng');
        }
        
        // Return user info (without password)
        unset($user['password']);
        sendResponse(true, $user, 'Đăng nhập thành công');
        
    } catch (PDOException $e) {
        sendResponse(false, null, 'Lỗi database: ' . $e->getMessage());
    }
    
} else {
    sendResponse(false, null, 'Action không hợp lệ');
}
?>
