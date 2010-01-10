# Work With Numbers

RightJS provides several small but handy features that might make the work with numbers
easier and more natural for object oriented programmers


## Strings To Numbers Conversion, :conversion

The {String} class has two methods to convert its instances to numbers,
{String#toInt} and {String#toFloat}. The usage is simple

    '10px'.toInt();    // -> 10
    '0.001'.toFloat(); // -> 0.001

You also can use the {String#toInt} method to convert hex values into decimal numbers

    'FF'.toInt(16);  // -> 255
    '8B'.toInt(16);  // -> 139

The {String#toFloat} method will also automatically recognize a comma and dash symbols as the decimal point.

    '0.01'.toFloat(); // -> 0.01
    '0,02'.toFloat(); // -> 0.02
    '0-03'.toFloat(); // -> 0.03

If you want to disable this feature, just pass `true` as the argument

    '0.01'.toFloat(true); // -> 0.01
    '0,02'.toFloat(true); // -> 0
    '0-03'.toFloat(true); // -> 0



## Number Extensions, :extensions

The {Number} class has most of the `Math` module methods like `abs`, `floor`,
`ceil`, `round` attached to the instance level, so that you can work with them
directly without calling the `Math` module.

    15.4.abs();   // -> 15.4
    15.4.round(); // -> 15
    15.4.ceil();  // -> 16
    15.4.floor(); // -> 15


## Ruby Style Loops, :loops

In additional the {Number} class supports the Ruby language style loops for the numbers:
{Number#times}, {Number#downto} and {Number#upto}

    4..times(function(i) {
      // ....
    });
    
    4..downto(2, function(i) {
      // ....
    });
    
    4..upto(8, function(i) {
      // ....
    });


## Random Numbers Generator, :random

By default the {Math.random} method returns float numbers between 0 and 1. RigthJS extends this method
and makes it generate integer numbers in a given range, if specified.

    Math.random();    // a Float    between 0 and 1
    
    Math.random(8);   // an Integer between 0 and 8
    
    Math.random(1,4); // an Integer between 1 and 4

<p>&nbsp;</p>

That's it. Have fun!
