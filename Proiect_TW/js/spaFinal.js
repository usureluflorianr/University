function readTextFile(str) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "http://localhost:3000/"+str, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            var allText = rawFile.responseText;
            document.getElementsByTagName("main")[0].innerHTML = allText;
        }
    }
    rawFile.send();
}

var aboutButton = document.getElementById("about");
aboutButton.addEventListener("click", () => {
    readTextFile(str);
});


