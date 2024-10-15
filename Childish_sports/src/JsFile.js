'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const responseMessage = document.getElementById('responseMessage');
    const clientList = document.getElementById('clientList');
    const totalClientsElement = document.getElementById('totalClients');
    const totalCostElement = document.getElementById('totalCost');
    const saveBtn = document.querySelector('.saveBtn');

    // Завантаження клієнтів із сервера  server.php
    function loadClients() {
        fetch('http://localhost/Childish-sports-main-2/Childish_sports/src/', {
            method: 'POST',
        })
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
    }

    // Функція для відображення вспливаючого повідомлення
    function showPopupMessage(message, alertClass) {
        responseMessage.textContent = message;
        responseMessage.className = ''; // Очищуємо класи
        responseMessage.classList.add('alert', alertClass);

        setTimeout(() => {
            responseMessage.classList.remove('alert', alertClass); // Прибираємо повідомлення через кілька секунд
        }, 3000);
    }

    // Зберігаємо клієнта і показуємо повідомлення
    saveBtn.addEventListener('click', function () {
        // const clientName = (document.getElementById('clientName').value = '');
        // const serviceTime = parseFloat;
        // document.getElementById('serviceTime').value = '';
        // const serviceCost = parseFloat(
        //     (document.getElementById('serviceCost').value = '')
        // );

        if (!clientName || !isNaN(serviceTime) || !isNaN(serviceCost)) {
            showPopupMessage('Будь ласка, заповніть усі поля.', 'alert-danger');
            return;
        }

        const clientData = {
            name: clientName,
            time: serviceTime,
            cost: serviceCost,
        };

        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        })
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
    });

    // Завантаження клієнтів при завантаженні сторінки
    loadClients();
});
