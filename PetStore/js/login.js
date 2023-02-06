"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const form = document.getElementById('formulario');
    form.addEventListener('submit', (event) => {
        const usuario = document.getElementById("usuario").value;
        const pass = document.getElementById("pass").value;

        sessionStorage.setItem("user", usuario);
        event.preventDefault();
        event.stopPropagation();
        fetch('https://petstore.swagger.io/v2/user/login?username=' + usuario + '&password=' + pass, {
            method: 'GET',
        }).catch(res => console.log(res))
            .then(x => x.json())
            .then(x => {
                if (x.code === 200) {
                    form.submit();
                }
            });

    });


});




const datos = {
    "id": 2,
    "username": usuario,
    "firstName": "nombre",
    "lastName": "apellido",
    "email": "email",
    "password": pass,
    "phone": "telefono",
    "userStatus": 1
};

async function postData(datos) {
    await fetch('https://petstore.swagger.io/v2/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(datos)
    }).catch(error => {
        {
            alert("Error, el usuario especificado ya existe " + error);
        }
    })
        .then(response => response.json());
}






