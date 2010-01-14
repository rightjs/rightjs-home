# Rater

Rater is a standard rating widget for RightJS. It can work as a standalone widget,
can automatically send user rates via {Xhr} requests, or it can work in pair with
an input element as a part of a form.

<%= partial '/ui/head', :locals => {:name => 'rater'} %>

<%= anchors_index %>


## Features List, :features

* Can work as a standalone widget
* Can work as a part of a form
* Can automatically send ratings via {Xhr} requests
* Super easy usage
* Comes in a tiny single file (2.3k)


## Usage Basics, :usage

The usage is super easy. Just include one of the files above onto your page.
After that you will have a choice, create your rater in script like this

    new Rater({url: '/boo'}).insertTo('my-conatiner');

Or you can define your rater element directly inside your page and our script will
find it by the `right-rater` class name and then automatically initialize it.

    <div class="right-rater" data-rater-options="{url:'/boo'}">
      <div>★</div>
      <div>★</div>
      <div>★</div>
      <div>★</div>
      <div>★</div>
    </div>

This also will let you put whatever you want instead of the textual stars.


## Assigned Raters, :assigned

You also can assign any rater to work with any, say hidden, input elements so it was working as a part of a form.
You can do that with the `update` option or by the `assignTo()` method

    <form ...>
      <input type="hidden" id="the-rating" name="rating" />
  
      // with auto-discovery feature
      <div class="right-rater"
        data-rater-options="{update:'the-rating}">
        ...
      </div>
  
      // or in script with options
      new Rater({update: 'the-rating'})
        .insertTo('the-rating', 'after');
  
      // or like that
      new Rater().insertTo('the-rating', 'after')
        .assignTo('the-rating');
    </form>

__NOTE:__ assignments work in both ways, when yo change the rater it will change the input element,
and when you change the input element it will change the rater status.


## Remote Raters, :remote

Our raters can automatically send {Xhr} requests when the user clicks any rating on the widget.
For this purpose there are three options.

* `url` - the url address where to send the requests
* `param` - the param name for the rating, `'rate'` by default
* `Xhr` - additional {Xhr} request options if you need

So your average remote rater might look like that

    new Rater({
      url: '/some/stuff/rating',
      param: 'value',
      Xhr: {
        method: 'put',
        spinner: 'spinner'
      }
    });


## Options List, :options

There is a simple list of options you can use with the raters. You can pass them as a hash with
the constructor, or set as a JSON hash inside of the `data-rater-options` attribute

Name          | Default | Description
--------------|---------|---------------------------------------------------------------
size          | 5       | the number of stars in the line
value         | null    | default value
update        | null    | an element to be assigned to
disabled      | false   | if it should be instantly disabled
disableOnVote | false   | if it should be disabled when the user picks a value
url           | null    | an url to send results with AJAX
param         | 'rate'  | the value param name
Xhr           | null    | additional {Xhr} options


## Events List, :events

Our raters work with the following list of events. Every listener will receive two arguments,
the current value and a reference to the rater object.

Name   | Description
-------|------------------------------------------------------------
hover  | when a user hovers some star with a mouse
change | when a user changes the rater value
send   | when an xhr request with rating was sent


## API Reference, :api

All the `Rater` class instances have the following simple public API

Name              | Description
------------------|--------------------------------------------------
setValue(value)   | sets the value
getValue()        | returns the value
insertTo(element, position) | inserts the widget inside the element
assignTo(element) | assigns the rater to the element
send()            | sends the rating via {Xhr}
disable()         | disables the rater
enable()          | enables the rater
disabled()        | checks if the rater is disabled

## Style Alterations, :styles

The widget structure is simple as that

    <div class="right-rater">
      <div class="right-rater-glow">★</div>
      <div class="right-rater-glow">★</div>
      <div>★</div>
      <div>★</div>
      <div>★</div>
    </div>

Disabled raters will be assigned with the `right-rater-disabled` class

Then as you might noticed, to simplify the things we use utf-8 symbols for the stars, so
here's a simple style snippet if you want to replace them with some images of yours

    div.right-rater div {
      width: 10px;
      height: 10px;
      text-indent: -99em;
      background-image: url('/images/star-off.png');
      background-repeat: no-repeat;
      background-position: center center;
    }
    div.right-rater div.right-rater-glow {
      background-image: url('/images/star-on.png');
    }

