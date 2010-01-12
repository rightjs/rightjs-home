# Плагины общего назначения

RightJS Goods - это подпроект RightJS, содержащий коллекцию официально поддерживаемых
плагинов и расширений общего назначения для RightJS

Весь исходный код данного проекта доступен в открытом доступе под MIT лицензией на
сервере github

<http://github.com/rightjs/rightjs-goods>

`git clone git://github.com/rightjs/rightjs-goods.git`

Вы можете использовать каждый из модулей подключая их самостоятельными файломи на своих
страницах, а так же вы можете встроить любой из них непосредственно в ядро на странице
[пользовательских сборок](<%= builds_path %>)

<%
@module_descriptions = {
  
  :rails    => "Предоставляет стандартный интерфейс для наиболее общепринятых ajax операций, плюс "+
               "добавляет псевдонимы в стиле с подчеркиваниями и псевдонимы в стиле Ruby для всех методов из ядра RightJS",
                
  :dnd      => "Стандартная библиотека drag-n-drop для RightJS",
  
  :effects  => "По умолчанию RightJS включает в себя движок и несколько базовых эффектов. Данный модуль содержит "+
                "коллекцию дополнительных визуальных эффектов.",
                
  :json     => "Данный модуль предоставляет поддержку стандарта JSON. Дополнительно, он создает "+
               "более жесткую проверку JSON данных для {Xhr}, а так же добавляет возможность прозрачно "+
               "сохранять массивы и объекты в кукисах через интерфейс {Cookie}",
               
  :events   => "Этот модуль предоставляет дополнительные возможности по работе с событиями DOM. Например методы "+
               "для определения нажатой кнопки мыши или клавиатуры, а так же этот модуль позволяет запускать "+
               "реальные DOM события на элементах страницы",
               
  :behavior => "Данный модуль предоставляет функциональность для \"ненавязчивого\" (unobtrusive) программирования "+
               "поведения элементов страницы, схожую с методом \"live\" в jQuery и плагином \"lowpro\" в Prototype"

}
-%>

<%= partial 'unit', :collection => goods_list %>