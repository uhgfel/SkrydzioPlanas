//Point is described as marker at spesific location. Saved points on the map.
var PointArray = new Array();

//Describes how saved points should be displayed
var TriangleIcon = L.icon({
	iconUrl: 'NuotraukosETC/TriangleMarker.png',
	shadowUrl: 'NuotraukosETC/TriangleMarker.png',

	iconSize:     [18, 18], // size of the icon
	shadowSize:   [0, 0], // size of the shadow
	iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
	shadowAnchor: [0, 0],  // the same for the shadow
	popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

//Adds saved point with appropriate popup
function PointAdd(Name, lat, lng, Icon){
     PointArray[Name] = L.marker([lat, lng], {icon: TriangleIcon})
        .addTo(map)
        .on('click', function(e){
            CreateTempMarker(e,"<p><b>" + Name + "<p/><b/><button onClick=\"onAddpoint()\">Add point</button>");
            UserTextInput = Name;
        });
}

function AddAerodrome(Lat, Lng, PilnasPavadinimas, LOC_Identification,
                      Elevation, Frequency, RWY_lenght, DrawCircle){
    //Button layout
    var PopUp = "<b>" + PilnasPavadinimas + 
    "</b><br>Location indicator: " + LOC_Identification +
    "<br>ELEV: " + Elevation +
    "'<br>Frequency: " + Frequency +
    " MHz<br>RWY lenght: " +  RWY_lenght +
    "<br><button onClick=\"onAddpoint()\">Add point</button><br/>";

    //Circle
    if(DrawCircle){
        L.circle([Lat, Lng], {
            color: '#33D5FF',
            radius: 5000
        }).addTo(map);
    }

    //Add marker with appropriate events and make accessible in selector bar
    PointArray[LOC_Identification] = L.marker([Lat, Lng], {icon: greenIcon}).addTo(map)
    .addTo(map)
    .on('click', function(e){
        CreateTempMarker(e,PopUp);
        UserTextInput = LOC_Identification;
    });
}

function LoadCTRentryPoints(Icon){
	PointAdd("EYDR"	,54.01611111,	23.94444444, Icon);
}

//Executes then page is loaded
window.onload = function(){
	this.LoadPoints();
	this.LoadAllSelectorsOptions();
	this.ConfigureSelector(document.getElementsByClassName("SelectorLine")[0]);
	this.LoadTable();
	//Add event lisiner for point added or removed so that selector would change
}

//Loads points (in future need to make text file read and write if possible)
function LoadPoints(){
	LoadGeneralPoints({icon: TriangleIcon});
	LoadAirports();
	//LoadCTRentryPoints(INSERT ICON HERE);
}

function LoadGeneralPoints(Icon){
	PointAdd("Alanta"   ,55.35111111,   25.29527778, Icon);
    PointAdd("Anykščiai"   ,55.52416667,   25.10083333, Icon);
    PointAdd("Antalieptė"   ,55.66666667,   25.86666667, Icon);
    PointAdd("Ariogala"   ,55.26555556,   23.46444444, Icon);
    PointAdd("Arvydai"	,54.825		,	25.56111111, Icon); 
	PointAdd("Aukštadvaris"	,54.58		,	24.52611111, Icon); 
	PointAdd("Birštonas"	,54.60277778,	24.03472222, Icon);
	PointAdd("Biržai"	,56.17611111,	24.76111111, Icon);
	PointAdd("Butrimonys"	,54.5025	,	24.24805556, Icon);
	PointAdd("Daugai"	,54.35972222,	24.34416667, Icon);
	PointAdd("Druskininkai"	,54.01583333,	23.94388889, Icon);
	PointAdd("Dubingiai"	,55.05805556,	25.45333333, Icon);
	PointAdd("Dusetos"	,55.74361111,	25.83583333, Icon);
	PointAdd("ELEKA"	,54.80055556,	24.68888889, Icon);
	PointAdd("EPINI"	,54.61388889,	25.43166667, Icon);
	PointAdd("Ignalina"	,55.34		,	26.15777778, Icon); 
	PointAdd("IKAMU"	,55.34444444,	24.63694444, Icon);
	PointAdd("Inturkė"	,55.16111111,	25.57222222, Icon);
	PointAdd("Išlaužas"	,54.73888889,	23.925     , Icon);
	PointAdd("Jurbarkas"	,55.05333333,	22.72416667, Icon);
	PointAdd("Kartena"	,55.91972222,	21.56833333, Icon);
	PointAdd("Kedainiai"	,55.78333333,	23.96666667, Icon);
	PointAdd("Kelmė"	,55.63333333,	22.93333333, Icon);
	PointAdd("Kupiškis"	,55.85		,	24.98333333, Icon); 
	PointAdd("LEDVI"	,54.6375	,	25.135     , Icon); 
	PointAdd("MANUX"	,55.67611111,	22.03555556, Icon);
	PointAdd("Marijampolė"	,54.55527778,	23.34472222, Icon);
	PointAdd("Merkinė"	,54.16138889,	24.18361111, Icon);
	PointAdd("Molėtai	"	,55.22055556,	25.40944444, Icon);
	PointAdd("N._Akmenė"	,56.31666667,	22.88333333, Icon);
	PointAdd("Nemenčinė"	,54.83333333,	25.41666667, Icon);
	PointAdd("Panevėžys"	,55.70833333,	24.345     , Icon);
	PointAdd("Pasvalys"	,56.06166667,	24.39805556);
	PointAdd("Pikeliškės"	,54.84166667,	25.25      , Icon);
	PointAdd("Pociūnai"	,54.65388889,	24.05805556, Icon);
	PointAdd("Prienai"	,54.63527778,	23.95166667, Icon);
	PointAdd("Ramygala"	,55.51083333,	24.30444444, Icon);
	PointAdd("Raseiniai"	,55.37972222,	23.12138889, Icon);
	PointAdd("RAVPO"	,54.88611111,	24.22      , Icon);
	PointAdd("Rokiškis"	,55.94805556,	25.59916667, Icon);
	PointAdd("Sasnava"	,54.64916667,	23.46472222, Icon);
	PointAdd("Seirijai"	,54.23333333,	23.81666667, Icon);
	PointAdd("Simnas"	,54.38333333,	23.65      , Icon);
	PointAdd("SITGU"	,55.035		,	23.84111111, Icon); 
	PointAdd("Svėdasai"	,55.68111111,	25.36527778, Icon);
	PointAdd("Širvintos"	,55.05		,	24.95     , Icon ); 
	PointAdd("Taurage"	,55.25		,	22.28333333, Icon); 
	PointAdd("Trakų Vokė"	,54.62861111,	25.10805556, Icon);
	PointAdd("Troškunai"	,55.58666667,	24.87027778, Icon);
	PointAdd("TUSDA"	,55.05027778,	24.13638889, Icon);
	PointAdd("Ukmergė"	,55.255		,	24.81638889, Icon); 
	PointAdd("Utena"	,55.48944444,	25.71638889, Icon);
	PointAdd("Varėna"	,54.20777778,	24.56444444, Icon);
	PointAdd("Veliuona"	,55.08222222,	23.27111111, Icon);
	PointAdd("Videniškiai"	,55.21722222,	25.27694444, Icon);
	PointAdd("Zarasai"	,55.73333333,	26.25      , Icon);
	PointAdd("Zavišonys"	,54.43333333,	25.36666667, Icon);
	PointAdd("Želva"	,55.2197165492,	25.09888889, Icon);
	PointAdd("Kėdainiai"	,55.28722222,	23.95722222, Icon);
	PointAdd("ULKIL"	,54.87638889,	23.99166667, Icon);
	PointAdd("ALISI"	,54.59611111,	25.10527778, Icon);
}
function LoadAirports(){
	PointAdd("EYDR"	,54.01611111,	23.94444444);
	PointAdd("EYKA"	,54.95972222,	24.06527778);
	PointAdd("EYKL"	,55.71527778,	21.24388889);
	PointAdd("EYKS"	,54.88		,	23.88166667); 
	PointAdd("EYMO"	,55.11277778,	25.33638889);
	PointAdd("EYPA"	,55.97333333,	21.09388889);
	PointAdd("EYRD"	,54.49555556,	24.7175    );
	PointAdd("EYSA"	,55.89388889,	23.395     );
	PointAdd("EYVI"	,54.63611111,	25.29361111);
	PointAdd("EYAL"	,54.41527778,	24.05555556);
	PointAdd("EYMM"	,54.66388889,	23.45194444);
}