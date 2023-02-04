'use strict';

/*Funcion que guarda los datos de la mascota en el localStorage*/
export function storeData(id, url, name, categoria, tipo) {
    let arrayData = [];
    arrayData.push({
        id: id,
        url: url,
        name: name,
        categoria: categoria,
        tipo: tipo,
    });
    localStorage.setItem("arrayData", JSON.stringify(arrayData));
}


export function getArrayData() {
    let arrayData = localStorage.getItem("arrayData");
    if (arrayData === null) {
        return arrayData = [];
    }
    return arrayData = JSON.parse(arrayData);
}


export async function delUser() {
    const dataDeleteUser = {
        "id": 0,
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": "string",
        "phone": "string",
        "userStatus": 0
    };
    await fetch('https://petstore.swagger.io/v2/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(dataDeleteUser)
    }).catch(error => {
        {
            alert("Error, al eliminar el usuario " + error);
        }
    })
        .then(response => response.json());
}



