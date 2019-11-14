//Selector line - is html element that gives interface for user possibility to change location list by
//selecting name instead of point.
var SelectorLinesArray = new Array();

//Loads selectors options from Point Array
function LoadAllSelectorsOptions(){
    var Selectors = document.getElementsByClassName("Selector");
    for(let i = 0; i < Selectors.length; i++){
        for (let key in PointArray) {
            CreateOption(Selectors[i], key, key);
        }
    }
};

//Creates option to select for spesific Selector. Adds html element "option" to "select".
function CreateOption(Selector, Text, value) {
    var para = document.createElement("option");
    para.setAttribute("value", value);
    var node = document.createTextNode(Text);
    para.appendChild(node);
    Selector.appendChild(para);
}

//Duplicates first Selector element and adds a clone as a new one in the end
function AddSelector(){
    let bar = document.getElementById("SelectorBar");
    let SelectorLine = document.getElementsByClassName("SelectorLine")[0].cloneNode(true);

    bar.appendChild(SelectorLine);

    ConfigureSelector(SelectorLine);
}

//Adds selector to an array and creates necessary events for it
//It is important to do this, so that buttons and selectors would be interactive
function ConfigureSelector(SelectorLine){
 
    //Adds to array
    SelectorLinesArray.push(SelectorLine);

    //Configures events for selector
    SelectorLine.onchange = SelectorChangedLast;

    //Changes previous selector event. Replaces node on change instead of adding a new one
    let PrevIndex = SelectorLinesArray.length-2;
    if(PrevIndex >= 0){
        SelectorLinesArray[PrevIndex].onchange = function(e){
            let value = e.target.value;
            let latlng = PointArray[value]._latlng;
            
            ReplaceNode(PrevIndex, latlng);
        }
    }
}

//Makes last selector add new point then it is changed (user selected an option).
//Also adds new selector for another point for user to interact with
function SelectorChangedLast(e){
    AddSelector();

    let value = e.target.value;
    let latlng = PointArray[value]._latlng;
    PlaceNode(value, latlng.lat, latlng.lng);
}

//Adds selector then user adds a point from map interface
function SetSelectorAndAddOne(Name, index){
    var opts = SelectorLinesArray[index].children[0].options;
    var mathcFound = false;

    //Searches for identical name and selects it
    for (var i = 0; i < opts.length; i++) {
      if (opts[i].innerText == Name) {

        //Found in existing array
        SelectorLinesArray[index].children[0].selectedIndex = i;
        mathcFound = true;
        break;
      }
    }

    //If search was unsuccessful, creates additional option for that selector and selects it to be displayable
    if(!mathcFound){
        var selector = SelectorLinesArray[index].children[0];
        CreateOption(selector, Name);

        //Adds new event for this Selector
        //Then selection changes will remove that option to reselect
        //We will not be able to reselect it since we don't save coordinates of that point
        //then it is reselected coordinates disapier as well therefore program would crash if
        //user would be able to select point which does not exist
        selector.onchange = function(){
            selector.removeChild(selector.children[opts.length - 1]);
        }

        //Selects last selection which was added as new, since it did not exist before
        SelectorLinesArray[index].children[0].selectedIndex = opts.length - 1;
    }

    AddSelector();
}

//Removes "Selector line" html element and rearanges array
function RemoveSelectorLine(index){
    SelectorLinesArray[index].parentElement.removeChild(SelectorLinesArray[index]);
    SelectorLinesArray.splice(index, 1);
}

//Executes then user presses X / "remove" button. 
//button is passed as button's html element.
function Remove(button){

    //Searching correct index
    //Index corresponding to the point in line on the map
    //We look how many "siblings" html elment has and determine it's index
    var selectorLine = button.parentElement;
    var selectorBar = selectorLine.parentElement;

    for(var i = 0; i < selectorBar.childElementCount; i++){
        if(selectorLine == selectorBar.children[i]){
            break;
        }
    }

    //If First option is not selected We remove node
    var FirstOptionSelected = SelectorLinesArray[i].children[0].selectedIndex == 0;
    if(!FirstOptionSelected){
        RemoveNode(i);
    }
}