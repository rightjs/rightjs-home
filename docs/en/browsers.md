# Supported Browsers

RightJS is meant to be working with all the modern and some old but still used browsers.

It was tested to work with the following browsers

* Firefox versions >= 1.5
* Safari versions >= 3
* Google Chrome all versions
* Internet Explorer versions >=6
* Opera version >= 9.25
* Konqueror versions >= 3.10

## Quirks Mode

To make RightJS work correctly with styles and dimensions in the Internet Explorer and Opera
browsers you have to specify the document type definition on your page. For example like this one

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml11.dtd">

RightJS has no intention to fix the nonstandard quirks mode behavior.

## The Old Browsers

RightJS tries to concentrate its efforts on the modern browsers, therefore,
despite it provides a basic support of the old browsers like IE 6 and Konq 3, those
browsers will have low priority in things like performance optimizations and 
specific browser problems patching.

## Internet Explorer 8

IE8 has a native css-selectors support. Usually, when you have a correct XHTML document
the interface is available by default, but if you have some hacks and non standards you
might need to specify the following entry in your document header
    
    <meta http-equiv="X-UA-Compatible" content="IE=8" />

Otherwise, the feature will not be available and RightJS will use its own manual css-selectors
engine.
