"use strict";

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
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
        const foto = document.querySelector("#validationCustom03").value;

        const pet = {
            category: categoria,
            name: dogName,
            photoUrls: foto,
            tipo: "available"
        };
        const data = await postData('http://localhost:7777/pets', pet);
        console.log(data);
        form.submit();
    }, false);
});


async function postData(url = '', data = {}) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
}