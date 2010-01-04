# Comparison

A few words about basic differences and similarities between RightJS and other major JavaScript frameworks.


## Disclaimer

Except the obvious reason of brainwashing and making you use RightJS, this article meant to give you some
ideas where RightJS is situated (or supposed to be situated) relatively to other JavaScript frameworks.


And I have a humble hope that you understand or at least have a feeling that this is the author's opinion,
that obviously doesn't have anything to do with other people's reality and therefore should not be trusted.


## RightJS vs. jQuery

Both quite small, modular and relay on plugins and extensions. Both have quite a lot of short and handy methods.
And both help you write a compact code.


The main difference between them is that jQuery is more oriented to procedural and functional approaches. 
RightJS provides basic functional and procedural programming features too, but it's more object-oriented
and made to be closer to the server-side developers who work with dynamic languages like Ruby and Python.


Another major difference is that jQuery works internally isolating all the processes inside its own scope, RightJS
on the other hand extends the JavaScript unit prototypes and provides an instant access to most of its features.


### Pros and Contras

* \+ Extensive object-oriented abilities
* \+ Immediately available native class extensions
* \+ Additional handy features like 'call-by-name'
* \+ Shared modules {Observer} and {Options}
* \+ More readable and clean syntax
* \+ Much better performance
* \+ Much more compact and modular UI Library
* \+ Cleaner and better organized internal code
* \- No safe-mode (at least yet)


## RightJS vs. Prototype/Scriptaculous

Prototype and RightJS have quite a lot in common and based on the same principle of `prototype` extensions.
More of that RightJS inherited the naming principles and many method and class names are the same or similar
to the ones you might see in Prototype.

The difference between them is that RightJS is a modular framework with a small simple core and plugins, when Prototype
is more like a monolithic all-in-one framework. Then RightJS is mostly the modern browsers oriented, keeping all the
old browsers support in a separated module with patches, when Prototype has a special public API for faster elements
processing on old browsers.

### Pros and Contras

* \+ Modular, plugins oriented structure
* \+ Much smaller size
* \+ Much better performance
* \+ No rarely used code and obsolete features
* \+ Cleaner and more compact syntax
* \+ Additional features like call-by-name and function extensions
* \+ Better and more flexible Fx library
* \+ Basic Fx and Cookies support out of box
* \+ Own UI library and plugins collection
* \- No fast class-level functions (needed only with IE6 and 7 browsers)


## RightJS vs. Mootools

RightJS and Mootools are pretty similar too, both started on the road of making a better Prototype, and as the matter
of fact RightJS cherry-picked quite a few interesting things from Mootools.


But there are several differences between them. Mootools brings quite a lot of functional approach
features, like carrying and call-chains, and tends to mix them with the object-orented approach providing some
interesting features and its own way of doing the thins. RightJS comparing to Mootools is a simpler tool. It
has both functional and object-oriented features, but RightJS keeps them separated allowing a developer to choose
how he wants to deal with his task.

Another difference is that Mootools tries to bring its own naming system for methods, classes and modules, when
RightJS tries to stay close to the more or less standard Prototype and Ruby/Python naming principles.

### Pros and Contras

* \+ A bit compacter core and modules
* \+ Better performance
* \+ More standard, clean and readable syntax
* \+ Simplified way of dealing with everyday problems
* \+ Better Fx library where you just specify the end result
* \- I don't really see any significant contras in here


## RightJS vs. YUI and Dojo

Dojo and YUI frameworks are similar and both quite different comparing to RightJS. RightJS is a modern framework
more like Ruby, when YUI it's more like an equivalent of Java. Dojo is probably closer to Python.

The key difference between them is that YUI and Dojo work inside their own namespaces and you supposed to work
through their nested API. RightJS on the other hand, provides you an instant access to most of its features so
that whenever you have an object you can immediately call its functionality, creating chains, etc.

### Pros and Contras

* \+ Smaller, modular library
* \+ Let you write much more compact applications code
* \+ Instant access to the functionality
* \+ Dynamic languages like extensions for the core classes
* \+ Functional approach features
* \- Doesn't have it's own namespace
