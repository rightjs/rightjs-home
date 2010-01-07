# Behaviors Module

The behaviors module provides you an ability to define an elements behavior group (by a css-rule)
and then it will automatically watch any changes on the web-page and update matching elements.

<%= anchors_index %>


## Simple Example, :simple

The usage is really simple, you just define a css-rule and events that you want to handle

    "#todo-list div.item".behave('click', function() {....});

After that the script will update all the matching elements on the page so they handled
the `'click'` event with the function and then whenever you add new items onto the
todo-list element, it will automatically assign the event handling to them.

If you started the behavior at the page loading time, the script will scan through the page
once more when it's loaded.

## RightJS Features Are Also Available, :rightjs

The `'behave'` method supports all the same argument types as the {Observer#on} method,
including the [call by name](/tutorials/call-by-name) feature, custom events, etc.
There are no limitations.

    // a hash of events
    "#todo-list div.item".behave({
      click:     function1,
      mouseover: function2,
      mouseout:  function3
    });

    // or with a list
    "#todo-list div.item".behave('click', [function1, function2, ..]);

    // or by name
    "#todo-list div.item".behave('click', 'radioClass', 'selected');


## Stopping Behavior, :stopping

If you need to cancel some behavior, just call the `'stopBehave'` method and it will remove all
the registered callbacks out of processed elements and will stop watching the page updates.

    "#todo-list div.item".behave('click', function() {});

    "#todo-list div.item".stopBehave();


## Manual Triggering, :manual

By default the script will watch when you change the page by using the RightJS {Element} methods, like
{Element#insert}, {Element#update}, etc. But if you did changed your page manually by say altering an
`innerHTML` attribute, you can manually trigger the behaviors update by calling the 
`{Behavior.refresh}` method.

    "#todo-list div.item".behave('click', 'toggleClass', 'selected');

    $('todo-list').innserHTML = "...";

    // this will go through all the registered behaviors and rescan the page
    Behavior.refresh();


## Events Delegation, :delegation

With the library you also can create events delegation objects, so that different types of
elements were handled by different rules. For that case you need to specify hashes like
`css_rule -> handler_function`

    var delegation = Behavior.delegate({
      ".foo": function() { alert('foo'); },
      ".bar": function() { alert('bar'); }
    });

    "div.something".behave('click', delegation);

After that all the `div.something` elements will trigger alert with `'foo'` if they also have class `'foo'`
and `'bar'` if they have class `'bar'`.


## Tough Bastards Way, :tough

In case of more complex development you might want some more serious way of your behaviors
library organization; with classes, objects and so one. We have 'em too. 

There is a class called `Behavior`, which has the following simple methods:

Name    | Description
--------|---------------------------------------------------------------------
start   | makes the behavior active
stop    | deactivates the behavior
active  | checks if the behavior is active
refresh | rescans the page for elements matching to this behave css-rule

The usage is pretty much straight forward:

    new Behavior("#todo-list div.item", "click", function() {...});
    new Behavior("#todo-list div.item", "click", [func1, func2, func3]);
    new Behavior("#todo-list div.item", "click", "radioClass", "selected");

    var behave = new Behavior("css-rule", {event: function() {}});
    behave.start().stop().start().refresh();
