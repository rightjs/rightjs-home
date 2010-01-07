<% @title_text = 'Welcome Home!' %>
<% content_for :modules, javascript_include_tag('/builds/ui/right-tabs-min.js') %>
<%= stylesheet_link_tag('landing-page') %>

<ul id="promo">
  <ul>
    <li id="friendly-tab"><a href="#friendly"><h1>It's Friendly</h1><i>Easy to read syntax</i></a></li>
    <li id="compact-tab"><a href="#compact"><h1>It's Compact</h1><i>Weights only 30k!</i></a></li>
    <li id="fast-tab"><a href="#fast"><h1>It's Fast</h1><i>Possibly THE Fastest!</i></a></li>
  </ul>
  
  <li id="friendly">
    <p>
      RightJS is aimed at dynamic languages crowd, as such it does not have all the
      long names and complex class constructions like many other frameworks written
      by Java and C++ developers.
    </p>
    <p>
      On one side RightJS has a really nice and simple, easy to write and read syntax
      that makes it a snap to use and extend, even for noobs. An on the other, it 
      supports multiple paradigms and has extensive OOP and FP features that will
      make any tough professional happy.
    </p>
    <p class="bottom-link">
      <%= link_to "Getting started", tutorial_path('getting-started') %>
    </p>
  </li>
  <li id="compact">
    <p>
      RightJS is a really compact framework of just 30k and as the matter of fact it
      already has several plugins backed in. It has everything any serious framework
      should have, dom manipulations handling, native units extensions, basic visual
      effects, extensive OOP abilities, AJAX, additional form features, cookies. You
      name it!
    </p>
    <p>
      And RightJS is not just small by itself, it has a number of small and fast plugins,
      you can add them to the main build, or switch off unnecessary features stripping it
      down to the very skinny 18k core.
    </p>
    <p class="bottom-link">
      <%= link_to "Custom builds page", builds_path %>
    </p>
  </li>
  <li id="fast">
    <p>
      RightJS takes the performance issue very seriously, we do lots of regressive
      and performance testing to make sure all methods in the framework work
      just as fast as they possibly can.
    </p>
    <p>
      RightJS reuses the native functionality every browser can provide and it
      doesn't overcomplicate things with too fancy, slow features. As the result,
      RightJS beats up all the modern frameworks in most of the routine operations,
      and in many cases gets really close the pure dom code performance.
    </p>
    <p class="bottom-link">
      <%= link_to "Benchmarks page", '/benchmarks' %>
    </p>
  </li>
</ul>

<h1>What's Hot?</h1>
<dl id="features">
  <dt><a href="#ui"><h2>RightJS UI</h2><i>A collection of useful interfaces and widgets</i></a></dt>
  <dd id="ui"><%= ui_modules_menu %></dd>
  
  <dt><a href="#goods"><h2>RightJS Goods</h2><i>A collection of common use plugins</i></a></dt>
  <dd id="goods"><%= goods_modules_menu %></dd>
  
  <dt><a href="#showcases"><h2>Showcases</h2><i>Slick applications/games built with RightJS</i></a></dt>
  <dd>
    <ul>
      <li><a href="http://stcamp.net/games/sudoku/">Right Sudoku</a></li>
      <li><a href="http://stcamp.net/games/t-ninja/">Typing Ninja</a></li>
      <li><a href="http://stcamp.net/games/nippo/">Happy Nippo</a></li>
    </ul>
  </dd>
</dl>

<script type="text/javascript">
  // <![CDATA[
    new Tabs('promo');
    new Tabs('features');
  // ]]>
</script>
