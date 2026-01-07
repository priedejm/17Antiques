<?php
// delete-item.php - Delete a catalog item and all its images
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

// Function to recursively delete a directory
function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return true;
    }
    
    if (!is_dir($dir)) {
        return unlink($dir);
    }
    
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        
        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }
    
    return rmdir($dir);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['id']) || empty(trim($input['id']))) {
        throw new Exception('Item ID is required');
    }
    
    $itemId = trim($input['id']);
    $itemsFile = __DIR__ . '/items.json';
    
    if (!file_exists($itemsFile)) {
        throw new Exception('No items found');
    }
    
    $items = json_decode(file_get_contents($itemsFile), true);
    if (!$items || !is_array($items)) {
        throw new Exception('Invalid items data');
    }
    
    // Find and remove the item
    $itemFound = false;
    $updatedItems = [];
    
    foreach ($items as $item) {
        if ($item['id'] === $itemId) {
            $itemFound = true;
            // Don't add this item to updated array (effectively deleting it)
        } else {
            $updatedItems[] = $item;
        }
    }
    
    if (!$itemFound) {
        throw new Exception('Item not found');
    }
    
    // Save updated items list
    if (!file_put_contents($itemsFile, json_encode($updatedItems, JSON_PRETTY_PRINT))) {
        throw new Exception('Failed to save updated items');
    }
    
    // Delete item directory and all images
    $itemDir = __DIR__ . "/assets/uploaded/items/$itemId/";
    if (is_dir($itemDir)) {
        if (!deleteDirectory($itemDir)) {
            // Log the error but don't fail the entire operation
            error_log("Warning: Failed to delete item directory: $itemDir");
        }
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Item and all associated images deleted successfully'
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>