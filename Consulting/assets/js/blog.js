'use strict';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('older').addEventListener("click", function () {
        document.getElementById("A").style.display = "none";
        document.getElementById("B").style.display = "none";
        document.getElementById("C").style.display = "";
    })
    document.getElementById('new').addEventListener("click", function () {
        document.getElementById("C").style.display = "none";
        document.getElementById("A").style.display = "";
        document.getElementById("B").style.display = "";
    })
    document.getElementById('all').addEventListener("click", function () {
        document.getElementById("A").style.display = "";
        document.getElementById("B").style.display = "";
        document.getElementById("C").style.display = "";
    })
});