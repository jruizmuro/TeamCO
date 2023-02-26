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


export function storeDataLocal(id, url, name, categoria, tipo) {
    let arrayDataLocal = getArrayDataLocal();
    arrayDataLocal.push({
        id: id,
        photoUrls: url,
        name: name,
        category: categoria,
        tipo: tipo,
    });
    localStorage.setItem("arrayDataLocal", JSON.stringify(arrayDataLocal));
}


export function getArrayDataLocal() {
    let arrayDataLocal = localStorage.getItem("arrayDataLocal");
    if (arrayDataLocal === null) {
        return arrayDataLocal = [];
    }
    return arrayDataLocal = JSON.parse(arrayDataLocal);
}

export function storeDataSession(id, url, name, categoria, tipo) {
    let arrayDataSession = getArrayDataSession();
    arrayDataSession.push({
        id: id,
        photoUrls: url,
        name: name,
        category: categoria,
        tipo: tipo,
    });
    sessionStorage.setItem("arrayDataSession", JSON.stringify(arrayDataSession));
}

export function getArrayDataSession() {
    let arrayDataSession = sessionStorage.getItem("arrayDataSession");
    if (arrayDataSession === null) {
        arrayDataSession = [];
    } else {
        arrayDataSession = JSON.parse(arrayDataSession);
    }
    return arrayDataSession;
}


export function getArrayData() {
    let arrayData = localStorage.getItem("arrayData");
    if (arrayData === null) {
        return arrayData = [];
    }
    return arrayData = JSON.parse(arrayData);
}


export async function delUser() {
    await fetch('http://localhost:7777/users/' + sessionStorage.getItem('idUser'), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    }).catch(res => console.log(res));
}



