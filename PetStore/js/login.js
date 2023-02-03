"use strict";

document.addEventListener("DOMContentLoaded", async function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const form = document.getElementById('formulario')
    form.addEventListener('submit', async (event) => {
        const usuario = document.getElementById("usuario").value;
        const pass = document.getElementById("pass").value;

        sessionStorage.setItem("user", usuario);

        await fetch('https://petstore.swagger.io/v2/user/login?username=' + usuario + '&password=' + pass, {
            method: 'GET',
        }).catch(res => console.log(res))
            .then(x => x.json())
            .then(x => {
                if (x.code == 200) {
                    this.location.href = "/index.html";
                }
            });

    });


});




// const datos = {
//     "id": 2,
//     "username": "rita",
//     "firstName": nombre,
//     "lastName": apellido,
//     "email": email,
//     "password": contraseña,
//     "phone": telefono,
//     "userStatus": 1
// };

// async function postData(datos) {
//     await fetch('https://petstore.swagger.io/v2/user', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'accept': 'application/json'
//         },
//         body: JSON.stringify(datos)
//     }).catch(error => {
//         {
//             alert("Error, el usuario especificado ya existe "+error);
//         }
//     })
//         .then(response => response.json());
// }






