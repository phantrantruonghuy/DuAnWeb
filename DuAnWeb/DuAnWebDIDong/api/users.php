<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            // Get single user
            $stmt = $conn->prepare("SELECT id, name, email, phone, address, birthday, role, created_at FROM users WHERE id = ?");
            $stmt->execute([$_GET['id']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user) {
                sendResponse(true, $user);
            } else {
                sendResponse(false, null, 'User not found');
            }
        } else {
            // Get all users
            $stmt = $conn->prepare("SELECT id, name, email, phone, address, birthday, role, created_at FROM users ORDER BY created_at DESC");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            sendResponse(true, $users);
        }
        
    } elseif ($method === 'DELETE') {
        // Delete user
        $data = json_decode(file_get_contents('php://input'), true);
        $userId = $data['id'] ?? null;
        
        if (!$userId) {
            sendResponse(false, null, 'User ID is required');
        }
        
        // Check if user is admin
        $stmt = $conn->prepare("SELECT role FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && $user['role'] === 'admin') {
            sendResponse(false, null, 'Cannot delete admin user');
        }
        
        // Delete user
        $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        
        sendResponse(true, null, 'User deleted successfully');
        
    } else {
        sendResponse(false, null, 'Method not allowed');
    }
    
} catch (PDOException $e) {
    sendResponse(false, null, 'Database error: ' . $e->getMessage());
}
?>
