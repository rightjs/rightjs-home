/**
 * The main menu visual effect
 *
 * Copyright (C) 2010-2011 Nikolay Nemshilov
 */
function move_zing() {
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
    }, {transition: 'Log', engine: 'javascript'});
  }
}

function roll_back() {
  var current = $$("#main-menu li.current a")[0];
  if (current && !move_zing._timer) {
    move_zing._timer = move_zing.bind(current).delay(800);
  }
}

"#main-menu li a".on({mouseover: move_zing, mouseout: roll_back});
$(window).on({blur: roll_back, resize: roll_back});


/**
 * The aggregation menu fx
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
"#social li a".on({
  mouseenter: function() {
    (this.icon || (this.icon = $E('i')
      .insertTo(this.addClass('fancy-icon'), 'top')
    )).morph({opacity: 0});
  },
  mouseleave: function() {
    if (this.icon) {
      this.icon.morph({opacity: 1});
    }
  }
});


/**
 * The code-blocks resize fx
 *
 * Copyright (C) 2010 Nikolay Nemshilov
 */
var current_block;
function unroll_code(block) {
  block._timer = null;

  var element = block._;

  // checking if it's scrollable
  element.scrollLeft = 1;
  if (element.scrollLeft == 1 && !current_block) {
    current_block = block;
    element.scrollLeft = 0;

    var size = block.size();

    block._offset = ((block.getStyle('paddingLeft')||'0').toFloat() + (block.getStyle('borderLeftWidth')||'0').toFloat()) * 2;

    if (!block._clone) {
      block._clone = block.clone();
    }

    block._clone.insertTo(block, 'after');

    block
      .setStyle({ position: 'absolute' })
      .resize(size)
      .morph({width: size.x + $('sidebar').size().x - block._offset + 'px'});
  }
}

function rollback_code_block() {
  if (current_block) {
    current_block.morph({
      width: current_block._clone.size().x - current_block._offset + 'px'
    }, {
      onFinish: function() {
        current_block._clone.remove();
        current_block.setStyle({position: 'static', width: 'auto'});
        current_block = null;
      }
    });
  }
}

"code".on({
  mouseenter: function() {
    this._timer = unroll_code.curry(this).delay(100);
  },

  mouseleave: function() {
    if (this._timer) {
      this._timer.cancel();
    } else {
      rollback_code_block();
    }
  }
});

$(window).onBlur(rollback_code_block);
