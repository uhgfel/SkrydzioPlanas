//Galons per hour
var FuelConsumption;

//Knots
var CruisingSpeed;

function AircraftSelected(){
    var SelectedValue = document.getElementById("AircraftSelector").value;

    switch(SelectedValue){
        case "C152":
            FuelConsumption = 6;
            CruisingSpeed = 90;
            break;
        case "C172":
            FuelConsumption = 7;
            CruisingSpeed = 100;
            break;
        case "CabriG2":
            FuelConsumption = 38; //biski per daug ne? gerai čia
            CruisingSpeed = 80;
            break;
    }
}