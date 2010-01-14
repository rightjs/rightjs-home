# Right Autocompleter

Right `Autocompleter` is the official autocompletion feature for RightJS

<%= partial '/ui/head', :locals => {:name => 'autocompleter'} %>

<%= anchors_index %>


## Features List, :features

Right `Autocompleter` has the following features:

* Works with ajax requests or a local options list
* RESTful design and server side caching friendly urls
* Responses caching feature
* Comes in a single tiny file (less than 4k)
* No css or image dependencies
* Has basic styles in the box
* Has a basic textual spinner by default
* The autocompletion fields auto-discovery feature


## Usage Basics, :usage

Basically there's no pubic API, so you just feed the constructor with
a reference to your input element and specify some options

    // <input type="text" id="my-input" />

    // a remote list calling
    new Autocompleter('my-input', {
      url: '/my/things'
    });

    // a local options list
    new Autocompleter('my-input', {
      local: $w('mommy daddy sonny doggy kitty')
    });
    
Autocompleter expects your server send back usual list of `UL/LI` tags,
with any content inside of the items

    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>
    

## Auto-Discovery Feature, :discovery

As all the other widgets out of the RightJS UI library the autocompleters
have ability to be automatically discovered and initialized. For that 
purpose you might use a `'rel'` attribute like this.

    <input type="text" rel="autocompleter[/your/url/goes/here]" />

You also might define a local options list like this

    <input type="text" rel="autocompleter['mommy','daddy','sonny']"/>

You also can use the HTML5 style attributes for options like this

    <input type="text" rel="autocompleter[/url]"
      data-autocompleter-options="{spinner: 'spinner'}"/>

Once the page is loaded the script will sniff through your page and initialize
those inputs automatically.


## Options List, :options

There is a simple list of options for the autocompleters. You might specify any of them as
the constructor options or alter the settings globally by changing the `Autocompleter.Options` object.

Name       | Default           | Description
-----------|-------------------|--------------------------------------------------------
url        | document.location | the url, might have a %{search} placeholder
param      | 'search'          | the requests parameter name
method     | 'get'             | the requests method
minLength  | 1                 | the minimal length when it starts work
threshold  | 200               | the typing pause threshold
cache      | true              | a flag if it should use the results caching
local      | null              | an optional local search results list
fxName     | 'slide'           | visual effects name, use 'null' to disable fx
fxDuration | 'short'           | the visual effect duration
spinner    | 'native'          | spinner element reference
relName    | 'autocompleter'   | the auto-discovery feature key


## Events List, :events

You can use the following event names to work with our autocompleters

Name   | Description
-------|----------------------------------------------------------
show   | when the list of suggestions is shown
hide   | when the list of suggestions is hidden
update | when the list of suggestions was updated
load   | when the xhr request is loaded
select | when some option was selected
done   | when the option was copied to the input element


## Urls Usage, :url

Right autocompleter provides two options to work with the target urls, you might
specify the `'param'` and `'url'` options as the default and usual approach.

    new Autocompleter('my-input', {
      url: '/my/url',
      param: 'search'
    });

    /*
      In this case the autocompleter will hit urls like this.
 
      /my/url?param=a
      /my/url?param=as
      /my/url?param=asd
      /my/url?param=asdf
  
    */

You also might want to have more caching friendly urls without the parameters
in this case you might use the `'%{search}'` placeholder in your url. Like this

    new Autocompleter('my-input', {
      url: '/my/url/%{search}.js'
    });

    /*
      In this case the autocompleter will hit urls like this
  
      /my/url/a.js
      /my/url/as.js
      /my/url/asd.js
      /my/url/asdf.js
  
    */

This will let you to drop the search results in static files on the server side.


## Style Alterations, :styles

If you need to alter some styles, here's how the autocompleter HTML source looks like

    <div class="autocompleter">
      <ul>
        <li>boo</li>
        <li>boo</li>
        <li>boo</li>
      </ul>
    </div>
    <div class="autocompleter-spinner">
      <div class="dot-1">&raquo;</div>
      <div class="dot-2">&raquo;</div>
      <div class="dot-3">&raquo;</div>
    </div>





