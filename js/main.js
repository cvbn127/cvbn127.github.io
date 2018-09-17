import { MainWidget } from "./main_widget.js";
var Papa = Window.Papa;

var keyZoneArray = new Array();
var valueZoneArray = new Array();

var widgets = new Array();

var globalPlotIdx = 1;

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files;
  var csvFile = files[0];
  var parsedData = new Array();
  var header = new Array();
  Papa.parse(csvFile, {
    header: true,
    complete: function(results) {
      console.log("Finished:", results);
      header = results.meta.fields;
      parsedData = results.data;
      let dropZone = document.getElementById("drop_zone");
      dropZone.hidden = true;
      showFileInfo(header);
    }
  });
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
}

function showFileInfo(header) {
  widgets.push(new MainWidget(header, globalPlotIdx));
  globalPlotIdx++;
}

// Setup the dnd listeners.
var dropZone = document.getElementById("drop_zone");
dropZone.addEventListener("dragover", handleDragOver, false);
dropZone.addEventListener("drop", handleFileSelect, false);
