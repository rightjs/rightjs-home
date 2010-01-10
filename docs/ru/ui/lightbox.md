# Lightbox

Lightbox is the standard lightbox-popup feature for RightJS


Get the latest version right here

* [right-lightbox.js](/builds/ui/right-lightbox.js) - fully compressed build
* [right-lightbox-min.js](/builds/ui/right-lightbox-min.js) - minified version
* [right-lightbox-src.js](/builds/ui/right-lightbox-src.js) - uncompressed source code


All the source code of the project is available under terms of the MIT license

<http://github.com/rightjs/rightjs-ui>

See the [live demo](/ui/lightbox/demo) page for some common use cases

<%= anchors_index %>

## Features List, :features

Right Lightbox has the following features

* Support of any html content displaying
* Support of content loading via ajax requests
* Road trips support
* Content auto discovery via the `rel="lightbox"` attribute
* It has really tiny size of just 8.5k and doesn't need any images
* Everything is included in a single file
* i18n support


## Usage Basics, :usage

The usage of Right Lightbox is really simple. Just grab the file above, include it on your page and you are good to go

    <script src="/javascripts/right-lightbox.js" type="text/javascript"></script>

Right Lightbox does not require any images and all the styles are inlined inside the javascript file


## API Reference, :api

Right Lightbox has a really simple interface

Method                               | Description
-------------------------------------|---------------------------------------------------
show(mixed content\[, Object size\]) | shows any given content
load(String url\[, Object options\]) | loads content via an ajax request
hide()                               | hides the lightbox

You can use those methods to work with Lightbox as with a single class

    Lightbox.show('some content');
    Lightbox.load('/some/address');
    Lightbox.hide();

Or you can have usual instances of the Lightbox class

    var box = new Lightbox();
    box.show('some content');
    box.load('/some/url');
    box.hide();


## Links Automatic Processing, :links

When you pass a link node into the `show` method, Lightbox will automatically grab its url address and title, then load the 
content referred by the link, show it and set the link's title on the box.

    // <a href="/some/url" title="Some Content" id="the-link">click me</a>

    Lightbox.show($('the-link'));

Right Lightbox will automatically check the url address extension and if it is an image,
then the reference will be handled like an image loading. You don't need to do anything about it.

And you don't need to do those things manually. In similarity to the
[Lightbox 2](http://www.huddletogether.com/projects/lightbox2) project, you can set the attribute
`rel="lightbox"` and Lightbox will automatically hook those links to be shown in the lightboxes.

The roadtrips with the `rel="lightbox[roadtrip]"` attribute work too

If you need to rescan the auto-discovery links manually, say after
a page updates. You can call the `Lightbox.rescan()` method.


## Options List, :options

There are several options when you are using Right Lightbox

Name            | Default | Description
----------------|---------|----------------------------------------------------------------------------------
endOpacity      | 0.8     | the locker end opacity
fxDuration      | 200     | the visual effects duration
hideOnEsc       | true    | should the lightbox be closed on the Esc button
hideOnOutClick  | true    | should the lightbox be closed on click outside of the box
showCloseButton | true    | should the close button be available
blockContent    | false   | if true, the box content will be covered with a transparent div tag
relName         | 'lightbox' | the rel-attribute name for the auto-discovery feature
checkTags       | '\*'    | the tags name to be checked on load (to narrow down the search)

You can pass those options as a hash for the constructor, or change them globally at the `Lightbox.Options` object

    var hard_box = new Lightbox({hideOnEsc: false, hideOnOutClick: false, showCloseButton: false});
    hard_box.setTitle('Fill It Up');
    hard_box.show('some required form');


## Internationalization, :i18n

You might find a translation module for your language at the github repository.

<http://github.com/rightjs/rightjs-ui/i18n>

Or you can translate the interface by simply altering the `Ligthbox.i18n` object like that

    Lightbox.i18n = {
      CloseTitle: 'Закрыть',
      PrevTitle:  'Предыдущая',
      NextTitle:  'Следующая'
    };


## Style Adjustments, :styles

If you need to alter the lightbox view to make it fit your design, please use the following
elements structure description as a guidance.

    <div class="lightbox">
      <div class="lightbox-locker"></div>
      
      <div class="lightbox-dialog">
        <div class="lightbox-caption"></div>
        
        <div class="lightbox-body-wrap">
          <div class="lightbox-body">
            <div class="lightbox-body-content"></div>
            
            <div class="lightbox-body-lock">
              <div class="lightbox-body-lock-spinner">
                <div></div><div></div><div></div>
                <div class="glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="lightbox-close-button"></div>
        <div class="lightbox-prev-link"></div>
        <div class="lightbox-next-link"></div>
      </div>
    </div>
