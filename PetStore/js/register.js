"use strict";

document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("register").addEventListener("click", async function () {
        const form = document.querySelector('#form')
        form.addEventListener('submit', async (event) => {

            form.classList.add('was-validated')
            event.preventDefault()
            event.stopPropagation()

            if (!form.checkValidity()) {
                return;
            }
            const nombre = document.querySelector("#validationCustom01").value;
            const email = document.querySelector("#validationCustom02").value;
            const username = document.querySelector('#validationCustom03').value;
            const password = document.querySelector("#validationCustom04").value;

            const user = {

                username: username,
                firstName: nombre,
                email: email,
                pass: password,

            };
            const data = await putData('http://localhost:7777/users', user);
            console.log(data);
            form.submit();
        }, false);
    });


    async function putData(url = '', data = {}) {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(res => console.log(res));
    }
});
