# Selectable Demo
<% content_for :modules, javascript_include_tag('/builds/ui/right-selectable-min.js') %>
<style type="text/css">
  dl.right-selectable dt {
    font-size: 1em;
  }
</style>

There are several basic use-cases for the [Selectable](/ui/selectable) unit
out of the [RightJS UI](/ui) library.


## Simple Selectable, :simple

<p>
  <ul class="right-selectable">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
    <li>Five</li>
    <li>Six</li>
    <li>Seven</li>
    <li>Eight</li>
  </ul>
</p>

## Selectable With Groups, :groups

<p>
  <dl class="right-selectable">
    <dt>First Group</dt>
    <dd>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
      </ul>
    </dd>
    <dt>Second Group</dt>
    <dd>
      <ul>
        <li>Five</li>
        <li>Six</li>
        <li>Seven</li>
        <li>Eight</li>
      </ul>
    </dd>
  </dl>
</p>

## With A Single Option, :single

<p>
  <ul class="right-selectable right-selectable-single">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
    <li>Five</li>
    <li>Six</li>
    <li>Seven</li>
    <li>Eight</li>
  </ul>
</p>

## With A Single Option And Groups, :single-groups

<p>
  <dl class="right-selectable right-selectable-single">
    <dt>First Group</dt>
    <dd>
      <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
      </ul>
    </dd>
    <dt>Second Group</dt>
    <dd>
      <ul>
        <li>Five</li>
        <li>Six</li>
        <li>Seven</li>
        <li>Eight</li>
      </ul>
    </dd>
  </dl>
</p>

## With Disabled Options, :disabled

<p>
  <ul class="right-selectable" data-selectable-options="{disabled:[1,4]}">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
    <li>Five</li>
    <li>Six</li>
    <li>Seven</li>
    <li>Eight</li>
  </ul>
</p>

## Assigned To An Input, :assigned

<p>
  This one works with indexes
  <ul class="right-selectable" data-selectable-options="{update: 'input-1'}">
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
  </ul>
  
  <input type="text" id="input-1" />
</p>
<p>
  This one works with IDs
  <ul class="right-selectable" data-selectable-options="{update: 'input-2'}">
    <li id="one-1">One</li>
    <li id="two-2">Two</li>
    <li id="three-3">Three</li>
    <li id="four-4">Four</li>
  </ul>
  
  <input type="text" id="input-2" />
</p>
<p>
  This one automatically parses number out of IDs
  <ul class="right-selectable" data-selectable-options="{update: 'input-3', parseIds: true}">
    <li id="one-1">One</li>
    <li id="two-2">Two</li>
    <li id="three-3">Three</li>
    <li id="four-4">Four</li>
  </ul>
  
  <input type="text" id="input-3" />
</p>
<p>
  With a single select and IDs
  <ul class="right-selectable" data-selectable-options="{update: 'input-4', multiple: false}">
    <li id="one-1">One</li>
    <li id="two-2">Two</li>
    <li id="three-3">Three</li>
    <li id="four-4">Four</li>
  </ul>
  
  <input type="text" id="input-4" />
</p>

## Programmatically Generated, :generated

<div id="generated-selects"> </div>
<script type="text/javascript">
// <![CDATA[
  var keys = {
    'option-1': 'One',
    'option-2': 'Two',
    'option-3': 'Three',
    'option-4': 'Four'
  };
  
  new Selectable({
    options: Object.values(keys),
    selected: 2,
    multiple: false
  }).insertTo($E('p').insertTo('generated-selects'));
  
  new Selectable({
    options: keys,
    selected: [0,2],
    multiple: true
  }).insertTo($E('p').insertTo('generated-selects'));
  
  new Selectable({
    options: keys,
    selected: [0,2]
  }).setValue([1,3])
    .insertTo($E('p').insertTo('generated-selects'));
// ]]>
</script>

<div style="height: 10em"> </div>