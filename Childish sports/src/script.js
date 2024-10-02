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
    if (!clientName || !serviceTime || !serviceCost) {
        responseMessage.textContent = 'Будь ласка, заповніть усі поля.';
        responseMessage.classList.add('alert', 'alert-danger');
        return;
    }
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

//clock
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rotateClockHands() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');
    const clock = document.getElementById('clock');

    const hourDegrees = (hours % 12) * 30 + minutes / 2;
    const minuteDegrees = minutes * 6;
    const secondDegrees = seconds * 6;

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    const red = getRandomNumber(0, 255);
    const green = getRandomNumber(0, 255);
    const blue = getRandomNumber(0, 255);
    //clock.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

setInterval(rotateClockHands, 1000);

// calendar
const calendar = document.querySelector('.calendar');
const monthYear = document.querySelector('.month-year');
const daysContainer = document.querySelector('.days');

const date = new Date();
const monthNames = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
];

// Оновлюємо заголовок місяця та року
monthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

// Функція для створення днів місяця
function createDays() {
    daysContainer.innerHTML = ''; // Очищаємо контейнер

    const firstDayOfMonth =
        (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7; // Починаємо з понеділка
    const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
    const daysInPrevMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate(); // Кількість днів у попередньому місяці

    // Додаємо дні попереднього місяця
    for (let i = firstDayOfMonth; i > 0; i--) {
        const day = document.createElement('div');
        day.textContent = daysInPrevMonth - i + 1;
        day.classList.add('prev-month', 'col');
        daysContainer.appendChild(day);
    }

    // Додаємо дні поточного місяця
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.classList.add('col');

        // Підсвічуємо поточну дату
        if (
            i === date.getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
        ) {
            day.classList.add('current-day');
        }

        daysContainer.appendChild(day);
    }

    // Додаємо дні наступного місяця, щоб заповнити решту місць до кінця тижня
    const remainingDays = 42 - (firstDayOfMonth + daysInMonth); // 42 — це кількість місць у календарі (6 тижнів по 7 днів)
    for (let i = 1; i <= remainingDays; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.classList.add('next-month', 'col');
        daysContainer.appendChild(day);
    }
}

createDays();
