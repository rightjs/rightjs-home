# RightJS Extending Guide

In case you would like to write some extension for RightJS, like a plugin or just some tiny library
to organize routine operations in your application, here is a simple guidance how you could do that.


In terms of functionality extending you should be aware of three types of units

* [JavaScript Natives](#natives)
* [RightJS Classes](#rightjs)
* [DOM Level Units](#dom)

We will get through them one by one and later I'll put some words in about methods overloading.


## JavaScript Natives Extending, :natives

When we are talking about extending native units like {String}, {Array}, {Function} etc.
we are talking about extending the object prototypes. So the extension of natives is
simple. Just use the `$ext` function on the unit prototype like that

    $ext(Array.prototype, {
      myMethod1: function() { return 1; },
      myMethod2: function() { return 2; }
    });
    
    [1,2,3,4].myMethod1(); // -> 1
    [1,2,3,4].myMethod2(); // -> 2
    
    
    $ext(String.prototype, {
      hasBoo: function() {
        return this.includes('boo');
      }
    });
    
    "moo".hasBoo(); // -> false
    "boo".hasBoo(); // -> true


## RightJS Own Classes Extending, :rightjs

The are few RightJS own classes in the core, like {Xhr}, {Fx}, {Cookie}. All of them are
based on the {Class} unit, which means you can use the RightJS OOP features to extend them.
Meaningly the `include()` and `extend()` methods.

In similar with the Ruby programming language, the `include` method extends the class instance
level, which is the prototype level in our case. And the `extend` method extends the class level
by itself.

    Xhr.include({
      myMethod: function() {}
    });
    
    new Xhr('/some/url').myMethod();
    
    Xhr.extend({
      MY_CONSTANT: 1
    })
    
    if (Xhr.MY_CONSTANT) {
      new Xhr('/some/url');
    }

You can feed those methods with several modules if you like

    Xhr.include(MyModule1, MyModule2, ...);
    Xhr.extend(MyModule1, MyModule2, ...);

If you don't have any Ruby experience and it doesn't feel much natural, you can use the usual approach too.

    $ext(Xhr, {...});           // same as Xhr.extend
    $ext(Xhr.prototype, {...}); // same as Xhr.include



## DOM Level Extending, :dom

As there are more than one implementation of the DOM level units, extending them might be tricky.
For this reason RightJS provides the {Element.addMethods} feature, which might be used like this.

    Element.addMethods({
      myMethod1: function() {},
      myMehtod2: function() {}
    });
    
    $('my-element').myMethod1();
    $$('*').each('myMethod2');

Once you called the feature all your extensions will be registered and then whenever you select
an element with RightJS methods you will have them available on the element.

There are few more methods like this, to extend another dom-units

* {Form.addMethods} - extends the FORM elements only
* {Form.Element.addMethods} - extends INPUT, SELECT and TEXTAREA elements only
* {Event.addMethods} - extends the dom events

All those methods will register your extensions inside the objects and extend the units
prototype level if available, so that your methods will work exactly the same way as any
RightJS own method works.


## Methods Overloading, :overloading

Sometimes you might need not just to add some new methods but overload existing ones,
here is a tip how you could do that.

The idea is simple, you create a temporary function, that will return the end hash with
extensions, and then you instantly call it with the unit you extend, like this:

    $ext(SomeClass.prototype, (function(class_prototype) {
      var old_method = class_prototype.someMethod;
  
      return {
        someMethod: function() {
          var result = old_method.apply(this, arguments);
    
          // do something more
    
          return result;
        }
      };
    })(SomeClass.prototype));

The reason of doing that is to have a separated namespace where you could safely disconnect
the old methods and keep them alive for future calls.

For example, say I want that the {Xhr} instances did some fancy stuff before sending the requests

    Xhr.include(function(xhr_prototype) {
      var old_send = xhr_prototype.send;
  
      return {
        send: function() {
          this.fancyStuff();
      
          return old_send.apply(this, arguments);
        },
    
        // my additional method with the fancy stuff
        fancyStuff: function() {
        }
      };
    
    })(Xhr.prototype));

In case of the dom-level units, all the additional methods are stored at constants called `Methods`,
like `Element.Methods`, `Form.Methods`, `Event.Methods`. You can use them instead of
prototypes in the overloading process.

For example I would like to know when something on the page was changed.

    var call_mommy = function(element) {...};
    
    Element.addMethods((function(old_methods) {
      var old_insert = old_methods.insert;
  
      return {
        insert: function() {
          var result = old_insert.apply(this, arguments);
      
          call_mommy(this);
      
          return result;
        }
      };
    })(Element.Methods));

<p>&nbsp;</p>

This is pretty much all about the RightJS extending techniques.