const btnAdd = document.getElementById("btnAdd");
const inpProj = document.getElementById("inpProj");
const inpText = document.getElementById("inpText");

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