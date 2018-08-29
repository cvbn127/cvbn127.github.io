// import { Papa } from "./papaparse.js";
var Papa = Window.Papa;

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

// files is a FileList of File objects. List some properties.
    // var output = [];
    // for (var i = 0, f; f = files[i]; i++) {
    //     output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //                 f.size, ' bytes, last modified: ',
    //                 f.lastModifiedDate.toLocaleDateString(), '</li>');
    // }
    // gets only the first file
    var csvFile = files[0];
    var parsedData = new Array;
    var header = new Array;
    Papa.parse(csvFile, {
        header: true,
        complete: function(results) {
            console.log("Finished:", results);
            header = results.meta.fields;
            parsedData = results.data;
        }
    });
    // console.log(header);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);