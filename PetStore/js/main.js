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



