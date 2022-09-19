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