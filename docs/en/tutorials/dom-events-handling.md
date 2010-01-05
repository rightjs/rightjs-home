# DOM Events Handling
<% set_unit_scope('Element') %>

RightJS has one unified events handling interface defined by the {Observer} module and all the dom-elements
use them for dom-events processing. This means you can attach events listeners in the same way as everywhere else

    $('element').on('click', function() {});
    $('element').on('click', [func1, func2, func3,...]);
    $('element').on({
      click:     func1,
      mouseover: func2,
      mouseout:  func3
    });
    
    // listeners by name work too
    $('element').on('click', 'addClass', 'clicked');
    
    
Then for all the standard dom-events there are nice shortcut methods for event listeners attachment

    $('element').onClick(function() {})
    $('element').onMouseover('addClass', 'hovered');
    $('element').onMouseout('removeClass', 'hovered');
    
    $('form').onSubmit(function() {});
    
    $('input').onChange(function() {});
  
And you can check and unsubscribe listeners the same way too

    $('element').stopObserving('click');
    $('element').stopObserving(function_1);
    $('element').stopObserving('click', function_2);
    
    $('element').observes('click');
    $('element').observes(function_1);
    
    // ....

See the description of the {Observer} unit and {Element} methods, like {#on}, {#stopObserving}, {#observes}, {#listeners}
for more information on the standard interface.


## Event Object Receiving, :receiving

There is couple of important moments on how RightJS sends an instance of the dom-event inside the listeners.

When you just attach your listener function in a standard way it naturally called in the context of the element and receive
the dom-event instance as the first argument.

    $('element').onClick(function(event) {
      if (this.hasClass('marked'))
        event.stop(); // or something
    });
    
You also can bind some arguments that should be sent along with the event to your listeners, so that you don't have
to use any sort of currying/binding manually in such cases

    $('element').onClick(function(event, one, two, three) {
      this.update(one + two + three);
    }, 'one', 'two', 'three');

But, when you attach your event listener by name, in this case RightJS will send in your listeners _defined arguments only_.
The reason is simple, all the methods referred by name expect some data from you, not an event.

    $('element').onClick('hide', 'fade', {duration: 'long'});
    $('element').onMouseover('addClass', 'hovered');
    $('element').onMouseout('removeClass', 'hovered');


## Event Extensions, :extensions

RightJS does not create any sort of mediative interface for cross-browser events handling.
Instead of that it uses the standard and familiar W3C event model simply mocking this interface
on the IE browsers.

This way whichever browser the user uses, you always will have access to the following properties
on every event

* `which` - which mouse button was pressed (1,2,3)
* `target` - target element reference
* `relatedTarget` - the related element for the over and out mouse events
* `pageX`, `pageY` - the cursor position relative to the document

Additionally, every event has a few standard methods {Event#stop}, {Event#position}, to stop an event and grab it's
position respectively.

If you use RightJS own interfaces to bind your event listeners, then all the extensions will be available right away

    $('element').onContextmenu(function(event) {
      event.stop();
      
      $('context-menu').moveTo(event.position()).show('slide');
    });
    
But in case if you have attached your event listener via the IE native interfaces, then you can call the
{Event.ext} method to extend your events

    element.attachEvent('onclick', function(event) {
      Event.ext(event);
      
      event.stop();
    });


## Manual Events Triggering, :triggering

Every event in RightJS can be triggered manually, which is a bit naughty but sometimes useful. To do so,
all you need is to call the `fire` method with the event name and possibly some options

    $('element').onClick(function() { alert('boo'); });
    
    $('element').fire('click'); // you'll see the 'boo'
    
    
    // or say you can trigger a keyboard event like that
    $('element').fire('keypress', {keyCode: 27});

__NOTE__: RightJS _will not_ trigger a real event in this case. It will simply call every subscribed
listener with a _fake_ event that will have the options you specify.


## Custom Events, :custom

Basically, for RightJS, there is no difference between standard and custom events. It handles all of them
the same exact way.

    $('element').on('my-event', function() {...});
    
    $('element').onClick(function() {
      if (something)
        this.fire('my-event', {with: 'options'});
    });

The only difference is that your events obviously won't have shortcuts.
