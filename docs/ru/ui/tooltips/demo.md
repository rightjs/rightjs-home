# Демо тултипов
<%= partial 'scripts' %>

Несколько примеров использования виджета [тултипов](/ui/tooltips)

## Простой пример, :simple

<p>
  <ul class="tooltiped">
    <li title="Какой-то текст" rel="tooltip">Этот элемент имеет тултип</li>
    <li title="Какой-то другой текст" rel="tooltip">И этот элемент имеет тултип</li>
  </ul>
</p>

## Тултипы с HTML кодом, :html

Если вам необходимо поместить некий HTML код в текст тултипа, просто замените в нем угловые
скобки на соответствующие HTML символы.

    <li title="&lt;b&gt;Какой-то&lt;/b&gt; &lt;u&gt;html&lt;/u&gt;">...</li>
    
<p>
  <ul class="tooltiped">
    <li title="&lt;b&gt;Какой-то&lt;/b&gt; &lt;u&gt;html&lt;/u&gt; код" rel="tooltip">Этот элемент имеет тултип с HTML кодом</li>
    <li title="&lt;s&gt;Другой&lt;/s&gt; &lt;i&gt;html&lt;/i&gt; код" rel="tooltip">И этот тоже</li>
  </ul>
</p>

## Тултипы над картинками, :image

Картинки так же могут иметь тултипы. В данном случае поддерживаются оба `title` и `alt` атрибуты.

<p>
  <img src="/images/test/1-thmb.jpg" rel="tooltip" title="Бухта Ватсона" />
  <img src="/images/test/2-thmb.jpg" rel="tooltip" alt="Лодки не далеко от Coogie" />
</p>

## Специфические тултипы, :customized

Если элемент имеет атрибут `id`, то элемент соответствующего тултипа будет иметь похожий
`id` с суффиксом `-tooltip`, что позволяет настраивать внешний вид каждого тултипа отдельно

<p>
  <ul class="tooltiped">
    <li title="Синий тултип" rel="tooltip" id="blue">Этот элемент имеет тултип с синей полоской</li>
    <li title="Зеленый тултип" rel="tooltip" id="green">Этот элемент имеет тултип с зеленой полоской</li>
    <li title="Красный тултип" rel="tooltip" id="red">А этот элемент имеет тултип с красной полоской</li>
  </ul>
</p>
