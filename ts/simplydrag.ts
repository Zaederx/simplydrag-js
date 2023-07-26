type position = { x:number, y:number }
type relPosName = {dataXName:string, dataYName:string} //relative position name
const clickPosition = 
{
    x:-1,
    y:-1
}
const elementPosition = 
{
    x:-1,
    y:-1
}

/**
 * see [link](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#browser_compatibility)
 * for more info on what options are available for the cursor option and in which browsers
 * Only a few are listed here
 */
type cursor = 'move'|'nesw-resize'|'nwse-resize'|'crosshair'|'default'|'grab'|string
export type options = { position:string, cursor:cursor, dataAttributeName:string, parentElement:HTMLElement }
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
export function makeDraggable(draggable:HTMLElement, opts:options)
{
    console.log('*** make draggable called ***')
    console.log('options:',opts)
    //get options
    const { position, cursor, dataAttributeName, parentElement } = opts
    //prep element for draggging
    cursor ? draggable.style.cursor = cursor : draggable.style.cursor = 'nwse-resize'
    position ? draggable.style.position = position : draggable.style.position = 'absolute'

    draggable.setAttribute('draggable','false')//not that kind of default draggable

    var x = draggable.getBoundingClientRect().x
    var y = draggable.getBoundingClientRect().y

    if (parentElement && dataAttributeName)
    {
        //set data x and data y attributes
        var dataXName = `data-${dataAttributeName}-x`
        var dataYName = `data-${dataAttributeName}-y`
        setDataXY(parentElement,draggable,x,y, {dataXName,dataYName})

        //set those to then be updated as coorindates change
        watchCoordinates(parentElement,draggable,dataAttributeName)
    }
    else if (parentElement)
    {
        console.log('parentElement is set, but dataAttributeName is node set.')
        console.log('dataAttributeName not set. Setting relative coordinate names to: data-x and data-y')
        draggable.setAttribute('data-x',String(x))
        draggable.setAttribute('data-y',String(y))

    }
    else if (dataAttributeName)
    {
        console.warn('Parent element not set. Please ensure that you set the parentElement if you intend to use the parent element relative position data attributes.')
    }
    
    //while mouse is down on element
    draggable.onmousedown = (e) => {
        //get mouse click position relative to the viewport
        clickPosition.x = e.clientX
        clickPosition.y = e.clientY
        //get position of element relative to the viewport
        var rect = draggable.getBoundingClientRect()
        elementPosition.x = rect.x
        elementPosition.y = rect.y
        //get difference in position between elements
        const del = delta(clickPosition,elementPosition)
        //set on drag
        draggable.onmousemove = (e) => drag(e,draggable,del)
    }
    //while mouse is up on element
    draggable.onmouseup = (e) => dragEnd(e,draggable)
}


function watchCoordinates(parentElement:HTMLElement,draggableNode:HTMLElement,dataAttributeName:string)
{
    console.log('function watchCoordinates called')
    var dataXName = ''
    var dataYName = ''
    if (dataAttributeName)
    {
        dataXName = `data-${dataAttributeName}-x`
        dataYName = `data-${dataAttributeName}-y`
    }
    else
    {
        dataXName = 'data-x'
        dataYName = 'data-y'
    }
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    // Callback function to execute when mutations are observed
    const callback:MutationCallback = (mutationList:MutationRecord[], observer:MutationObserver) => 
    {
    mutationList.forEach(mutation => 
        {
            console.log('mutation:', mutation)
            //if there's a change in dataX or dataY
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') 
            {
                //get draggable element x and y
                var x = draggableNode.getBoundingClientRect().x;
                var y = draggableNode.getBoundingClientRect().y;
                //set parent relative x and y
                setDataXY(parentElement, draggableNode, Number(x), Number(y), {dataXName: dataXName, dataYName: dataYName});
            }
        })
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)
    // Start observing the target node for configured mutations
    observer.observe(draggableNode, config)
}

/**
 * Sets that draggable element position but using the 
 * parent relative coordinates
 * @param draggableNode the draggable element
 * @param x_drag the absolute / screen relative x coordinate of the draggable element
 * @param y_drag the absolute / screen relative y coordinate of the draggable element
 */
function setDataXY(parentElement:HTMLElement, draggableNode:HTMLElement, x_drag:number, y_drag:number, coords:relPosName)
{
    console.log('x_drag:',x_drag, 'y_drag:', y_drag)
    //parent x and y coordinates
    var p_x = Number(parentElement.getBoundingClientRect().x)
    var p_y = Number(parentElement.getBoundingClientRect().y)
    console.log('p_x:',p_x,'p_y:',p_y)
    //x and y minus parent element positon (which is also the offset)
    var dataX = x_drag - p_x;
    var dataY = y_drag - p_y;
    console.log('dataX:', dataX, 'dataY:', dataY);
    //set the parent element relative x and y position in custom data attriibutes
    draggableNode.setAttribute(coords.dataXName, String(dataX));
    draggableNode.setAttribute(coords.dataYName, String(dataY));
}
/**
 * 
 * @param clickPosition click position of the mouse within the element
 * @param elementPosition position of the top left corner of the element 
 */
function delta(clickPosition:position, elementPosition:position):position
{
    var p:position = {
        x:clickPosition.x-elementPosition.x,
        y:clickPosition.y-elementPosition.y
    }
    return p
}

/**
 * Creates a drag effect on the element.
 * @param e mouse click event
 * @param draggable element to be made draggable
 * @param delta difference between clickPosition and elementPosition
 */
function drag(e:MouseEvent, draggable:HTMLElement, delta:position)
{
    //get initial coordinates of the element
    draggable.style.left = e.clientX - delta.x +'px'
    //set new permanent y
    draggable.style.top = e.clientY - delta.y +'px'
}
/**
 * Ends the drag functions effects.
 * @param e mouse click event
 * @param draggable element to be made draggable
 */
function dragEnd(e:MouseEvent, draggable:HTMLElement) {
    draggable.onmousemove = null
}