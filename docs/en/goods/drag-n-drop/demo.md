# Drag'n'Drop Demo
<% content_for :modules, javascript_include_tag('/builds/goods/right-dnd-min.js') %>
<% content_for :modules, stylesheet_link_tag('dnd-demo') %>

Some standard demo cases for the drag-n-drop feature

## Simple Draggables, :simple

<p>
  <div class="test-container">
    <div class="draggable" rel="draggable" data-draggable-options="{}">Drag Me</div>
    <div class="draggable" rel="draggable" data-draggable-options="{}">Or Me</div>
  </div>
</p>
<p>
  <div class="test-container">
    <div class="draggable" rel="draggable" data-draggable-options="{revert: true}">I Run Back</div>
    <div class="draggable" rel="draggable" data-draggable-options="{clone: true, revert: true}">I Leave Clone</div>
  </div>
</p>
<p>
  <div class="test-container">
    <div class="draggable" rel="draggable" data-draggable-options="{snap: 50}">I Snap To 50px</div>
    <div class="draggable" rel="draggable" data-draggable-options="{snap: [0, 50]}">I Snap To [0, 50]</div>
  </div>
</p>

## Draggables With Constraints, :constrained

<p>
  <div class="test-container">
    <div class="draggable" rel="draggable" data-draggable-options="{axis: 'x', revert: true}">X-Axis Only</div>
    <div class="draggable" rel="draggable" data-draggable-options="{axis: 'y', revert: true}">Y-Axis Only</div>
  </div>
</p>
<p>
  <div class="test-container">
    <div id="draggable-1" class="draggable">100px Range</div>
    <div id="draggable-2" class="draggable">200px Range</div>
  </div>
</p>
<p>
  <div class="test-container" id="draggable-area">
    <div class="draggable" rel="draggable" data-draggable-options="{range: 'draggable-area'}">I Live In Here</div>
  </div>
</p>
<script type="text/javascript">
// <![CDATA[
  var dims_1 = $('draggable-1').dimensions();
  var dims_2 = $('draggable-2').dimensions();
  
  $('draggable-1').makeDraggable({revert: true, range: {
    x: [dims_1.left - 100, dims_1.left + dims_1.width  + 100],
    y: [dims_1.top  - 100, dims_1.top  + dims_1.height + 100]
  }});
  
  $('draggable-2').makeDraggable({revert: true, range: {
    x: [dims_2.left - 200, dims_2.left + dims_2.width  + 200],
    y: [dims_2.top  - 200, dims_2.top  + dims_2.height + 200]
  }});
// ]]>
</script>


## Simple Droppable, :droppables

<script type="text/javascript">
// <![CDATA[
Droppable.Options.onDrop = function() {
  this.element.highlight('green');
};
// ]]>
</script>
<p>
  <div class="test-container">
    <div class="draggable" rel="draggable" data-draggable-options="{revert: true}">Drag Me</div>
    <div class="droppable" rel="droppable">Drop Here</div>
  </div>
</p>

## Selective Droppables, :selective

<p>
  <div class="test-container">
    <div class="draggable good" rel="draggable" data-draggable-options="{revert: true}">Devotee</div>
    <div class="draggable evil" rel="draggable" data-draggable-options="{revert: true}">Badass</div>
  </div>
</p>
<p>
  <div class="test-container">
    <div class="droppable" rel="droppable" data-droppable-options="{accept: '.good'}">Heavens</div>
    <div class="droppable" rel="droppable" data-droppable-options="{accept: '.evil'}">Hell</div>
  </div>
</p>
