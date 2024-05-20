<?php
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$dataFile = './beverages.json';

// Load products from JSON file
function loadProducts() {
    global $dataFile;
    $json = file_get_contents($dataFile);
    return json_decode($json, true);
}

// Save products to JSON file
function saveProducts($products) {
    global $dataFile;
    $json = json_encode($products, JSON_PRETTY_PRINT);
    file_put_contents($dataFile, $json);
}

if ($method === 'GET' && $requestUri === '/serverbev.php/beverages.json') {
    // Return the list of products
    echo json_encode(loadProducts());
} elseif ($method === 'POST' && $requestUri === '/serverbev.php/update-deletion') {
    // Update deletion status of a product
    $input = json_decode(file_get_contents('php://input'), true);
    $index = $input['index'];
    $deleted = $input['deleted'];

    $data = loadProducts();
    if ($deleted) {
        // Temporarily delete the product
        $data['products'][$index]['deleted'] = true;
    } else {
        // Restore the product
        $data['products'][$index]['deleted'] = false;
    }
    saveProducts($data);

    echo json_encode(['success' => true]);
} else {
    // Invalid request
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
?>
