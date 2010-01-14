# Демо рейтинга
<% content_for :modules, javascript_include_tag('/builds/ui/right-rater-min.js') %>

Несколько простых примеров использования виджета [рейтинг](/ui/rater) из библиотеки [RightJS UI](/ui).

## Простые рейтинги, :simple

<p>
  <div class="right-rater">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:1}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:2}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:3}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:4}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>
<p>
  <div class="right-rater" data-rater-options="{value:5}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
</p>

## Блокируемые рейтинги, :disabled

<p>
  <div class="right-rater" data-rater-options="{value:2, disabled:true}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  этот рейтинг заблокирован
</p>
<p>
  <div class="right-rater" data-rater-options="{value:2, disableOnVote:true}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  этот рейтинг заблокируется как только вы выберете значение
</p>

## Назначенный рейтинг, :assigned

<p>
  <div class="right-rater" data-rater-options="{value:2, update:'the-field'}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  <input type="text" id="the-field" size="1" />
</p>

## Удаленный рейтинг, :remote

<p>
  <div class="right-rater" data-rater-options="{value:1, url:'test', Xhr:{evalScripts:true,spinner:'rate-spinner'}}">
    <div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div><div>&#9733;</div>
  </div>
  
  <%= image_tag 'spinner.gif', :id => 'rate-spinner', :style => "display:none" %>
  <span id="remote-rater-output"> </span>
</p>

## Программно сгенерированные рейтинги, :generated

<div id="auto-generated"> </div>
<script type="text/javascript">
// <![CDATA[
  6..times(function(i) {
    new Rater({
      halfs: true, value: i
    }).insertTo($E('p').insertTo('auto-generated'));
  });
// ]]>
</script>

<div style="height: 10em"> </div>