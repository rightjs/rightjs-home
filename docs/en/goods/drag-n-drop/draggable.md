# Draggable

`Draggable` is the standard draggable units handling class out of the
[Drag'n'Drop](/goods/drag-n-drop) library.

For the public API it has only two methods the constructor and destructor.
The constructor receives a reference to an element and the options hash.
The destructor is just a method that detaches all the events handling out of
the element making it not draggable anymore.

    var draggable = new Draggable('my-element', {axis: 'x'});

    // after that the element won't be draggable anymore
    draggable.destroy();

You might also use the auto-discovery feature and the {Element} level shortcuts to
create draggables. Please see the main [Drag'n'Drop](/goods/drag-n-drop) page for more details.

<%= anchors_index %>

## Options List, :options

There are a number of options you might specify for your draggables

Name              | Default     | Description
------------------|-------------|---------------------------------------------------------------------------
handle            | null        | a reference to handle element that will start the drag
snap              | 0           | a number in pixels or \[x,y\]
axis              | null        | null or 'x' or 'y' or 'vertical' or 'horizontal'
range             | null        | {x: \[min, max\], y:\[min, max\]} or a reference to another element
dragClass         | 'dragging'  | the dragging time class name
clone             | false       | marker if it should keep a clone in place
revert            | false       | marker if the object should be moved back once dropped
revertDuration    | 'normal'    | the moving back fx duration
scroll            | true        | marker if draggables should automatically scroll the window
scrollSensitivity | 32          | the scrolling area size in pixels
zIndex            | 10000000    | the initial elements z-index (gets incremented during drags)
moveOut           | false       | marker if the draggable should be moved out of it's context (for overflown elements)
relName           | 'draggable' | the auto-discovery feature key


As usual you might specify them as initialization options for every particular draggable unit, or
you might customize the `Draggable.Options` in order to change the global settings.

## Events List, :events

There are few events about the draggables might notify your application.

Name   | Description
-------|---------------------------------------------------------------------------
before | before any drag calculations
start  | when the drag starts
drag   | when the element changed its position
stop   | when the user released the element
drop   | when the object was dropped on a droppable object

All the callbacks except the `'drop'` event, will take two arguments, the draggable by itself and the mouse event that caused the event.

    new Draggable('my-element', {
      onStart: function(draggable, event) {
        notify_my_application_about_drag_start();
      }
    });

The `'drop'` event will happened only when the draggable was dropped over a droppable object that
will accept it, and once it's happened the listener will receive three objects, droppable, draggable and
the mouse event

    new Draggable('my-element', {
      onDrop: function(droppable, draggable, event) {
        notify_my_app();
      }
    });


## Relatively Positioned Draggables, :relative

This implementation of draggables transparently works with draggable elements that are inside relatively
positioned elements with their own positions scope, like this

    <div style="position: absolute; left: 40em; top: 10em">
      <div rel="draggable" style="left: 0; top:0">
        Drag me around!
      </div>
    </div>

The only condition is that you _have to_ specify the default position of the element with CSS or the style attribute.
Once you've done that, the script will check the element's relative and absolute positions and if they are different, then
it will work inside the relative positions scope.
