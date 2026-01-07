<?php
// delete-item-image.php - Delete an image from an item
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
    
    if (!isset($input['path'])) {
        throw new Exception('Image path is required');
    }
    
    $imagePath = $input['path'];
    
    // Security check - make sure path is within our upload directory
    if (strpos($imagePath, '/assets/uploaded/items/') !== 0) {
        throw new Exception('Invalid image path');
    }
    
    $fullPath = __DIR__ . $imagePath;
    
    if (!file_exists($fullPath)) {
        throw new Exception('Image not found');
    }
    
    if (!is_file($fullPath)) {
        throw new Exception('Invalid file');
    }
    
    if (unlink($fullPath)) {
        echo json_encode([
            'success' => true,
            'message' => 'Image deleted successfully',
            'deletedPath' => $imagePath
        ]);
    } else {
        throw new Exception('Failed to delete image');
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>