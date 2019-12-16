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

var cttrIcon = L.icon({
    iconUrl: 'https://img.pngio.com/purple-triangle-icon-free-purple-shape-icons-purple-triangle-png-256_256.png',

    iconSize:     [15, 15],
});

//Adds saved point with appropriate popup
function PointAdd(Name, lat, lng, Icon){
     PointArray[Name] = L.marker([lat, lng], Icon)
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
	PointAdd("EPINI", 54.6123417, 25.4317917, Icon);
	PointAdd("ATGEL", 54.5502694, 25.3880833, Icon)
	PointAdd("ALISI", 54.5939000, 25.1049556, Icon)
	PointAdd("LEDVI", 54.6353139, 25.1337028, Icon)

	PointAdd("RAVPO", 54.8849917, 24.2194528, Icon)
	PointAdd("ULKIL", 54.8743889, 23.9914444, Icon)
	PointAdd("SITGU", 55.0343611, 23.8506389, Icon)
	PointAdd("TUSDA", 55.0482333, 24.1221417, Icon)

	PointAdd("SUDAB", 55.7352639, 23.3316361, Icon)
	PointAdd("URUBA", 55.8904806, 23.1467750, Icon)
	PointAdd("MISVU", 56.0596611, 23.4427417, Icon)
	PointAdd("VESAM", 55.8893417, 23.6451139, Icon)

	PointAdd("TILDU", 55.9323750, 20.9238528, Icon)
	PointAdd("BUKIV", 56.0297694, 20.9640472, Icon)
	PointAdd("DIREV", 56.0056861, 21.2583250, Icon)
	PointAdd("KOLOP", 55.8261639, 21.1852528, Icon)
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
	LoadCTRentryPoints({icon: cttrIcon});
}

function LoadGeneralPoints(Icon){
	PointAdd("Alanta"   ,55.35111111,   25.29527778, Icon);
    PointAdd("Anykščiai"   ,55.52416667,   25.10083333, Icon);
    PointAdd("Antalieptė"   ,55.66666667,   25.86666667, Icon);
    PointAdd("Ariogala"   ,55.26555556,   23.46444444, Icon);
    PointAdd("Arvydai"	,54.825		,	25.56111111, Icon); 
	PointAdd("Aukštadvaris"	,54.58		,	24.52611111, Icon); 
	PointAdd("Birštonas"	,54.60277778,	24.03472222, Icon);
	PointAdd("Butrimonys"	,54.5025	,	24.24805556, Icon);
	PointAdd("Daugai"	,54.35972222,	24.34416667, Icon);
	PointAdd("Dubingiai"	,55.05805556,	25.45333333, Icon);
	PointAdd("Dusetos"	,55.74361111,	25.83583333, Icon);
	PointAdd("ELEKA"	,54.80055556,	24.68888889, Icon);
	PointAdd("Ignalina"	,55.34		,	26.15777778, Icon); 
	PointAdd("IKAMU"	,55.34444444,	24.63694444, Icon);
	PointAdd("Inturkė"	,55.16111111,	25.57222222, Icon);
	PointAdd("Išlaužas"	,54.73888889,	23.925     , Icon);
	PointAdd("Jurbarkas"	,55.05333333,	22.72416667, Icon);
	PointAdd("Kedainiai"	,55.78333333,	23.96666667, Icon);
	PointAdd("Kelmė"	,55.63333333,	22.93333333, Icon);
	PointAdd("Kupiškis"	,55.85		,	24.98333333, Icon); 
	PointAdd("MANUX"	,55.67611111,	22.03555556, Icon);
	PointAdd("Marijampolė"	,54.55527778,	23.34472222, Icon);
	PointAdd("Merkinė"	,54.16138889,	24.18361111, Icon);
	PointAdd("Molėtai	"	,55.22055556,	25.40944444, Icon);
	PointAdd("N._Akmenė"	,56.31666667,	22.88333333, Icon);
	PointAdd("Nemenčinė"	,54.83333333,	25.41666667, Icon);
	PointAdd("Pasvalys"	,56.06166667,	24.39805556, Icon);
	PointAdd("Pikeliškės"	,54.84166667,	25.25      , Icon);
	PointAdd("Prienai"	,54.63527778,	23.95166667, Icon);
	PointAdd("Ramygala"	,55.51083333,	24.30444444, Icon);
	PointAdd("Raseiniai"	,55.37972222,	23.12138889, Icon);
	PointAdd("Rokiškis"	,55.94805556,	25.59916667, Icon);
	PointAdd("Seirijai"	,54.23333333,	23.81666667, Icon);
	PointAdd("Simnas"	,54.38333333,	23.65      , Icon); 
	PointAdd("Svėdasai"	,55.68111111,	25.36527778, Icon);
	PointAdd("Širvintos"	,55.05		,	24.95     , Icon ); 
	PointAdd("Taurage"	,55.25		,	22.28333333, Icon); 
	PointAdd("Trakų Vokė"	,54.62861111,	25.10805556, Icon);
	PointAdd("Troškunai"	,55.58666667,	24.87027778, Icon);
	PointAdd("Ukmergė"	,55.255		,	24.81638889, Icon); 
	PointAdd("Varėna"	,54.20777778,	24.56444444, Icon);
	PointAdd("Veliuona"	,55.08222222,	23.27111111, Icon);
	PointAdd("Videniškiai"	,55.21722222,	25.27694444, Icon);
	PointAdd("Zarasai"	,55.73333333,	26.25      , Icon);
	PointAdd("Zavišonys"	,54.43333333,	25.36666667, Icon);
	PointAdd("Želva"	,55.2197165492,	25.09888889, Icon);
	PointAdd("Kėdainiai"	,55.28722222,	23.95722222, Icon);
}
	
	function LoadAirports(){
	AddAerodrome(54.4805972, 24.9909500, "PALUKNYS AD", "EYVP", 446, 119.100, 650, false);
	AddAerodrome(54.668571, 25.513462, "KYVIŠKĖS AD", "EYVK", 535, 122.850, 540, false);
	AddAerodrome(54.496092, 24.718208, "RŪDIŠKĖS AD", "EYRD", 515, 122.350, 600, true);
	AddAerodrome(55.112971, 25.336972, "MOLĖTAI AD", "EYMO", 653, 122.050, 450, true);
	AddAerodrome(55.244166, 26.171837, "IGNALINA AD", "EYIG", 558, 119.600, 600, true);
	AddAerodrome(55.48911, 25.717953, "UTENA AD", "EYUT", 633, 122.225, 570, true);
	AddAerodrome(55.752341, 26.262517, "ZARASAI AD", "EYZA", 570, 123.250, 440, false);
	AddAerodrome(54.015065, 23.944144, "DRUSKININKAI AD", "EYDR", 305, 119.650, 535, true);
	AddAerodrome(54.415267, 24.055381, "ALYTUS AD", "EYAL", 266, 122.450, 750, true);
	AddAerodrome(54.652883, 24.056325, "POCIŪNAI AD", "EYPR", 197, 119.000, 667, true);
	AddAerodrome(54.664433, 23.454995, "SASNAVA AD", "EYMM", 230, 120.350, 800, true);
	AddAerodrome(54.879988, 23.880458, "KAUNAS/S.DARIAUS IR S.GIRĖNO AD", "EYKS", 246, 135.500, 1158, false);
	AddAerodrome(55.610727, 24.221334, "ROJŪNAI AD", "EYRO", 177, 122.500, 800, true);
	AddAerodrome(55.708604, 24.344759, "PANEVĖŽYS AD", "EYPN", 177,135.500, 540, false);
	AddAerodrome(55.828124, 24.357119, "PANEVĖŽYS/ĮSTRA AD", "EYPI", 164, 123.200, 600, true);
	AddAerodrome(55.745966, 23.804455, "ŠEDUVA AD", "EYSE", 302, 120.025, 900, true);
	AddAerodrome(56.176062, 24.760008, "BIRŽAI AD", "EYBI", 190, 122.300, 600, true);
	AddAerodrome(56.070769, 23.557434, "BARYSAI AD", "EYSB", 270, 122.050, 1050, true);
	AddAerodrome(56.24215, 22.732987, "AKMENĖ AD", "EYNA", 243, 122.500, 600, true);
	AddAerodrome(56.230435, 22.255211, "MAŽEIKIAI/J.KUMPIKEVIČIAUS AD", "EYMA", 274, 120.350, 470, true);
	AddAerodrome(55.986454, 22.287848, "TELŠIAI AD", "EYTL", 410, 122.350, 580, true);
	AddAerodrome(55.92002, 21.56702, "KARTENA AD", "EYKT", 262, 123.250, 800, true);
	AddAerodrome(55.711957, 21.241937, "KLAIPĖDA AD", "EYKL", 59, 119.600, 500, true);
	AddAerodrome(55.335753, 21.52668, "ŠILUTĖ AD", "EYSI", 59, 122.000, 490, true);
	AddAerodrome(55.23176, 22.150058, "TAURAGĖ AD", "EYTR", 125, 122.225, 400, true);
	AddAerodrome(54.635032, 25.286407, "VILNIUS/INTL AD", "EYVI", 649, 118.205, 2515, false);
	AddAerodrome(54.963923, 24.085808, "KAUNAS/INTL AD", "EYKA", 256, 124.205, 3250, false);
	AddAerodrome(55.729356, 24.459815, "PAJUOSTIS AD MIL", "EYPP", 197, 122.550, 1400, false);
	AddAerodrome(55.892392, 23.394356, "ŠIAULIAI/INTL/CIV/MIL AD", "EYSA", 447, 120.400, 3500, false);
	AddAerodrome(55.97292, 21.093578, "PALANGA/INTL AD", "EYPA", 33, 124.305, 2280, false);
}