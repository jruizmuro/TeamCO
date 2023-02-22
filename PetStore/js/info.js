"use strict";
import { getArrayData } from "./main.js";
document.addEventListener("DOMContentLoaded", async function () {

    const data = await getData();
    const colorDiv = document.getElementById("colorFondo");

    if (getArrayData()[0].tipo === 'available') {
        colorDiv.classList.add("bg-green");
    } else if (getArrayData()[0].tipo === 'pending') {
        colorDiv.classList.add("bg-blue");
    } else {
        colorDiv.classList.add("bg-red");
    }


    document.getElementById("nombreMascota").innerText = getArrayData()[0].name;
    document.getElementById("etiquetaMascota").innerText = getArrayData()[0].categoria;
    document.getElementById("estadoMascota").innerText = getArrayData()[0].tipo;
    document.getElementById("fotoMascota").src = getArrayData()[0].url;

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
            const foto = document.querySelector("#validationCustom03").value;
            const estado = document.querySelector("#estado-input").value;

            const pet = {

                category: categoria,
                name: dogName,
                photoUrls: foto,
                tipo: estado,
                id: getArrayData()[0].id
            };
            const data = await putData('http://localhost:7777/pets/' + getArrayData()[0].id, pet);
            console.log(data);
            form.submit();
        }, false);
    });

    document.getElementById("eliminar").addEventListener("click", async function () {

        const data = await deleteData();
        console.log(data);
        location.href = "./index.html";

    });


    async function putData(url = '', data = {}) {
        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(res => console.log(res));
    }

    async function deleteData() {
        await fetch('http://localhost:7777/pets/' + getArrayData()[0].id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }).catch(res => console.log(res));
    }

    async function getData() {
        return await fetch('http://localhost:7777/pets/' + getArrayData()[0].id, {
            method: 'GET',

        }).catch(res => console.log(res)).then(x => x.json());


    }
});

