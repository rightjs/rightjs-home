# Call By Name

_Call By Name_ is one of the major features of RightJS and works in 
many places all over the framework.

The idea is really simple. It brings the dynamic functions involvement 
similar to the method `invoke` in some programming languages. 

    ['foo', 'boo', 'moo'].invoke('replace', 'oo', 'aa');
    
    // -> ['faa', 'baa', 'maa']

You just pass a method name and some optional arguments into the `invoke` method
of a collection and it will automatically call that method by name with specified
arguments.

But instead of creating such additional methods, RightJS extends the idea
and generally lets you feed all the generic methods with names just the same way.

Say you could strip tags in each string in a list of strings like this

    strings.map(function(string) {
      return string.stripTags();
    });

Or you could do just the same thing calling the method by name

    strings.map('stripTags');

RightJS works perfectly with both method or attribute names. There are some
use cases.

    // some strings processing example
    var lowercased = strings.map('toLowerCase');
    var uppercased = strings.map('toUpperCase');
    var trimmed    = strings.map('trim');
    var blanks     = strings.filter('blank');
    var replaced   = strings.map('replace', 'some', 'another');
    
    // collecting the element ids
    var ids = elements.map('id');
    
    // disabling all the elements
    elements.each('disable');
    
    // adding a class to every element
    elements.each('addClass', 'marked');
    
    // attaching an event listener by name
    element.onClick('toggleClass', 'marked');
    
    // attaching event listener to every element in a list
    elements.each('onClick', 'toggleClass', 'marked');
    

## Why Do That?, :why

If you still didn't get it try to read the piece of code above. Just as a 
plain English text. The feature is really natural. There are many
of cases like those, when you simply need to call a method or grab an attribute
of every item in a collection, or attach an object method to an event.

Instead of writing dummy functions you just  feed the generic methods with a 
name and RightJS do all the rest for you. As the result you write more
compact and readable code. And more compact code means fewer misprints and 
bugs.


## Is There A Performance Overhead?, :overhead

Practically there is no difference between specifying a real function or a
name. As the matter of fact it will work even faster than if you just create
a dummy function, bind it to the object and call its method manually.
Because you eliminate the dummy and bind functions, and specify your method
by reference without actually initializing any new function.

As the result, in many cases of routine operations, it works faster. Take a
look at the [benchmarks page](/benchmarks) and you'll see.
