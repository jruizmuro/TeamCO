'use strict';
import { storeData, delUser } from "./main.js";
document.addEventListener("DOMContentLoaded", function () {
    nameLog();
    creaDivAPI("available");
    creaDivAPI("pending");
    creaDivAPI("sold");

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


function creaDivAPI(tipo) {
    const req = new XMLHttpRequest();
    let container = document.querySelector("#container");
    fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=" + tipo)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                let id = "";
                let url = "";
                let nombre = "";
                let categoria = "";

                /*Div superior*/
                const divSuperior = document.createElement("div");
                divSuperior.classList.add("card");
                if (tipo === 'available') {
                    divSuperior.classList.add("bg-green")
                } else if (tipo === 'pending') {
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
                        categoria = element.category.name;
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
                if (tipo === 'available') {
                    pStatus.appendChild(document.createTextNode("Available"));
                } else if (tipo === 'pending') {
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
            });

        });



}

function numRandom() {
    return Math.floor(Math.random() * 32) + 1;
}

function nameLog() {
    let nUser = document.getElementById('nameUser');
    nUser.textContent = sessionStorage.getItem('user');
}


