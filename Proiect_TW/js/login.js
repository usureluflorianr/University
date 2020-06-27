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

function httpPost2(theUrl, data)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send( "username="+data.username+"&parola="+data.parola+"&ip="+data.ip+"&visits="+data.visits+"&time="+data.time  );
    return xmlHttp.responseText;
}

const user1 = document.getElementById("inpUser");
const pass1 = document.getElementById("inpPass");
const btnLogin = document.getElementById("btnLogin");
const msjLogin = document.getElementById("msjLogin");

let ip_usu = "";

fetch("https://api.ipify.org?format=json").then(function (response) {
   response.json().then(function (data) {
       ip_usu = data.ip;
   })
});

btnLogin.onclick = function () {
    var u1 = user1.value;
    var p1 = pass1.value;

    if(u1 == "" || p1 == "") return;

    var v = JSON.parse(httpGet("/login"));

    let ok = 0;

    for(var i = 0; i < v.length; ++i)
    {
        var act = v[i];

        if(act.username == u1 && act.parola == crypt(p1))
        {
            ok = 1;

            user1.value = "";
            pass1.value = "";

            msjLogin.innerHTML = "Salut, " + u1 + "! Ai vizitat site-ul nostru de " + v[i].visits + " ori! Ultima oara pe " + v[i].time + " de pe ip-ul: " + v[i].ip;

            httpDelete("/login/" + toString(i));

            var n = new Date(Date.now());
            var y = (n.getFullYear()).toString();
            var m = (n.getMonth() + 1).toString();
            var d = (n.getDate()).toString();

            ///////////////

            let nn = n.toString();

            if(m.length < 2) m = '0' + m;
            if(d.length < 2) d = '0' + d;

            let tm = "";
            tm = tm + d + "." + m + "." + y;

            let poz = 0;

            for (var j = 0; j < nn.length; ++j) {
                if (nn[j] == ":") {
                    poz = j;
                    break;
                }
            }

            let moment = "";
            moment = moment + nn[poz - 2] + nn[poz - 1] + nn[poz] + nn[poz + 1] + nn[poz + 2] + nn[poz + 3] + nn[poz + 4] + nn[poz + 5] + nn[poz + 6];

            tm = tm + " la ora " + moment;
            ///////////////

            v[i].visits = Number(v[i].visits) + 1;
            v[i].ip = ip_usu;
            v[i].time = tm;

            httpPost2("/login", {username: v[i].username, parola: v[i].parola, ip: v[i].ip, visits: v[i].visits, time: v[i].time});

            return;
        }
    }

    if(ok == 0) {
        alert("Username sau parola gresite!");
    }
}

const btnCreate = document.getElementById("btnCreate");

btnCreate.onclick = function () {
    var u1 = user1.value;
    var p1 = pass1.value;

    if(u1 == "" || p1 == "") return;

    let ok = 1;

    var v = JSON.parse(httpGet("/login"));

    for(var i = 0; i < v.length; ++i)
    {
        var act = v[i];

        if(act.username == u1)
        {
            alert("Username deja existent!")
            ok = 0;
            user1.value = "";
            pass1.value = "";
            return;
        }
    }

    if(ok == 1)
    {
        var n = new Date(Date.now());
        var y = (n.getFullYear()).toString();
        var m = (n.getMonth() + 1).toString();
        var d = (n.getDate()).toString();

        ///////////////

        let nn = n.toString();

        if(m.length < 2) m = '0' + m;
        if(d.length < 2) d = '0' + d;

        let tm = "";
        tm = tm + d + "." + m + "." + y;

        let poz = 0;

        for (var j = 0; j < nn.length; ++j) {
            if (nn[j] == ":") {
                poz = j;
                break;
            }
        }

        let moment = "";
        moment = moment + nn[poz - 2] + nn[poz - 1] + nn[poz] + nn[poz + 1] + nn[poz + 2] + nn[poz + 3] + nn[poz + 4] + nn[poz + 5] + nn[poz + 6];

        tm = tm + " la ora " + moment;

        httpPost2("/login", {username: u1, parola: crypt(p1), ip: ip_usu, visits: "1", time: tm});

        msjLogin.innerHTML = "Salut, " + u1 + ", bun venit!";

        user1.value = "";
        pass1.value = "";
    }

}

function crypt(pwp){
    let cod = 0;
    let put = 313;
    const mod = 666013;
    for(var i = 0; i < pwp.length; ++i)
    {
        cod = (cod * 313 + pwp[i].charCodeAt(0)) % mod;
    }

    return cod.toString();
}