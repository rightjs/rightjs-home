document.onReady(function() {
  
  // fancy code resize effects
  var roll_code = function() {
    this._timer = null;
    this.scrollLeft = 1;
    if (this.scrollLeft && !this._hovering) {
      this.scrollLeft = 0;
      this._hovering = true;
      
      // block has an offset and a border size
      var offset = ((this.getStyle('paddingLeft')||'0').toFloat() + (this.getStyle('borderLeftWidth')||'0').toFloat()) * 2;
      
      // creating a resizable clone
      var clone = $(this.cloneNode(true))
        .setStyle({
          top:   this.position().y + 'px',
          width: this.offsetWidth - offset + 'px',
          position: 'absolute'
        })
        .insertTo(this, 'before')
        .morph({width: this.offsetWidth + $('sidebar').offsetWidth - offset + 'px'});
      
      
      var rollback = function() {
        clone.morph({width: this.offsetWidth - offset + 'px'}, {
          onFinish: function() {
            clone.remove();
            this._hovering = false;
          }.bind(this)
        });
      }.bind(this);
      
      window.on('blur', function() { rollback(); this.stopObserving('blur', rollback);});
      
      clone.onMouseout(function(event) {
        var dims = this.dimensions();
        if (event.pageX < dims.left || event.pageX > (dims.left + dims.width) ||
            event.pageY < dims.top  || event.pageY > (dims.top + dims.height))
          rollback();
      })
    }
  };
  
  $$('code').each(function(block) {
    block
      .onMouseover(function() { this._timer = roll_code.bind(this).delay(100); })
      .onMouseout(function() { if (this._timer) this._timer.cancel(); })
  });
  
  // the main menu effects
  var head    = $('head');
  var menu    = $('main-menu');
  var links   = menu.select('a');
  var current = menu.first('li.current a');
  
  if (current) {
    var thing   = $E('div').setStyle({
      position:   'absolute',
      bottom:     '-'+head.getStyle('borderBottomWidth'),
      left:       current.position().x + 'px',
      width:      current.offsetWidth + 'px',
      height:     current.getStyle('borderBottomWidth'),
      background: current.getStyle('borderBottomColor')
    }).insertTo('head');
    current.setStyle('border-color:transparent');

    menu.style.zIndex  = 100;
    thing.style.zIndex = 10;

    var move_to = function(link) {
      if (thing._fx) thing._fx.cancel();
      thing._fx = new Fx.Morph(thing, {transition: 'Log'}).start({
        width: link.offsetWidth  + 'px',
        left:  link.position().x + 'px'
      });
    };

    var rollback = move_to.curry(current);

    links.each(function(link) {
      link.onMouseover(function() {
        if (menu._timer) { menu._timer.cancel(); menu._timer = null; }
        move_to(this);
      }).onMouseout(function() {
        menu._timer = rollback.delay(800);
      });
    });

    window.on('blur', rollback);
  }
  
  // aggregation links visual effects
  $$('#social li a').each(function(link) {
    var icon = new Element('i');
    
    link.insert(icon, 'top').addClass('fancy-icon')
      .onMouseover(icon.morph.bind(icon, {opacity: 0}))
      .onMouseout(icon.morph.bind(icon, {opacity: 1}));
  });
});