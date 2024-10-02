'use strict';

//debugger;
document.addEventListener('DOMContentLoaded', function () {
    //const saveBtn = document.getElementById('saveBtn');
    const responseMessage = document.getElementById('responseMessage');
    const clientList = document.getElementById('clientList');
    const totalClientsElement = document.getElementById('totalClients');
    const totalCostElement = document.getElementById('totalCost');

    // Функція для відображення клієнтів
    function displayClients(clients) {
        clientList.innerHTML = ''; // Очищення списку
        let totalClients = 0;
        let totalCost = 0;

        clients.forEach((client) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${client.name} - ${client.time} хв. - ${client.cost} грн.`;
            clientList.appendChild(listItem);

            totalClients++;
            totalCost += parseFloat(client.cost);
        });

        totalClientsElement.textContent = `Загальна кількість відвідувачів: ${totalClients}`;
        totalCostElement.textContent = `Загальна сума: ${totalCost.toFixed(
            2
        )} грн`;
    }

    // Завантаження клієнтів із сервера
    function loadClients() {
        setTimeout(() => {
            responseMessage.classList.remove('alert');
        }, 1000);

        fetch('server.php', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                displayClients(data);
            })
            // .then((json) => console.log(json))
            .catch((error) => {
                responseMessage.textContent =
                    'Сталася помилка при завантаженні клієнтів.';
                responseMessage.classList.add('alert', 'alert-danger');
            });
    }

    // Зберігаємо клієнта
    responseMessage.addEventListener('click', function () {
        const clientName = (document.getElementById('clientName').value = '');
        const serviceTime = (document.getElementById('serviceTime').value = '');
        const serviceCost = (document.getElementById('serviceCost').value = '');

        if (!clientName || !serviceTime || !serviceCost) {
            responseMessage.textContent = 'Будь ласка, заповніть усі поля.';
            responseMessage.classList.add('alert', 'alert-danger');
            return;
        }

        const clientData = {
            name: clientName,
            time: serviceTime,
            cost: serviceCost,
        };

        // Відправляємо дані на сервер
        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        })
            .then((response) => response.json())
            .then((data) => {
                responseMessage.textContent = data.message;
                responseMessage.classList.remove('alert-danger');
                responseMessage.classList.add('alert', 'alert-success');

                // Очищуємо поля форми
                document.getElementById('clientName').value = '';
                document.getElementById('serviceTime').value = '';
                document.getElementById('serviceCost').value = '';

                // Оновлюємо список клієнтів
                loadClients();
            })
            .catch((error) => {
                responseMessage.textContent =
                    'Сталася помилка при збереженні даних.';
                responseMessage.classList.add('alert', 'alert-danger');
            });
    });

    // Завантаження клієнтів при завантаженні сторінки
    // ;

    loadClients();
});
