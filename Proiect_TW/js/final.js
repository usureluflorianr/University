const btnAdd = document.getElementById("btnAdd");
const inpProj = document.getElementById("inpProj");
const inpNum = document.getElementById("inpNum");
const inpText = document.getElementById("inpText");
const btnNum_10 = document.getElementById("btnNum_10x");
const btnNum_x2 = document.getElementById("btnNum_x^2");
const btnNum_x3 = document.getElementById("btnNum_x^3");
const btnNum_sqrt = document.getElementById("btnNum_sqrt");
const btnNum_xfct = document.getElementById("btnNum_x!");

var editNow = 0;
var chichi = 0; //id-ul unde voi edita

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function httpDelete(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function deleteProject(id){
    httpDelete("/projects/"+id);
    getProjects();
}

function editProject(id, project) {
    document.getElementById("inpProj").value = project.name;
    document.getElementById("inpText").value = project.description;
    window.editNow = 1;
    window.chichi = id;
}

function getProjects() {
    var projects = JSON.parse(httpGet("/projects"));
    var container = document.getElementById("projects-body");
    container.innerText = "";

    for(var i=0;i<projects.length;i++){

        let project = projects[i];
        var el = document.createElement("div");
        el.classList.add("project");
        var title = document.createElement("h2");
        title.textContent = project.name;
        el.appendChild(title);
        var description = document.createElement("h4");
        description.textContent = project.description;
        el.appendChild(description);
        /*var image = document.createElement("img");
        image.src = project.image;
        el.appendChild(image);*/

        var deleteButton = document.createElement("button");
        deleteButton.id = i;
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener('click', function(){
            deleteProject(this.id);
        });
        el.appendChild(deleteButton);

        var editButton = document.createElement("button");
        editButton.id = i;
        editButton.innerText = "Edit";
        editButton.addEventListener('click',function () {
            editProject(this.id, project);

            /*projects[usu.id].name = usu.name;
            projects[usu.id].description = usu.description;

            for(var j=0;j<projects.length;j++)
            {
                httpDelete("/projects/"+toString(j));
                httpPost("/projects", {name: projects[j].name , description: projects[j].description});
            }*/
            getProjects();
        });

        el.appendChild(editButton);
        container.appendChild(el);
    }
}

getProjects();


function addElem(){
    var title = inpProj.value;
    var textProj = inpText.value;
    httpPost("/projects", {name: title , description: textProj});
    document.getElementById("inpProj").value = null;
    document.getElementById("inpText").value = null;

    getProjects();
}

btnAdd.onclick = function () {
    if(window.editNow == 0)
    {
        if(document.getElementById("inpProj").value == "chichi" && document.getElementById("inpText").value == "darius si tifui")
        {
            if(confirm('Pe bune?')) {
                document.getElementById("inpProj").value = "Pazea...";
                document.getElementById("inpText").value = "pazea ca vine baiatu";
                addElem();
            }
        }
        else if(document.getElementById("inpProj").value != "")
            if(document.getElementById("inpText").value != "")
                addElem();
    }
    else
    {
        window.editNow = 0;

        var projects = JSON.parse(httpGet("/projects"));

        if(document.getElementById("inpProj").value != "" && document.getElementById("inpText").value != "") {

            projects[chichi].name = document.getElementById("inpProj").value;
            projects[chichi].description = document.getElementById("inpText").value;

            for (var j = 0; j < projects.length; j++) {
                httpDelete("/projects/" + toString(j));
                httpPost("/projects", {name: projects[j].name, description: projects[j].description});
            }

            document.getElementById("inpProj").value = null;
            document.getElementById("inpText").value = null;

            getProjects();
        }
        else window.editNow = 1;
    }
}

//httpPut("/projects", {name: title, description: text});

function httpPost(theUrl, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send( "name="+data.name+"&description="+data.description  );
    return xmlHttp.responseText;
}

function httpPut(theUrl, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "PUT", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send( "name="+data.name+"&description="+data.description  );
    return xmlHttp.responseText;
}

//CE E AICI MAI SUS A FOST DE LA LABORATOR

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//AICI FAC CALCULATORUL, TASK 1 NIVEL 1

function pleasure_lst(nr)
{
    var para = document.createElement("p");                       // Create a <p> node
    para.setAttribute("class", "pp");
    var t = document.createTextNode("Ne iubiti: "+ nr + " de mult!");      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("pleasure_list").appendChild(para);           // Append <p> to <div> with id="myDIV"
    document.getElementById("inpNum").value = null;
}

/*
const btnNum_xfct = document.getElementById("btnNum_x!");*/

btnNum_10.onclick = function()
{
    var nr = Number(inpNum.value);
    if (nr != 0) {
        nr = 10 * nr;
        pleasure_lst(nr);
    }
}

btnNum_x2.onclick = function()
{
    var nr = Number(inpNum.value);
    if (nr != 0) {
        nr = nr * nr;
        pleasure_lst(nr);
    }
}

btnNum_x3.onclick = function()
{
    var nr = Number(inpNum.value);
    if (nr != 0) {
        nr = nr * nr * nr;
        pleasure_lst(nr);
    }
}

btnNum_sqrt.onclick = function()
{
    var nr = Number(inpNum.value);
    if (nr != 0) {
        nr = Math.sqrt(nr);
        pleasure_lst(nr);
    }
}

btnNum_xfct.onclick = function()
{
    var nr = Number(inpNum.value);

    var sol = 1;

    if (nr != 0) {
        for(var i = 1; i <= nr; ++i) sol = sol * i;
        pleasure_lst(sol);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

//AICI FAC TIMERUL, TASK 6 NIVEL 1

const startingMinutes = 10;
let time = startingMinutes * 60;
const countdownEl = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown()
{
    if(time == 0)
    {
        countdownEl.innerText = "Vrei deja! <3";
        return;
    }
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    countdownEl.innerText = minutes + ':' + seconds;

    time--;
}

///////////////////////////////////////////////////////////////////////////

//AICI FAC MESAJUL RANDOM 'RAVASE', TASK 7 NIVEL 1

const citat = document.getElementById('citat');

function ravase()
{
    var citate = ["Bogatii sunt bogati pentru ca nu gandesc ca saracii!" , "E pacat sa pui surub unde merge bine sarma!" , "Food is information!" , "Parazitul de care scapi cel mai greu este ideea!"];

    var nr = Math.floor(Math.random() * 4);

    citat.innerText = citate[nr];
}

ravase();

//////////////////////////////////////////////////////////////////////////////

//AICI FAC ASCUNSUL/AFISATUL IMAGINILOR, TASK 8 NIVEL 1

let ascuns = 0;

function ascunde()
{
    document.getElementById("chef").style.visibility = "hidden";
    document.getElementById("chef2").style.visibility = "hidden";
    document.getElementById("chef3").style.visibility = "hidden";
}

function ne_ascunde()
{
    document.getElementById("chef").style.visibility = "visible";
    document.getElementById("chef2").style.visibility = "visible";
    document.getElementById("chef3").style.visibility = "visible";
}

const ascunde_img = document.getElementById('ascunde_img');

ascunde_img.innerText = "Ascunde imagini";

ascunde_img.onclick = function () {
    if(ascuns == 0)
    {
        ascuns = 1;
        ascunde();
        ascunde_img.innerText = "Afiseaza imagini";
    }
    else
    {
        ascuns = 0;
        ne_ascunde();
        ascunde_img.innerText = "Ascunde imagini";
    }
}

///////////////////////////////////////////////////////////////////////////////////////

//AICI CULOAREA DE FUNDAL, TASK 11 NIVEL 1

const inpBG = document.getElementById("inpBG");
const buttonBg = document.getElementById("btnBG");

buttonBg.onclick = function() {
    var bgc = inpBG.value;
    inpBG.value = null;
    document.getElementById("corp").setAttribute("bgcolor", bgc);

    let culoare_invalida = 0;

    if(culoare_invalida != 0) alert("Culoare invalida!");
}

//////////////////////////////////////////////////////////////////////////////////////

//AICI TASKUL CU TITLUL CARE AFISEAZA CATE 2 CARACTERE, TASK 3 NIVEL 2

const tita = document.getElementById("tita");

let st = -1;
let dr = 35;

function animatie_titlu() {

    ++st;
    --dr;

    if(st > dr) return;

    var titlu = "Ce culoare doriti sa aiba fundalul?";

    var afis = "";

    for(var i = 0; i <= st; ++i) afis = afis + titlu[i];
    for(var i = st + 1; i < dr; ++i) afis = afis + " ";
    for(var i = dr; i <= 34; ++i) afis = afis + titlu[i];

    tita.innerText = afis;
}

setInterval(animatie_titlu, 100);

/////////////////////////////////////////////////////////////////////////////////////////////

//AICI SECTIUNEA DE TEXT CODIFICATA, TASK 22 NIVEL 3

const inpCodif = document.getElementById("inpCodif");
const codif = document.getElementById("codif");

function data_codif() {
    var n = new Date(Date.now());
    var y = (n.getFullYear()).toString();
    var m = (n.getMonth() + 1).toString();
    var d = (n.getDate()).toString();

    if(m.length < 2) m = '0' + m;

    if(d.length < 2) d = '0' + d;

    y = y[2] + y[3];

    var cod = y + '#' + d + '#' + m;

    codif.innerHTML = cod;

    return cod;
}

let e_decodif = 0;

function create_codif()
{
    var text_codif = "Un simpozion de informatica a avut loc in urma cu cateva zila la Colegiul National Tudor Vladimirescu din Targu Jiu! Evenimentul a fost organizat de catre doi elevi ai liceului, Florian Usurelu si Mihnea Popeanga. Amfiteatrul CNTV a fost plin, la eveniment participant atat elevi, cat si profesori de la alte licee din Targu Jiu. Domnul Profesor Eugen Nodea, profesor de informatica la CNTV a sustinut ca grupul a incercat sa creeze un eveniment IT care a fost deschis oricui, venind foarte multi elevi din alte scoli, precum si profesori de alte discipline, iar acest lucru ma surprinde si denota ca informatica a patruns in toate domeniile. Florian Usurelu, unul dintre organizatori a punctat temele care au fost prezente: Am discutate despre inteligenta artificiala si criptomonede, dar si despre tendintele din tehnologie. Invitatii speciali au fost Andrei Margeloiu, student la UCL in Londra, desemnat cel mai bun student roman din Anglia in urma cu doi ani si Radu Stochitoiu, masterand la Politehnica Bucuresti, care a urmat internship-uri la Google si Bloomberg";

    if(e_decodif == 1)
    {
        codif.innerHTML = text_codif;
    }

    else
    {
        let text2 = "";
        for(var i = 0; i < text_codif.length; ++i) {
            if (text_codif[i] != ' ') text2 += String.fromCharCode(text_codif[i].charCodeAt(0) + 1);
            else text2 += text_codif[i];
        }
        codif.innerHTML = text2;
    }
}

create_codif();

inpCodif.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 && inpCodif.value != "") {
        event.preventDefault();
        if(data_codif() != inpCodif.value)
        {
            alert("Parola gresita!");
            e_decodif = 0;
            inpCodif.value = "";
            create_codif();
        }

        else
        {
            inpCodif.value = "";
            e_decodif = 1;
            create_codif();
        }
    }
});

///////////////////////////////////////////////////////////////////////////////////////

//AICI PROMPTUL, TASK 16 NIVEL 1

var person = prompt("Cum te numesti?");

let schimbat2s = 0;

function salut_usu() {
    if(schimbat2s == 1)
    {
        document.title = "iGorj";
        return;
    }
    document.title = "Salut, " + person + "!";
    schimbat2s = 1;
}

salut_usu();

setInterval(salut_usu, 2000);

////////////////////////////////////////////////////////////////////////////////////////////

//AICI VARSTA UTILIZATOR, TASK 1, NIVEL 2

const age = document.getElementById("age");
const inpAge = document.getElementById("inpAge");
const btnAge = document.getElementById("btnAge");

let actualizare_age = 0;
let ani = 0;
let luni = 0;
let zile = 0;
let ore = 0;
let minute = 0;
let secunde = 0;

btnAge.onclick = function () {
    actualizare_age = 1;
    let ani2 = 0;
    let luni2 = 0;
    let zile2 = 0;

    let inp = inpAge.value;

    zile2 = 10 * (inp[0].charCodeAt(0) - '0'.charCodeAt(0)) + (inp[1].charCodeAt(0) - '0'.charCodeAt(0));
    luni2 = 10 * (inp[3].charCodeAt(0) - '0'.charCodeAt(0)) + (inp[4].charCodeAt(0) - '0'.charCodeAt(0));
    ani2 = 1000 * (inp[6].charCodeAt(0) - '0'.charCodeAt(0)) + 100 * (inp[7].charCodeAt(0) - '0'.charCodeAt(0)) + 10 * (inp[8].charCodeAt(0) - '0'.charCodeAt(0)) + (inp[9].charCodeAt(0) - '0'.charCodeAt(0));

    inpAge.value = "";

    let acum = new Date(Date.now());
    let sani = (acum.getFullYear()).toString();
    let sluni = (acum.getMonth() + 1).toString();
    let szile = (acum.getDate()).toString();

    acum = acum.toString();

    ani = 0;
    luni = 0;
    zile = 0;

    for (var i = 0; i < sani.length; ++i) {
        ani = ani * 10 + (sani[i].charCodeAt(0) - '0'.charCodeAt(0));
    }

    for (var i = 0; i < sluni.length; ++i) {
        luni = luni * 10 + (sluni[i].charCodeAt(0) - '0'.charCodeAt(0));
    }

    for (var i = 0; i < szile.length; ++i) {
        zile = zile * 10 + (szile[i].charCodeAt(0) - '0'.charCodeAt(0));
    }

    ore = 0;
    minute = 0;
    secunde = 0;

    let poz = 0;

    for (var i = 0; i < acum.length; ++i) {
        if (acum[i] == ":") {
            poz = i;
            break;
        }
    }

    ore = 10 * (acum[poz - 2].charCodeAt(0) - '0'.charCodeAt(0)) + (acum[poz - 1].charCodeAt(0) - '0'.charCodeAt(0));
    minute = 10 * (acum[poz + 1].charCodeAt(0) - '0'.charCodeAt(0)) + (acum[poz + 2].charCodeAt(0) - '0'.charCodeAt(0));
    secunde = 10 * (acum[poz + 4].charCodeAt(0) - '0'.charCodeAt(0)) + (acum[poz + 5].charCodeAt(0) - '0'.charCodeAt(0));

    zile = zile - zile2;

    var nr_zile = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (zile <= 0) {
        zile += nr_zile[luni];
        --luni;
    }

    luni = luni - luni2;
    if (luni2 <= 0) {
        luni += 12;
        --ani;
    }

    ani = ani - ani2;

    age.innerHTML = ani + " ani, " + luni + " luni, " + zile + " zile, " + ore + " ore, " + minute + " minute, " + secunde + " secunde."
}

function update_age(){

    if(actualizare_age == 1) {
        ++secunde;

        if (secunde == 61) {
            secunde = 1;
            ++minute;
        }

        if (minute == 61) {
            minute = 1;
            ++ore;
        }

        if (ore == 24) {
            ore = 0;
            ++zile;
        }

        age.innerHTML = ani + " ani, " + luni + " luni, " + zile + " zile, " + ore + " ore, " + minute + " minute, " + secunde + " secunde."
    }
}

setInterval(update_age, 1000);

/////////////////////////////////////////////////////////////////////////////////////////////////

//AICI E LOCALSTORAGE CU TIMP PETRECUT DE UTILIZATOR, TASK 4 NIVEL 2

const lstime = document.getElementById("lstime");

if (localStorage.getItem("timp_pag") === null) {
    localStorage.setItem("timp_pag", 0);
}

let tusuLS = 0;

let minuteLS = 0;
let secundeLS = 0;

function update_timp(){
    tusu = localStorage.getItem("timp_pag");
    ++tusu;
    localStorage.setItem("timp_pag", tusu);

    minute = Math.floor(tusu / 60);

    secunde = tusu % 60;

    lstime.innerHTML = minute + " minute si " + secunde + " secunde petrecute cu noi.";
}

setInterval(update_timp, 1000);

/////////////////////////////////////////////////////////////////////////////


























