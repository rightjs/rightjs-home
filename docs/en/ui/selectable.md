# Selectable

Selectable is a standard select-boxes replacement that can hold any html content in the options list.
It can work both ways as a multi or as a single-select box.

<%= partial '/ui/head', :locals => {:name => 'selectable'} %>

<%= anchors_index %>


## Features List, :features

Our selectables have the following features

* Provides both multi and single selectboxes
* Can work as a standalone widget
* Can be assigned to work as a part of a form
* Everything is in a tiny (~ 6k) file, including the basic styles
* Easy and flexible use with many of options


## Usage Basics, :usage

First of all you need to include one of the files above onto your page.
After that you can just generate your selectables programmatically in JavaScript

    new Selectable({
      options: ['one', 'two', 'three', 'four', 'five']
    }).insertTo('the-container');

You also can prepare an HTML structure and then initialize your selectable on it, like this

    <ul id="my-selectable">
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
      <li>Four</li>
    </ul>

    new Selectable('my-selectable', {
      selected: 2,
      disabled: [1,3]
    });

Or, as usual, you can just assign the `right-selectable` css-class onto your element and it will get
automatically initialized when the page is loaded.

    <ol class="right-selectable">
      <li>One</li>
      <li>Two</li>
    </ol>

Yes, that's right you can use both `UL` or `OL` tags, and, as usual, you can specify an HTML5 like attribute
called `data-selectable-options` with your options in a JSON format.

And you also can make the script automatically generate selectables out of standard selectboxes.
Just add the `right-selectable` css-class and our script will automatically find it, generate
a selectable widget equivalent and hide the original. That way the form the original selectbox belongs to
won't notice anything

    <select name="boo" class="right-selectable">
      <option value="1"><b>F</b>first</option>
      <option value="2"><b>S</b>econd</option>
      ....
    </select>


## Various Variants, :variants

To let the script know that you want a simple single-select box you have two options: add the `right-selectable-single`
css-class to your element, or use the `multiple: false` option in any available way.

    <ul class="right-selectable right-selectable-single">
      ....
    </ul>

    <ul class="right-selectable" data-selectable-options="{multiple:false}">
      ...
    </ul>

You also can create selectables with groups of options. For that case use the standard `dl/dt/dd` tags structure like that

    <dl class="right-selectable">
      <dt>First Group</dt>
      <dd>
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </dd>
      <dt>Second Group</dt>
      <dd>
        <ul>
          <li>Three</li>
          <li>Four</li>
        </ul>
      </dd>
    </dl>
    
You can use the list with groups with the single-select boxes as well.


## Assigned To Inputs, :assign

Our selectables can be easily used as a part of forms by assigning them to hidden input elements.
You can do that by using the `assignTo()` method or with the `update` option, like that

    <form ...>
      <input id="the-value" type="hidden" />
  
      // programmatically
      new Selectable({...}).assignTo('the-value');
  
      // with automatic initialization
      <ul class="right-selectable"
        data-selectable-options="{update: 'the-value'}">
        ....
      </ul>
  
    </form>


__NOTE:__ those assignments work both ways, when you change the selectbox it will change the input 
field value, and when you change the input field, it will change the selectbox.

There are several ways you can specify the actual values to be used for the output.
If you use a flat list of options, or simple `LI` tags, the script will use the indexes
of the options in the list.

    var selectable = new Selectable({
      options: ['one', 'two', 'three'],
      select: [0,1]
    });

    // or in HTML
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>

    selectable.getValue(); // -> [0, 1]


But if you had used a hash of options with key->value pairs, or `id` attributes for your
`LI` elements, then those keys or ID values will be used as the values

    var selectable = new Selectable({
      options: {
        one: 'First',
        two: 'Second',
        three: 'Third'
      },
      selected: [0,1]
    });

    // or with html like this
    <ul>
      <li id="one">First</li>
      <li id="two">Second</li>
      <li id="three">Third</li>
    </ul>

    selectable.getValue(); // -> ['one', 'two']

In case if you have the keys/IDs in a some sort of sequential way, like `thing-1`,
`thing-2`, `thing-3`, you also can specify the `parseIds` option as
`true` and then the script will automatically parse out the numerical part of the IDs
to be used as the result value.

    var selectable = new Selectable({
      options: {
        'thing-1': 'First',
        'thing-2': 'Second',
        'thing-3': 'Third'
      },
      selected: [0,1],
      parseIds: true
    });

    // эквивалентный HTML
    <ul>
      <li id="thing-1">First</li>
      <li id="thing-2">Second</li>
      <li id="thing-3">Third</li>
    </ul>

    selectable.getValue(); // -> [1, 2]
    


## Options List, :options

You can use any of those options in an options hash with the `Selectable` class constructor, or
in a JSON formatted hash inside your custom `data-selectable-options` attribute.

Name       | Default | Description
-----------|---------|--------------------------------------------------------------------
options    | null    | a hash of key-value pairs or an array of options
selected   | null    | an array of selected item indexes
disabled   | null    | an array of disabled item indexes
multiple   | true    | a flag if it should be a multi-select or a single select widget
fxName     | 'slide' | the drop-down options list fx-name (null, 'slide', 'fade')
fxDuration | 'short' | the drop-down options list fx-duration
update     | null    | a field to be assigned to
parseIds   | false   | if it should parse integer ids out of the keys
refresh    | true    | a flag if it should automatically refresh the items list


## Events List, :events

There is the following list of events the `Selectable` instances will handle by default

Name     | Description
---------|---------------------------------------------------
change   | the value was changed
select   | an item was selected
unselect | an item was unselected
disable  | an item was disabled
enable   | an item was enabled
hover    | an item was hovered with the cursor
leave    | an item was left by the cursor
show     | the drop-down menu was displayed
hide     | the drop-down menu was closed

The item related event callbacks, meaningly `select`, `unselect`, `disable`, `enable`, `hover` and `leave`
will receive three arguments: the list item (LI element), the item index in the list and the selectable instance.

The `change` event listener will receive the value and a reference to the selectable unit.

And the `show` and `hide` event listeners will receive just the selectable unit reference.


## API-Reference, :api

There are several handy methods in the public API of the `Selectable` unit

Name              | Description
------------------|----------------------------------------------------------
initialize(\[element,\] Object options) | basic constructor
destroy()         | basic destructor
setValue(value)   | sets the value
getValue()        | returns the current value
select(item)      | selects the item(s)
unselect(item)    | unselects the item(s)
selected(item)    | checks if the item(s) are selected
disable(item)     | disables the item(s)
enable(item)      | enables the item(s)
disabled(item)    | checks if the item(s) are disabled
insertTo(element\[, position\]) | inserts the widget into the element
assignTo(element) | assigns the widget to work with the input element
refresh()         | refreshes the options list


__NOTE:__ the item related methods, like `select`, `unselect`, etc, can receive several types of arguments,
it might be numerical indexes in the items list, it can be keys/ids of the options, or the list item elements by themselves.
You also can send either arrays or single items, works both ways.

You also can call those methods without any arguments, in which case the script will assume that you want
select/unselect/disable/enable/check _all_ the items on the list.


## Style Alterations, :styles

The elements structure will be left intact pretty much as it described in the [usage basics](#usage)
chapter. The script will also use the `right-selectable-selected` and `right-selectable-disabled`
css-classes for selected and disabled list items respectively.

    <ul class="right-selectable">
      <li class="right-selectable-selected">Selected item</li>
      <li class="right-selectable-disabled">Disabled item</li>
      <li>Another item</li>
    </ul>

For the single-select boxes, it will add the `right-selectable-single` class to the list element,
and insert a simple structure like that, right before the list.

    <div class="right-selectable-container">
      <div class="right-selectable-handle">&bull;</div>
      <ul>
        <li>Selected item</li>
      </ul>
    </div>

That will work as the select-box visible element and the `LI` element will be cloned out of the
currently selected item on the options list.
