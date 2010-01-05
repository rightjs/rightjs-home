# DOM Navigation And Manipulations
<% set_unit_scope('Element') %>

RightJS inherits its dom-navigation principles mostly from the Prototype and MooTools projects.
As for the dom-manipulations it is a mix of ideas from Prototype, MooTools and jQuery.


## Basic Elements Search, :basic

RightJS provides two pretty much standard methods to find elements on the page,
`$('element-id')` and `$$('css rule')`. The first one finds an element by its
`ID` and the second one selects all the elements on the page that fit the given css-rule.

    var element = $('element-id');
    var elements = $$('div > div.foo + div.bar');

RightJS supports all the CSS selectors up to the  Level 3. It will use a browser native
css-selectors functionality if available.


## Node Relative Navigation, :subnodes

RightJS provides a number of methods to navigate around an element's neighborhood

Method                 | Description
-----------------------|-----------------------------------------------------------
{Element#parent}       | the parent element
{Element#parents}      | all the parent elements from bottom to top
{Element#subNodes}     | first level descendants
{Element#siblings}     | all the siblings
{Element#nextSiblings} | next siblings
{Element#prevSiblings} | previous siblings
{Element#next}         | next sibling
{Element#prev}         | previous sibling
{Element#first}        | first matching descendant at any level
{Element#select}       | all the matching descendants at any levels


All the methods can receive a css-rule as an argument. If a css-rule was specified
then the result will be altered according to the rule, collections will be filtered out
keeping only matching elements and methods that supposed to find a single element
will skip elements until find the first one that matches the rule.

    /*
      <div id="top">
        <div id="second-1">
          <div id="third-1"></div>
        </div>
        <div id="second-2"></div>
        <div id="second-3"></div>
        </div>
    */
    $('third-1').parent();       // -> div#second-1
    $('third-1').parent('#top'); // -> div#top
    
    $('top').select('div');      // -> all the subdivs
    
    $('top').first('div');       // -> div#second-1



## Basic Manipulations, :manipulations

There's just one generic method that depending on a type of data provided, handles all the possible
element manipulations.

`{Element#insert}(mixed content[, String position])`

The content might be one of the following

* A string html content
* An element instance
* An iterable object of any kind, Array, NodeList, arguments, etc.

And the `position` argument might be one of the following

* top
* bottom
* before
* after
* instead

`bottom` is the default value

    $('element').insert('<div>some html code</div>');

    $('element').insert(another_element, 'top');
    
    $('element').insert([element1, element2], 'after');
    
    $('element').insert(anther_element.childNodes, 'before');

Additionally, you can send to the method a hash where the keys will be the position and the values are the content

    $('element').insert({
      top:    element1,
      bottom: [element2, element3],
      after:  element4.childNodes
    });


## DOM Manipulation Shortcuts And Additional Methods, :shortcuts

There are a few nice shortcuts and additional methods for the most common dom-manipulation
operations that will make your application code more compact and readable

Method             | Description
-------------------|---------------------------------------------------------
{Element#insertTo} | inserts current element into given given one
{Element#replace}  | replaces current element with the given content
{Element#update}   | updates current element content with the given one
{Element#wrap}     | wraps current element with another element
{Element#clean}    | removes all the child nodes out of the element
{Element#empty}    | checks if the element has no internal text or sub-elements

Some examples

    var element = $E('div').insertTo(document.body).update('some html');
    
    element.empty();         // -> false
    element.clean().empty(); // -> true
    
    element.replace('here was that element');
