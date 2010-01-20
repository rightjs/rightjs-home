# Лайтбокс демо
<% content_for :modules, javascript_include_tag('/builds/ui/right-lightbox-min.js') %>

Несколько общих примеров использования виджета [Lightbox](/ui/lightbox)

## Показ отдельных картинок, :standalone

Подобно проекту [Lightbox 2](http://www.huddletogether.com/projects/lightbox2) вы
можете показывать картинки в лайтбоксе, просто указав атрибут `rel="lightbox"` на ссылках.

    <a href="1.jpg" rel="lightbox"><img src="1-thmb.jpg"></a>
    <a href="2.jpg" rel="lightbox" title="Some title"><img src="2-thmb.jpg"></a>

<p>
  <a href="/images/test/1.jpg" rel="lightbox" title="Watson's Bay"><img src="/images/test/1-thmb.jpg" /></a>
  <a href="/images/test/2.jpg" rel="lightbox"><img src="/images/test/2-thmb.jpg" /></a>
  <a href="/images/test/3.jpg" rel="lightbox" title="Caravaggio"><img src="/images/test/3-thmb.jpg" /></a>
</p>

## Показ галлереи картинок, :roadtrip

Если вы хотите чтобы лайтбокс показывал ваши картинки как одну галлерею, то вам
необходимо указать на ссылках атрибут `rel="lightbox[roadtrip]"`.

    <a href="1.jpg" rel="lightbox[roadtrip]"><img src="1-thmb.jpg"></a>
    <a href="2.jpg" rel="lightbox[roadtrip]"><img src="2-thmb.jpg"></a>

<p>
  <a href="/images/test/4.jpg" rel="lightbox[roadtrip]" title="Darling Harbour"><img src="/images/test/4-thmb.jpg" /></a>
  <a href="/images/test/5.jpg" rel="lightbox[roadtrip]" title="Coogie"><img src="/images/test/5-thmb.jpg" /></a>
  <a href="/images/test/6.jpg" rel="lightbox[roadtrip]" title="Rain In St.Petersburg"><img src="/images/test/6-thmb.jpg" /></a>
</p>

Вы так же можете использовать кнопки клавиатуры и колесо прокрутки мыши, для того чтобы
листать картинки


## Ссылки на видео-ресурсы, :video

Лайтбокс так же понимает ссылки на основные ресурсы потокового видео. Формат точно такой же

    <a href="youtube/bla/bla/bla" rel="lightbox">Смешное видео</a>

<p>
  <a href="http://www.youtube.com/watch?v=VAfnbIrQTSk" rel="lightbox">Пример с Youtube</a> |
  <a href="http://video.google.com/videoplay?docid=99174057823861673" rel="lightbox">Пример с Google video</a> |
  <a href="http://vimeo.com/5727117" rel="lightbox">Пример с Vimeo</a>
</p>


## Показ HTML контента, :html

Для показа любого контента (строки, элементы страниц и их массивы). Просто пошлите их в метод `show`

    Lightbox.show($('lorem-block').innerHTML, {width: '20em'});

<p>
  <a href="" onclick="Lightbox.show($('lorem-block').innerHTML,{width:'20em'}); return false;">Кликни меня чтобы показать нижеследующий текст в лайтбоксе</a>
</p>
<p id="lorem-block">
  Lorem ipsum dolor <u>sit</u> amet, consectetur adipisicing elit, <b>sed</b> do eiusmod tempor incididunt ut labore et dolore <i>magna</i> aliqua. Ut enim ad minim veniam, quis nostrud <u>exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo <b>consequat</b>. Duis aute irure dolor in <i>reprehenderit</i> in voluptate velit esse cillum <u>dolore</u> eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non <b>proident</b>, sunt in culpa qui <i>officia</i> deserunt mollit anim id est laborum.
</p>

## Загрузка контента через Ajax, :ajax

Для того чтобы загрузить контент через {Xhr} запрос, просто укажите адрес методу `load`.
Вы так же можете указать опции для класса {Xhr} вторым атрибутом.

    Lightbox.load('/ui/lightbox/lorem');

<p>
  <a href="" onclick="Lightbox.load('/ui/lightbox/lorem'); return false;">Попробуйте сами</a>
</p>

## Автоматическая обработка ссылок, :autolinks

Вы так же можете просто послать элемент ссылки в метод `show`, он автоматически считает ее адрес
загрузит контент через {Xhr} запрос и покажет его в лайтбоксе.

    Lightbox.show($('some-link'));

<p>
  <a href="/ui/lightbox/lorem" title="Loaded By Link" onclick="Lightbox.show(this); return false;">Попробуйте сами</a>
</p>
