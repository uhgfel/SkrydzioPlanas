var distan;
var distanar = Array();
var distanall=0;
function Atstumai(){
    //Paspausi ant webo desini ir inspect, tada consolej matysi output
    for(var i = 1; i < NodeArray.length; i++){   
        NodeArray[i].latlng;
        distan=map.distance(NodeArray[i-1].latlng,NodeArray[i].latlng);
        distanall=distanall+distan;
        

        distanar[i-1] = distan/1850;
    }   
    console.log("bendras lygus atstumas", distanall/1850);
    distanall=0;

}
var headingas;
var headingar=Array();
function GautiHeadinga(){
    for (var i=1; i<NodeArray.length; i++){
        var lat1 =NodeArray[i].lat-NodeArray[i-1].lat;
        var lng1 =NodeArray[i].lng-NodeArray[i-1].lng;
        
        if (NodeArray[i-1].lat<NodeArray[i].lat &&NodeArray[i-1].lng<NodeArray[i].lng) {
        headingas = 90-(Math.atan(lat1/lng1)*57.295779513);
        headingar[i-1]=headingas;
        } else if (NodeArray[i-1].lat>NodeArray[i].lat &&NodeArray[i-1].lng<NodeArray[i].lng){
        headingas = 180-(Math.atan(-lng1/lat1)*57.295779513);
        headingar[i-1]=headingas;}
        else if (NodeArray[i-1].lat>NodeArray[i].lat &&NodeArray[i-1].lng>NodeArray[i].lng){
        headingas = 180+(Math.atan(-lng1/-lat1)*57.295779513);
        headingar[i-1]=headingas;}
        
        else {
            headingas = 270+(Math.atan(lat1/-lng1)*57.295779513);
            headingar[i-1]=headingas;
        }
    }

}


var time1;
var time2
var fuel1;
var timear=Array();
var fuelar=Array();
function SpeedFuel(){
    for (var i=1; i<NodeArray.length; i++){
time1=distanar[i-1]/CruisingSpeed;
time2=time1*60;
fuel1=time1*FuelConsumption;
timear[i-1]=time2;
fuelar[i-1]=fuel1;}
var blokas =[distanar,headingar,timear,fuelar];
var blokasss ={distanar, headingar}//nereikia sito
console.log("PARAMETRAI: \n 1 atstumas \n 2 heading \n 3 laikas \n 4 reikiamas kuras",blokas);

}

blokas.distanar[3];//nereikia sito

function iterpti(){
    for(var i = 0; distanar.length; i++){
        document.getElementById("atstumas" + i.toString()).value = distanar[1]; }
}