'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const responseMessage = document.getElementById('responseMessage');

    const clientList = document.getElementById('clientList');

    const totalClientsElement = document.getElementById('totalClients');

    const totalCostElement = document.getElementById('totalCost');
    const saveBtn = document.getElementById('recordClientButton');

    // const saveBtn = document.querySelector('.saveBtn');

    let isFirstRun = true; // Прапорець для першого запуску // Завантаження клієнтів із сервера

    function loadClients() {
        if (isFirstRun) {
            // Якщо це перший запуск, просто змінюємо прапорець і не виконуємо функцію
            isFirstRun = false;
            return;
        }

        fetch(
            'http://localhost/Childish-sports-main-2/Childish_sports/src/server.php',
            {
                method: 'POST',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                displayClients(data); // Виводимо клієнтів на екран
            })
            .catch((error) => {
                showPopupMessage(
                    'Сталася помилка при завантаженні клієнтів.',
                    'alert-danger'
                );
            });
    } // Функція для відображення вспливаючого повідомлення

    function showPopupMessage(message, alertClass) {
        responseMessage.textContent = message;
        responseMessage.className = ''; // Очищуємо класи
        responseMessage.classList.add('alert', alertClass);

        setTimeout(() => {
            responseMessage.classList.remove('alert', alertClass); // Прибираємо повідомлення через кілька секунд
        }, 3000);
    } // Зберігаємо клієнта і показуємо повідомлення

    saveBtn.addEventListener('click', function () {
        const clientName = document.getElementById('clientName').value.trim();
        const serviceTime = parseFloat(
            document.getElementById('serviceTime').value
        );
        const serviceCost = parseFloat(
            document.getElementById('serviceCost').value
        );

        // Перевіряємо на порожні значення або некоректні числа
        if (!clientName) {
            showPopupMessage(
                "Будь ласка, введіть ім'я клієнта.",
                'alert-danger'
            );
            return;
        }

        if (isNaN(serviceTime) || serviceTime <= 0) {
            showPopupMessage(
                'Будь ласка, введіть коректний час обслуговування.',
                'alert-danger'
            );
            return;
        }

        if (isNaN(serviceCost) || serviceCost <= 0) {
            showPopupMessage(
                'Будь ласка, введіть коректну вартість.',
                'alert-danger'
            );
            return;
        }

        // Якщо всі значення коректні, продовжуємо
        console.log(
            'Client Name:',
            clientName,
            'Service Time:',
            serviceTime,
            'Service Cost:',
            serviceCost
        );
        // Додаємо клієнта до масиву
        clients.push(client);
        console.log('Client Name:', clientName, 'Type:', typeof clientName);
        console.log('Service Time:', serviceTime, 'Type:', typeof serviceTime);
        console.log('Service Cost:', serviceCost, 'Type:', typeof serviceCost);

        if (!clientName || isNaN(serviceTime) || isNaN(serviceCost)) {
            showPopupMessage('Будь ласка, заповніть усі поля.', 'alert-danger');
            return;
        }
        // Оновлюємо загальну кількість клієнтів і суму
        totalClients += 1;
        totalSum += totalCost;

        // Очищаємо поля введення
        document.getElementById('clientName').value = '';
        document.getElementById('serviceTime').value = '';
        document.getElementById('serviceCost').value = '';
        // recordClient();
        const clientData = {
            name: clientName,
            time: serviceTime,
            cost: serviceCost,
        };
        clients.push(client);
        fetch(
            'http://localhost/Childish-sports-main-2/Childish_sports/src/server.php',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                showPopupMessage(data.message, 'alert-success');
                document.getElementById('clientName').value = '';
                document.getElementById('serviceTime').value = '';
                document.getElementById('serviceCost').value = '';
                loadClients();
            })
            .catch((error) => {
                showPopupMessage(
                    'Сталася помилка при збереженні даних.',
                    'alert-danger'
                );
            });
    }); // Завантаження клієнтів при завантаженні сторінки

    loadClients();
});
