<?php
// get-items.php - Retrieve catalog items with optional filters
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
    $itemsFile = __DIR__ . '/items.json';
    $items = [];
    
    // Load items from JSON file
    if (file_exists($itemsFile)) {
        $itemsData = json_decode(file_get_contents($itemsFile), true);
        if ($itemsData && is_array($itemsData)) {
            $items = $itemsData;
        }
    }
    
    // Apply filters if provided
    $storeLocation = $_GET['storeLocation'] ?? null;
    $featured = isset($_GET['featured']) ? filter_var($_GET['featured'], FILTER_VALIDATE_BOOLEAN) : null;
    $category = $_GET['category'] ?? null;
    $period = $_GET['period'] ?? null;
    
    $filteredItems = $items;
    
    if ($storeLocation !== null) {
        $filteredItems = array_filter($filteredItems, function($item) use ($storeLocation) {
            return $item['storeLocation'] === $storeLocation;
        });
    }
    
    if ($featured !== null) {
        $filteredItems = array_filter($filteredItems, function($item) use ($featured) {
            return ($item['featured'] ?? false) === $featured;
        });
    }
    
    if ($category !== null) {
        $filteredItems = array_filter($filteredItems, function($item) use ($category) {
            return $item['category'] === $category;
        });
    }
    
    if ($period !== null) {
        $filteredItems = array_filter($filteredItems, function($item) use ($period) {
            return $item['period'] === $period;
        });
    }
    
    // Re-index array
    $filteredItems = array_values($filteredItems);
    
    echo json_encode([
        'success' => true,
        'items' => $filteredItems,
        'count' => count($filteredItems),
        'totalCount' => count($items)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>