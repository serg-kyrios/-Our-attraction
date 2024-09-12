'use strict';

let clients = []; // Масив для зберігання інформації про клієнтів

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

function recordClient() {
    // Отримуємо дані з полів введення
    const clientName = document.getElementById('clientName').value.trim();
    const serviceTime = parseFloat(
        document.getElementById('serviceTime').value
    );
    const serviceCost = parseFloat(
        document.getElementById('serviceCost').value
    );

    // Перевірка на правильність введених даних
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
        showPopupMessage(
            'Будь ласка, введіть коректну вартість послуги, більше за 0.'
        );
        return;
    }

    // Розрахунок суми
    const totalCost = calculateTotalCost(serviceTime);

    // Створимо об'єкт клієнта
    const client = {
        name: clientName,
        time: serviceTime,
        totalCost: totalCost,
    };

    // Додаємо клієнта до масиву
    clients.push(client);

    // Очищаємо поля введення
    document.getElementById('clientName').value = '';
    document.getElementById('serviceTime').value = '';
    document.getElementById('serviceCost').value = '';

    // Відображаємо список клієнтів
    displayClients();
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
// Функція для збереження даних в localStorage
function saveData() {
    localStorage.setItem('clients', JSON.stringify(clients));
}

// Функція для завантаження даних з localStorage при завантаженні сторінки
function loadData() {
    const storedData = localStorage.getItem('clients');
    if (storedData) {
        clients = JSON.parse(storedData);
        displayClients();
    }
}
