# Демо полей выбора
<% content_for :modules, javascript_include_tag('/builds/ui/right-selectable-min.js') %>
<style type="text/css">
  dl.right-selectable dt {
    font-size: 1em;
  }
</style>

Несколько базовых примеров использования виджета [полей выбора](/ui/selectable)
из библиотеки [RightJS UI](/ui).


## Простой случай, :simple

<p>
  <ul class="right-selectable">
    <li>Раз</li>
    <li>Два</li>
    <li>Три</li>
    <li>Четыре</li>
    <li>Пять</li>
    <li>Шесть</li>
    <li>Семь</li>
    <li>Восемь</li>
  </ul>
</p>

## Поля с группами, :groups

<p>
  <dl class="right-selectable">
    <dt>Первая группа</dt>
    <dd>
      <ul>
        <li>Раз</li>
        <li>Два</li>
        <li>Три</li>
        <li>Четыре</li>
      </ul>
    </dd>
    <dt>Вторая группа</dt>
    <dd>
      <ul>
        <li>Пять</li>
        <li>Шесть</li>
        <li>Семь</li>
        <li>Восемь</li>
      </ul>
    </dd>
  </dl>
</p>

## Поле с единичным выбором, :single

<p>
  <ul class="right-selectable right-selectable-single">
    <li>Раз</li>
    <li>Два</li>
    <li>Три</li>
    <li>Четыре</li>
    <li>Пять</li>
    <li>Шесть</li>
    <li>Семь</li>
    <li>Восемь</li>
  </ul>
</p>

## Поле с единичным выбором и группами, :single-groups

<p>
  <dl class="right-selectable right-selectable-single">
    <dt>Первая группа</dt>
    <dd>
      <ul>
        <li>Раз</li>
        <li>Два</li>
        <li>Три</li>
        <li>Четыре</li>
      </ul>
    </dd>
    <dt>Вторая группа</dt>
    <dd>
      <ul>
        <li>Пять</li>
        <li>Шесть</li>
        <li>Семь</li>
        <li>Восемь</li>
      </ul>
    </dd>
  </dl>
</p>

## С заблокированными позициями, :disabled

<p>
  <ul class="right-selectable" data-selectable-options="{disabled:[1,4]}">
    <li>Раз</li>
    <li>Два</li>
    <li>Три</li>
    <li>Четыре</li>
    <li>Пять</li>
    <li>Шесть</li>
    <li>Семь</li>
    <li>Восемь</li>
  </ul>
</p>

## Назначенное на поле ввода, :assigned

<p>
  Это поле работает с простыми индексами
  <ul class="right-selectable" data-selectable-options="{update: 'input-1'}">
    <li>Раз</li>
    <li>Два</li>
    <li>Три</li>
    <li>Четыре</li>
  </ul>
  
  <input type="text" id="input-1" />
</p>
<p>
  Это поле использует атрибут ID позиций
  <ul class="right-selectable" data-selectable-options="{update: 'input-2'}">
    <li id="one-1">Раз</li>
    <li id="two-2">Два</li>
    <li id="three-3">Три</li>
    <li id="four-4">Четыре</li>
  </ul>
  
  <input type="text" id="input-2" />
</p>
<p>
  Это поле автоматически выделяет цифры из ID атрибутов
  <ul class="right-selectable" data-selectable-options="{update: 'input-3', parseIds: true}">
    <li id="one-1">Раз</li>
    <li id="two-2">Два</li>
    <li id="three-3">Три</li>
    <li id="four-4">Четыре</li>
  </ul>
  
  <input type="text" id="input-3" />
</p>
<p>
  С единичным выбором и атрибутами ID
  <ul class="right-selectable" data-selectable-options="{update: 'input-4', multiple: false}">
    <li id="one-1">Раз</li>
    <li id="two-2">Два</li>
    <li id="three-3">Три</li>
    <li id="four-4">Четыре</li>
  </ul>
  
  <input type="text" id="input-4" />
</p>

## Программно сгенерированные, :generated

<div id="generated-selects"> </div>
<script type="text/javascript">
// <![CDATA[
  var keys = {
    'option-1': 'Раз',
    'option-2': 'Два',
    'option-3': 'Три',
    'option-4': 'Четыре'
  };
  
  new Selectable({
    options: Object.values(keys),
    selected: 2,
    multiple: false
  }).insertTo($E('p').insertTo('generated-selects'));
  
  new Selectable({
    options: keys,
    selected: [0,2],
    multiple: true
  }).insertTo($E('p').insertTo('generated-selects'));
  
  new Selectable({
    options: keys,
    selected: [0,2]
  }).setValue([1,3])
    .insertTo($E('p').insertTo('generated-selects'));
// ]]>
</script>

<div style="height: 10em"> </div>