'use strict';
import { storeData, delUser, storeDataLocal, getArrayDataLocal } from "./main.js";
document.addEventListener("DOMContentLoaded", function () {

    nameLog();

    document.getElementById('btnCambio').onclick = function () {
        var radios = document.getElementsByName('metodo');
        for (var radio of radios) {
            if (radio.checked) {
                sessionStorage.setItem("metodo", radio.value);
            }
        }
    }

    creaDivAPI();

});

document.getElementById("deleteUser").addEventListener("click", async function () {
    delUser();
    sessionStorage.clear();
    location.href = "login.html";
});

document.getElementById("closeSession").addEventListener("click", function () {
    sessionStorage.clear();
    location.href = "login.html";
});


async function creaDivAPI() {
    let container = document.querySelector("#container");
    let arrayPets = [];

    if (sessionStorage.getItem("metodo") === 'localStorage') {
        await fetch("http://localhost:7777/pets")
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    storeDataLocal(element.id, element.photoUrls, element.name, element.category, element.tipo);
                })
            })
        let arrayDataLocal = getArrayDataLocal();
        arrayPets = arrayDataLocal;
        localStorage.removeItem('arrayDataLocal');
    }



    if (sessionStorage.getItem("metodo") === 'indexDB') {
        const indexedDB = window.indexedDB
        let arrayData = [];
        if (indexedDB) {
            let db
            const request = indexedDB.open('petsList', 1)

            request.onsuccess = () => {
                db = request.result
                readData()
            }

            request.onupgradeneeded = (e) => {
                db = e.target.result
                const objectStore = db.createObjectStore('pets', {
                    autoIncrement: true
                })
            }

            request.onerror = (error) => {
                console.log('Error', error)
            }

            const addData = (data) => {
                const transaction = db.transaction(['pets'], 'readwrite')
                const objectStore = transaction.objectStore('pets')
                const request = objectStore.add(data)
                
            }

            await fetch("http://localhost:7777/pets")
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    const data = {
                        id: element.id,
                        url: element.photoUrls,
                        name: element.name,
                        categoria: element.categoria,
                        tipo: element.tipo
                    }
                    addData(data);
                })

            })

            const readData = () => {
                const transaction = db.transaction(['pets'], 'readonly')
                const objectStore = transaction.objectStore('pets')
                const request = objectStore.openCursor()
                request.onsuccess = (e) => {
                    const cursor = e.target.result
                    if (cursor) {
                        arrayData.push({
                            id: cursor.value.id,
                            url: cursor.value.url,
                            name: cursor.value.name,
                            categoria: cursor.value.categoria,
                            tipo: cursor.value.tipo
                        })
                        cursor.continue();
                    }
                }
            }

        }

    }


    if (sessionStorage.getItem("metodo") === 'sessionStorage') {
        await fetch("http://localhost:7777/pets")
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                storeDataSession(element.id, element.photoUrls, element.name, element.category, element.tipo);
            })
        })
    let arrayDataSession = getArrayDataSession();
    arrayPets = arrayDataSession;
    sessionStorage.removeItem('arrayDataSession');

    }



    arrayPets.forEach(element => {
        let id = "";
        let url = "";
        let nombre = "";
        let categoria = "";
        let tipo = "";
        /*Div superior*/
        const divSuperior = document.createElement("div");
        divSuperior.classList.add("card");
        if (element.tipo === 'available') {
            divSuperior.classList.add("bg-green")
        } else if (element.tipo === 'pending') {
            divSuperior.classList.add("bg-blue")
        } else {
            divSuperior.classList.add("bg-red")
        }


        divSuperior.style.width = "18rem";
        divSuperior.style.marginBottom = "1.5rem";


        /*Imagen de la mascota*/
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.alt = 'Imagen de una mascota';

        /*Div que contiene los datos de la mascota (nombre, categoria y estado)*/
        const divDatos = document.createElement("div");

        /*Datos de la mascota*/
        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.classList.add("color-white")
        const pCat = document.createElement("p");
        const pStatus = document.createElement("p");
        pCat.classList.add("card-text");
        pCat.classList.add("color-white");
        pStatus.classList.add("card-text");
        pStatus.classList.add("color-white");

        /*Datos de las mascotas*/
        for (let x in element) {
            if (x === "category") {
                categoria = element.category;
            }
            if (x === "id") {
                id = element.id;

            }
            if (x === "name") {
                nombre = element.name;
            }
            if (x === "photoUrls") {
                url = element.photoUrls[0];
            }
            if (x === "tipo") {
                tipo = element.tipo;

            }
        }

        if (typeof url === "undefined" || !url.includes("http")) {
            let num = numRandom();
            url = "./media/images/" + num + ".jpg";
            img.src = url;
        } else {
            img.src = url;
        }

        divSuperior.addEventListener("click", function () {
            storeData(id, url, nombre, categoria, tipo);
            location.href = "./info.html";
        })
        pCat.appendChild(document.createTextNode(categoria));
        if (element.tipo === 'available') {
            pStatus.appendChild(document.createTextNode("Available"));
        } else if (element.tipo === 'pending') {
            pStatus.appendChild(document.createTextNode("Pending"));
        } else {
            pStatus.appendChild(document.createTextNode("Sold"));
        }

        h5.appendChild(document.createTextNode(nombre));

        divSuperior.appendChild(img);
        divDatos.appendChild(h5);
        divDatos.appendChild(pCat);
        divDatos.appendChild(pStatus);

        divSuperior.appendChild(divDatos);

        container.appendChild(divSuperior);
    })
};





function numRandom() {
    return Math.floor(Math.random() * 32) + 1;
}

function nameLog() {
    let nUser = document.getElementById('nameUser');
    nUser.textContent = sessionStorage.getItem('user');
}

