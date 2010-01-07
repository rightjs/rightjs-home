# Drag'n'Drop Module

This is the standard drag-n-drop library for RightJS. As most of libraries of this type it
contains basically two units `Draggable` and `Droppable`. There are two separated documents
for each of them, plus you might take a look at some simple demo page

* [Draggable](/goods/drag-n-drop/draggable)
* [Droppable](/goods/drag-n-drop/droppable)
* [Demo Page](/goods/drag-n-drop/demo)

<%= anchors_index %>

## Download, :download

This library comes in the three standard builds

* [right-dnd.js](/builds/goods/right-dnd.js)
* [right-dnd-min.js](/builds/goods/right-dnd-min.js)
* [right-dnd-src.js](/builds/goods/right-dnd-src.js)
  
It also available as an option at the [custom build](<%= builds_path %>) page.

## Auto-Discovery Feature, :discovery

This library provides the standard for RightJS auto-discovery feature
using by the `'rel'` attribute, and also the HTML5 style option attributes like this:

    <div rel="draggable" data-draggable-options="{revert: false}">Drag Me To Hell</div>

    <div rel="droppable" data-droppable-options="{accept: '.sinner'}">The Hell</div>

## Element Level Methods, :methods

There are also several {Element} level shortcut methods to covert elements into
draggable/droppable units.

Name                       | Description
---------------------------|--------------------------------------
makeDraggable(\[options\]) | makes the element draggable
undoDraggable()            | undoes the draggable conversion
makeDroppable(\[options\]) | makes the element droppable
undoDroppable()            | undoes the droppable conversion


## Performance Notes, :performance

In our implementation, the number of _draggable_ elements on your page _will not affect_
your application performance, all of them will be handled in the same way for the same cost.

But, the performance _is depend_ on the number of your _droppable_ targets. In this case there is a difference
between usual droppables and droppables with the `overlap` option turned on. In the first
case you might pretty much safely have 100 and more droppables (depends on the complexity of your page),
but in case if you need to track the actual draggable and droppable elements overlapping, the number of them
might drop down two three times (depending on the browser).
