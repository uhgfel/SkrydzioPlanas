var TempMarker;
var MarkerClicked;
var MarkerNeedAdding = false;
var CurrentNodeIndex = 0;
var tempPopup;

var UserTextInput;

//TempMarker.bindPopup("<iframe src=\"./waypoint.html\"></iframe>").openPopup();
//

//<input type=\"text\"><button onclick=\"onAddpoint()\">Add Point</button><button onclick=\"onSavePoint()\">Save Point</button>
var NodeArray = new Array();
function Node(marker, polyline){
	this.marker = marker;
	this.polyline = polyline;
	this.lat = marker.getLatLng().lat;
	this.lng = marker.getLatLng().lng;
	this.Name = UserTextInput;

	marker.on('click', onMarkerClicked);
}

//Then map is clicked temporary marker is created
function onMapClick(e) {
	CreateTempMarker(e, "<b>kordinates:</b><br/>" + e.latlng.lat + "<br/> " + e.latlng.lng + ". <br/><input id=\"Input\" type=\"text\"><br/><button onClick=\"onAddpoint()\">Add point</button><br/><button onClick=\"onSavePoint()\">SavePoint</button>");
}
//Then marker is clicked different temporary marker is created with Remove button, allows user to place marker on top or remove previous selection
function onMarkerClicked(e){
	MarkerClicked = e.target;
	let name = NodeArray[GetNodeIndexByMarker(e.target)].Name;
	UserTextInput = name;
	CreateTempMarker(e, "<p><b>" + name + "<p/><b/><button onClick=\"onAddpoint()\">Add point</button><br/><button onClick=\"onRemovePoint()\">RemovePoint</button>")
}

//Creates temporary marker that allows user to interact with
function CreateTempMarker(e, Buttons) {
	TempMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	tempPopup = TempMarker.bindPopup(Buttons).openPopup();
	tempPopup.on('popupclose', function () {
		TempMarker.remove();
	});
}

//Retrieves what user has typed and stores it as a variable
function SetTextInput(){
	if(UserTextInput == null){
		UserTextInput = document.getElementById("Input").value;
	}
}


//Executes then "Add Point" is pressed on marker
function onAddpoint(){
	SetTextInput();

	if(CurrentNodeIndex > 0){
		var line = ConnectTwoMarkers(NodeArray[CurrentNodeIndex-1].marker, TempMarker);
	}

	let bpos = TempMarker.getLatLng();
	var marker = L.marker([bpos.lat, bpos.lng]).addTo(map);
	var node = new Node(marker, line);
	NodeArray[CurrentNodeIndex] = node;

	CurrentNodeIndex++;
	UserTextInput = null;
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

//Compares markers from NodeArray and finds one that match coordinates with the one that was inputed
function GetNodeIndexByMarker(marker){
	for(var i = 0; i < NodeArray.length; i++){
		if(NodeArray[i].marker._latlng == marker._latlng){
			return i;
		}
	}
	console.log("Not able to find a marker!");
}

function onRemovePoint(){

	//Finds node to be removed
	var nodeToRemoveIndex = GetNodeIndexByMarker(MarkerClicked);

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

	MarkerClicked.remove();
	TempMarker.remove();
}

function onSavePoint(){
	SetTextInput();
	PointAdd(UserTextInput, TempMarker.getLatLng().lat, TempMarker.getLatLng().lng);
	UserTextInput = null;
	TempMarker.remove();
}

function PrintAllNames(){
	for(let i = 0; i < NodeArray.length; i++){
		console.log(NodeArray[i].Name);
	}
}