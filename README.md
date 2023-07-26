see the npm package at [link](https://www.npmjs.com/package/simplydrag-js)
# Usage

Install the package:
```
npm install simplydrag-js
```

Import and use:
```
import { makeDraggable } from 'simplydrag-js'

//get the element that you want to make draggable
var draggable = document.querySelector("#toDrag")

//call the makeDraggable function with the element passed as a parameter
makeDraggable(draggable)
```


And that's it! Now your element should be completely draggable!

Note: This makes your HTML element's position 'absolute'. So you should be aware of this when using this package, just in case you need your element's position attribute to be different.


Additional Note:
For more advanced use cases where you might need to get the absolute position relative to a parent element, there are options to allow this position to be saved on the element in dat attributes. This is great for when you might need to get the absolute position relative to a portion of the screen set aside for printing (where the print css and positioning might need to be different to the general webpage positioning). This allows you to repostion the parent element, but still keep the draaggable element absolute position relative to the parent element and add this back to the parent elements position to get the right spot for the draggable element before printing.

Here's an example of 

```
import { makeDraggable } from 'simplydrag-js'
import { Printer } from 'simplyprint-js'
var scrapbook = document.querySelector('#scrapbook') as HTMLElement
const options = {dataAttributeName:'scrapbook', parentElement:scrapbook} as options
//object draggable by default
var draggableArr = document.querySelectorAll(".draggable") ;
draggableArr.forEach((draggable)=> makeDraggable(draggable as HTMLElement, options))

//enable print button
const btnPrint = document.querySelector('#btn-print') as HTMLDivElement
btnPrint.onclick = () => {
    //for each draggable element...
    var draggableArr = document.querySelectorAll('.draggable') as NodeListOf<HTMLElement>
    draggableArr.forEach((draggableElement) => 
    {
        //set x and y as relative to parent element (when a x,y = 0,0 in my use case)
        draggableElement.style.left = draggableElement.getAttribute('data-scrapbook-x') as string + (0) + 'px'
        draggableElement.style.top = draggableElement.getAttribute('data-scrapbook-y') as string + (0) +'px'
    })

    //print
    var cssArr = [printCss]
    var printer = new Printer('#scrapbook', cssArr)
    printer.print()

    //set images in scrapbook back to the original positions
    var scrapbook = document.querySelector('#scrapbook') as HTMLElement
    var sbX = scrapbook.getBoundingClientRect().x
    var sbY = scrapbook.getBoundingClientRect().y
    draggableArr.forEach((draggableElement) => 
    {
        var xRelSB = Number(draggableElement.getAttribute('data-scrapbook-x'))
        var yRelSB = Number(draggableElement.getAttribute('data-scrapbook-y'))

        var orignialX:number = sbX + xRelSB
        var originalY:number = sbY + yRelSB

        //set x as relative to parent element when a x,y = 0,0
        draggableElement.style.left = String(orignialX) + 'px'
        draggableElement.style.top = String(originalY) + 'px'
    })
}
```
Please feel free to take a look at the underling package code, here or on github to get an idea of what is going on.
