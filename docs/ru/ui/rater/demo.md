# Rater Demo
<% content_for :modules, javascript_include_tag('/builds/ui/right-rater-min.js') %>

There are some basic use-cases for the [Rater](/ui/rater) widget out of the [RightJS UI](/ui) library.

## Simple Raters, :simple

<p>
  <div class="right-rater">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:1}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:2}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:3}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:4}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:5}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>

## Disabled Raters, :disabled

<p>
  <div class="right-rater" data-rater-options="{value:2, disabled:true}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  This rater is disabled
</p>
<p>
  <div class="right-rater" data-rater-options="{value:2, disableOnVote:true}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  This rater will get disabled once you click on it
</p>

## Assigned Rater, :assigned

<p>
  <div class="right-rater" data-rater-options="{value:2, update:'the-field'}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  <input type="text" id="the-field" size="1" />
</p>

## Remote Rater, :remote

<p>
  <div class="right-rater" data-rater-options="{value:1, url:'test', Xhr:{evalScripts:true,spinner:'rate-spinner'}}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  
  <%= image_tag 'spinner.gif', :id => 'rate-spinner', :style => "display:none" %>
  <span id="remote-rater-output"> </span>
</p>

## Automatically Generated Raters, :generated

<div id="auto-generated"> </div>
<script type="text/javascript">
// <![CDATA[
  6..times(function(i) {
    new Rater({
      halfs: true, value: i
    }).insertTo($E('p').insertTo('auto-generated'));
  });
// ]]>
</script>

<div style="height: 10em"> </div>