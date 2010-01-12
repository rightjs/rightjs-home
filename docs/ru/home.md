<% 

@title_text = 'Добро пожаловать домой!'

@promo_texts = {
  
  :friendly => {
    :title    => "Дружелюбен",
    :subtitle => "Простой синтаксис!",
    :text     => %Q{
      <p>
        RightJS нацелен на server-side разработчиков работающих с динамическими языками,
        он не содержит сложных конструкций классов и методов, как многие другие библиотеки
        написанные Java и C++ разработчиками, и больше подходит для быстрой разработки.
      </p>
      <p>
        С одной стороны RightJS имеет очень простой, легко понятный синтаксис, доступный
        даже новичкам. С другой, RightJS поддерживает несколько парадигм разработки,
        имеет расширенные возможности для объектно-ориентированного и функционального 
        программирований, в купе с другими продвинутыми возможностями способными осчастливить
        любого профессионала.
      </p>
    },
    :more     => "быстрый старт"
  },
  
  :compact => {
    :title    => "Компактен",
    :subtitle => "Весит всего 30k!",
    :text     => %Q{
      <p>
        Благодаря своему синтаксису RightJS - очень компактный фреймворк, занимающий
        в стандартной комплектации всего 30КБ (несколько плагинов уже включено). При этом
        он содержит все необходимые элементы, такие как работа с элементами DOM, расширения
        родных классов JavaScript, базовые визуальные эффекты, продвинутые возможности ООП,
        AJAX, дополнительные возможности для работы с формами, управление куками, и т.п.
      </p>
      <p>
        RightJS не просто мал сам по себе, он так же имеет коллекцию компактных и быстрых
        плагинов. Вы можете легко, как добавлять их в ядро, так и отключать не используемые,
        уменьшив размер ядра вплоть до 18КБ.
      </p>
    },
    :more     => "пользовательские сборки"
  },
  
  :fast => {
    :title    => "Быстр",
    :subtitle => "Очень быстр!",
    :text     => %Q{
      <p>
        RightJS подходит к вопросам производительности очень серьезно. Мы делем
        множество тестов, замеров и оптимизаций, заставляя фреймворк работать на каждом
        браузере так быстро, как это только возможно.
      </p>
      <p>
        RightJS использует всю доступную функциональность каждого браузера, и он
        не усложняет людям жизнь, слишком умными и медленными изобретениями. В результате
        этого RightJS бьет по производительности все современные фреймворки практически
        во всех повседневных операциях, и в некоторых случаях приближается по скорости работы
        к чистому DOM коду.
      </p>
    },
    :more     => "страница бенчмарков"
  }
  
}

@hots_block = {
  :title     => "А что на горячее?",
  :ui        => "коллекция элементов пользовательского интерфейса",
  :goods     => "коллекция плагинов общего назначения",
  :showcases => "демо-приложения написанные с помощью RightJS"
}


-%>
<%= partial 'home/page' %>