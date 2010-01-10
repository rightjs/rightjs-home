# Elements Visual State Toggling
<% set_unit_scope('Element') %>

There are several methods in RightJS that supposed to help you to switch dom-elements visual
state. Most of them are standard but there some additional features and details
that might be useful to know.

## Standard Visibility Toggling, :standard

RightJS has all the standard methods like {Element#hide}, {Element#show}, {Element#toggle}
to switch the dom-elements visibility status on and off. Additionally there is the {Element#radio}
method that might be seen in some other frameworks. This method shows the element and hides
all the siblings.

There are two important things you should know about those methods.

First of all those methods preserve the element style `display` property. So that if
you has changed an element style then hidden it and then shown again, the element will remain the
original `display` value.

    $(element).style.display = 'inline-block';
    
    $(element).hide();
    $(element).show();
    
    $(element).style.display; // -> 'inline-block'

Secondly as all the methods in RightJS that change an object, those methods return reference
to the element back, so that you could write nice and readable phrases in your code.
Like that:

    $(element).show().update('with text').highlight();


## CSS Classes Toggling, :css

There is a list of standard methods to manage css-classes presence on dom-elements
{Element#addClass}, {Element#removeClass}, {Element#hasClass}, {Element#toggleClass},
{Element#radioClass}.

The usage of them is pretty straight forward:

    /*
      <ul id="some-menu">
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    */
 
    $('some-menu').select('li').each('onClick', 'radioClass', 'marked');


## Visibility Toggling With Visual Effects, :effects

Some visual effects like {Fx.Slide} and {Fx.Fade} are bidirectional. Which means that
they can work in both directions to show and to hide an element.

By default they will automatically determine an element current state and work towards
the opposite one. It is an fx equivalent of the {Element#toggle} method if you will.

    $(element).style.display = 'none';
    
    $(element).fade(); // -> shows
    $(element).fade(); // -> hides

If you need an effect to work in some direction specifically you can define it manually,
like that:

    $(element).slide('out'); // hides despite on the element state
    $(element).slide('in');


## Mixed Approach, :mixed

The visual effects library in RightJS is not a required module and can be switched off
by the [custom build](<%= builds_path %>) process.

In case when you write some sort of a plugin or widget, which supposed to work in both
cases whenever the {Fx} module is included or not, you might find the mixed approach
useful.

The idea is simple: you use the standard {Element#hide}, {Element#show}, etc. methods
and pass the desired visual effect name and options as the arguments to the method,
like this:

    $(element).hide('fade');
    $(element).show('slide', {direction: 'right'});

In this case, if there is the {Fx} library then the element will be processed with the
specified visual effect and if the {Fx} library is not available, then the element will
get simply hidden/shown immediately. 

