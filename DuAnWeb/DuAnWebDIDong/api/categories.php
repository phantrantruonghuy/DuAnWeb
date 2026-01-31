<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // Get all categories
        $stmt = $conn->prepare("SELECT * FROM categories ORDER BY display_order ASC, name ASC");
        $stmt->execute();
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Count products for each category
        foreach ($categories as &$category) {
            $stmt = $conn->prepare("SELECT COUNT(*) as count FROM products WHERE category = ?");
            $stmt->execute([$category['slug']]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $category['product_count'] = (int)$result['count'];
        }
        
        echo json_encode([
            'success' => true,
            'categories' => $categories
        ]);
        
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
    }
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
