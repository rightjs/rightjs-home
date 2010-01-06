# Right Tooltips Demo

<% content_for :modules, javascript_include_tag('/builds/ui/right-tooltips-min.js') %>
<style type="text/css">
  ul.tooltiped li {
    margin: .5em 0;
    cursor: pointer;
  }
  ul.tooltiped li:hover {
    background-color: #EEE;
  }
  
  #blue-tooltip div.right-tooltip-container {
    border-left-color: blue;
  }
  #green-tooltip div.right-tooltip-container {
    border-left-color: green;
  }
  #red-tooltip div.right-tooltip-container {
    border-left-color: red;
  }
</style>


There are some use cases for the [tooltips](/ui/tooltips) widget

## Simple Tooltips, :simple

<p>
  <ul class="tooltiped">
    <li title="Some tooltip" rel="tooltip">This element has a simple tooltip</li>
    <li title="Another tooltip" rel="tooltip">And this element has simple tooltip</li>
  </ul>
</p>

## Tooltips With HTML, :html

If you need to put some html code into your tooltip, then just assign the escaped html code
to the `title` attribute, it will work.

    <li title="&lt;b&gt;Some&lt;/b&gt; &lt;u&gt;html&lt;/u&gt;">...</li>
    
<p>
  <ul class="tooltiped">
    <li title="&lt;b&gt;Some&lt;/b&gt; &lt;u&gt;html&lt;/u&gt; code" rel="tooltip">This has some html tooltip</li>
    <li title="&lt;s&gt;Another&lt;/s&gt; &lt;i&gt;html&lt;/i&gt; code" rel="tooltip">So does this one</li>
  </ul>
</p>

## Tooltips On Images, :image

Images can has tooltips too. You can use ether `title` or `alt` attribute to keep the tooltip text.

<p>
  <img src="/images/test/1-thmb.jpg" rel="tooltip" title="Watson's Bay" />
  <img src="/images/test/2-thmb.jpg" rel="tooltip" alt="Some boats at Coogie" />
</p>

## Customized Tooltips, :customized

If an element has an `id` attribute then the related tooltip element will have the same `id`
but with the `-tooltip` suffix, so you can customize them separately.

<p>
  <ul class="tooltiped">
    <li title="Blue Tooltip" rel="tooltip" id="blue">This one has blue tooltip</li>
    <li title="Green Tooltip" rel="tooltip" id="green">This one has green tooltip</li>
    <li title="Red Tooltip" rel="tooltip" id="red">This one has red tooltip</li>
  </ul>
</p>
