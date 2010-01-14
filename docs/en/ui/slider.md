# Slider

Slider is a simple standard slider widget. It can work as a standalone widget or be assigned
to any element, which it will update.

<%= partial '/ui/head', :locals => {:name => 'slider'} %>

<%= anchors_index %>

## Features List, :features

* Comes in a single tiny (3k) file
* Works as standalone widget or can be assigned to another element
* Can be generated or initialized on existing elements
* Pure CSS based design, comes with basic styles
* Supports both, vertical and horizontal sliders

## Usage Basics, :usage

__NOTE__: This widget uses the [drag-n-drop](/goods/drag-n-drop) module. Include it onto your page along
with one of the files above, then create your slider like that

    new Slider({min: 0, max: 100, value: 20})
      .insertTo('my-element').assignTo('my-input');

You can go even simpler and just create a tags structure with your options like that

    <div class="right-slider" data-slider-options="{min:0,max:100,update:'my-input'}">
      <div class="right-slider-handle"></div>
    </div>

When the page is loaded our script will automatically find and initialize your slider

## Assigned Sliders, :assigned

You can assign any slider to work in pair with any input or content elements on your page,
so that when you move the slider it was automatically updating the input element value or a
content element `innerHTML` property.

    // with an option
    new Slider({update: 'my-element'});

    // or with a direct call
    new Slider({...}).assignTo('my-element');

__NOTE:__ when you assign a slider to work with an input element, it works both ways, if you
change the slider it will change the value of the input element, and if you change the input
element it will move the slider.

## Vertical Sliders, :vertical

For vertical sliders use the `direction` option or a css-class `right-slider-vertical` like that

    new Slider({direction:'y', ....})

    // or with a html structure
    <div class="right-slider right-slider-vertical" ...>
      <div class="right-slider-handle"></div>
    </div>


## Options List, :options

You can use the following list of options with the `Slider` constructor or the `data-slider-options` attribute

Name      | Default | Description
----------|---------|----------------------------------------------------------------
min       | 0       | the min value
max       | 100     | the max value
snap      | 0       | the values threshold
value     | null    | start value, if null then the min value will be used
direction | 'x'     | slider direction 'x', 'y'
update    | null    | reference to an element to update
round     | 0       | the number of symbols after the decimal pointer


## Events List, :events

There is just one event with this widget, the name is `change`.


## API Reference, :api

All the `Slider` class instances have the following public methods

Name              | Description
------------------|----------------------------------------------------------------
setValue(value)   | the value assignment method
getValue()        | current value getter
reset()           | resets the value to the defaults
insertTo(element) | inserts this slider into the element
assignTo(element) | assign this slider to update the element


## Style Alterations, :styles

The tags structure for this widget is as simple as it is.

    // horizontal slider
    <div class="right-slider">
      <div class="right-slider-handle"></div>
    </div>

    // vertical slider
    <div class="right-slider right-slider-vertical">
      <div class="right-slider-handle"></div>
    </div>
