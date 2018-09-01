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
    let baseStyle = headerElement.style;
    // let baseLeft = headerElement.style.left;
    // let baseTop = headerElement.style.top;
    // let basePosition = headerElement.style.position;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        headerElement.style.position = "absolute";
        headerElement.style.opacity = "0.7";
        headerElement.style.outline = "rgba(200, 200, 255, 0.8) solid 5px";
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        headerElement.style.top = e.clientY + "px";
        headerElement.style.left = e.clientX + "px";
    }
    
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
        headerElement.style = baseStyle;
        // headerElement.style.top = baseTop;
        // headerElement.style.left = baseLeft;
        // headerElement.style.position = basePosition;
        
    }
    headerElement.onmousedown = dragMouseDown;

    return headerElement;
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);