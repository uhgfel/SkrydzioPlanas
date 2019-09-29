var TempMarker;
var MarkerNeedAdding = false;
var MarkerArray = new Array();
var CurrentMarkerIndex = 0;
var tempPopup;

function onMapClick(e) {
	TempMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	//TempMarker.bindPopup("<iframe src=\"./waypoint.html\"></iframe>").openPopup();
	tempPopup = TempMarker.bindPopup("<button onClick=\"onAddpoint()\">Add point</button>").openPopup();
	TempMarker.getPopup().on('remove', PopupClosedFunction);
}

function onAddpoint(){
	MarkerNeedAdding = true;
	if(CurrentMarkerIndex > 0){
		let apos = MarkerArray[CurrentMarkerIndex].getLatLng();
		let bpos = TempMarker.getLatLng();

		var line = L.polygon([
			[apos.lat, apos.lng],
			[bpos.lat, bpos.lng]
		]).addTo(map);
	}
	CurrentMarkerIndex++;

	tempPopup.closePopup();
}

function PopupClosedFunction(){
	if(MarkerNeedAdding == true){
		MarkerArray[CurrentMarkerIndex] = TempMarker;
	}
	else{
		TempMarker.remove();
	}
	MarkerNeedAdding = false;
}

function RemoveAllPoints(){

}