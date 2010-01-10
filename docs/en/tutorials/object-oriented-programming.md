# Object Oriented Tutorials

Internally RightJS is mostly an object-oriented framework and in this tutorial we will go through
all the most important techniques and features of object-oriented programming in RightJS.

<%= anchors_index %>


## Basic Definition, :definition

The basic class definitions in RightJS is pretty much the same as you might see in Prototype
or Mootools. There is a unit called {Class}, which you use in the following way.

    var MyClass = new Class({
      initialize: function() {
        // constructor
      },
  
      method1: function() {},
      method2: function() {}
    });

If you have some classes of yours from Prototype/Mootools and they don't use inheritance, they
should be working in RightJS right way.


## Inheritance, :inheritance

Inheritance in RightJS looks like the one in Prototype, you pass two arguments to the {Class}
constructor, the parent class and the new code hash, but unlike Prototype, RigthJS doesn't
send reference to the super-method as a first argument, instead of that it allows you to
access it in a more natural way by referring it with the `this.$super` variable.

    var Girl = new Class({
      sayHello: function() {
        return "Hello there";
      }
    });
    
    var FancyGirl = new Class(Girl, {
      sayHello: function() {
        return "Well, "+ this.$super() +"!";
      }
    });

The overloaded methods can take any types and numbers of arguments you like, and you can
bypass them down to the `$super` method as you need.


## Private Methods, :private

RightJS doesn't have any special features to handle private methods, because you don't really need
that. You always can create private methods with the following trick.

    var MyClass = new Class((function() {
  
      var private_method = function() {
        // some secret stuff in here
      };
      
    return {
      
        publicMethod: function() {
          // you can call it like a plain function in here
          private_method('bla', 'bla', 'bla');
          
          // or you can call it in the context of the object
          private_method.call(this, 'bla', 'bla', 'bla');
        }
    
    }})());

The idea is simple, you isolate your private methods in a temporary function that returns
a methods hash for the {Class} constructor, and then immediately call it.


## Ruby Style Mixins, :mixins

If you ever worked with Ruby, you should know how it takes advantages of multiple-inheritance
by allowing you to create shared modules and then use functionality injection technique to
include them into your classes.

RightJS tries to monkey this feature and allows you to share your modules the same way

    var Module1 = {
      method1: function() {}
    };
    
    var Module2 = {
      method2: function() {}
    };
    
    var MyClass = new Class({
      include: Module1,
      extend:  Module2
    
      // rest of the class definition
    });

The naming principles are the same as it is in Ruby, `include` extends the instance
(prototype) level and `extend` extends the class level.

You also can specify several mixins in a list if you need

    var MyClass = new Class({
      include: [Module1, Module2, Module3],
      extend:  [Module4, Module5, Module6]
    });

And you can use hashes directly, like that

    var MyClass = new Class({
      extend: {
        CLASS_LEVEL_CONST_1: 1,
        CLASS_LEVEL_CONST_2: 2,
      
        classLevelMethod: function() {
      
        }
      }
    });

And finally you can call the `include` and `extend` methods after a class
was initialized

    var MyClass = new Class({});
    
    MyClass.include(Module1, Module2, ...);
    MyClass.extend(Module3, Module4, ...);

## Mixin Priorities, :priorities

There are two principles you should keep in mind when you use the modules sharing.

When you include/extend your modules inline with the rest of your class definition, the
class definition properties will have priority over the mixed in modules.

    var Module = {
      method: function() { return "the module thing"; }
    };

    var MyClass = new Class({
      include: Module,
  
      method: function() {
        return "my class thing";
      }
    });
    
    new MyClass().method(); // -> "my class thing"


But when you call the `include`/`extend` methods _after_ your class was
defined, then the modules will have priorities over existing methods.

    var Module = {
      method: function() { return "the module thing"; }
    };
    
    var MyClass = new Class({
      method: function() {
        return "my class thing";
      }
    });
    
    MyClass.include(Module);

    new MyClass.method(); // -> "the module thing"  
    
    

## Mixin Callbacks, :callbacks

As RightJS monkeys Ruby's classes system, it also monkeys the Ruby-style mixin callbacks,
which are pretty helpful when you want to write some extensive meta-programming voodoo.

To use that feature, you need to create in your modules methods named `selfIncluded`/`selfExtended`
or their underscored equivalents `self_included`/`self_extended`. The first one is called when
the module is included in a class, the second one when it was used to extend a class. Both of the methods will
take related class as an argument

    var Module = {
      self_included: function(klass) {
        klass.prototype.boo = 'boo';
      },
    
      self_extended: function(klass) {
        klass.BOO = 'BOO';
      }
    };

    var MyClass = new Class({
      include: Module,
      extend:  Module
    });
    
    MyClass.prototype.boo; // -> 'boo'
    MyClass.BOO;           // -> 'BOO'


<p>&nbsp;</p>

<p>This is pretty much all of it</p>

