var TempMarker;
var MarkerNeedAdding = false;
var CurrentMarkerIndex = 0;
var tempPopup;

var MarkerArray = new Array();
function Marker(marker, polyline, index){
	this.marker = marker;
	this.polyline = polyline;
	this.index = index;
	this.lat = marker.getLatLng().lat;
	this.lng = marker.getLatLng().lng;
}

function onMapClick(e) {
	TempMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	//TempMarker.bindPopup("<iframe src=\"./waypoint.html\"></iframe>").openPopup();
	
	//Marker events
	TempMarker
		.on('click', onMarkerClicked);
		//.on('mouseover', onClick);
	tempPopup = TempMarker.bindPopup("<button onClick=\"onAddpoint()\">Add point</button>").openPopup();
	TempMarker.getPopup().on('remove', PopupClosedFunction);
}

function onMarkerClicked(e){
	onMapClick(e);
}

//Executes then "Add Point" is pressed on marker
function onAddpoint(){

	MarkerNeedAdding = true;

	if(CurrentMarkerIndex > 0){
		let apos = MarkerArray[CurrentMarkerIndex-1].marker._latlng;
		let bpos = TempMarker.getLatLng();

		var line = L.polygon([
			[apos.lat, apos.lng],
			[bpos.lat, bpos.lng]
		]).addTo(map);
	}

	var marker = new Marker(TempMarker, line, CurrentMarkerIndex);
	MarkerArray[CurrentMarkerIndex] = marker;

	CurrentMarkerIndex++;

	tempPopup.closePopup();
}

//Pop up closed
function PopupClosedFunction(){
	if(!MarkerNeedAdding){
		TempMarker.remove();
	}
	MarkerNeedAdding = false;
}

function RemoveAllPoints(){

}