var PointArray = new Array();

var TriangleIcon = L.icon({
	iconUrl: 'NuotraukosETC/TriangleMarker.png',
	shadowUrl: 'NuotraukosETC/TriangleMarker.png',

	iconSize:     [18, 18], // size of the icon
	shadowSize:   [0, 0], // size of the shadow
	iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
	shadowAnchor: [0, 0],  // the same for the shadow
	popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

function PointAdd(Name, lat, lng){
     PointArray[Name] = L.marker([lat, lng], {icon: TriangleIcon})
        .addTo(map)
        .on('click', function(e){
            CreateTempMarker(e,"<p><b>" + Name + "<p/><b/><button onClick=\"onAddpoint()\">Add point</button>");
            UserTextInput = Name;
        });
}

function PointRemove(Name){
    PointArray[Name].remove();
    PointArray.splice(Name, 1);
}

//Sudeda visus taskus ant zemelapio
window.onload = function(){
	this.LoadPoints();
	this.UpdatePointsOnSelectors();
	this.ConfigureSelector(document.getElementsByClassName("Selector")[0]);
	//Add event lisiner for point added or removed so that selector would change
}

function LoadPoints(){
    PointAdd("Alanta"   ,55.35111111,   25.29527778);
    PointAdd("Alytus"   ,54.41444444,   24.05833333);
    PointAdd("Anykščiai"   ,55.52416667,   25.10083333);
    PointAdd("Antalieptė"   ,55.66666667,   25.86666667);
    PointAdd("Ariogala"   ,55.26555556,   23.46444444);
    PointAdd("Arvydai"	,54.825		,	25.56111111); 
	PointAdd("Aukštadvaris"	,54.58		,	24.52611111); 
	PointAdd("Birštonas"	,54.60277778,	24.03472222);
	PointAdd("Biržai"	,56.17611111,	24.76111111);
	PointAdd("Butrimonys"	,54.5025	,	24.24805556);
	PointAdd("Daugai"	,54.35972222,	24.34416667);
	PointAdd("Druskininkai"	,54.01583333,	23.94388889);
	PointAdd("Dubingiai"	,55.05805556,	25.45333333);
	PointAdd("Dusetos"	,55.74361111,	25.83583333);
	PointAdd("EYDR"	,54.01611111,	23.94444444);
	PointAdd("EYKA"	,54.95972222,	24.06527778);
	PointAdd("EYKL"	,55.71527778,	21.24388889);
	PointAdd("EYKS"	,54.88		,	23.88166667); 
	PointAdd("EYMO"	,55.11277778,	25.33638889);
	PointAdd("EYPA"	,55.97333333,	21.09388889);
	PointAdd("EYRD"	,54.49555556,	24.7175    );
	PointAdd("EYSA"	,55.89388889,	23.395     );
	PointAdd("EYVI"	,54.63611111,	25.29361111);
	PointAdd("EYVK"	,54.66833333,	25.51583333);
	PointAdd("ELEKA"	,54.80055556,	24.68888889);
	PointAdd("EPINI"	,54.61388889,	25.43166667);
	PointAdd("Ignalina"	,55.34		,	26.15777778); 
	PointAdd("IKAMU"	,55.34444444,	24.63694444);
	PointAdd("Inturkė"	,55.16111111,	25.57222222);
	PointAdd("Išlaužas"	,54.73888889,	23.925     );
	PointAdd("Jurbarkas"	,55.05333333,	22.72416667);
	PointAdd("Kartena"	,55.91972222,	21.56833333);
	PointAdd("Kedainiai"	,55.78333333,	23.96666667);
	PointAdd("Kelmė"	,55.63333333,	22.93333333);
	PointAdd("Kupiškis"	,55.85		,	24.98333333); 
	PointAdd("LEDVI"	,54.6375	,	25.135     ); 
	PointAdd("MANUX"	,55.67611111,	22.03555556);
	PointAdd("Marijampolė"	,54.55527778,	23.34472222);
	PointAdd("Merkinė"	,54.16138889,	24.18361111);
	PointAdd("Molėtai	"	,55.22055556,	25.40944444);
	PointAdd("N._Akmenė"	,56.31666667,	22.88333333);
	PointAdd("Nemenčinė"	,54.83333333,	25.41666667);
	PointAdd("Paluknys"	,54.47611111,	24.99222222);
	PointAdd("Panevėžys"	,55.70833333,	24.345     );
	PointAdd("Pasvalys"	,56.06166667,	24.39805556);
	PointAdd("Pikeliškės"	,54.84166667,	25.25      );
	PointAdd("Pociūnai"	,54.65388889,	24.05805556);
	PointAdd("Prienai"	,54.63527778,	23.95166667);
	PointAdd("Ramygala"	,55.51083333,	24.30444444);
	PointAdd("Raseiniai"	,55.37972222,	23.12138889);
	PointAdd("RAVPO"	,54.88611111,	24.22      );
	PointAdd("Rokiškis"	,55.94805556,	25.59916667);
	PointAdd("Sasnava"	,54.64916667,	23.46472222);
	PointAdd("Seirijai"	,54.23333333,	23.81666667);
	PointAdd("Simnas"	,54.38333333,	23.65      );
	PointAdd("SITGU"	,55.035		,	23.84111111); 
	PointAdd("Svėdasai"	,55.68111111,	25.36527778);
	PointAdd("Širvintos"	,55.05		,	24.95      ); 
	PointAdd("Taurage"	,55.25		,	22.28333333); 
	PointAdd("Trakų Vokė"	,54.62861111,	25.10805556);
	PointAdd("Troškunai"	,55.58666667,	24.87027778);
	PointAdd("TUSDA"	,55.05027778,	24.13638889);
	PointAdd("Ukmergė"	,55.255		,	24.81638889); 
	PointAdd("Utena"	,55.48944444,	25.71638889);
	PointAdd("Varėna"	,54.20777778,	24.56444444);
	PointAdd("Veliuona"	,55.08222222,	23.27111111);
	PointAdd("Videniškiai"	,55.21722222,	25.27694444);
	PointAdd("Zarasai"	,55.73333333,	26.25      );
	PointAdd("Zavišonys"	,54.43333333,	25.36666667);
	PointAdd("Želva"	,55.2197165492,	25.09888889);
	PointAdd("EYAL"	,54.41527778,	24.05555556);
	PointAdd("Kėdainiai"	,55.28722222,	23.95722222);
	PointAdd("EYMM"	,54.66388889,	23.45194444);
	PointAdd("ULKIL"	,54.87638889,	23.99166667);
	PointAdd("ALISI"	,54.59611111,	25.10527778);
}