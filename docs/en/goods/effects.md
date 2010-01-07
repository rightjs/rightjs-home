# Additional Visual Effects

This module provides a collection of additional visual effects for RightJS

You can see all them in action at the main [visual effects demo](/fx-demo) page.

<%= anchors_index %>

## Fx.CSS, :CSS

`Fx.CSS` is an equivalent of the {Fx.Morph} effect, but instead of using styles it
works with the css classes. This might be useful if you don't want to keep any styles inside
your code and organize all of them at the css level. It also allows you to gradually remove
any css class out of the list

The `start()` method receives two arguments the first one is the class to add and
the second one is the class to remove. Then there is the `morphToClass()` method, which
is the element level shortcut for this effect

    new Fx.CSS('my-element').start('new-class');           // adds the class
    new Fx.CSS('my-element').start(null, 'remove-class');  // removes the class

    // at the element level
    $('my-element').morphToClass('new-class');
    $('my-element').morphToClass(null, 'remove-class');

    // with options
    $('my-element').morphToClass('something', {
      duration: 'long',
      onFinish: function() {...}
    });

__NOTE:__ this visual effect processes the element `style` attribute, so that
if you morphed it to some class you won't be able to remove the class anymore,
because all the styles will be embedded to the `style` level and will have
priority over the css level definitions.



## Fx.Move, :Move

This effect allows you to move your elements around the page.

You can use an additional `position` option to specify which coordinates do you use,
absolute or relative. By default it's `absolute`

The `start()` method receives a hash of the element position. It might be a hash
like `{x: NN, y: NN}` or a hash like `{left: 'NNpx', top: 'NNpx'}`. You also allowed
to specify only one attribute, horizontal or vertical.

The `move()` method is the element level shortcut for this effect

    new Fx.Move('my-element').start({x: 100, y: 200});
    new Fx.Move('my-element', {position: 'relative'}).start({x: -200});

    // at the element level
    $('element').move({x: 200, y: 200}); // absolute position
    $('element').move({x: -200}, {position: 'relative'}); // moves it 200px left


## Fx.Run, :Run

This effect makes the element appear and disappear by moving behind (or from behind) the left or
top edge of the window. Its a bidirectional effect so you might specify the effect direction like
`'in'` or `'out'`. Or use it by default in the `'toggle'` mode.

An additional option called `direction` defines in which direction the element should run.
It might be `'left'` (default) or `'top'`

The `run()` method is the element level shortcut for this effect

    new Fx.Run('element').start();
    new Fx.Run('element').start('in');
    new Fx.Run('element').start('out');

    $('element').run();
    $('element').run('in');
    $('element').run('out');

    $('element').run({direction: 'top'});
    $('element').run('out', {direction: 'top', onFinish: do_that});


## Fx.Bounce, :Bounce

This effect supposed to attract user's attention by making an element jump.

There are two additional options that will let you customize the effect. The
first one is `direction`, that describes which direction the element should
bounce. It might be one of the following

* `'top'` (default)
* `'left'`
* `'right'`
* `'bottom'`

The second argument called `value` is an amount of pixels, at which the element should
move. By default it's `16` pixels.

The `bounce()` method is the element level shortcut for this effect

    new Fx.Bounce('element').start();

    $('element').bounce();
    $('element').bounce({value: 40});
    $('element').bounce({direction: 'left'});



## Fx.Puff, :Puff

Another bidirectional effect that shows/hides an element by zooming and making it fade
at the same time.

An additional option called `size` will let you control how big the element should
grow before disappear. By default it's `1.4` times.

The `puff()` method is the element level shortcut for this effect

    new Fx.Puff('element').start();

    $('element').puff();     // the toggle mode by default
    $('element').puff('in');
    $('element').puff('out');

    $('element').puff({size: 2});


## Fx.Zoom, :Zoom

This visual effect lets you gradually increase/decrease an element size. It simultaneously
processes all the available attributes like height, width, font-size, border-size, margins
and keeps the element proportions intact.

There is an additional option called `from` that allows you to define which direction
the element should grow. It might be one of the following

* `'top'`
* `'left'`
* `'right'`
* `'bottom'`
* `'center'` (default)

And you can use any appropriate combinations of them for all the four corners, like `'left top'` or
`'bottom-right'`

The `start()` can receive the following arguments as the final proportion:

* a `float` value between `0` and `1`, where `1` is an equivalent of 100%
* a `string` like `'120%'` to define the value in usual percents
* a hash like `{width: 'NNpx'}` or `{height: 'NNpx'}`

The `zoom()` method is the element level shortcut for the effect

    new Fx.Zoom('element').start(1.2); // zoom at 20%
    new Fx.Zoom('element').start(0.8); // minify at 20%

    $('element').zoom(2, {from: 'left'});
    $('element').zoom('150%', {from: 'top left'});
    $('element').zoom({width: '200px'});  // zooms to the size of 200px

__NOTE__: If you use this effect in both directions on the same element many times, you
had better use pixels and some round numbers for the proportions in order to avoid 
systematic round-off errors