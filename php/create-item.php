<?php
// create-item.php - Create a new catalog item
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $requiredFields = ['name', 'description', 'price', 'category', 'period', 'condition', 'storeLocation', 'images'];
    foreach ($requiredFields as $field) {
        if (!isset($input[$field]) || (is_string($input[$field]) && empty(trim($input[$field])))) {
            if ($field === 'images' && (!isset($input[$field]) || !is_array($input[$field]) || count($input[$field]) === 0)) {
                throw new Exception("At least one image is required");
            } elseif ($field !== 'images') {
                throw new Exception(ucfirst($field) . " is required");
            }
        }
    }
    
    // Validate price
    if (!is_numeric($input['price']) || $input['price'] <= 0) {
        throw new Exception("Price must be greater than 0");
    }
    
    // Generate unique item ID
    $itemId = uniqid('item_', true);
    
    // Create item directory for images if it doesn't exist
    $itemDir = __DIR__ . "/assets/uploaded/items/$itemId/";
    if (!is_dir($itemDir)) {
        if (!mkdir($itemDir, 0755, true)) {
            throw new Exception('Failed to create item directory');
        }
    }
    
    // Process images - if they're base64, save them to server
    $processedImages = [];
    foreach ($input['images'] as $index => $imageData) {
        if (strpos($imageData, 'data:image') === 0) {
            // Base64 image - decode and save
            list($type, $imageData) = explode(';', $imageData);
            list(, $imageData) = explode(',', $imageData);
            $imageData = base64_decode($imageData);
            
            // Determine file extension
            $extension = 'jpg';
            if (strpos($type, 'png') !== false) $extension = 'png';
            if (strpos($type, 'gif') !== false) $extension = 'gif';
            if (strpos($type, 'webp') !== false) $extension = 'webp';
            
            // Generate filename
            $filename = time() . '_' . $index . '.' . $extension;
            $filepath = $itemDir . $filename;
            
            if (file_put_contents($filepath, $imageData)) {
                $webPath = "/assets/uploaded/items/$itemId/$filename";
                $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') 
                         . $_SERVER['HTTP_HOST'] . $webPath;
                $processedImages[] = $fullUrl;
            } else {
                throw new Exception("Failed to save image $index");
            }
        } else {
            // Already a URL, keep as is
            $processedImages[] = $imageData;
        }
    }
    
    // Create item data
    $itemData = [
        'id' => $itemId,
        'name' => trim($input['name']),
        'description' => trim($input['description']),
        'price' => floatval($input['price']),
        'category' => trim($input['category']),
        'period' => trim($input['period']),
        'condition' => trim($input['condition']),
        'dimensions' => isset($input['dimensions']) ? trim($input['dimensions']) : '',
        'images' => $processedImages,
        'featured' => isset($input['featured']) ? (bool)$input['featured'] : false,
        'storeLocation' => trim($input['storeLocation']),
        'createdAt' => date('c'),
        'updatedAt' => date('c')
    ];
    
    // Load existing items
    $itemsFile = __DIR__ . '/items.json';
    $items = [];
    
    if (file_exists($itemsFile)) {
        $existingData = json_decode(file_get_contents($itemsFile), true);
        if ($existingData && is_array($existingData)) {
            $items = $existingData;
        }
    }
    
    // Add new item to beginning of array (newest first)
    array_unshift($items, $itemData);
    
    // Save to file
    if (!file_put_contents($itemsFile, json_encode($items, JSON_PRETTY_PRINT))) {
        throw new Exception('Failed to save item data');
    }
    
    echo json_encode([
        'success' => true,
        'itemId' => $itemId,
        'item' => $itemData,
        'message' => 'Item created successfully'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>