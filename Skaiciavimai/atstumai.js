function Atstumai(){
    //Paspausi ant webo desini ir inspect, tada consolej matysi output
    var distan;
    for(var i = 0; i < NodeArray.length; i++){
        if(i>0){
            NodeArray[i].latlng;
            distan=map.distance(NodeArray[i-1].latlng,NodeArray[i].latlng);
        }
        else{
            distan=0;
        }
        console.log(distan/1850)
    }   
}