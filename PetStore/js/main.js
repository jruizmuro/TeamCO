'use strict';

/*Funcion que guarda los datos de la mascota en el localStorage*/
export function storeData(id, url) {
    let arrayData = [];
    arrayData.push({
        id: id,
        url: url,
    });
    localStorage.setItem("arrayData", JSON.stringify(arrayData));
}




