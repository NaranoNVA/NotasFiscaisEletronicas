if (window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
 } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 }

 var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });



let valorNotas = document.getElementById("valorNotas");
let totalDeNotas = document.getElementById("totalDeNotas");
let infoNotas = document.getElementById("infoNotas");

function lerNotas() {
    let numNotas = document.getElementById("numNotas").value;

    let tipoNota = document.getElementById("tipoNota").value;

    let totalNotas = 0;
    for(let i = 1; i <= numNotas; i++){
        xmlhttp.open("GET", "/notasfiscais/"+tipoNota+"nota ("+i+").xml", false);
        xmlhttp.send();
        xmlDoc = xmlhttp.responseXML;
        let NodenumNota = xmlDoc.getElementsByTagName("nNF");
        let NodevalorNota = xmlDoc.getElementsByTagName("vNF");

        let numNota = NodenumNota[0].childNodes[0].nodeValue;
        let valorNota = parseFloat(NodevalorNota[0].childNodes[0].nodeValue);
        totalNotas = totalNotas+valorNota;

        popularNota(numNota, valorNota);

        console.log(NodenumNota[0].childNodes[0].nodeValue);
        console.log(NodevalorNota[0].childNodes[0].nodeValue);
    }
    totalDeNotas.innerText = numNotas;
    valorNotas.innerText = formatter.format(totalNotas.toFixed(2));
}

function popularNota(nNF, vNF) {
    var row = infoNotas.insertRow(0);
    row.className = "selecionaLinha";

    var numeroNota = row.insertCell(0);
    var valorNota = row.insertCell(1);
    
    numeroNota.innerText = nNF;
    numeroNota.className = "text-primary";

    valorNota.innerText = "R$ "+vNF;
    valorNota.className = "text-danger";
}

function removerNotas() {
    while(infoNotas.rows.length > 0) {
        infoNotas.deleteRow(0);
    }
    
    totalDeNotas.innerText = "";
    valorNotas.innerText = "";

}