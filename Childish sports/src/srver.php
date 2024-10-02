<!-- 
// echo var_dump($_POST); -->

<!-- 
// $_POST=json_decode(file_get_contents("php://input"), true);
// echo var_dump($_POST); -->
<?php
// Перевіряємо, чи дані були надіслані через POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримуємо JSON-дані з fetch-запиту
    $input = file_get_contents('php://input');
    $clientData = json_decode($input, true);

    // Перевіряємо, чи отримані всі необхідні поля
    if (isset($clientData['name']) && isset($clientData['time']) && isset($clientData['cost'])) {
        // Читаємо існуючі дані з файлу db.json
        $filename = 'db.json';
        $currentData = json_decode(file_get_contents($filename), true);
        if (!$currentData) {
            $currentData = [];
        }

        // Додаємо нові дані до масиву
        array_push($currentData, $clientData);

        // Зберігаємо оновлені дані у файл db.json
        if (file_put_contents($filename, json_encode($currentData, JSON_PRETTY_PRINT))) {
            // Відправляємо відповідь про успіх
            echo json_encode(['message' => 'Дані успішно збережені']);
        } else {
            // Відправляємо відповідь з помилкою
            http_response_code(500);
            echo json_encode(['message' => 'Помилка при збереженні даних']);
        }
    } else {
        // Відправляємо відповідь з помилкою
        http_response_code(400);
        echo json_encode(['message' => 'Неповні дані']);
    }
} else {
    // Якщо запит не є POST, повертаємо помилку
    http_response_code(405);
    echo json_encode(['message' => 'Метод не дозволений']);
}

