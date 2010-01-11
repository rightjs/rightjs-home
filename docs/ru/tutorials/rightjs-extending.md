# Пособие по расширению RightJS

В случае если вы пожелаете написать некое расширение для RightJS, 
например плагин или просто небольшую библиотеку организующую рутинные операции
в вашем приложении, публикуем небольшое пособие по данному вопросу.

В рамках расширения функциональности RightJS следует иметь ввиду следующие три
типа классов

* [Родные классы JavaScript](#natives)
* [Собственные классы RightJS](#rightjs)
* [Классы уровня DOM](#dom)

Мы пройдемся по ним один за одним и в конце я добавлю несколько слов по поводу перегрузки методов


## Расширение родных классов JavaScript, :natives

Когда мы говорим о расширении родных классов JavaScript, таких как {String}, {Array}, {Function} и т.д.
мы имеем ввиду расширение прототипов этих классов. В этом смысле расширение родных юнитов,
дело совершенно простое. Просто используйте функцию `$ext` на объекте прототипа нужного класса.

    $ext(Array.prototype, {
      myMethod1: function() { return 1; },
      myMethod2: function() { return 2; }
    });
    
    [1,2,3,4].myMethod1(); // -> 1
    [1,2,3,4].myMethod2(); // -> 2
    
    
    $ext(String.prototype, {
      hasBoo: function() {
        return this.includes('boo');
      }
    });
    
    "moo".hasBoo(); // -> false
    "boo".hasBoo(); // -> true


## Расширение собственных классов RightJS, :rightjs

RightJS имеет несколько собственных классов, например {Xhr}, {Fx}, {Cookie}. Все они основаны
на использовании общего движка классов {Class}, и как следствие могут быть легко расширены
с использованием методов `include()` и `extend()`.

RightJS использует язык Ruby в качестве модели, поэтому методы расширения имеют точно тот же смысл.
Метод `include` расширяет уровень объекта, а метод `extend` соответственно уровень самого класса.

    Xhr.include({
      myMethod: function() {}
    });
    
    new Xhr('/some/url').myMethod();
    
    Xhr.extend({
      MY_CONSTANT: 1
    })
    
    if (Xhr.MY_CONSTANT) {
      new Xhr('/some/url');
    }

Если вы не имеете никакого опыта с Ruby и не чувствуете себя в своей тарелке, можете так же
использовать тот же подход что и в случае собственных классов JavaScript.

    $ext(Xhr, {...});           // тоже что и Xhr.extend
    $ext(Xhr.prototype, {...}); // тоже что и Xhr.include



## Расширение классов уровня DOM, :dom

Как мы все хорошо знаем, в природе существует более чем одна реализация объектной модели документа и
в этом свете расширение классов уровня DOM может быть довольно хитрой задачей. В связи с чем
в RightJS существует метод {Element.include}, который организует все процессы за единым интерфейсом.

    Element.include({
      myMethod1: function() {},
      myMehtod2: function() {}
    });
    
    $('my-element').myMethod1();
    $$('*').each('myMethod2');

После того как вы вызовите данный метод, он зарегистрирует все ваши расширения и после этого
он станет доступен со всеми элементами на странице.

Так же существует еще несколько подобных методов для других элементов страниц

* {Form.include} - расширяет только элементы FORM
* {Form.Element.include} - расширяет только элементы ввода INPUT, SELECT and TEXTAREA
* {Event.include} - расширяет объекты событий

Все эти методы будут регистрировать ваши расширения в системе, так что они будут работать
точно так же как и любые другие методы RightJS.


## Перегрузка методов, :overloading

Иногда вам может понадобиться не просто добавить некий дополнительный метод, а
перегрузить уже существующий. Приводим несколько примеров, как это может быть сделано

Идея проста. Вы создаете временную функцию которая возвращает хэш для расширения
и тут же ее вызываете. Примерно вот так.

    $ext(SomeClass.prototype, (function(class_prototype) {
      var old_method = class_prototype.someMethod;
  
      return {
        someMethod: function() {
          var result = old_method.apply(this, arguments);
    
          // do something more
    
          return result;
        }
      };
    })(SomeClass.prototype));

Это делается для того, чтобы создать новое пространство имен, где можно было бы безопасно
отделить старый метод и создать новый, способный вызывать старый.

Примера ради, скажем вы захотите чтобы все объекты типа {Xhr} делали некий хитрый вызов перед
тем как они получают запрос на отправку

    Xhr.include(function(xhr_prototype) {
      var old_send = xhr_prototype.send;
  
      return {
        send: function() {
          this.fancyStuff();
      
          return old_send.apply(this, arguments);
        },
    
        // дополнительный хитрый метод
        fancyStuff: function() {
        }
      };
    
    })(Xhr.prototype));

В случае работы с классами уровня DOM, все дополнительные методы хранятся в переменных 
с именем `Methods`, например `Element.Methods`, `Form.Methods`, `Event.Methods`. Вы можете
использовать их вместо прототипов классов при перегрузке методов

Например этот код перегрузит метод {Element#insert} и будет уведомлять внешнюю функцию
об изменениях на странице.

    var call_mommy = function(element) {...};
    
    Element.include((function(old_methods) {
      var old_insert = old_methods.insert;
  
      return {
        insert: function() {
          var result = old_insert.apply(this, arguments);
      
          call_mommy(this);
      
          return result;
        }
      };
    })(Element.Methods));

