<?php
// list-item-images.php - List images for a specific item
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
    $itemId = $_GET['itemId'] ?? null;
    
    if (!$itemId) {
        throw new Exception('Item ID is required');
    }
    
    $uploadDir = __DIR__ . "/assets/uploaded/items/$itemId/";
    $images = [];
    
    if (is_dir($uploadDir)) {
        $files = scandir($uploadDir);
        
        foreach ($files as $file) {
            if ($file === '.' || $file === '..') continue;
            
            $filePath = $uploadDir . $file;
            if (!is_file($filePath)) continue;
            
            // Check if it's an image
            $imageInfo = @getimagesize($filePath);
            if ($imageInfo === false) continue;
            
            $webPath = "/assets/uploaded/items/$itemId/$file";
            $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') 
                     . $_SERVER['HTTP_HOST'] . $webPath;
            
            $images[] = [
                'id' => 'item_' . $itemId . '_' . $file,
                'name' => $file,
                'url' => $fullUrl,
                'path' => $webPath,
                'size' => filesize($filePath),
                'type' => $imageInfo['mime'],
                'width' => $imageInfo[0],
                'height' => $imageInfo[1],
                'lastModified' => date('c', filemtime($filePath))
            ];
        }
        
        // Sort by modification time (newest first)
        usort($images, function($a, $b) {
            return strtotime($b['lastModified']) - strtotime($a['lastModified']);
        });
    }
    
    echo json_encode([
        'success' => true,
        'images' => $images,
        'count' => count($images),
        'itemId' => $itemId
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>