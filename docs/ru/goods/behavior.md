# Модуль поведений

Данный модуль позволяет создавать описания поведения элементов по css-правилам, что активно
используется в практике "ненавязчивого" (unobtrusive) программирования в JavaScript.

<%= anchors_index %>


## Простой пример, :simple

Использование данной библиотеки очень простое. Вы пишете css-правило и назначаете
обработчик событий

    "#todo-list div.item".behave('click', function() {....});

После этого скрипт найдет все подходящие элементы, назначит указанный обработчик события
`'click'` и в дальнейшем будет автоматически следить за изменениями на странице и добавлять
обработчики для всех новых элементов.

Если вы создали поведение во время загрузки страницы, то скрипт просмотрит все элементы еще раз,
когда страница догрузится до конца.


## Возможности RightJS так же доступны, :rightjs

Метод `'behave'` поддерживает все те же типы аргументов что и стандартный метод
наблюдателя {Observer#on}, включая [ссылки по имени](/tutorials/call-by-name),
нестандартные события и т.п. Никаких ограничений

    // хэш событий
    "#todo-list div.item".behave({
      click:     function1,
      mouseover: function2,
      mouseout:  function3
    });

    // или список
    "#todo-list div.item".behave('click', [function1, function2, ..]);

    // или по имени
    "#todo-list div.item".behave('click', 'radioClass', 'selected');


## Отмена поведения, :stopping

В случае если вам необходимо отменить поведение группы, вы можете просто вызвать метод `'stopBehave'`

    "#todo-list div.item".behave('click', function() {});

    "#todo-list div.item".stopBehave();


## Ручное обновление, :manual

В данной реализации библиотеки, скрипт будет следить за контентом поступающим в методы класса {Element},
например {Element#insert}, {Element#update}, и т.п. Но если вы обновили элементы каким либо другим способом,
то для обновления правил вам необходимо вызвать метод `{Behavior.refresh}`

    "#todo-list div.item".behave('click', 'toggleClass', 'selected');

    $('todo-list').innserHTML = "...";

    Behavior.refresh();


## Делегация событий, :delegation

Вы так же можете создавать объекты делегации событий по css-правилам, так что элементы
разных типов будут обрабатываться по разному, в одном и том же слушателе.

    var delegation = Behavior.delegate({
      ".foo": function() { alert('foo'); },
      ".bar": function() { alert('bar'); }
    });

    "div.something".behave('click', delegation);

После этого все элементы `div.something` будут вызывать алерт `'foo'` если они содержат
класс `'foo'` и `'bar'` если они содержат класс `'bar'`.


## Путь крутых какелов, :tough

В случае более сложных разработок, вам возможно потребуется возможность управлять
наборами поведений на более серьезном уровне.

Для этой цели вы можете использовать класс `Behavior`, который имеет следующий интерфейс

Метод   | Описание
--------|---------------------------------------------------------------------
start   | активирует поведение
stop    | деактивирует поведение
active  | проверяет если поведение активно
refresh | просматривает страницу в поисках неинициализированных элементов

Использование простое

    new Behavior("#todo-list div.item", "click", function() {...});
    new Behavior("#todo-list div.item", "click", [func1, func2, func3]);
    new Behavior("#todo-list div.item", "click", "radioClass", "selected");

    var behave = new Behavior("css-rule", {event: function() {}});
    behave.start().stop().start().refresh();
