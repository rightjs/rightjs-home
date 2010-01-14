# In Place Editors

In place editor is a standard feature, that let you nicely handle the text-editing right in the page

<%= partial '/ui/head', :locals => {:name => 'in-edit'} %>

<%= anchors_index %>

## Features List, :features

Our in-place editors plugin has the following features:

* Works with text inputs, files, passwords and textarea fields
* Can automatically hide/show additional elements, like trigger links
* Super easy usage interface
* Comes in a single tiny file (just 2.6k)

## Usage basics, :usage

The usage is super-easy. Just call the `inEdit` method on the element, which content you would like
to edit, pass your options and you're good to go.

    <span id="the-text">Click the 'Edit' link to edit me right here!</span>

    <a href="#" onclick="$('the-text').inEdit({url: '/url'}); return false;">Edit</a>

Or even like that, without an 'edit' link

    <div onclick="$(this).inEdit({url:'/url'})">click me to edit!</div>

You also can use the `InEdit` class to handle in-place forms manually in your code.

    var editor = new InEdit('the-element', {
      url:    '/the/submit/url',
      name:   'the_text',
      method: 'post'
    });

    editor.show();

In any case once the user hits the submit button, our script will send all the data
via an {Xhr} request and update the original element with the content from the response-text


## Options List, :options

You can use the following options with your inline editors.

Name   | Default | Description
-------|---------|---------------------------------------------------------------------
url    | null    | the url address where to send the form
name   | 'text'  | the field name to send
method | 'put'   | the method of {Xhr} requests
type   | 'text'  | the input type, 'text', 'file', 'password' or 'textarea'
toggle | null    | a reference to an element that should get hidden when the editor is active
update | true    | a marker if the element should be updated with the response-text
Xhr    | {}      | additional {Xhr} options


## Public API, :api

In case you work with the `InEdit` class directly there are few methods available

Name   | Description
-------|-----------------------------------------------------------
show() | shows the in-place form
hide() | hides the form and brings back the original content
send() | in case you need to send the form manually


## Events List, :events

There is also a list of events available which you can observe with the in-form editors

Name   | Description
-------|--------------------------------------------------------------------------
show   | when the form appears in the place
hide   | when the form gets hidden
send   | when the form was submitted
update | when the script received the server response and updated the element


## Style Alterations, :style

In case you need to alter the styles on the form, there's basic structure of elements we use

    <form class="right-in-edit">
      <input class="right-in-edit-field" />
      <input type="submit" class="right-in-edit-submit" />
      <a href="" class="right-in-edit-cancel">Cancel</a>
      <div class="right-in-edit-spinner">
        <div class="glow"></div><div></div><div></div><div></div>
      </div>
    </form>
