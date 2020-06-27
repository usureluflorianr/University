const inpKey = document.getElementById("inpKey");
const inpValue = document.getElementById("inpValue");
const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById("lsOutput");

btnInsert.onclick = function () {
    const key = inpKey.value;
    const value = inpValue.value;

    if (key && value) {
        localStorage.setItem(key, value);
        getThoughts();
    }
};

const btnClear = document.getElementById("btnClear");
btnClear.onclick = function () {
    localStorage.clear();
    getThoughts();
}

function getThoughts(){
    lsOutput.innerText= "";
    for (let i = 1; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);


        lsOutput.innerHTML += 'Title: ' + '"' + key + '"' + '<br \>' + value + '<br \>' + '<br>';
    }
}

getThoughts();

//AICI SUS E LOCALSTORAGE DE LA PROIECTUL DE LABORATOR

//////////////////////////////////////////////////////////////////////////////////////////////