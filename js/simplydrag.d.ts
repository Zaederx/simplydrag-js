declare type Position = {
    x: number;
    y: number;
};
declare const clickPosition: {
    x: number;
    y: number;
};
declare const elementPosition: {
    x: number;
    y: number;
};
/**
 * A function to make elements draggable.
 * @param draggable element to be made draggable
 */
declare function makeDraggable(draggable: HTMLElement): void;
/**
 *
 * @param clickPosition click position of the mouse within the element
 * @param elementPosition position of the top left corner of the element
 */
declare function delta(clickPosition: Position, elementPosition: Position): Position;
/**
 * Creates a drag effect on the element.
 * @param e mouse click event
 * @param draggable element to be made draggable
 * @param delta difference between clickPosition and elementPosition
 */
declare function drag(e: MouseEvent, draggable: HTMLElement, delta: Position): void;
/**
 * Ends the drag functions effects.
 * @param e mouse click event
 * @param draggable element to be made draggable
 */
declare function dragEnd(e: MouseEvent, draggable: HTMLElement): void;
