"use strict";
const clickPosition = {
    x: -1,
    y: -1
};
const elementPosition = {
    x: -1,
    y: -1
};
/**
 * A function to make elements draggable.
 * @param draggable element to be made draggable
 */
function makeDraggable(draggable) {
    console.log('*** make draggable called ***');
    //prep element for draggging
    draggable.style.cursor = "move";
    draggable.style.position = "absolute";
    draggable.setAttribute('draggable', 'false');
    //while mouse is down on element
    draggable.onmousedown = (e) => {
        //get mouse click position within the element
        clickPosition.x = e.clientX;
        clickPosition.y = e.clientY;
        //get position of element within containing element
        var rect = draggable.getBoundingClientRect();
        elementPosition.x = rect.x;
        elementPosition.y = rect.y;
        //get difference in position between elements
        const del = delta(clickPosition, elementPosition);
        //set on drag
        draggable.onmousemove = (e) => drag(e, draggable, del);
    };
    //while mouse is up on element
    draggable.onmouseup = (e) => dragEnd(e, draggable);
}
/**
 *
 * @param clickPosition click position of the mouse within the element
 * @param elementPosition position of the top left corner of the element
 */
function delta(clickPosition, elementPosition) {
    var p = {
        x: clickPosition.x - elementPosition.x,
        y: clickPosition.y - elementPosition.y
    };
    return p;
}
/**
 * Creates a drag effect on the element.
 * @param e mouse click event
 * @param draggable element to be made draggable
 * @param delta difference between clickPosition and elementPosition
 */
function drag(e, draggable, delta) {
    //get initial coordinates of the element
    draggable.style.left = e.clientX - delta.x + 'px';
    //set new permanent y
    draggable.style.top = e.clientY - delta.y + 'px';
}
/**
 * Ends the drag functions effects.
 * @param e mouse click event
 * @param draggable element to be made draggable
 */
function dragEnd(e, draggable) {
    draggable.onmousemove = null;
}
