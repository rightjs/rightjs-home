# Демо редактирования на месте
<% content_for :modules, javascript_include_tag('/builds/ui/right-in-edit-min.js') %>

Несколько примеров использования плагина [редактирования на месте](/ui/in-edit)


## Простой пример, :simple

<p class="test-case">
  <span id="test-1">Кликните ссылку справа</span>
  <a href="" onclick="$('test-1').inEdit({toggle: this}); return false;">Редактировать</a>
</p>

## С полем textarea, :textarea

<p class="test-case">
  <span id="test-2">Кликните ссылку справа</span>
  <a href="" onclick="$('test-2').inEdit({toggle: this, type: 'textarea'}); return false;">Редактировать</a>
</p>

## Поле с паролем, :password

<p class="test-case">
  <span id="test-3">Очень секретный текст</span>
  <a href="" onclick="$('test-3').inEdit({toggle: this, type: 'password'}); return false;">Редактировать</a>
</p>

<script type="text/javascript">
  $ext(InEdit.Options, {
    url: '/ui/in-edit/response',
    method: 'get'
  });
</script>
<style type="text/css">
  textarea.right-in-edit-field {
    height: 4em;
  }
</style>
