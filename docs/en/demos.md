# Demo Pages Index

<p>
  <dl>
    <dt>Basic Demos</dt>
    <ul>
      <li><%= link_to 'Visual Effects Demo', '/fx-demo' %></li>
      <li><%= link_to "Drag'n'Drop Demo",    '/goods/drag-n-drop/demo' %></li>
    </ul>
    <dt>RightJS UI</dt>
    <ul>
    <% ui_list.each do |unit| -%>
      <li><%= link_to unit[:name], unit[:url] + '/demo' %></li>
    <% end -%>
    </ul>
  </dl>
</p>
