<?php
// upload-item-images.php - Upload images for catalog items
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
    $itemId = $_POST['itemId'] ?? null;
    
    if (!$itemId) {
        throw new Exception('Item ID is required');
    }
    
    // Create directory structure: assets/uploaded/items/{itemId}/
    $uploadDir = __DIR__ . "/assets/uploaded/items/$itemId/";
    
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception("Failed to create upload directory");
        }
    }
    
    $uploadedImages = [];
    $errors = [];
    $totalFiles = count($_FILES);
    $successCount = 0;
    
    // Process all uploaded files
    foreach ($_FILES as $key => $file) {
        $fileResult = [
            'originalName' => $file['name'],
            'success' => false,
            'error' => null,
            'url' => null,
            'path' => null
        ];
        
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $fileResult['error'] = "Upload error code: " . $file['error'];
            $errors[] = $fileResult;
            continue;
        }
        
        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
        $fileType = strtolower($file['type']);
        
        if (!in_array($fileType, $allowedTypes)) {
            $fileResult['error'] = "Invalid file type";
            $errors[] = $fileResult;
            continue;
        }
        
        // Validate file size (10MB limit for high-quality antique photos)
        if ($file['size'] > 10 * 1024 * 1024) {
            $fileResult['error'] = "File too large (max 10MB)";
            $errors[] = $fileResult;
            continue;
        }
        
        // Generate unique filename
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $filename = time() . '_' . uniqid() . '_' . preg_replace('/[^a-zA-Z0-9]/', '', pathinfo($file['name'], PATHINFO_FILENAME)) . '.' . $extension;
        $targetPath = $uploadDir . $filename;
        
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            // Create web-accessible URL
            $webPath = "/assets/uploaded/items/$itemId/$filename";
            $fullUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://') 
                     . $_SERVER['HTTP_HOST'] . $webPath;
            
            $fileResult['success'] = true;
            $fileResult['url'] = $fullUrl;
            $fileResult['path'] = $webPath;
            $fileResult['size'] = $file['size'];
            $fileResult['type'] = $fileType;
            
            $uploadedImages[] = $fileResult;
            $successCount++;
        } else {
            $fileResult['error'] = "Failed to save file";
            $errors[] = $fileResult;
        }
    }
    
    $response = [
        'success' => true,
        'images' => $uploadedImages,
        'errors' => $errors,
        'totalFiles' => $totalFiles,
        'successCount' => $successCount,
        'errorCount' => count($errors),
        'itemId' => $itemId
    ];
    
    echo json_encode($response);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>