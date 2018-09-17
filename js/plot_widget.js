"use strict";
// import { Chart } from "./Chart.js";
// import Chart from './Chart.js';

export class PlotWidget {
  constructor(id) {
    let block = document.createElement("div");
    block.className = "col-8";
    let row = document.createElement("div");
    row.className = "row";
    block.appendChild(row);

    let valueZone = document.createElement("div");
    valueZone.className = "col-1";
    valueZone.style = "writing-mode: tb-rl;";
    valueZone.innerText = "value";
    valueZone.id = "value_zone_" + id;
    row.appendChild(valueZone);

    let wrapper = document.createElement("div");
    wrapper.className = "col-7";
    row.appendChild(wrapper);

    let plotZone = document.createElement("div");
    plotZone.className = "col-7";
    wrapper.appendChild(plotZone);
    let keyZone = document.createElement("div");
    keyZone.className = "col-7";
    keyZone.innerText = "key";
    keyZone.id = "key_zone_" + id;
    wrapper.appendChild(keyZone);

    this.DomElement = block;
    this._id = id;
  }
}
