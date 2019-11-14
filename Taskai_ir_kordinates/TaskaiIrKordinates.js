//Used to display user there he/she clicked, but not used as permanent marker
//"Add point" "Save point"
var TempMarker;

//Marker that user clicked. If user clicks already placed marker system will check it's index
//by trying to match coordinates, since event parameter does not allow that (at least I don't know how to make it)
var MarkerClicked;

//Used to refference current node index that we are working with
var CurrentNodeIndex = 0;

//Popup that is opened. We asign it to the current one and close then appropriate
var tempPopup;

//Text that user wrote in popup
var UserTextInput;

//Nodes define everything that user defined and objects on the map.
var NodeArray = new Array();
function Node(marker, polyline){
	this.marker = marker;
	this.polyline = polyline;
	this.lat = marker.getLatLng().lat;
	this.lng = marker.getLatLng().lng;
	this.Name = UserTextInput;
	this.latlng = marker.getLatLng();

	marker.on('click', onMarkerClicked);
}

//Then map is clicked temporary marker is created
//"Add point", "Save point" functionality
function onMapClick(e) {
	CreateTempMarker(e, "<b>kordinates:</b><br/>" + e.latlng.lat + "<br/> " + e.latlng.lng + ". <br/><input id=\"Input\" type=\"text\"><br/><button onClick=\"onAddpoint()\">Add point</button><br/><button onClick=\"onSavePoint()\">SavePoint</button>");
}
//Then marker is clicked different temporary marker is created with Remove button, allows user to place marker on top or remove previous selection
//"Add point" adds point on top (usefull then defining root forwards and backwards through the same path)
//"Remove point"
function onMarkerClicked(e){
	MarkerClicked = e.target;
	let name = NodeArray[GetNodeIndexByMarker(e.target._latlng)].Name;
	UserTextInput = name;
	CreateTempMarker(e, "<p><b>" + name + "<p/><b/><button onClick=\"onAddpoint()\">Add point</button><br/><button onClick=\"onRemovePoint()\">RemovePoint</button>")
}

//Creates temporary marker that allows user to interact with
//e stores click event parameters
//buttons - define popup content, which defines types of buttons to be displayed
function CreateTempMarker(e, Buttons) {
	TempMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	tempPopup = TempMarker.bindPopup(Buttons).openPopup();
	tempPopup.on('popupclose', function () {
		TempMarker.remove();
		UserTextInput = null;
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

	SetSelectorAndAddOne(UserTextInput, CurrentNodeIndex);

	PlaceNode(UserTextInput, TempMarker.getLatLng().lat, TempMarker.getLatLng().lng);

	tempPopup.closePopup();
}

//Connects 2 markers with polygon line, returns line component
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
//Returns index of that node if possible
function GetNodeIndexByMarker(latlng){
	for(var i = 0; i < NodeArray.length; i++){
		if(NodeArray[i].marker._latlng == latlng){
			return i;
		}
	}
	console.log("Not able to find a marker!");
}

//Executes then "Save point" is pressed
function onSavePoint(){
	SetTextInput();

	var lat = TempMarker.getLatLng().lat;
	var lng = TempMarker.getLatLng().lng;

	PointAdd(UserTextInput, lat, lng);
	LoadAllSelectorsOptions();

	UserTextInput = null;
	TempMarker.remove();
}
//Executes then "Remove point" button is pressed
function onRemovePoint(){

	//Finds node to be removed
	var nodeToRemoveIndex = GetNodeIndexByMarker(MarkerClicked._latlng);

	RemoveNode(nodeToRemoveIndex);

	TempMarker.remove();
}

//Places node in spesific location and adds to the array of nodes
function PlaceNode(Name, lat, lng){

	UserTextInput = Name;
	var marker = L.marker([lat, lng]).addTo(map);

	if(CurrentNodeIndex > 0){
		var line = ConnectTwoMarkers(NodeArray[CurrentNodeIndex-1].marker, marker);
	}


	var node = new Node(marker, line);
	NodeArray[CurrentNodeIndex] = node;
	CurrentNodeIndex++;

	UserTextInput = null;
}

//Removes node with spesific index from map and array
function RemoveNode(index){		
	//Removes a line before that node if has any
	var polyline = NodeArray[index].polyline;
	if(polyline != null) polyline.remove();

	//If it has a node in front of it, connects two nodes
	if(NodeArray[index+1] != null){
		NodeArray[index+1].polyline.remove();
		if(NodeArray[index-1] != null){
			NodeArray[index+1].polyline = ConnectTwoMarkers(NodeArray[index-1].marker, NodeArray[index+1].marker);
		}
	}

	NodeArray[index].marker.remove();

	//Reorders nodes
	NodeArray.splice(index, 1);

	CurrentNodeIndex--;

	RemoveSelectorLine(index);
}

//Places node in new location
function ReplaceNode(index, newlatlng){
	//Checks if valid index is given
	if(index > 0 || index < NodeArray.length){
		NodeArray[index].marker._latlng = newlatlng;
		ReorderNodes();
	}
}

//Disconnects all nodes and reconects with new order. Then we change existing node locations
//we must redraw polygon lines correctly
function ReorderNodes(){
	for(let i = 1; i < NodeArray.length; i++){
		NodeArray[i].polyline.remove();
	}
	for(let i = 1; i < NodeArray.length; i++){
		NodeArray[i].polyline = ConnectTwoMarkers(NodeArray[i - 1].marker, NodeArray[i].marker);
	}
}