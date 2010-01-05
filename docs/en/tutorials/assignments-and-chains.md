# Assignments And Chains

RightJS designed in a such way, that anytime you change an object by method
this method will return a reference to the object it belongs to. Simply saying
whenever you change an object as the result you have the same object again and
free to call its other methods.

For example instead of this code

    var element = new Element('div');
    element.update('text');
    element.insertTo(document.body);
    element.hightlight();

You could write everything in a single line.

    new Element('div').update('text').insertTo(document.body).highlight();

Generally, anytime you do something with objects in RightJS, change or get,
you end up with some data, there are almost no methods that return
`void`, and this gives you an opportunity to queue just anything
you want.

    var classes = elements.map('className').map('split', ' ').flatten().uniq();
    
    elements.each('enable').each('onClick', 'radioClass', 'marked');
    
    new Xhr('/url').setOptions({..}).send({..}).cancel();
    
    new Fx.Morph('element').start({...}).pause().resume().cancel();

Think you've got the idea.
