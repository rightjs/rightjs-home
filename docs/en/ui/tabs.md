# Tabs

Right Tabs is the standard tabs engine for the RightJS UI project. It provides an easy way of creating
usual tabs, and also carousel and harmonica widgets, joining them under a single unified engine.

<%= partial '/ui/head', :locals => {:name => 'tabs'} %>

<%= anchors_index %>

## Features List, :features

Right Tabs are served with the following features:

* An uniformed three in one (tabs, carousel, harmonica) package
* Everything is included in a single tiny (~10k) file
* Pure CSS design, and no image dependencies
* Simple and easy usage
* Remote content loading via ajax
* An interface to create/move/remote tabs programmatically
* Restoring the tabs state by an URL anchor and/or cookies
* Semantically friendly and jQuery Tabs compatible markup


## Usage Basics, :usage

The usage is simple as usual. Include one of those files onto your page
and then prepare your tabs element as the following structure.

    <ul>
      <ul>
        <li><a href="#tab-1">Tab 1</a></li>
        <li><a href="#tab-2">Tab 2</a></li>
      </ul>
  
      <li id="tab-1">Tab 1 Content</li>
      <li id="tab-2">Tab 2 Content</li>
    </ul>

You also can use the jQuery's original structure with DIVs

    <div>
      <ul>
        <li><a href="#tab-1">Tab 1</a></li>
        <li><a href="#tab-2">Tab 2</a></li>
      </ul>
  
      <div id="tab-1">Tab 1 Content</div>
      <div id="tab-2">Tab 2 Content</div>
    </div>

After that you'll need to instantiate the tabs object, with a simple javascript code

    <ul id="my-tabs">
    //...
    new Tabs('my-tabs');

Or as a variant you can assign the `right-tabs` css class for your tabs element
and our script will automatically find and instantiate it when the page's loaded

    <ul class="right-tabs">
      // ...
    </ul>
    
The HTML5 style options attribute is available too

    <ul class="right-tabs" data-tabs-options="{select:2}">
      // ...
    </ul>

## Variants Definition, :variants

To create a carousel widget simply add the `right-tabs-carousel` css-class
to your tabs element and the engine will know that you want a carousel.

    <ul id="my-carousel" class="right-tabs-carousel">
      // ...
    </ul>

For the harmonica widget use the standard DL/DT/DD tags construction.

    <dl>
      <dt><a href="#">Tab 1</a></dt>
      <dd>Tab 1 Content</dd>
      <dt><a href="#">Tab 2</a></dt>
      <dd>Tab 2 Content</dd>
    </dl>

All the other features like remote tabs loading, options and events are common over all three
types of the tabs and can be used with any of them


## Remote Tabs, :remote

To make the engine load your tabs content via {Xhr} requests, just specify the url-addresses
instead of the anchor hashes and you're good to go. And in this case you don't need
to specify any panels, they will be generated on fly.

    <ul>
      <ul>
        <li><a href="content/tab-1.html">Tab 1</a></li>
        <li><a href="content/tab-2.html">Tab 2</a></li>
      </ul>
    </ul>

There is also a mixed approach available. You can use your tabs with hash names and then
specify a common url-address with an `%{id}` placeholder as an option, like this

    <ul id="my-tabs">
      <ul>
        <li><a href="#tab-1">Tab 1</a></li>
        <li><a href="#tab-2">Tab 2</a></li>
      </ul>
    </ul>  
    // ...
    new Tabs('my-tabs', {url: '/content/%{id}.html'});

In this case the script will use the tab hash names as the ids and hit urls like this

    /content/tab-1.html
    /content/tab-2.html

## Current Tab Definition, :current

There are several ways how you can specify the tab that the user will see by default.

First of all you can specify the `right-tabs-current` css-class on your current tab.

    <ul id="my-tabs">
      <ul>
        <li><a href="#tab-1">Tab 1</a></li>
        <li class="right-tabs-current"><a href="#tab-2">Tab 2</a></li>
      </ul>
    </ul>

You also can use the `selected` option with the constructor or the custom `data-tabs-options`
attribute. Then you can activate the `Cookie` option and the script will keep the current tab index in cookies

And eventually the engine watches the url-address hash and if there is one it will check
it against the available tab hash names. Once a match is found it will automatically 
activate the tab. This way you can refer a specific tab via an url-address.

The priority of the current tab checks is the following

    URL -> Cookie -> CSS Class -> First

## Options List, :options

There is the following list of supported options for the tabs engine

Name            | Default  | Description
----------------|----------|------------------------------------------------------------------
idPrefix        | ''       | the tab-panel elements id prefix
tabsElement     | null     | the tabs list element reference, in case it is somewhere else
resizeFx        | 'both'   | 'slide', 'fade', 'both' or null for no fx
resizeDuration  | 400      | the tab panels resize fx duration
scrollTabs      | false    | use the tabs list scrolling
scrollDuration  | 400      | the tabs scrolling fx duration
selected        | null     | an index of a tab to open
disabled        | \[\]     | list of disabled tab indexes
closable        | false    | set true if you want a close icon on your tabs
loop            | false    | you can specify a delay in milliseconds in here to have a slideshow
loopPause       | true     | makes the slideshow get paused when the user moves the mouse over it
url             | false    | a common remote tabs url, should have the %{id} placeholder
cache           | false    | marker if the remote tabs should be cached
Xhr             | null     | the {Xhr} requests additional options
Cookie          | null     | set the {Cookie} options if you'd like to keep the last selected tab index in cookies

You can send any of those options as the constructor options, like this

    new Tabs('my-tabs', {
      idPrefix: 'my-',
      selected: 2,
      Xhr: {spinner: 'spinner'}
    });

Or you can use the HTML5 like attribute called `data-tabs-options` directly on your tabs element

    <ul data-tabs-options="{idPrefix:'my-', selected:4}">
      // ...
    </ul>

## Events List, :events

This script provides you an access to the following events

Name    | Description
--------|------------------------------------------------
show    | when a tab was shown
hide    | when a tab gets hidden
click   | when the user clicks on a tab
load    | when a remote tab is loaded
disable | when a tab gets disabled
enable  | when a tab gets enabled
add     | when a new tabs was added
remove  | when a tab was removed
move    | when a tab was moved to a new position

Every event listener will receive a tab object instance as an argument.


## API Reference, :api

There is a simple public API for all the `Tabs` class instances

Name                             | Description
---------------------------------|----------------------------------
show(index)                      | shows the tab at the index
add(title, content\[, options\]) | creates a new tab
remove(index\[s\])               | removes the tab(s)
move(index, position)            | moves the tab to the position
disable(index\[s\])              | disables the tab(s)
enable(index\[s\])               | enables the tab(s)
startLoop(\[delay_ms\])          | starts a slideshow loop
stopLoop()                       | stops the slideshow


The `add` method can receive options with the following keys

* `id` - the tab hash-name
* `url` - the tab content remote url-address
* `position` - the tab position


## Style Alterations, :styles

In the most basic case after a tabs module is instantiated it will assign css-classes
for your tabs-element, like this

    <ul class="right-tabs">
      <ul class="right-tabs-list">
        <li class="right-tabs-tab"><a href="#tab-1">Tab 1</a></li>
        <li class="right-tabs-tab"><a href="#tab-2">Tab 2</a></li>
      </ul>

      <li id="tab-1" class="right-tabs-panel">Tab 1 Content</li>
      <li id="tab-2" class="right-tabs-panel">Tab 2 Content</li>
    </ul>

It will use the `right-tabs-current` and `right-tabs-disabled` classes
at the tab-elements to paint the current and disabled tabs.

For the carousel widget and scrollable tabs the script will transform the structure
to create the scrollbar

    <ul class="right-tabs">
      <div class="right-tabs-scroller">
        <div class="right-tabs-scroll-left">&laquo;</div>
        <div class="right-tabs-scroll-right">&raquo;</div>
        <div class="right-tabs-scroll-body">
          <ul class="right-tabs-list">
            <li class="right-tabs-tab"><a href="#tab-1">Tab 1</a></li>
            <li class="right-tabs-tab"><a href="#tab-2">Tab 2</a></li>
          </ul>
        </div>
      </div>
  
      // ....
    </ul>

Then, for the remote tabs it will be using a textual spinner with the following structure

    <ul class="right-tabs">
      <ul class="right-tabs-list">
        // ...
      </ul>
  
      <li class="right-tabs-panel">
        <div class="right-tabs-panel-locker">
          <div class="right-tabs-panel-locker-spinner">
            <div class="glow"></div><div></div><div></div><div></div>
          </div>
        </div>
      </li>
    </ul>

The harmonica widget will remain the same structure with a similar css-class assignments

    <dl class="right-tabs">
      <dt class="right-tabs-tab">Tab 1</dt>
      <dd class="right-tabs-panel">Tab Content</dd>
      // ...
    </dl>
