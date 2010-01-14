# Лайтбокс

`Lightbox` - это стандартный плагин лайтбокса для RightJS

<%= partial '/ui/head', :locals => {:name => 'lightbox'} %>

<%= anchors_index %>

## Список возможностей, :features

Данный плагин обладает следующими возможностями

* Может показывать любой HTML контент
* Поддерживает загрузку контента через {Xhr}
* Работает с коллекциями/галлереями
* Автоматическая инициализация по атрибуту `rel="lightbox"`
* Все упаковано в один маленький (8.5k) файл
* Не имеет зависимостей от других файлов css или картинок
* Поддержка интернационализации


## Базовое использование, :usage

Наш лайтбокс не требует, никаких дополнительных телодвижений. Просто подключите его файл.

    <script src="/javascripts/right-lightbox.js"></script>


## API интерфейс, :api

Класс `Lightbox` имеет следующий простой интерфейс

Метод                                | Описание
-------------------------------------|---------------------------------------------------
show(mixed content\[, Object size\]) | показывает данный контент
load(String url\[, Object options\]) | загружает контент через {Xhr} запрос
hide()                               | закрывает лайтбокс

Вы можете использовать данные методы, как на уровне класса

    Lightbox.show('some content');
    Lightbox.load('/some/address');
    Lightbox.hide();

Так и на уровне объектов

    var box = new Lightbox();
    box.show('some content');
    box.load('/some/url');
    box.hide();


## Автоматическая инициализация ссылок, :links

Вы посылать элементы ссылок в метод `show`, скрипт автоматически считает из
них адрес и заголовок, распознает если это ссылка на картинку и покажет соответствующий лайтбокс.

    // <a href="/some/url" title="Some Content" id="the-link">click me</a>

    Lightbox.show($('the-link'));

Но вам не нужно делать даже и этого. Данный скрипт поддерживает автоматическую
инициализацию ссылок, подобно проекту [Lightbox 2](http://www.huddletogether.com/projects/lightbox2).
Все что от вас требуется это установить на ссылках атрибут `rel="lightbox"` и скрипт
автоматически найдет эти ссылки и назначит событие `click` для показа их контента
в лайтбоксе.

Можно так же помечать последовательности/коллекции ссылок с помощью атрибута
`rel="lightbox[roadtrip]"` 

Вы можете обновить списки ссылок, после обновления станицы, вызвав метод `Lightbox.rescan()`.


## Список опций, :options

Вы можете использовать следующие опции с виджетом лайтбокса

Имя             | Умолчание  | Описание
----------------|------------|----------------------------------------------------------------------------------
endOpacity      | 0.8        | конечная прозрачность блокирующего элемента
fxDuration      | 200        | длительность визуальных эффектов
hideOnEsc       | true       | флаг, если нужно закрывать лайтбокс по кнопке Esc
hideOnOutClick  | true       | флаг, если лайтбокс должен закрываться по клику вне бокса
showCloseButton | true       | флаг, если кнопка закрытия должна быть видна
blockContent    | false      | если `true` то контент будет заблокирован прозрачным DIV элементом
relName         | 'lightbox' | ключ для функции авто-инициализации
checkTags       | '\*'       | какие элементы должны быть проверены (ускоряет поиск)

Вы можете указать любые из них с конструктором, или изменить глобально в переменной `Lightbox.Options`

    var hard_box = new Lightbox({
      hideOnEsc:       false,
      hideOnOutClick:  false,
      showCloseButton: false
    });
    hard_box.setTitle('Fill It Up');
    hard_box.show('some required form');


## Интернационализация, :i18n

Вы можете найти модуль интернационализации для необходимого вам языка на сервере github

<http://github.com/rightjs/rightjs-ui/tree/master/i18n/>

Или перевести все надписи вручную изменив переменную `Ligthbox.i18n`

    Lightbox.i18n = {
      CloseTitle: 'Закрыть',
      PrevTitle:  'Предыдущая',
      NextTitle:  'Следующая'
    };


## Настройки стилей, :styles

Если вам потребуется изменить настройки стилей, используйте следующее описание
структуры элементов как руководство.

    <div class="lightbox">
      <div class="lightbox-locker"></div>
      
      <div class="lightbox-dialog">
        <div class="lightbox-caption"></div>
        
        <div class="lightbox-body-wrap">
          <div class="lightbox-body">
            <div class="lightbox-body-content"></div>
            
            <div class="lightbox-body-lock">
              <div class="lightbox-body-lock-spinner">
                <div></div><div></div><div></div>
                <div class="glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="lightbox-close-button"></div>
        <div class="lightbox-prev-link"></div>
        <div class="lightbox-next-link"></div>
      </div>
    </div>
