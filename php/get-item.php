<?php
// get-item.php - Retrieve a single catalog item by ID
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $itemId = $_GET['id'] ?? null;
    
    if (!$itemId) {
        throw new Exception('Item ID is required');
    }
    
    $itemsFile = __DIR__ . '/items.json';
    
    if (!file_exists($itemsFile)) {
        throw new Exception('No items found');
    }
    
    $items = json_decode(file_get_contents($itemsFile), true);
    if (!$items || !is_array($items)) {
        throw new Exception('Invalid items data');
    }
    
    // Find the item
    $foundItem = null;
    foreach ($items as $item) {
        if ($item['id'] === $itemId) {
            $foundItem = $item;
            break;
        }
    }
    
    if ($foundItem === null) {
        echo json_encode([
            'success' => false,
            'error' => 'Item not found'
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'item' => $foundItem
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>