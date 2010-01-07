# Advanced DOM Events Handling

This module provides additional functionality that might be helpful when you need to work
with DOM events a lot.

<%= anchors_index %>

## Keys And Buttons Determination, :keys

There are two additional constants appear at the {Event} class when the module is included.

The first one is `Event.BUTTONS` and keeps the mouse button numbers

* `LEFT` - 0 (1 for IE and Konqueror)
* `MIDDLE` - 1 (4 for IE and Konqueror)
* `RIGHT` - 2

The second one is `Event.KEYS` that keeps codes of the command keys on a keyboard

* `BACKSPACE`
* `TAB`
* `ENTER`
* `ESCAPE`
* `SPACE`
* `PAGE_UP`
* `PAGE_DOWN`
* `END`
* `HOME`
* `LEFT`
* `UP`
* `RIGHT`
* `DOWN`
* `INSERT`
* `DELETE`

For each of the constants there is a respective method that will check if that key/button was pressed.
The names follow the constant names, like this:

    $('element').onClick(function(event) {
      if (event.isLeftClick())
        // ...
    });

    $('input').onKeydown(function(event) {
      if (event.isEnter())
        this.form.submit();
    });

## DOM Events Firing, :dom

By default when you try to initiate events on dom elements in RightJS, it will simply go through
all the callbacks registered to the element with a fake event. It works but it's not real.

If you need to fire real dom-events, then you might use this module. When it is included this
module wraps the original events initiation methods and uses the new ones, so that there will
be no difference at the API level.

__NOTE:__ Konqueror 3 does not support this feature.

