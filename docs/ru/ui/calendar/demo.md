# Демо календаря
<% content_for :modules, javascript_include_tag('/builds/ui/right-calendar-min.js') %>

Несколько стандартных примеров использования виджета [календаря](/ui/calendar).
Вы можете использовать клавиши клавиатуры для навигации

## Работа с полями ввода форм, :form
<p>
  <label>Простое поле:</label>
  <input type="text" id="date-simple" class="demo-field" />
</p>
<p>
  <label>Поле с иконкой:</label>
  <input type="text" id="date-triggered" class="demo-field" />
  <input type="image" id="date-trigger" src="/images/calendar.png" />
</p>
<p>
  <label>С датой и временем:</label>
  <input type="text" id="date-with-time" class="demo-field" />
</p>
<p>
  <label>С дополнительными кнопками:</label>
  <input type="text" id="date-with-buttons" class="demo-field" />
</p>
<p>
  <label>Со спец. форматированием:</label>
  <input type="text" id="date-with-formatting" class="demo-field" />
</p>
<p>
  <label>С ограничением дат:</label>
  <input type="text" id="date-with-limits" class="demo-field" />
</p>
<p>
  <label>С кнопками для годов:</label>
  <input type="text" id="date-with-years" class="demo-field" />
</p>
<p>
  <label>С периодом в 15-ть минут:</label>
  <input type="text" id="date-with-15-minutes-period" class="demo-field" />
</p>
<p>
  <label>С периодом в 3 часа:</label>
  <input type="text" id="date-with-3-hours-period" class="demo-field" />
</p>
<script type="text/javascript">
// <![CDATA[
  new Calendar().assignTo('date-simple');
  new Calendar().assignTo('date-triggered', 'date-trigger');
  new Calendar({format: "%Y-%m-%d %H:%M"}).assignTo('date-with-time');
  new Calendar({showButtons: true}).assignTo('date-with-buttons');
  new Calendar({
    format: "%d %B %Y %H:%m"
  }).assignTo('date-with-formatting');
  var min_date = new Date();
  var max_date = new Date();
  min_date.setMonth(min_date.getMonth() - 1);
  max_date.setMonth(max_date.getMonth() + 1);

  new Calendar({
    minDate: min_date, maxDate: max_date
  }).assignTo('date-with-limits');
  
  new Calendar({listYears: true}).assignTo('date-with-years');
  
  new Calendar({
    timePeriod: 15, format: "%Y-%m-%d %H:%M"
  }).assignTo('date-with-15-minutes-period');
  
  new Calendar({
    timePeriod: 180, format: "%Y-%m-%d %H:%M"
  }).assignTo('date-with-3-hours-period');
// ]]>
</script>

Исходный код выглядит следующим образом:

    // простые календари
    new Calendar().assignTo('date-simple');
    new Calendar().assignTo('date-triggered', 'date-trigger');


    // календарь со врменем
    new Calendar({format: "%Y-%m-%d %H:%M"}).assignTo('date-with-time');


    // календарь с кнопками
    new Calendar({
      showButtons: true
    }).assignTo('date-with-buttons');


    // календарь со спец. форматированием
    new Calendar({format: "%d %B %Y %H:%m"}).assignTo('date-with-formatting');


    // календарь с ограничем дат
    var min_date = new Date();
    var max_date = new Date();
    min_date.setMonth(min_date.getMonth() - 1);
    max_date.setMonth(max_date.getMonth() + 1);

    new Calendar({
      minDate: min_date, maxDate: max_date
    }).assignTo('date-with-limits');


    // календарь с кнопками лет
    new Calendar({listYears: true}).assignTo('date-with-years');


    // календарь с 15-ти минутным периодом
    new Calendar({
      timePeriod: 15, format: "%Y-%m-%d %H:%M"
    }).assignTo('date-with-15-minutes-period');


    // календарь с 3-х часовым периодом
    new Calendar({
      timePeriod: 180, format: "%Y-%m-%d %H:%M"
    }).assignTo('date-with-3-hours-period');

## Поля с авто-инициализацией, :auto

Вы так же можете создавать календари просто указав атрибут `rel="calendar"` на
нужном поле ввода. Или атрибут вида `rel="calendar[input_field_id]"` если
вы хотите показывать/скрывать календарь специальной кнопкой:

    <input type="text" rel="calendar" />
  
    <input type="text" id="input-field" />
    <input type="image" rel="calendar[input-field]" />

<p>
  <label>Простой календарь:</label>
  <input type="text" rel="calendar" class="demo-field" />
</p>
<p>
  <label>Календарь с триггером:</label>
  <input type="text" id="input-field" class="demo-field" />
  <input type="image" rel="calendar[input-field]" src="/images/calendar.png" />
</p>

## Встроенные календари, :inline

Вы можете использовать виджет календаря, как самостоятельный элемент страницы
встраивая его с помощью метода `insertTo`

<p>
  <div id="simple-calendar"></div>
</p>
<p>
  <div id="simple-calendar-with-time"></div>
</p>
<p>
  <div id="simple-calendar-with-buttons"></div>
</p>
<script type="text/javascript">
//<![CDATA[
new Calendar().insertTo('simple-calendar');
new Calendar({showTime: true}).insertTo('simple-calendar-with-time');
new Calendar({showButtons: true}).insertTo('simple-calendar-with-buttons');
//]]>
</script>

Вы так же можете создавать календари из нескольких методов используя опцию `numberOfMonths`

<p>
  <div id="two-calendars"></div>
</p>
<p>
  <div id="calendar-greed"></div>
</p>
<script type="text/javascript">
//<![CDATA[
new Calendar({numberOfMonths: 2}).insertTo('two-calendars');
new Calendar({numberOfMonths: [2,2]}).insertTo('calendar-greed');
//]]>
</script>

