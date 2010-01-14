# Sortable

Right Sortable is the sortable lists feature for RightJS

<%= partial '/ui/head', :locals => {:name => 'sortable'} %>

__NOTE:__ This module requires the  [drag-n-drop](/goods/drag-n-drop) library

<%= anchors_index %>


## Features List, :features

Right Sortable has the following features:

* RESTful design friendly urls processing
* Automatic vertical/horizontal direction recognition
* Auto-Discovery feature support
* Tiny size of less than 2k


## Usage Basics, :usage

There are several ways to initialize sortable lists. First of all using the `Sortable`
class directly inside your JavaScript code

    new Sortable('todos', { url: '/todos' });

Secondly you might use the {Element} level shortcut called `'makeSortable'`

    $('todos').makeSortable({ url: '/todos' });

You also can destroy the sortable functionality by calling the `'undoSortable()'` method on
your element, or by calling the `'destroy'` method on a sortable instance.

    new Sortable('todos', { url: '/todos' }).destroy();

    $('todos').makeSortable({ url: '/todos' }).undoSortable();


## Auto-Discoverable Sortables, :discovery

As many the other widgets in the RightJS UI library, sortables can be defined using the `rel`
attribute and HTML5 style option attributes like that

    // simple sortable
    <ul rel="sortable">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>


    // remote sortable
    <ul rel="sortable" data-sortable-options="{url: '/todos'}">
      <li id="item_1">Feed the fish</li>
      <li id="item_2">Call mommy</li>
    </ul>


## Options List, :options

You might use the following options to customize your sortables
  
Name      | Default    | Description
----------|------------|---------------------------------------------------------------------
direction | 'auto'     | 'auto', 'vertical', 'horizontal', 'x', 'y'
tags      | 'li'       | the list items tag name
url       | null       | the Xhr requests url address, might contain the '%{id}' placeholder
method    | 'put'      | the Xhr requests method
Xhr       | {}         | additional Xhr options
idParam   | 'id'       | the url id value name
posParam  | 'position' | the url position value name
parseId   | true       | if the id attribute should be converted into an integer before sending
relName   | 'sortable' | the auto-discovery feature key


## Events List, :events

There is just one event name for this unit and it's called `'update'`. Callbacks for this event will receive
the moved list item element and its new position index in the list.

    new Sortable('todos', {
      onUpdate: function(element, position) {
        // ....
      }
    });


## Urls And Remote Calls Processing, :remote

In this area everything is pretty much straight forward, you can define the `url` and `method` with the options,
plus you can specify some additional Xhr params, like spinners, callbacks, etc. at the `'Xhr'` option.

Additionally, our sortables support the '%{id}' placeholder in the urls so you can define RESTful
friendly url addresses like that

    new Sortable('boo', {
      url: 'todos/%{id}.js'
    });

After that the sortable will try to get an ID out of a moved element, optionally parse an integer
number out of it and replace the place holder with the ID, so it will hit addresses like that

    /todos/1.js
    /todos/2.js
    .....
