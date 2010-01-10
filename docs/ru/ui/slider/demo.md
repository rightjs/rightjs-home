# Slider Demo
<% content_for :modules do %>
  <%= javascript_include_tag '/builds/goods/right-dnd-min.js' %>
  <%= javascript_include_tag '/builds/ui/right-slider-src.js' %>
  <%= stylesheet_link_tag    'slider-demo'                    %>
<% end %>
<style type="text/css">
  input.slider-out {
    width: 5em;
    padding: .1em .2em;
    border: 1px solid #DDD;
  }
  div.slider-demo input.slider-out {
    display: inline;
    vertical-align: middle;
    margin-top: 0em;
    margin-left: 1em;
  }

  div.slider-demo-vertical {
    float: left;
    width: 2em;
    margin-right: .4em;
  }
  div.slider-demo-vertical input.slider-out {
    float: left;
    vertical-align: top;
    width: 2em;
  }
  div.slider-demo-vertical div.right-slider {
    margin-top: .2em;
    margin-left: .8em;
    float: left;
  }
  
</style>

There are some basic use-cases for the [Slider](/ui/slider) widget out of the
[RightJS UI](/ui) library.

## Simple Sliders, :simple

<p>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update: 'slider-out-1'}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-1" />
  </div>
  <div class="slider-demo-vertical">
    <input type="text" class="slider-out" id="slider-out-2" />
    <div class="right-slider right-slider-vertical" data-slider-options="{update: 'slider-out-2'}">
      <div class="right-slider-handle"></div>
    </div>
  </div>
  <div style="clear:left"> </div>
</p>

## Snapping Slider, :snapping

<p>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-3',snap:10}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-3" />
  </div>
  
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-4',snap:20}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-4" />
  </div>
  
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-5',snap:30}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-5" />
  </div>
</p>

## With Different Ranges, :ranges

<p>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-6',min:-100,max:0,value:-20}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-6" />
  </div>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-7',min:-100,max:100,value:0}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-7" />
  </div>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-8',min:100,max:200,value:120}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-8" />
  </div>
</p>

## With Custom Precision Settings, :precision

<p>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-9',round: 1}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-9" />
  </div>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-10',round: 2}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-10" />
  </div>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-11',round: 3}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-11" />
  </div>
  <div class="slider-demo">
    <div class="right-slider" data-slider-options="{update:'slider-out-12',round: 4}">
      <div class="right-slider-handle"></div>
    </div>
    <input type="text" class="slider-out" id="slider-out-12" />
  </div>
</p>

## Dynamically Generated Sliders, :generated

<p>
  <div class="slider-demo" id="d-slider-0"><input type="text" class="slider-out" id="slider-out-13" /></div>
  <div class="slider-demo" id="d-slider-1"><input type="text" class="slider-out" id="slider-out-14" /></div>
  
  <div class="slider-demo-vertical" id="d-slider-2"><input type="text" class="slider-out" id="slider-out-15" /></div>
  <div class="slider-demo-vertical" id="d-slider-3"><input type="text" class="slider-out" id="slider-out-16" /></div>
  <div class="slider-demo-vertical" id="d-slider-4"><input type="text" class="slider-out" id="slider-out-17" /></div>
  <div class="slider-demo-vertical" id="d-slider-5"><input type="text" class="slider-out" id="slider-out-18" /></div>
  <div class="slider-demo-vertical" id="d-slider-6"><input type="text" class="slider-out" id="slider-out-19" /></div>
  <div class="slider-demo-vertical" id="d-slider-7"><input type="text" class="slider-out" id="slider-out-20" /></div>
  <div class="slider-demo-vertical" id="d-slider-8"><input type="text" class="slider-out" id="slider-out-21" /></div>
  <div class="slider-demo-vertical" id="d-slider-9"><input type="text" class="slider-out" id="slider-out-22" /></div>
  <div class="slider-demo-vertical" id="d-slider-10"><input type="text" class="slider-out" id="slider-out-23" /></div>
  <div class="slider-demo-vertical" id="d-slider-11"><input type="text" class="slider-out" id="slider-out-24" /></div>
  <div class="slider-demo-vertical" id="d-slider-12"><input type="text" class="slider-out" id="slider-out-25" /></div>

  <div style="clear:both"></div>
</p>

<script type="text/javascript">
// <![CDATA[
new Slider().insertTo('d-slider-0', 'top').assignTo('slider-out-13').fire('change', 0);
new Slider({min: -100, max: 100,value: 0}).insertTo('d-slider-1', 'top').assignTo('slider-out-14');

// list of vertical sliders
var slider_num    = 2;
var out_num       = 15
var min_value     = -10;
var max_value     = 10;
var sliders_count = 11;

for (var i=0; i < sliders_count; i++) {
  new Slider({direction: 'y', min: min_value, max: max_value
  }).insertTo('d-slider-'+(slider_num+i))
    .assignTo('slider-out-'+(out_num+i))
    .setValue(min_value + (max_value - min_value)/(sliders_count-1) * i);
}
// ]]>
</script>