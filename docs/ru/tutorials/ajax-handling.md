# Ajax Handling

Generally there is just one simple class called {Xhr} that responsible for
almost all the ajax functionality in RightJS

Some simple examples might look the following way

    new Xhr('/some/url').send();
    new Xhr('/some/url').send('param=value');
    new Xhr('/some/url', {onFinish: function() {..}}).send();


## Options List, :options

{Xhr} supports options with the following keys


Key          | Default | Description
-------------|---------|-------------------------------------------------
method       | ‘post’  | request method
encoding     | ‘utf-8’ | encoding
async        | true    | asynchronous request
evalScripts  | false   | extract/eval javascripts from the response
evalResponse | false   | eval response as a javascript code
evalJSON     | true    | eval json responses automatically
secureJSON	 | true	   | if it should validate json responses
urlEncoded   | true    | urlencode the parameters
spinner      | null    | spinner element or element id
spinnerFx    | 'fade'  | spinner handling visual effect
params       | null    | default parameters


You can send any of the options in a hash as the second argument of the 
{Xhr} constructor, or you can set them up globally for all the {Xhr}
requests by changing the {Xhr.Options} variable. When you do so all the
following {Xhr} requests will take the new options.

    Xhr.Options.spinner = 'global-spinner-id';
    Xhr.Options.params  = 'my=params&global=options';


## Events List, :events

{Xhr} class provides the standard {Observer} functionality and supports the
following events.
  
* create
* request
* complete
* success
* cancel

You can send your callbacks along with the constructor options or handle by
{Observer} methods in the standard way.

    new Xhr('/some/url', {onFinish: function() {...}}).send();
    new Xhr('/some/url').on('finish', function() {...}).send();
    new Xhr('/some/url').onFinish(function() {...}).send();
    
    var xhr = new Xhr('/some/url');
    xhr.onComplete(some_function);
    xhr.stopObserving(some_function);

Surely you can add your own events if you need so

    var xhr = new Xhr('/some/url');
    
    xhr.on('my-event', function() {...});
    xhr.checkMyEvent = function() {
      if (this.something) {
        this.fire('my-event');
      }
    };
    
    xhr.onComplete('checkMyEvent');

__NOTE__: all the callbacks will be called in the
context of the request and receive two arguments, current request instance
and the original XMLHttpRequest object.

Additionally you can use the {Xhr} class level {Observer} interface to
attach global event listeners for all the xhr requests.

    Xhr.onSend(call_that_function);
    
    new Xhr('/some/url').send(); // <- will automatically call that function


## Spinners Handling, :spinners

{Xhr} class in RightJS has a built-in support of spinners handling. You
don't need to attach event listeners to show and hide them. You just specify
a reference to your spinner and {Xhr} will do it for you automatically.

You can specify a global spinner for all the {Xhr} requests or set custom
spinners per request.

    Xhr.Options.spinner = $('spinner');
    Xhr.Options.spinner = 'global-spinner-id';
    
    // or per request
    new Xhr('/some/url', {spinner: 'custom-spinner'}).send();

__NOTE__: if you did specify both global and local
spinners, both of them will be shown.


## Parameters Handling, :parameters

There are three levels of parameters you can specify to be sent with any
request. Global, per instance and per send.

Global parameters might be set at the {Xhr.Options} object and will be sent
with every request. Instance level parameters might be specified with the
constructor options and will be sent every time you send the request. And
eventually you can specify some additional parameters with the {Xhr#send}
method.

If you specify the parameters on several levels, they will be merged with the
'last win' strategy.

    Xhr.Options.params = 'my_cite_key=123234';
    
    var xhr = new Xhr('/some/url', {params: 'request=params'});
    
    xhr.send('some_more=params&send=options');

Parameters might be url-encoded strings or hashes. Hashes will be converted
into strings and url-encoded if necessary.

    new Xhr('/some.url').send('some=params&more=options');
    
    // or like this
    new Xhr('/some.url').send({some: 'params', more: 'options'});

Additionally, you can send a form element instance to the {Xhr#send} method,
{Xhr} will automatically grab the form data and convert into parameters.

    new Xhr('/some/url').send($('my-form'));


## JSON Responses, :json

By default {Xhr} if received a response with the json content-type,
will try to evaluate the response and assign the json object to the
`responseJSON` attribute of the request.

    new Xhr('/some.json', {
      onSuccess: function() {
        var json = this.responseJSON;
      }
    }).send();

You can switch the feature off by setting the `evalJSON` option to `false`


## Shortcuts and DOM support, :shortcuts

There are view shortcuts and additional methods that will make your live
easier when you implement an ajax application.

To shortify {Xhr} instancing you can use the {Xhr.load} method that will
create an {Xhr} instance and send the request.

    Xhr.load('/some/url', {
      method: 'get',
      onSuccess: function(request) {
        // do something about it
      }
    });

With the {Xhr#update} method you can update elements content with the
requests response

    new Xhr('/some/url').update('element');

You can also initiate a xhr-request directly from an element instance by
calling the {Element#load} method. This will initiate applicable xhr
request and update the element content when the request is complete

    $('element').load('/some/url');
    
    $('element').load('/some/url', {method: 'get'});

End eventually you can submit your forms via ajax requests directly from the
forms by calling the {Form#send} method. It will read the form
`action` and `method` attributes, initiate a suitable xhr
request, serialize the form data and send it to the server

    $('my-form').send();
    $('my-form').send({
      spinner: 'form-spinner',
      onSuccess: function() {
        $('notices').update(this.responseText);
      }
    });

__NOTE__: This feature supports files uploading too.
If your form has the `enctype` attribute equals to
`multipart/form-data`, then the form will be sent via virtual ajax
request through some hidden iframe.

The interface although stay the same and everything will get
happened automatically.
