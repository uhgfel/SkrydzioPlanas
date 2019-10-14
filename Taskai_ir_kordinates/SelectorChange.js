
var SelectorsArray = new Array();

function UpdatePointsOnSelectors(){
    var Selectors = document.getElementsByClassName("Selector");
    for(let i = 0; i < Selectors.length; i++){
        AddpointsToSelector(Selectors[i]);
        //console.log(Selectors[i]);
    }
};

function AddpointsToSelector(Selector) {
    for (let key in PointArray) {
        CreateOption(Selector, key, key);
    }
}

function AddSelector(){

    //<br/>
    //<select class="Selector" onchange="SelectorChanged()">
    //  <option value="empty">Pasirinkti taska</option>

    let bar = document.getElementById("SelectorBar");
    //true reiskia, kad kopijuos ir vaikus
    let Selector = document.getElementsByClassName("SelectorLine")[0].cloneNode(true);

    //let Selector = document.createElement("select");
    //Selector.setAttribute("class", "Selector");

    bar.appendChild(Selector);

    //CreateOption(Selector, "Pasirinkti taska", "empty");

    ConfigureSelector(Selector);
}

function ConfigureSelector(Selector){
    //AddpointsToSelector(Selector);
    //Adds selector to an array and creates necessary events
    SelectorsArray.push(Selector);
    Selector.onchange = SelectorChangedLast;
    console.log("last");
    let PrevIndex = SelectorsArray.length-2;
    if(PrevIndex >= 0){
        var doSelectMiddle = (event) => SelectorChanged(event, PrevIndex);
        SelectorsArray[PrevIndex].onchange = doSelectMiddle;
        console.log("middle added");
    }
}

function CreateOption(Selector, Text, value) {
    var para = document.createElement("option");
    para.setAttribute("value", value);
    var node = document.createTextNode(Text);
    para.appendChild(node);
    Selector.appendChild(para);
}

function SelectorChangedLast(e){
    AddSelector();
    let value = e.target.value;
    let latlng = PointArray[value]._latlng;
    PlaceNode(value, latlng.lat, latlng.lng);
}
function SelectorChanged(e, index){
    let value = e.target.value;
    let latlng = PointArray[value]._latlng;
    
    ReplaceNode(index, latlng);
}
