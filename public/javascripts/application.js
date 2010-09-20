/**
 * The main menu visual effect
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var move_zing = function() {
  var zing    = $('zing');
  var main    = $('main-menu');
  var current = $$("#main-menu li.current a")[0];

  if (current) {
    if (zing.getStyle('width').toInt() == 0) {
      current.setStyle('border-color: transparent');
      zing.setStyle({
        width: current.size().x + 'px',
        left:  current.position().x - main.position().x + 'px'
      });
    }

    if (move_zing._timer) {
      move_zing._timer.cancel();
      move_zing._timer = null;
    }

    zing.stop().morph({
      width: this.size().x + 'px',
      left:  this.position().x - main.position().x + 'px'
    }, {transition: 'Log'});
  }
};

var roll_back = function() {
  var current = $$("#main-menu li.current a")[0];
  if (current && !move_zing._timer) {
    move_zing._timer = move_zing.bind(current).delay(800);
  }
};

"#main-menu li a".on({mouseover: move_zing, mouseout: roll_back});
$(window).on({blur: roll_back, resize: roll_back});


/**
 * The aggregation menu fx
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
"#social li a".onMouseover(function() {
  (this.icon || (
    this.icon = $E('i')
      .insertTo(this.addClass('fancy-icon'), 'top')
      .onMouseover('morph', {opacity: 0})
      .onMouseout('morph', {opacity: 1})
  )).fire('mouseover');
});


/**
 * The code-blocks resize fx
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */


/*
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

});
*/