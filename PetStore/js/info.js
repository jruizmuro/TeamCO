"use strict";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("modificar").addEventListener("click", async function () {
        const form = document.querySelector('#form')
        form.addEventListener('submit', async (event) => {

            form.classList.add('was-validated')
            event.preventDefault()
            event.stopPropagation()

            if (!form.checkValidity()) {
                return;
            }
            const categoria = document.querySelector("#validationCustom01").value;
            const dogName = document.querySelector("#validationCustom02").value;
            const tags = document.querySelector('#tags-input').value;
            const id = Math.trunc(Math.random() * 10000000000);
            const foto = document.querySelector("#validationCustom03").value;
            const estado = document.querySelector("#estado-input").value;

            const pet = {
                id: 2,
                category: {
                    id: 0,
                    name: categoria
                },
                name: dogName,
                photoUrls: [
                    foto
                ],
                tags: [
                    {
                        id: 0,
                        name: tags
                    }
                ],
                status: estado
            };
            const data = await putData('https://petstore.swagger.io/v2/pet', pet);
            console.log(data);
            form.submit();
        }, false);
    });


    async function putData(url = '', data = {}) {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
});

