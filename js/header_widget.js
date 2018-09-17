"use strict";

export class HeaderWidget {
  constructor(header, id) {
    this._id = id;
    let block = document.createElement("div");
    block.className = "col-4";

    let headerElementZone = document.createElement("div");
    headerElementZone.className = "headerElementZone";
    let indexElement = this._makeMovableHeaderElement("Index");
    headerElementZone.appendChild(indexElement);
    for (var i = 0; i < header.length; i++) {
      if (header[i].length != 0) {
        let element = this._makeMovableHeaderElement(header[i]);
        headerElementZone.appendChild(element);
      }
    }

    block.appendChild(headerElementZone);
    this.DomElement = block;
    console.log(this._id);
  }
  getId(){
    return this._id;
  }
  _makeMovableHeaderElement(text) {
    let headerElement = document.createElement("div");
    headerElement.className = "headerElement";
    headerElement.textContent = text;
    let baseStyle = headerElement.style;

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
    let id = this._id;
    console.log(id);
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      let x = parseFloat(headerElement.style.left);
      let y = parseFloat(headerElement.style.top);
      let element = document.elementFromPoint(x, y);
      let isAllowedElement =
        element !== undefined && element !== null &&
        (element.id == "key_zone_" + id || element.id == "value_zone_" + id);
      if (isAllowedElement) {
        element.appendChild(headerElement);
      } else {
        headerElement.style = baseStyle;
      }
    }

    headerElement.onmousedown = dragMouseDown;
    return headerElement;
  }
}
