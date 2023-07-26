/**
 * see [link](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#browser_compatibility)
 * for more info on what options are available for the cursor option and in which browsers
 * Only a few are listed here
 */
type cursor = 'move' | 'nesw-resize' | 'nwse-resize' | 'crosshair' | 'default' | 'grab' | string;
export type options = {
    position: string;
    cursor: cursor;
    dataAttributeName: string;
    parentElement: HTMLElement;
};
/**
 * A function to make elements draggable.
 * If given the `parentElement` and `dataAttributeName` it works out a coordinate system from the parent element of the draggble element (instead of from the top left corner of the screen)
 * Position with respect to parent element accessible from `data-x` and `data-y` unless options {dataAttributeName:${name}} is specified
 * in which case its `data-${dataAttributeName}-x` and `data-${dataAttributeName}-y`
 * @param draggable element to be made draggable
 * @param option
 *
 * - css position attribute
 * - cursor attribute
 * - name for the dataAttribute for the new coordinate system, and an offset - if making it relative to a parent element (this is the parent element x and y)
 */
export declare function makeDraggable(draggable: HTMLElement, opts: options): void;
export {};
