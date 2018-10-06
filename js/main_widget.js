"use strict";
import { ListWidget } from "./list_widget.js";
import { PlotWidget } from "./plot_widget.js";

export class MainWidget {
  constructor(header, id) {
    let fileInfoZone = document.createElement("div");
    fileInfoZone.className = "container-fluid";
    let row = document.createElement("div");
    row.className = "row";
    fileInfoZone.appendChild(row);

    let rightBlock = new PlotWidget(id);

    header.unshift("index");
    let leftBlock = new ListWidget(header, id);
    let baseStyleKeyZone = rightBlock.getKeyZone().style;
    let baseStyleValueZone = rightBlock.getValueZone().style;

    leftBlock.addEventListener("onElementStartDragging", function() {
      let highlight = function(elem) {
        elem.style.opacity = "0.7";
        elem.style.outline = "rgba(200, 200, 255, 0.8) solid 5px";
      };
      highlight(rightBlock.getKeyZone());
      highlight(rightBlock.getValueZone());
    });
    leftBlock.addEventListener("onElementEndDragging", function() {
      rightBlock.getKeyZone().style = baseStyleKeyZone;
      rightBlock.getValueZone().style = baseStyleValueZone;
    });

    row.appendChild(leftBlock.DomElement);
    row.appendChild(rightBlock.DomElement);

    this._id = id;

    let dropZone = document.getElementById("drop_zone");
    dropZone.parentNode.appendChild(fileInfoZone);
  }
}
