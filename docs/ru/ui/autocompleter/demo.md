# Демо автокомплитера

Это демо-страница для виджета [Autocompelter](/ui/autocompleter)


## Простой пример, :simple

Выберите какой-нибудь язык программирования из списка

<input type="text" id="remote-auto-field" class="demo-field" />
<script type="text/javascript">
  // <![CDATA[
    new Autocompleter('remote-auto-field', {
      url: '/ui/autocompleter/languages/%{search}.js'
    });
  // ]]>
</script>

исходный код для данного примера, выглядит вот так

    new Autocompleter('remote-auto-field', {
      url: '/ui/autocompleter/languages/%{search}.js'
    });

Тоже самое с локальным списком поиска

<input type="text" id="local-auto-field" class="demo-field" />
<script type="text/javascript">
  // <![CDATA[
    new Autocompleter('local-auto-field', {
      local: <%= PagesController::LANGUAGES.to_json %>
    });
  // ]]>
</script>

исходный код

    new Autocompleter('local-auto-field', {
      local: <%= PagesController::LANGUAGES.slice(0,4).to_json %>
    });

## Авто-инициализированные поля, :auto

Тот же самый пример что и выше, но с использованием автоматической инициализации

<input type="text" rel="autocompleter[/ui/autocompleter/languages/%{search}.js]" class="demo-field" />

Исходный код выглядит следующим образом

    <input type="text" rel="autocompleter[/ui/autocompleter/languages/%{search}.js]" />

Тоже самое с локальным списком подстановок

<input type="text" rel="autocompleter<%= PagesController::LANGUAGES.to_json.gsub('"', "'") %>" class="demo-field" />

исходный код

    <input type="text" rel="autocompleter<%= PagesController::LANGUAGES.slice(0,4).to_json.gsub('"', "'") %>" />

<div style="height: 10em"> </div>