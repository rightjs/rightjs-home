# Демонстрации

<p>
  <dl>
    <dt>Базовые демки</dt>
    <ul>
      <li><%= link_to 'Демо визуальных эффектов', '/fx-demo' %></li>
      <li><%= link_to "Демо библиотеки Drag'n'Drop",    '/goods/drag-n-drop/demo' %></li>
    </ul>
    <dt>Демонстрация виджетов</dt>
    <ul>
    <% ui_list.each do |unit| -%>
      <li><%= link_to unit[:name], unit[:url] + '/demo' %></li>
    <% end -%>
    </ul>
  </dl>
</p>
