"use strict";

/*
  Event Listeners:
  onElementStartDragging
  onElementDragging
  onElementEndDragging

*/
export class ListWidget {
  constructor(data, id) {
    this._id = id;
    let block = document.createElement("div");
    block.className = "col-4";
    this.DomElement = block;

    let dataElementZone = document.createElement("div");
    dataElementZone.className = "dataElementZone";
    this._dataElementZone = dataElementZone;
    for (var i = 0; i < data.length; i++) {
      if (data[i].length != 0) {
        let element = this._makeMovableElement(data[i]);
        dataElementZone.appendChild(element);
      }
    }
    block.appendChild(dataElementZone);
    this._listeners = new Array();
  }
  getId() {
    return this._id;
  }
  _makeMovableElement(text) {
    let dataElement = document.createElement("div");
    dataElement.className = "dataElement noselect";
    dataElement.textContent = text;
    let baseStyle = dataElement.style;

    let self = this;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      dataElement.style.position = "absolute";
      dataElement.style.opacity = "0.7";
      dataElement.style.outline = "rgba(200, 200, 255, 0.8) solid 5px";
      dataElement.style.top = e.clientY + "px";
      dataElement.style.left = e.clientX + "px";

      // document.onmouseup = closeDragElement;
      // document.onmousemove = elementDrag;
      document.addEventListener("mousemove", elementDrag);
      document.addEventListener("mouseup", closeDragElement);

      let f = self._listeners["onElementStartDragging"];
      if (f !== undefined) {
        f();
      }
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      dataElement.style.top = e.clientY + "px";
      dataElement.style.left = e.clientX + "px";
      let f = self._listeners["onElementDragging"];
      if (f !== undefined) {
        f();
      }
    }
    let id = this._id;
    let dataZone = this._dataElementZone;

    function closeDragElement() {
      /* stop moving when mouse button is released:*/

      // document.onmouseup = null;
      // document.onmousemove = null;

      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);

      let x = parseFloat(dataElement.style.left);
      let y = parseFloat(dataElement.style.top);

      dataElement.style = baseStyle;

      if (!isNaN(x) && !isNaN(y)) {
        let element = document.elementFromPoint(x, y);

        if (element != null) {
          let isContainerElement = function(elem) {
            return elem.id == "key_zone_" + id || elem.id == "value_zone_" + id;
          };
          if (!isContainerElement(element)) {
            let parent = element.parentElement;
            if (isContainerElement(parent)) {
              element = parent;
            } else {
              element = null;
            }
          }
        }

        if (element != null) {
          if (element.children.length > 0) {
            let prevChild = element.replaceChild(
              dataElement,
              element.lastChild
            );
            dataZone.appendChild(prevChild);
          } else {
            element.appendChild(dataElement);
          }
        }
      }

      let f = self._listeners["onElementEndDragging"];
      if (f !== undefined) {
        f();
      }
    }

    // dataElement.onmousedown = dragMouseDown;
    dataElement.addEventListener("mousedown", dragMouseDown);
    return dataElement;
  }
  addEventListener(name, func) {
    this._listeners[name] = func;
  }
}
