# Мутирующие методы и цепи

RightJS спроектирован таким образом, что каждый раз когда вы вызываете
метод который изменяет состояние какого-либо объекта, этот метод возвращает
назад ссылку на сам объект. Это позволяет удобно вызывать объект снова и снова,
создавая цепи вызовов.

Например вместо данного кода

    var element = new Element('div');
    element.update('text');
    element.insertTo(document.body);
    element.hightlight();

Вы могли бы написать все в одну строчку

    new Element('div').update('text').insertTo(document.body).highlight();

В целом, существует правило согласного которому, каждый раз когда вы обращаетесь
к какому либо методу в RightJS, вы всегда получаете назад какие-либо данные,
либо ссылку на сам объект, что дает вам возможность создавать удобные
цепочки вызовов и легко понятные предложения из кода.

    var classes = elements.map('className').map('split', ' ').flatten().uniq();
    
    elements.each('enable').each('onClick', 'radioClass', 'marked');
    
    new Xhr('/url').setOptions({..}).send({..}).cancel();
    
    new Fx.Morph('element').start({...}).pause().resume().cancel();

Думаю вы поняли идею.
