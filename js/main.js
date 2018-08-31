var Papa = Window.Papa;

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var csvFile = files[0];
    var parsedData = new Array;
    var header = new Array;
    Papa.parse(csvFile, {
        header: true,
        complete: function(results) {
            console.log("Finished:", results);
            header = results.meta.fields;
            parsedData = results.data;
            showFileInfo(header);
        }
    });
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function showFileInfo(header){
    let fileInfoZone = document.createElement("div");
    fileInfoZone.className = "row";

    let leftBlock = document.createElement("div");
    leftBlock.className = "horizontalBlock";
    leftBlock.style = "width:30%;";
    
    let rightBlock = document.createElement("div");
    rightBlock.className = "horizontalBlock";
    rightBlock.style = "width:50%;";
    rightBlock.textContent = "Plot";

    let headerElementZone = document.createElement("div");
    headerElementZone.className = "headerElementZone";
    let indexElement = makeMovableHeaderElement("Index");
    headerElementZone.appendChild(indexElement);
    for(var i = 0; i < header.length; i++)
    {
        let element = makeMovableHeaderElement(header[i]);
        headerElementZone.appendChild(element);
    }
    
    leftBlock.appendChild(headerElementZone);

    fileInfoZone.appendChild(leftBlock);
    fileInfoZone.appendChild(rightBlock);

    let dropZone = document.getElementById("drop_zone");
    dropZone.hidden = true;
    dropZone.parentNode.insertBefore(fileInfoZone,dropZone.nextSibling);
}

function addPlot(data){

}

function makeMovableHeaderElement(text){
    let headerElement = document.createElement("div");
    headerElement.className = "headerElement";
    headerElement.textContent = text;
}

//Make the DIV element draggagle:
// dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}




// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);