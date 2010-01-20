# Lightbox Demo
<% content_for :modules, javascript_include_tag('/builds/ui/right-lightbox-min.js') %>

Some use cases demo for the [Lightbox](/ui/lightbox) widget

## Standalone Images Displaying, :standalone

In similarity to the [Lightbox 2](http://www.huddletogether.com/projects/lightbox2) project,
displaying of standalone images in the lightbox does not requires any javascript coding.
All you need is to specify the `rel="lightbox"` attribute at the link. When page
is loaded Lightbox will automatically find the links and perform all necessary
initializations, grab the titles, etc.

    <a href="1.jpg" rel="lightbox"><img src="1-thmb.jpg"></a>
    <a href="2.jpg" rel="lightbox" title="Some title"><img src="2-thmb.jpg"></a>

<p>
  <a href="/images/test/1.jpg" rel="lightbox" title="Watson's Bay"><img src="/images/test/1-thmb.jpg" /></a>
  <a href="/images/test/2.jpg" rel="lightbox"><img src="/images/test/2-thmb.jpg" /></a>
  <a href="/images/test/3.jpg" rel="lightbox" title="Caravaggio"><img src="/images/test/3-thmb.jpg" /></a>
</p>

## Images Road Trip Displaying, :roadtrip

If you want to display some collection of images as an album, without making the user to click each
link, then you are specifying a slightly different attribute `rel="lightbox[roadtrip]"`.
All the other principles are the same

    <a href="1.jpg" rel="lightbox[roadtrip]"><img src="1-thmb.jpg"></a>
    <a href="2.jpg" rel="lightbox[roadtrip]"><img src="2-thmb.jpg"></a>

<p>
  <a href="/images/test/4.jpg" rel="lightbox[roadtrip]" title="Darling Harbour"><img src="/images/test/4-thmb.jpg" /></a>
  <a href="/images/test/5.jpg" rel="lightbox[roadtrip]" title="Coogie"><img src="/images/test/5-thmb.jpg" /></a>
  <a href="/images/test/6.jpg" rel="lightbox[roadtrip]" title="Rain In St.Petersburg"><img src="/images/test/6-thmb.jpg" /></a>
</p>

You can use the left and right arrow buttons on your keyboard or the mouse wheel scrolling to list through the images

## Links to video-resources, :video

Lightbox also supports links to the most common video streaming resources, with exactly the same format

    <a href="youtube/bla/bla/bla" rel="lightbox">Funny video</a>

<p>
  <a href="http://www.youtube.com/watch?v=VAfnbIrQTSk" rel="lightbox">Youtube example</a> |
  <a href="http://video.google.com/videoplay?docid=99174057823861673" rel="lightbox">Google Video example</a> |
  <a href="http://vimeo.com/5727117" rel="lightbox">Vimeo example</a>
</p>



## HTML Content Displaying, :html

To display any html content, strings, dom-nodes, node-lists, arrays of elements, etc. Just pass it to the `show` method

    Lightbox.show($('lorem-block').innerHTML, {width: '20em'});

<p>
  <a href="" onclick="Lightbox.show($('lorem-block').innerHTML,{width:'20em'}); return false;">Click me to show the text below in the lightbox</a>
</p>
<p id="lorem-block">
  Lorem ipsum dolor <u>sit</u> amet, consectetur adipisicing elit, <b>sed</b> do eiusmod tempor incididunt ut labore et dolore <i>magna</i> aliqua. Ut enim ad minim veniam, quis nostrud <u>exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo <b>consequat</b>. Duis aute irure dolor in <i>reprehenderit</i> in voluptate velit esse cillum <u>dolore</u> eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non <b>proident</b>, sunt in culpa qui <i>officia</i> deserunt mollit anim id est laborum.
</p>

## Content Loading Via Ajax, :ajax

To load some content via an xhr request just pass its url address to the `load` method.
You can also pass any standard {Xhr} class options as the second argument.

    Lightbox.load('/ui/lightbox/lorem');

<p>
  <a href="" onclick="Lightbox.load('/ui/lightbox/lorem'); return false;">Try it right here</a>
</p>

## Links Automatic Processing, :autolinks

If you send a dom-node of a link into the `show` method, lightbox will automatically grab
the link url address, load it via an ajax request and then show it in the lightbox with the same title the link has.

    Lightbox.show($('some-link'));

<p>
  <a href="/ui/lightbox/lorem" title="Loaded By Link" onclick="Lightbox.show(this); return false;">Try it right here</a>
</p>
