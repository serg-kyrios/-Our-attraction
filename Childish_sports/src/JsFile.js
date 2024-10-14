'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const responseMessage = document.getElementById('responseMessage');
    const clientList = document.getElementById('clientList');
    const totalClientsElement = document.getElementById('totalClients');
    const totalCostElement = document.getElementById('totalCost');
    const saveBtn = document.querySelector('.saveBtn');
    // Функція для відображення клієнтів
    // function displayClients(clients) {
    //     clientList.innerHTML = ''; // Очищення списку
    //     let totalClients = 0;
    //     let totalCost = 0;

    //     // clients.forEach((client) => {
    //     //     const listItem = document.createElement('li');
    //     //     listItem.classList.add('list-group-item');
    //     //     listItem.textContent = `${client.name} - ${client.time} хв. - ${client.cost} грн.`;
    //     //     clientList.appendChild(listItem);

    //     //     totalClients++;
    //     //     totalCost += parseFloat(client.cost);
    //     // });

    //     totalClientsElement.textContent = `Загальна кількість відвідувачів: ${totalClients}`;
    //     totalCostElement.textContent = `Загальна сума: ${totalCost.toFixed(
    //         2
    //     )} грн`;
    // }
    // function displayClients(clients) {
    //     const clientList = document.getElementById('clientsList');
    //     clientList.innerHTML = ''; // Очищуємо список

    //     clients.forEach((client) => {
    //         const listItem = document.createElement('div'); // Замість li використовуємо div
    //         listItem.classList.add('list-group-item');
    //         listItem.textContent = `${client.name} - ${client.time} хв. - ${client.cost} грн.`;
    //         clientList.appendChild(listItem);
    //     });
    // }

    // Завантаження клієнтів із сервера  server.php
    function loadClients() {
        fetch('http://localhost/Childish-sports-main-2/Childish_sports/src', {
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
        const clientName = document.getElementById('clientName').value.trim();
        const serviceTime = parseFloat(
            document.getElementById('serviceTime').value.trim()
        );
        const serviceCost = parseFloat(
            document.getElementById('serviceCost').value.trim()
        );

        if (!clientName || isNaN(serviceTime) || isNaN(serviceCost)) {
            showPopupMessage('Будь ласка, заповніть усі поля.', 'alert-danger');
            return;
        }

        const clientData = {
            name: clientName,
            time: serviceTime,
            cost: serviceCost,
        };

        fetch('http://localhost/Childish-sports-main-2/Childish sports/src', {
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
