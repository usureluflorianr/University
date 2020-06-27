//AICI AM ISTORICUL EVENIMETELOR PE SITE, TASK 12 NIVEL 3

let istoric = [];

const btnIst = document.getElementById("btnIst");
const pist = document.getElementById("pist");
const btnIst2 = document.getElementById("btnIst2");

document.addEventListener('keypress', logKey);

function logKey(e) {
    var n = new Date(Date.now());
    var y = (n.getFullYear()).toString();
    var m = (n.getMonth() + 1).toString();
    var d = (n.getDate()).toString();

    var ev_lg = "";

    if(m.length < 2) m = '0' + m;

    if(d.length < 2) d = '0' + d;

    ev_lg = ev_lg + y + "/" + m + "/" + d;

    var m = n.toString();

    var orelg = 0;
    var minutelg = 0;
    var secundelg = 0;

    let poz = 0;

    for (var i = 0; i < m.length; ++i) {
        if (m[i] == ":") {
            poz = i;
            break;
        }
    }

    ev_lg = ev_lg + " " + m[poz - 2] + m[poz - 1] + m[poz] + m[poz + 1] + m[poz + 2] + m[poz + 3] + m[poz + 4] + m[poz + 5];

    if(e.code == "KeyA")
    {
        ev_lg += " keypress, tasta A";
        istoric.push(ev_lg);
    }

    if(e.code == "Space")
    {
        ev_lg += " keypress, tasta Space";
        istoric.push(ev_lg);
    }

    if(e.code == "Enter")
    {
        ev_lg += " keypress, tasta Enter";
        istoric.push(ev_lg);
    }

}
document.addEventListener("click", myFunction);

function myFunction(e) {

    var n = new Date(Date.now());
    var y = (n.getFullYear()).toString();
    var m = (n.getMonth() + 1).toString();
    var d = (n.getDate()).toString();

    var ev_lg = "";

    if(m.length < 2) m = '0' + m;

    if(d.length < 2) d = '0' + d;

    ev_lg = ev_lg + y + "/" + m + "/" + d;

    var m = n.toString();

    var orelg = 0;
    var minutelg = 0;
    var secundelg = 0;

    let poz = 0;

    for (var i = 0; i < m.length; ++i) {
        if (m[i] == ":") {
            poz = i;
            break;
        }
    }

    ev_lg = ev_lg + " " + m[poz - 2] + m[poz - 1] + m[poz] + m[poz + 1] + m[poz + 2] + m[poz + 3] + m[poz + 4] + m[poz + 5];

    ev_lg = ev_lg + " click, coord " + e.clientX + " " + e.clientY;
    istoric.push(ev_lg);
}

btnIst.onclick = function(){
    pist.innerHTML = "";
    for (var i = 0; i < istoric.length; ++i)
    {
        pist.innerHTML += istoric[i] + "<br>";
    }
}

btnIst2.onclick = function(){
    pist.innerHTML = "";
}

const btnIst3 = document.getElementById("btnIst3");

btnIst3.onclick = function(){
    pist.innerHTML = "";
    istoric = [];
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


