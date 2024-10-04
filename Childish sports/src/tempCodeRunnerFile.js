'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const saveBtn = document.getElementById('saveBtn');
    const responseMessage = document.getElementById('responseMessage');

    saveBtn.addEventListener('click', function () {
        const clientName = document.getElementById('clientName').value;
        const serviceTime = document.getElementById('serviceTime').value;
        const serviceCost = document.getElementById('serviceCost').value;

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

        // Використання fetch для відправки даних на PHP-сервер
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
            })
            .catch((error) => {
                responseMessage.textContent =
                    'Сталася помилка при збереженні даних.';
                responseMessage.classList.add('alert', 'alert-danger');
            });
    });
});
// document.addEventListener('DOMContentLoaded', function () {
//     const parentElement = document.getElementById('.my-parent');
//     const clientName = document.getElementById('clientName').value;
//     const serviceTime = document.getElementById('serviceTime').value;
//     const serviceCost = document.getElementById('serviceCost').value;
//     const saveBtn = document.getElementById('saveBtn');
//     const responseMessage = document.querySelectorAll('responseMessage');

//     parentElement.addEventListener('click', (event) => {
//         if (
//             event.target.id === 'responseMessage' ||
//             event.target.id === 'saveBtn' ||!clientName ||!serviceTime ||!serviceCost

//         ) {
//             // Обработка клика
//             responseMessage.textContent = 'Будь ласка, заповніть усі поля.';
//             responseMessage.classList.add('alert', 'alert-danger');
//             return;
//         }
//     });
//     //debugger;

//     const clientData = {
//         name: clientName,
//         time: serviceTime,
//         cost: serviceCost,
//     };

//     // Використання fetch для відправки даних на PHP-сервер
//     fetch('server.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(clientData),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             responseMessage.textContent = data.message;
//             responseMessage.classList.remove('alert-danger');
//             responseMessage.classList.add('alert', 'alert-success');
//         })
//         .catch((error) => {
//             responseMessage.textContent =
//                 'Сталася помилка при збереженні даних.';
//             responseMessage.classList.add('alert', 'alert-danger');
//         });
// });
