"use strict";

document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("login").addEventListener("click", async function () {
        const form = document.querySelector('#formulario')
        form.addEventListener('submit', async (event) => {

            form.classList.add('was-validated')
            event.preventDefault();
            event.stopPropagation();

            if (!form.checkValidity()) {
                return;
            }

            const usuario = document.getElementById("usuario").value;
            const pass = document.getElementById("pass").value;
            let inicio = false;
            await fetch("http://localhost:7777/users")
                .then((response) => response.json())
                .then((data) => {
                    data.forEach(element => {
                        if (element.pass === pass && element.username === usuario) {
                            sessionStorage.setItem("user", usuario);
                            sessionStorage.setItem("idUser", element.id);
                            sessionStorage.setItem("metodo", 'localStorage');
                            inicio = true;
                            form.submit();
                        }
                    })
                })
            if (!inicio) {
                alert('Contraseña o username incorrectos');
                location.reload()
            }
        }, false);

    })
});








