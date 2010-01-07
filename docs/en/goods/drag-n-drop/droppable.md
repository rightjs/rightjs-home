# Droppable

`Droppable` is the standard droppable units handling class out of the [Drag'n'Drop](/goods/drag-n-drop) library.

For the public API it has only two methods the constructor and destructor.
The constructor that takes a reference to an element and the options hash.
The destructor is just a method that detaches all the event handling out of the element.

    var droppable = new Droppable('my-element', {accept: 'div'});

    // after that the element won't behave like a droppable
    droppable.destroy();


You might also use the auto-discovery feature and the {Element} level shortcuts to
create droppables. Please see the main [Drag'n'Drop](/goods/drag-n-drop)
page for more details.

<%= anchors_index %>

## Options List, :options

There are a number of options you might specify for your droppables

Name        | Default           | Description
------------|-------------------|----------------------------------------------------------------------
accept      | '\*'              | a css-rule to filter out acceptable elements
containment | null              | the list of elements (or ids) that should to be accepted
overlap     | null              | `x/y/horizontal/vertical/both` draggable - droppable overlapping condition
overlapSize | 0.5               | the overlapping level 0 for nothing 1 for the whole thing
allowClass  | 'droppable-allow' | css-class when it accepts a draggable
denyClass   | 'droppable-deny'  | css-class when it does not accept a draggable
relName     | 'droppable'       | automatically discovered items feature key

As usual you might specify them as initialization options for every particular draggable unit, or
you might customize the `Draggable.Options` in order to change the global settings.

## Events List, :events

There are few events about which the draggables might notify your application.

Name  | Description
------|-------------------------------------------------
hover | when a draggable hovered the droppable
leave | when a draggable leaves the droppable
drop  | when a draggable was accepted and dropped

All the event listeners will receive three arguments: draggable, droppable and the mouse event
that caused the event.

    new Droppable('my-element', {
      onDrop: function(draggable, droppable, event) {
        //...
      }
    });
