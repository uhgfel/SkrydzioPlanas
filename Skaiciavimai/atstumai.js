var distan;

var distanall;

function PerskaiciuotiAtstumus(){
    Atstumai();
    SpeedFuel();
    GautiHeadinga();

    istrinu();
    SurasytTaskus();
    
    
}

function SurasytTaskus(){
    document.getElementById("vieta" +(0).toString()).innerHTML = NodeArray[0].Name;
    for(var i = 0;i<NodeArray.length; i++){
        distanar.push("");
        headingar.push("");
        timear.push("");
        fuelar.push("");
        document.getElementById("kiekiskam1" ).innerHTML =fuelrec ;
        document.getElementById("kiekiskam" ).innerHTML =distanall ;
        document.getElementById("vieta" +(i+1).toString()).innerHTML = "";
        document.getElementById("vieta" +i.toString()).innerHTML = NodeArray[i].Name;
        document.getElementById("kursas" +i.toString()).innerHTML = headingar[i];
        document.getElementById("fuelcons" +i.toString()).innerHTML = fuelar[i];
        document.getElementById("time" +i.toString()).innerHTML = timear[i];
        document.getElementById("atstumas" +i.toString()).innerHTML = distanar[i];
        distanar[i]=null
        timear[i]=null
        fuelar[i]=null
        headingar[i]=null
        //NodeArray[i].Name=null
    }
}
function istrinu(){
    document.getElementById("vieta" +(0).toString()).innerHTML = "";
    for(var i = 0;i<NodeArray.length; i++){
        document.getElementById("vieta" +i.toString()).innerHTML = "";
        document.getElementById("kursas" +i.toString()).innerHTML = "";
        document.getElementById("fuelcons" +i.toString()).innerHTML = "";
        document.getElementById("time" +i.toString()).innerHTML = "";
        document.getElementById("atstumas" +i.toString()).innerHTML = "";}}
 var distanar = Array(); 
 distanar.push("")     
function Atstumai(){
    distanall=0
    //Paspausi ant webo desini ir inspect, tada consolej matysi output
    for(var i = 1; i < NodeArray.length; i++){   
        NodeArray[i].latlng;
        distan=map.distance(NodeArray[i-1].latlng,NodeArray[i].latlng);
        
        distan=distan/1850
        distan=Math.round(distan * 100) / 100
        distanall=distanall+distan;


        distanar[i-1] = distan;
    }   
    console.log("bendras lygus atstumas", distanall/1850);

}
var headingas;
var headingar=Array();
headingar.push("")
function GautiHeadinga(){
    for (var i=1; i<NodeArray.length; i++){
        var lat1 =NodeArray[i].lat-NodeArray[i-1].lat;
        var lng1 =NodeArray[i].lng-NodeArray[i-1].lng;
        
        if (NodeArray[i-1].lat<NodeArray[i].lat &&NodeArray[i-1].lng<NodeArray[i].lng) {
        headingas = 90-(Math.atan(lat1/lng1)*57.295779513);
        headingas = Math.round(headingas * 100) / 100
        headingar[i-1]=headingas;
        } else if (NodeArray[i-1].lat>NodeArray[i].lat &&NodeArray[i-1].lng<NodeArray[i].lng){
        headingas = 180-(Math.atan(-lng1/lat1)*57.295779513);
        headingas = Math.round(headingas * 100) / 100
        headingar[i-1]=headingas;}
        else if (NodeArray[i-1].lat>NodeArray[i].lat &&NodeArray[i-1].lng>NodeArray[i].lng){
        headingas = 180+(Math.atan(-lng1/-lat1)*57.295779513);
        headingas = Math.round(headingas * 100) / 100
        headingar[i-1]=headingas;}
        
        else {
            headingas = 270+(Math.atan(lat1/-lng1)*57.295779513);
            headingas = Math.round(headingas * 100) / 100
            headingar[i-1]=headingas;
        }
    }

}


var time1;
var time2
var fuel1;
var timear=Array();
var fuelar=Array();
var fuelall
var fuelrec
timear.push("");
fuelar.push("");
function SpeedFuel(){
    fuelall=0
    for (var i=1; i<NodeArray.length; i++){
       
time1=distanar[i-1]/CruisingSpeed;
time2=time1*60;
time2=Math.round(time2 * 100) / 100
fuel1=time1*FuelConsumption;
fuelall=fuel1+fuelall
fuel1=Math.round(fuel1 * 100) / 100
timear[i-1]=time2;
fuelar[i-1]=fuel1; 
}
fuelrec=Math.round((fuelall+0.5*FuelConsumption)*100)/100;
var blokas =[distanar,headingar,timear,fuelar];
console.log("PARAMETRAI: \n 1 atstumas \n 2 heading \n 3 laikas \n 4 reikiamas kuras",blokas);

}

function iterpti(){
    for(var i = 0; distanar.length; i++){
        document.getElementById("atstumas" + i.toString()).value = distanar[1]; }
}
//var table = document.getElementById ("content");
//table.reload ();