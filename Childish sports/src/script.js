'use strict';

// Функція для розрахунку суми
function calculateTotalCost(time) {
    const costPerMinute = parseFloat(
        document.getElementById('serviceCost').value
    ); // Отримаємо вартість хвилини з поля введення
    return time * costPerMinute;
}

function showPopupMessage(message) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = message;
    popup.classList.add('show');

    // Ховаємо повідомлення через 3 секунди
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

let clients = []; // Масив для зберігання інформації про клієнтів
let totalSum = 0; // Змінна для загальної суми
let totalClients = 0; // Змінна для кількості клієнтів

// Функція для розрахунку суми
function calculateTotalCost(time, costPerMinute) {
    return time * costPerMinute;
}

function recordClient() {
    // Отримуємо дані з полів введення
    const clientName = document.getElementById('clientName').value.trim();
    const serviceTime = parseFloat(
        document.getElementById('serviceTime').value
    );
    const serviceCost = parseFloat(
        document.getElementById('serviceCost').value
    );

    // Перевірка правильності введених даних
    if (clientName === '') {
        showPopupMessage("Будь ласка, введіть ім'я клієнта.");
        return;
    }

    if (isNaN(serviceTime) || serviceTime <= 0) {
        showPopupMessage(
            'Будь ласка, введіть коректний час обслуговування (хвилини), більше за 0.'
        );
        return;
    }

    if (isNaN(serviceCost) || serviceCost <= 0) {
        showPopupMessage('Будь ласка, введіть коректну вартість, більше за 0.');
        return;
    }

    // Розрахунок суми
    const totalCost = calculateTotalCost(serviceTime, serviceCost);

    // Створюємо об'єкт клієнта
    const client = {
        name: clientName,
        time: serviceTime,
        costPerMinute: serviceCost,
        totalCost: totalCost,
    };

    // Додаємо клієнта до масиву
    clients.push(client);

    // Оновлюємо загальну кількість клієнтів і суму
    totalClients += 1;
    totalSum += totalCost;

    // Очищаємо поля введення
    document.getElementById('clientName').value = '';
    document.getElementById('serviceTime').value = '';
    document.getElementById('serviceCost').value = '';

    // Відображаємо список клієнтів та оновлені підсумки
    displayClients();
    updateTotals();
}

// Функція для відображення списку клієнтів
function displayClients() {
    const clientsList = document.getElementById('clientsList');
    clientsList.innerHTML = ''; // Очищаємо список перед відображенням нових даних

    clients.forEach((client) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${client.name} - ${client.time} хв. - ${client.costPerMinute} грн/хв - Всього: ${client.totalCost} грн`;
        clientsList.appendChild(listItem);
    });
}

// Функція для оновлення підсумкових даних
function updateTotals() {
    document.getElementById(
        'totalClients'
    ).textContent = `Загальна кількість відвідувачів: ${totalClients}`;
    document.getElementById(
        'totalCost'
    ).textContent = `Загальна сума: ${totalSum} грн`;
}

// Функція для показу спливаючого повідомлення
function showPopupMessage(message) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = message;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Функція для відображення списку клієнтів
function displayClients() {
    const clientsList = document.getElementById('clientsList');
    clientsList.innerHTML = ''; // Очищаємо список перед відображенням нових даних

    clients.forEach((client) => {
        const listItem = document.createElement('li');
        // Відображаємо ім'я клієнта, час та загальну суму
        listItem.textContent = `${client.name} - ${
            client.time
        } хв. - ${client.totalCost.toFixed(2)} грн.`;
        clientsList.appendChild(listItem);
    });
}
document
    .getElementById('recordClientButton')
    .addEventListener('click', recordClient);
