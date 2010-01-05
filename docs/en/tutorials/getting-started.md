# Getting Started

This article is meant to give you a basic overview for the most common features and use cases of RightJS.

<%= anchors_index %>


## Installation, :installation

The only tricky part of RightJS installation is that it comes in two files. One of them is the actual
core and the other one contains old-browsers support code. But don't worry, for the installation process
it doesn't change anything. Just [download](/download) the files, drop them both next
to each other where you want them and then include the _core_ file in the usual way.

    <script src="/javascript/right.js"></script>

Don't worry about the second file. RightJS will automatically hook it up when needed.


## DOM Navigation, :navigation

RightJS mostly inherits the dom-navigation principles from the Prototype and Mootools frameworks.
That means you have two top level functions `$(id)` and `$$(css_rule)`

    $('element-id');     // -> Element
    
    $$('div > div.boo'); // -> Array


Then, every {Element} instance has a number of methods to navigate through its neighborhood, like
`select`, `subNodes`, `siblings`, etc. Each of them can be used as is
or can receive a string css-rule that will filter the result.

    element.select('div.boo span.foo'); // all levels descendants
    
    element.parent();        // the first parent
    element.parent('div');   // the first DIV parent

RigthJS supports all the standard CSS3 selectors on all browsers.
[Read more](/tutorials/dom-navigation-and-manipulations)


## Working With Collections, :collections

To keep it simple RightJS doesn't have any specific interfaces to process dom-elements collections,
instead of that it offers something nicer and more generic. You can process {Array}s by specifying 
property/method name and optional attributes just like that.

    var ids = $$('div').map('id');
    var classes = $$('div').map('className').map('split', /\s+/).flatten();
    
    $$('input').each('disable');
    $$('input').filter('disabled');
    
    $$('div').each('update', 'with the text');
    $$('div').each('addClass', 'marked');
    $$('div').each('onClick', 'addClass', 'marked');

Read [this article](/tutorials/call-by-name) for more information about the feature.



## Events handling, :events

Events handling in RightJS is kind of a mix of Prototype and jQuery ideas. There is a basic method
called `on`, which can take various sort of arguments and a list of shortcuts for all the
standard dom-events

    element.on('click', function() {});
    element.on({click: function(){}, mouseover: function() {} });
    element.on('click', [func1, func2, func3, func4]);
    
    // standard event shortcuts
    element.onClick(function() {});
    element.onMouseover(function() {});
    
    // it also supports the by-name event handlers
    element.onClick('addClass', 'marked');
    element.onClick('morph', {background: 'green'});

See the [dom-event basics](/tutorials/dom-events-handling) for more information



## Visual Effects, :fx

By default RightJS comes with an extensive visual effects engine that allows you to smoothly morph
any dom-element to any style, plus there are a number of standard effects like `highlight`,
`fade`, `slide`, `scroll`.

You can do both, use them in an OOP way like Scriptaculous, or use dom-level methods like jQuery.

    new Fx.Morph('element').start({background: 'green'});
    
    $('element').morph({background: 'green', fontSize: '20px'});
    
    $('element').fade().slide().highlight();

You can see the visual effects demo [over here](/fx-demo), and read more about them
in [this article](/tutorials/visual-effects)



## AJAX Operations, :ajax

There is the main interface for ajax operations called {Xhr} (after XmlHTTPRequest). You can use
it as a class like in Prototype, or you can use it in a procedural way like in jQuery.

    new Xhr('/url').send();
    new Xhr('/url', {method: 'get'}).update('element');
    
    Xhr.load('/url');
    $('element').load('/url', {method: 'get'});

Hey, we have a backed in spinners handling in there!

    Xhr.load('/url', {spinner: 'spinner'});

And we can send forms via ajax just like that (including forms with files to upload)

    $('my-form').send({onFinish: callback});
    
    // or like that
    $('my-form').remotize();
    $('my-form').submit();

Read more about that in [this article](/tutorials/ajax-handling)
and in the API documentation for {Xhr}



## Cookies Handling, :cookies

By default RightJS has a simple interface to help you work with the cookies. It automatically
escapes/unescapes the values, sets expiration dates and makes other helpful things.
And if you hook up the [JSON](/goods/json) module it will transparently save
and retrieve any JSON exportable values like arrays, objects, booleans, etc.

    Cookie.set('key', 'value');
    Cookie.get('key');
    Cookie.remove('key');

Read the api documentation for {Cookie} for more details



## Object Oriented Programming, :oop

RightJS is an object oriented framework and it provides extensive abilities for OOP approach.
In a basic case it looks like Prototype classes.

    var MyClass = new Class({
      initialize: function() {
        // constructor
      },
      
      method1: function() {},
      method2: function() {}
    });
  
But classes in RightJS also support inheritance and Ruby-style modules sharing. Read
[this article](/tutorials/object-oriented-programming) for more
information on this topic.
