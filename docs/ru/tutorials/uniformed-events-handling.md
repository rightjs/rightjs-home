# Uniformed Events Handling

RightJS has a shared module called {Observer} that handles all the functionality of
observable units that need to process some events. That includes {Xhr}, {Fx}, DOM units like
{Element}, {Form}, {Document}, and all modules out of the [Goods](/goods) and [UI](/ui) libraries.

All of them works via the same interface and uses the same set of features.


## Usage Basics, :usage

The {Observer} module has all the standard methods to assign, remote, check and trigger events.
So when you see a list of supported by a unit events, like say [Draggable](/goods/drag-n-drop/draggable#events)
you can use them right away like this

    new Draggable().on('start', function() {....});
    
    // you can use hashes
    new Draggable().on({
      start: function1,
      drag:  function2,
      drop:  function3
    });
    
    // you also can use self-references like that
    new Draggable().on('start', 'revert');
    
    // and lists of callbacks
    new Draggable().on('start', [function1, function2]);
    new Draggable().on({
      start: [function1, function2],
      stop:  [function3, function4]
    });
    
    // and you can pre-bind some values for your callbacks too
    new Draggable().on('start', func1, val1, val2, ...);

Pretty much the same for any DOM element

    $('my-id').on('click', function() {...});
    
    $('my-id').on('click', 'addClass', 'marked');
    
    $('my-id').on({
      click:     func1,
      mouseover: 'highlight',
      mouseout:  [func2, func3, funcc4]
    });

Then for predefined events list and the most common dom-events there will be shortcut methods
named like `on[Event]`. Note each of them returns the object back so you can write chains like that

    new Draggable().onStart(func1).onStop(func2).onDrag('revert');
    
    $('my-id').onClick(function(){}).onMouseover('addClass', 'hovered');

For the predefined events, with all the units, you can send your callbacks along with any options
using the same names as the shortcut methods

    new Draggable({
      axis: 'x',
      snap: 10,
      onStart: function1,
      onStop:  function2
    });
    
    new Autocompleter('my-element', {
      url: '/some/url',
      onShow:   function1,
      onSelect: function2
    });

The only exception is the the DOM {Element} constructor, to speed the things up, you need to use
an option named `events` with the same hash of callbacks you would send to the `on` method

    new Element('div', {
      id: 'my-id',
      events: {
        click:     function() {},
        mouseover: function() {}
      }
    });

## Custom Events, :custom

In our system there is no difference between custom and predefined list of events. You can define
and trigger your own events on fly, just like that

    var calendar = new Calendar();
    
    // assign it
    calendar.on('my-event', function(one, two, three) {
      // do something about it
    });
    
    // fire it up
    calendar.fire('my-event', 1,2,3);

