<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        // Get all brands
        $stmt = $conn->prepare("SELECT * FROM brands ORDER BY name ASC");
        $stmt->execute();
        $brands = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Count products for each brand
        foreach ($brands as &$brand) {
            $stmt = $conn->prepare("SELECT COUNT(*) as count FROM products WHERE brand = ?");
            $stmt->execute([$brand['name']]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $brand['product_count'] = (int)$result['count'];
        }
        
        echo json_encode([
            'success' => true,
            'brands' => $brands
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
