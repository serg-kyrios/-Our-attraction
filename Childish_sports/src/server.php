
<?php
header('Content-Type: application/json');

// Перевіряємо, чи дані були надіслані через POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримуємо JSON-дані з fetch-запиту
    $input = json_decode(file_get_contents('php://input'), true);

    if ($input) {
        // Отримуємо дані
        $clientName = $input['clientName'];
        $serviceTime = $input['serviceTime'];
        $serviceCost = $input['serviceCost'];

        // Валідація отриманих даних
        if (empty($clientName) || !is_numeric($serviceTime) || !is_numeric($serviceCost)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Неправильні або неповні дані'
            ]);
            exit;
        }

        // Читаємо існуючі дані з файлу db.json
        $filename = 'db.json';
        $currentData = json_decode(file_get_contents($filename), true);

        if (!$currentData) {
            $currentData = [];
        }

        // Формуємо масив з новим клієнтом
        $clientData = [
            'name' => $clientName,
            'time' => $serviceTime,
            'cost' => $serviceCost
        ];

        // Додаємо нові дані до масиву
        array_push($currentData, $clientData);

        // Зберігаємо оновлені дані у файл db.json
        if (file_put_contents($filename, json_encode($currentData, JSON_PRETTY_PRINT))) {
            // Відправляємо відповідь про успіх
            echo json_encode([
                'status' => 'success',
                'message' => 'Дані успішно збережені',
                'data' => $clientData
            ]);
        } else {
            // Відправляємо відповідь з помилкою при збереженні
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Помилка при збереженні даних'
            ]);
        }
    } else {
        // Некоректні дані
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => 'Некоректні дані'
        ]);
    }
} else {
    // Невірний метод запиту
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Метод не дозволений'
    ]);
}
