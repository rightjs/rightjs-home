# Visual Effects Demo
<% content_for :modules, stylesheet_link_tag('fx-demo') %>

By default RightJS comes with a visual effects engine and several most frequently used effects.


<h2>Fx.Morph</h2>

<div class="fx-example fx-example-big">
  <div class="fx-test-container">
    <div id="morph-test" class="fx-test">How are ya mate?</div>
  </div>
  
<textarea id="morph-test-script" style="height: 90px">
$('morph-test').morph({
  width: '420px',
  fontSize: '40px',
  background: 'green',
  color: 'yellow'
}, {duration: 'long'});
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('morph-test'); return false;">Start</a>
    <a href="" onclick="reset('morph-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Highlight</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="highlight-test" class="fx-test fx-no-bg">Highlight me!</div>
  </div>
  
<textarea id="highlight-test-script">
$('highlight-test')
  .highlight()
  .highlight('blue')
  .highlight('red', 'green');
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('highlight-test'); return false;">Start</a>
    <a href="" onclick="reset('highlight-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Fade</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="fade-test" class="fx-test">Fade me!</div>
  </div>
  
<textarea id="fade-test-script">
$('fade-test').fade();
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('fade-test'); return false;">Start</a>
    <a href="" onclick="reset('fade-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Slide</h2>

<div class="fx-example">
  <div class="fx-test-container" style="overflow: hidden;">
    <div id="slide-test" class="fx-test">Slide me!</div>
  </div>
  
<textarea id="slide-test-script">
$('slide-test')
  .slide()
  .slide({direction: 'left'})
  .slide('out', {direction: 'bottom'})
  .slide('in',  {direction: 'right'})
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('slide-test'); return false;">Start</a>
    <a href="" onclick="reset('slide-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Scroll</h2>
<div class="fx-example">
  <div class="fx-test-container">
    <div id="scroll-test" class="fx-test"></div>
  </div>
  
<textarea id="scroll-test-script">
$('scroll-test').scroll({
  x: 200,
  y: 40
});
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('scroll-test'); return false;">Start</a>
    <a href="" onclick="reset('scroll-test'); return false;">Reset</a>
  </div>
  
  <script type="text/javascript">
  // <![CDATA[
    for (var i=0; i < 8; i++) {
      var str = '<div>';
      for (var j=0; j < 30; j++) {
        str += '&nbsp;'+ j;
      }
      $('scroll-test').insert(str + '</div>');
    }
  // ]]>
  </script>
</div>

<p>&nbsp;</p>


<h1>RightJS Goods Additional Visual Effects</h1>
<script type="text/javascript" src="/builds/goods/right-effects.js"></script>


<h2>Fx.CSS</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="css-test" class="fx-test">I can morph to classes!</div>
  </div>

<textarea id="css-test-script">
$('css-test')
  .morphToClass('green-background')
  .morphToClass('blue-color')
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('css-test'); return false;">Start</a>
    <a href="" onclick="reset('css-test'); $('css-test').setClass('fx-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Move</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="move-test" class="fx-test">I can be moved around!</div>
  </div>
  
<textarea id="move-test-script">
$('move-test')
  .move({x:  300}, {position: 'relative'})
  .move({y: -200}, {position: 'relative'})
  .move({x: -300}, {position: 'relative'})
  .move({y:  200}, {position: 'relative'});
</textarea>

  <div class="fx-link">
    <a href="" onclick="runfx('move-test'); return false;">Start</a>
    <a href="" onclick="reset('move-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Run</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="run-test" class="fx-test">I can run in and out!</div>
  </div>
  
<textarea id="run-test-script">
$('run-test')
  .run().run() // left by default
  .run('out', {direction: 'top'})
  .run('in',  {direction: 'top'})
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('run-test'); return false;">Start</a>
    <a href="" onclick="reset('run-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Bounce</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="bounce-test" class="fx-test">I can bounce!</div>
  </div>
  
<textarea id="bounce-test-script">
$('bounce-test').bounce();
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('bounce-test'); return false;">Start</a>
    <a href="" onclick="reset('bounce-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Puff</h2>

<div class="fx-example">
  <div class="fx-test-container">
    <div id="puff-test" class="fx-test">I can puff out and in!</div>
  </div>
  
<textarea id="puff-test-script">
$('puff-test').puff()
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('puff-test'); return false;">Start</a>
    <a href="" onclick="reset('puff-test'); return false;">Reset</a>
  </div>
</div>


<h2>Fx.Zoom</h2>

<div class="fx-example fx-example-big">
  <div class="fx-test-container">
    <div id="zoom-test" class="fx-test">Zoom!</div>
  </div>
  
<textarea id="zoom-test-script">
$('zoom-test')
  .zoom(2,   {from: 'left-top', duration: 'long'})
  .zoom(0.5, {from: 'left-top', duration: 'long'});
</textarea>

  <div class="fx-links">
    <a href="" onclick="runfx('zoom-test'); return false;">Start</a>
    <a href="" onclick="reset('zoom-test'); return false;">Reset</a>
  </div>
</div>


<script type="text/javascript">
// <!--
function reset(id) {
  $(id).replace('<div id="'+id+'" class="'+$(id).className+'">'+$(id).innerHTML+'</div>');
}
function runfx(id) {
  try {
    $eval($(id+'-script').value);
  } catch(e) {}
}
// -->
</script>
