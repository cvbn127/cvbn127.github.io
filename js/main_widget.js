"use strict";
import { HeaderWidget } from "./header_widget.js";
import { PlotWidget } from "./plot_widget.js";

export class MainWidget {
  constructor(header, id) {
    let fileInfoZone = document.createElement("div");
    fileInfoZone.className = "container-fluid";
    let row = document.createElement("div");
    row.className = "row";
    fileInfoZone.appendChild(row);

    this.leftBlock = new HeaderWidget(header, id);
    this.rightBlock = new PlotWidget(id);

    row.appendChild(this.leftBlock.DomElement);
    row.appendChild(this.rightBlock.DomElement);

    this._id = id;

    let dropZone = document.getElementById("drop_zone");
    // dropZone.parentNode.insertBefore(fileInfoZone, dropZone.nextSibling);
    dropZone.parentNode.appendChild(fileInfoZone);
  }
}
