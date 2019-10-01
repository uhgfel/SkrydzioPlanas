var TempMarker;
var MarkerClicked;
var MarkerNeedAdding = false;
var CurrentNodeIndex = 0;
var tempPopup;

//TempMarker.bindPopup("<iframe src=\"./waypoint.html\"></iframe>").openPopup();

var NodeArray = new Array();
function Node(marker, polyline){
	this.marker = marker;
	this.polyline = polyline;
	this.lat = marker.getLatLng().lat;
	this.lng = marker.getLatLng().lng;

	marker.on('click', onMarkerClicked);
}

//Then map is clicked temporary marker is created
function onMapClick(e) {
	CreateTempMarker(e, "<button onClick=\"onAddpoint()\">Add point</button>");
}


function CreateTempMarker(e, Buttons) {
	TempMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	tempPopup = TempMarker.bindPopup(Buttons).openPopup();
	tempPopup.on('popupclose', function () {
		TempMarker.remove();
	});
}

//Then marker is clicked different temporary marker is created with Remove button
function onMarkerClicked(e){
	MarkerClicked = e.target;
	CreateTempMarker(e, "<button onClick=\"onAddpoint()\">Add point</button><br/><button onClick=\"onRemovePoint()\">RemovePoint</button>")
}

//Executes then "Add Point" is pressed on marker
function onAddpoint(){
	if(CurrentNodeIndex > 0){
		var line = ConnectTwoMarkers(NodeArray[CurrentNodeIndex-1].marker, TempMarker);
	}

	let bpos = TempMarker.getLatLng();
	var marker = L.marker([bpos.lat, bpos.lng]).addTo(map);
	var node = new Node(marker, line);
	NodeArray[CurrentNodeIndex] = node;

	CurrentNodeIndex++;

	tempPopup.closePopup();
}

function ConnectTwoMarkers(markerA, markerB){	
	let apos = markerA._latlng;
	let bpos = markerB._latlng;
	
	var line = L.polygon([
		[apos.lat, apos.lng],
		[bpos.lat, bpos.lng]
	]).addTo(map);

	return line;
}

function onRemovePoint(){

	//Finds node to be removed
	var nodeToRemoveIndex;
	for(var i = 0; i < NodeArray.length; i++){
		if(NodeArray[i].marker._latlng == MarkerClicked._latlng){
			nodeToRemoveIndex = i;
			break;
		}
	}

	//Removes a line before that node if has any
	var polyline = NodeArray[nodeToRemoveIndex].polyline;
	if(polyline != null) polyline.remove();

	//If it has a node in front of it, connects two nodes
	if(NodeArray[nodeToRemoveIndex+1] != null){
		NodeArray[nodeToRemoveIndex+1].polyline.remove();
		if(NodeArray[nodeToRemoveIndex-1] != null){
			NodeArray[nodeToRemoveIndex+1].polyline = ConnectTwoMarkers(NodeArray[nodeToRemoveIndex-1].marker, NodeArray[nodeToRemoveIndex+1].marker);
		}
	}

	//Reorders nodes
	NodeArray.splice(nodeToRemoveIndex, 1);

	CurrentNodeIndex--;

	var count = 0;
	for(var i = 0; i < NodeArray.length; i++){
		count++;
	}
	console.log(count);

	MarkerClicked.remove();
	TempMarker.remove();
}