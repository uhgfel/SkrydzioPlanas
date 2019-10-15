var distan;
var distanar = Array();
var distanall=0;
function Atstumai(){
    //Paspausi ant webo desini ir inspect, tada consolej matysi output
    for(var i = 0; i < NodeArray.length; i++){
        console.log(i);
        if(i>0){
            NodeArray[i].latlng;
            distan=map.distance(NodeArray[i-1].latlng,NodeArray[i].latlng);
            distanall=distanall+distan;

        }
        else{
            distan=0;
            
        }
        distanar[i] = distan/1850;

    }   
    console.log(distanar);
    console.log("bendras lygus ", distanall/1850)
}