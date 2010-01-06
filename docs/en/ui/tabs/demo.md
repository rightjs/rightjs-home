# Tabs Demo
<% content_for :modules, javascript_include_tag('/builds/ui/right-tabs-min.js') %>

<style type="text/css">
  .right-tabs .right-tabs-panel {
    padding: .5em;
  }
  #carousel-tabs .right-tabs-panel {
    text-align: center;
  }
  #harmonica-tabs dt {
    font-size: 1em;
    font-family: Verdana;
  }
</style>

This is the basic cases demo page for the [Tabs](/ui/tabs) widget out of the [RightJS UI](/ui) library.

## Simple Tabs, :simple

<p>
  <ul id="simple-tabs">
    <ul>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
      <li><a href="#tab-4">Tab 4</a></li>
    </ul>
    
    <li id="tab-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
    <li id="tab-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
    <li id="tab-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
    <li id="tab-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
  </ul>
</p>
<script type="text/javascript">
// <![CDATA[
  new Tabs('simple-tabs');
// ]]>
</script>


## Remote Tabs, :remote

<p>
  <ul id="remote-tabs">
    <ul>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
      <li><a href="#tab-4">Tab 4</a></li>
    </ul>
  </ul>
</p>
<script type="text/javascript">
// <![CDATA[
  new Tabs('remote-tabs', {url: 'content/%{id}', idPrefix: 'r-'});
// ]]>
</script>


## Closable Tabs, :closeable

<p>
  <ul id="closable-tabs">
    <ul>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
      <li><a href="#tab-4">Tab 4</a></li>
    </ul>
    
    <li id="c-tab-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
    <li id="c-tab-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
    <li id="c-tab-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
    <li id="c-tab-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
  </ul>
</p>
<script type="text/javascript">
// <![CDATA[
  new Tabs('closable-tabs', {closable: true, idPrefix: 'c-'});
// ]]>
</script>

## Disabled Tabs, :disabled

<p>
  <ul id="disabled-tabs">
    <ul>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
      <li><a href="#tab-4">Tab 4</a></li>
    </ul>
    
    <li id="d-tab-1">Tab 1 Content</li>
    <li id="d-tab-2">Tab 2 Content</li>
    <li id="d-tab-3">Tab 3 Content</li>
    <li id="d-tab-4">Tab 4 Content</li>
  </ul>
</p>
<script type="text/javascript">
// <![CDATA[
  new Tabs('disabled-tabs', {disabled: 1, idPrefix: 'd-'});
// ]]>
</script>


## Scrollable Tabs, :scrollable

<p>
  <ul id="scrollable-tabs">
    <ul>
      <li><a href="#tab-1">Tab 1</a></li>
      <li><a href="#tab-2">Tab 2</a></li>
      <li><a href="#tab-3">Tab 3</a></li>
      <li><a href="#tab-4">Tab 4</a></li>
      <li><a href="#tab-5">Tab 5</a></li>
      <li><a href="#tab-6">Tab 6</a></li>
      <li><a href="#tab-7">Tab 7</a></li>
      <li><a href="#tab-8">Tab 8</a></li>
      <li><a href="#tab-9">Tab 9</a></li>
      <li><a href="#tab-10">Tab 10</a></li>
      <li><a href="#tab-11">Tab 11</a></li>
      <li><a href="#tab-12">Tab 12</a></li>
      <li><a href="#tab-13">Tab 13</a></li>
      <li><a href="#tab-14">Tab 14</a></li>
      <li><a href="#tab-15">Tab 15</a></li>
      <li><a href="#tab-16">Tab 16</a></li>
      <li><a href="#tab-17">Tab 17</a></li>
      <li><a href="#tab-18">Tab 18</a></li>
      <li><a href="#tab-19">Tab 19</a></li>
      <li><a href="#tab-20">Tab 20</a></li>
    </ul>
    
    <li id="s-tab-1">Tab 1 Content</li>
    <li id="s-tab-2">Tab 2 Content</li>
    <li id="s-tab-3">Tab 3 Content</li>
    <li id="s-tab-4">Tab 4 Content</li>
    <li id="s-tab-5">Tab 5 Content</li>
    <li id="s-tab-6">Tab 6 Content</li>
    <li id="s-tab-7">Tab 7 Content</li>
    <li id="s-tab-8">Tab 8 Content</li>
    <li id="s-tab-9">Tab 9 Content</li>
    <li id="s-tab-10">Tab 10 Content</li>
    <li id="s-tab-11">Tab 11 Content</li>
    <li id="s-tab-12">Tab 12 Content</li>
    <li id="s-tab-13">Tab 13 Content</li>
    <li id="s-tab-14">Tab 14 Content</li>
    <li id="s-tab-15">Tab 15 Content</li>
    <li id="s-tab-16">Tab 16 Content</li>
    <li id="s-tab-17">Tab 17 Content</li>
    <li id="s-tab-18">Tab 18 Content</li>
    <li id="s-tab-19">Tab 19 Content</li>
    <li id="s-tab-20">Tab 20 Content</li>
  </ul>
</p>
<script type="text/javascript">
// <![CDATA[
  new Tabs('scrollable-tabs', {scrollTabs: true, idPrefix: 's-'});
// ]]>
</script>

## Carousel Widget, :carousel

<p>
  <label for="slideshow-swapper">
    <input type="checkbox" id="slideshow-swapper" checked="false" />
    Slideshow
  </label>
  <ul id="carousel-tabs" class="right-tabs-carousel">
    <ul>
      <li><a href="#tab-1"><%= image_tag 'test/1-min.jpg' %></a></li>
      <li><a href="#tab-2"><%= image_tag 'test/2-min.jpg' %></a></li>
      <li><a href="#tab-3"><%= image_tag 'test/3-min.jpg' %></a></li>
      <li><a href="#tab-4"><%= image_tag 'test/4-min.jpg' %></a></li>
      <li><a href="#tab-5"><%= image_tag 'test/1-min.jpg' %></a></li>
      <li><a href="#tab-6"><%= image_tag 'test/2-min.jpg' %></a></li>
      <li><a href="#tab-7"><%= image_tag 'test/3-min.jpg' %></a></li>
      <li><a href="#tab-8"><%= image_tag 'test/4-min.jpg' %></a></li>
      <li><a href="#tab-9"><%= image_tag 'test/1-min.jpg' %></a></li>
      <li><a href="#tab-10"><%= image_tag 'test/2-min.jpg' %></a></li>
      <li><a href="#tab-11"><%= image_tag 'test/3-min.jpg' %></a></li>
      <li><a href="#tab-12"><%= image_tag 'test/4-min.jpg' %></a></li>
    </ul>
    
    <li id="cs-tab-1"><%= image_tag 'test/1-med.jpg', :size => '400x299' %></li>
    <li id="cs-tab-2"><%= image_tag 'test/2-med.jpg', :size => '400x265' %></li>
    <li id="cs-tab-3"><%= image_tag 'test/3-med.jpg', :size => '400x265' %></li>
    <li id="cs-tab-4"><%= image_tag 'test/4-med.jpg', :size => '400x267' %></li>
    <li id="cs-tab-5"><%= image_tag 'test/1-med.jpg', :size => '400x299' %></li>
    <li id="cs-tab-6"><%= image_tag 'test/2-med.jpg', :size => '400x265' %></li>
    <li id="cs-tab-7"><%= image_tag 'test/3-med.jpg', :size => '400x265' %></li>
    <li id="cs-tab-8"><%= image_tag 'test/4-med.jpg', :size => '400x267' %></li>
    <li id="cs-tab-9"><%= image_tag 'test/1-med.jpg', :size => '400x299' %></li>
    <li id="cs-tab-10"><%= image_tag 'test/2-med.jpg', :size => '400x265' %></li>
    <li id="cs-tab-11"><%= image_tag 'test/3-med.jpg', :size => '400x265' %></li>
    <li id="cs-tab-12"><%= image_tag 'test/4-med.jpg', :size => '400x267' %></li>
  </ul>
</p>
<script type="text/javascript">
// <![CDATA[
  var tabs = new Tabs('carousel-tabs', {idPrefix: 'cs-'});
  var slideshow = $('slideshow-swapper').onChange(function() {
    if (this.checked) tabs.startLoop(2000);
    else tabs.stopLoop();
  });
  slideshow.checked = false;
  slideshow.fire('change');
// ]]>
</script>

## Harmonica Widget, :harmonica

<p>
  <dl id="harmonica-tabs">
    <dt><a href="#tab-1">Tab 1</a></dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</dd>
    <dt><a href="#tab-2">Tab 2</a></dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</dd>
    <dt><a href="#tab-3">Tab 3</a></dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</dd>
    <dt><a href="#tab-4">Tab 4</a></dt>
    <dd>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/><br/>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/><br/>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br/><br/>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</dd>
  </dl>
</p>
<script type="text/javascript">
// <![CDATA[
  new Tabs('harmonica-tabs');
// ]]>
</script>

<div style="height: 16em"></div>