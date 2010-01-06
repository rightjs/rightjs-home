<h1>Sortable Demo</h1> <% @title_text = "UI: Sortable: Demo" %>
<% content_for :modules do %>
  <%= javascript_include_tag "/builds/goods/right-dnd-min.js"   %>
  <%= javascript_include_tag "/builds/ui/right-sortable-min.js" %>
  <%= stylesheet_link_tag    'sortable-demo'                    %>
<% end %>
<style type="text/css">
  ul.sortable {
    width: 20em;
    list-style: none;
    padding: 0;
  }
  ul.sortable li {
    cursor: move;
    background: #CFCEBD;
    padding: .2em .4em;
    margin: 2px;
    -webkit-border-radius: .24em;
    -moz-border-radius: .24em;
  }
  ul.sortable li.dragging {
    opacity: 0.6;
  }
  ul.horizontal {
    width: 30em;
    height: 1em;
  }
  ul.horizontal li {
    float: left;
  }
</style>

Some sortable lists demo

## Vertical List, :vertical

<p>
  <ul class="sortable" rel="sortable">
    <li>Item #1</li>
    <li>Item #2</li>
    <li>Item #3</li>
    <li>Item #4</li>
    <li>Item #5</li>
  </ul>
</p>

## Horizontal List, :horizontal

<p>
  <ul class="sortable horizontal" rel="sortable">
    <li>Item #1</li>
    <li>Item #2</li>
    <li>Item #3</li>
    <li>Item #4</li>
    <li>Item #5</li>
  </ul>
</p>

## Remote List, :remote

<p>
  <ul class="sortable" rel="sortable" data-sortable-options="{url: '%{id}/move.html', Xhr: {evalScripts: true}}">
    <li id="item_1">Item #1</li>
    <li id="item_2">Item #2</li>
    <li id="item_3">Item #3</li>
    <li id="item_4">Item #4</li>
    <li id="item_5">Item #5</li>
  </ul>
</p>
<p>
  <div id="moving-status"></div>
</p>