# JSON Support

This module provides the standard JSON import/export functionality, plus some additional features

__NOTE__: this module uitilizes browser's _native_ JSON format support if it is available

## JSON Encoding And Decoding, :encoding

The basic JSON import/export works through the standard interface like this.

    JSON.stringify([1,2,3]); // -> '[1,2,3]'
    
    JSON.parse('[1,2,3]');   // -> [1,2,3]

The `JSON.stringify` method also watches if an object provides the `toJSON` method and if so
then uses it to export given object into a json string. There are also two aliases available
for those methods, that used in some other libraries

    JSON.encode([1,2,3]);    // -> '[1,2,3]'
    
    JSON.decode('[1,2,3]');  // -> [1,2,3]


## Better Xhr JSON Check, :checking

By default the {Xhr} module checks the json responses consistency with a simplified procedure. If you need
something better then include this module and all the xhr requests will be checked by the full check procedure
defined at json.org.

## Cookie Extension, :cookie

By default the {Cookie} module works with strings only. If you include this module then the {Cookie}
class will automatically export/import the incoming data through the JSON encoder, and you will
be able transparently save arrays and objects into cookies.

    Cookie.set('my-options', {width: 100, height: '200px'});

    Cookie.get('my-options'); // -> {width: 100, height: '200px'}

