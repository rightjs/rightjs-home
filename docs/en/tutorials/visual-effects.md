# Visual Effects
<% set_unit_scope('Fx.Element') %>

By default RightJS comes with the basic visual effects engine, and a few most
common effects implemented on it. As RigthJS is an object-oriented framework,
most of the effects are normal classes, that can be easily extended and reworked,
but we also have some options, nice dom-level shortcuts, open interface, etc.

Lets go through them step by step.

## Basic Fx.Morph Interface, :generic

{Fx.Morph} is the basic class for all the element visual effects. It provides
a generic interface where you can morph your element styles from their current state
to any other. There is nothing tricky, you just specify the end style and some
options if you need, and then the things happen automatically.

    new Fx.Morph('element').start({
      background: 'yellow',
      width: '200px'
    });

    new Fx.Morph('element', {
      duration: 'short', transition: 'Sin'
    }).start({...});

You free to use any standard css notation in your styles, colors in short or long hex form,
colors in rgb form, or any of the 12 standard color names. Dimensions might be in any units,
but it's better if you keep them consistent, say in pixels or points. And yes you can
use the one-line definitions like `border: 10px solid yellow` or `margin: 1px 2px 3px 4px`

You can specify as much styles as you want for this effect it will process all of them 
simultaneously 

## Options List, :options

The basic visual effects constructor can receive an options hash with the following keys

Name       | Default  | Description
-----------|----------|----------------------------------------------------
duration   | 'normal' | the effect duration (name or number in ms)
transition | 'Sin'    |type of the effect transition
queue      | true     | marker if the effect should be queued


The duration option can be one of the following

* 'short'  - 200 ms
* 'normal' - 400 ms (default)
* 'long'   - 800 ms
* Any number value representing the duration in milliseconds

The transition option might be one of the following

* 'Cos' - slow at the beginning and the end, and fast in the middle
* 'Sin' - fast at the beginning and the end, and slow in the middle
* 'Exp' - slow at the beginning and rapidly throttles to the end
* 'Log' - fast at the beginning and rapidly slows down to the end
* 'Lin' - a constant speed transition
* Any function that represents your own custom transition

Additionally, every effect has the {Observer} interface and you can
use the following event names to attach your listeners

* start
* finish
* cancel

## Default Effects Collection, :frequently

In the default package RightJS provides several frequently used visual effects

* {Fx.Highlight}
* {Fx.Fade}
* {Fx.Slide}
* {Fx.Scroll}

All of them are subclasses of the {Fx.Morph} effect and have the same exact interface

    new Fx.Highlight('element').start();
    
    new Fx.Fade('element').start();
    
    new Fx.Slide('element').start();


## Bidirectional Effects, :bidirectional

The {Fx.Fade} and {Fx.Slide} effects belong to the family of bidirectional effects.
Those effects can work in both directions to hide and to show an element.
By default the effects will check the element current state and determine the direction
automatically, but you can specify the direction manually if you need.

    // hide -> show -> hide -> show
    new Fx.Fade('element').start();
    new Fx.Fade('element').start();
    new Fx.Fade('element').start();
    new Fx.Fade('element').start();


    // hide -> hide -> show -> show
    new Fx.Slide('element').start('out');
    new Fx.Slide('element').start('out');
    new Fx.Slide('element').start('in');
    new Fx.Slide('element').start('in');


## DOM Level Visual Effect Shortcuts, :shortcuts

There are several shortcuts, which let you run visual effects directly from the dom-element
instances, without manual effects instantiating and getting dirty with the classes 

* {Fx.Element#morph}(mixed style[, Object fx_options])
* {Fx.Element#highlight}([end_color[, start_color[, Object fx_options]]])
* {Fx.Element#fade}([String direction[, Object fx_options]])
* {Fx.Element#slide}([String direction[, Object fx_options]])
* {Fx.Element#scroll}(Object position);

Some examples

    $('element').morph({background: 'green'});

    $('element').highlight();

    $('element').fade();

    $('element').slide();

Additionally, you can send effect name and options directly into the element `hide/show/toggle/radio` methods.

    $('element').hide('slide');
    $('element').show('fade');

    $('element').toggle('slide', {
      direction: 'left', duration: 'long'
    });


## Effects Queueing, :queueing

By default RightJS will queue all the visual effects you run on any elements, so you
could safely define an element effects chain from your code like that.

    $('element').morph({
      width: '400px', fontSize: '40px'
    }).highlight();

    $('element').show('fade').highlight();

    // etc.

But if you need two or more effects were running simultaneously, you can specify the option
`queue: false` with your effect options and then this effect won't get queued and will start immediately. 

    new Fx.Morph('element').start({width: '400px'});
    new Fx.Highlight('element', {queue: false}).start();

    $('element').fade('out', {queue: false});


## Custom Visual Effects, :custom

With RightJS it is really simple to create your own reusable visual effects,
which will do exactly what you need in your application.

For example take a look at the [custom build page](<%= builds_path %>).
There is some sort of sleek progress bar, which shows you the size of the result build.
This is generally a morph effect, but then it nicely changes the size number while the
effect running, plus there is a fancy highlighting happens simultaneously.

You can do such things realy simple. There are two methods in every visual effect that
need to be implemented `prepare` and `render`, first one gets called right before the
effect runs and receives all the same arguments you send into the `start` method when
you start the effect, and the `render` method is the place where you calculate and make all the
changes in the element at every step, during the effect run this method will receive
float numbers from `0` to `1`, which you can use to calculate your current state.

Then you just use the exceptional OOP abilities of RightJS, inherit the basic visual
effect class and add your custom code. For example that build calculator visual effect looks like that.

    var CalcFx = new Class(Fx.Morph, {
      prepare: function(start_size, end_size) {
        this.startSize = start_size;
        this.endSize   = end_size;

        this.element.highlight('brown', '#8A7', {queue: false});

        this.$super({
          height: $('calc-box').sizes().y * (end_size/max_size) + 'px'
        });
      },

      render: function(delta) {
        var size = this.startSize + (this.endSize - this.startSize) * delta;
    
        $('calc-num').update((size/100).round()/10 + 'k');

        this.$super(delta);
      }
    });

