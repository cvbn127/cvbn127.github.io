"use strict";
// import { Chart } from "./Chart.js";
// import Chart from './Chart.js';

export class PlotWidget {
  constructor(id) {
    let block = document.createElement("div");
    block.className = "col-8 noselect";
    let row = document.createElement("div");
    row.className = "row";
    block.appendChild(row);

    this._valueZone = this._createValueZone(id);
    row.appendChild(this._valueZone);

    let wrapper = document.createElement("div");
    wrapper.className = "col-7";
    row.appendChild(wrapper);

    let plotZone = document.createElement("div");
    plotZone.className = "col-7";
    wrapper.appendChild(plotZone);
    this._keyZone = this._createKeyZone(id);
    wrapper.appendChild(this._keyZone);

    this.DomElement = block;
    this._id = id;
  }
  _createValueZone(id){
    let valueZone = document.createElement("div");
    valueZone.className = "col-3";
    valueZone.style = "writing-mode: tb-rl;";
    valueZone.innerText = "value";
    valueZone.id = "value_zone_" + id;
    return valueZone;
  }
  getValueZone(){
    return this._valueZone;
  }
  _createKeyZone(id){
    let keyZone = document.createElement("div");
    keyZone.className = "col-5";
    keyZone.innerText = "key";
    keyZone.id = "key_zone_" + id;
    return keyZone;
  }
  getKeyZone(){
    return this._keyZone;
  }
}
