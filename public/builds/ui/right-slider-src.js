/**
 * RightJS UI Slider unit (http://rightjs.org/ui/slider)
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
if (!self.RightJS || !self.Draggable) throw "Gimme RightJS w/ DnD";

/**
 * RightJS UI Slider unit
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
var Slider = new Class(Observer, {
  extend: {
    EVENTS: $w('change'),
    
    Options: {
      min:       0,     // the min value
      max:       100,   // the max value
      snap:      0,     // the values threshold
      value:     null,  // start value, if null then the min value will be used
      direction: 'x',   // slider direction 'x', 'y'
      update:    null,  // reference to an element to update
      round:     0      // the number of symbols after the decimal pointer
    },
    
    rescan: function() {
      $$('div.right-slider').each(function(element) {
        if (!element._slider) {
          new Slider(element);
        }
      });
    }
  },
  
  /**
   * basic constructor
   * USAGE:
   *   new Slider('element-id'[, {options}]);
   *   new Slider({options});
   *
   * @param mixed slider element reference or options
   * @param Object options
   */
  initialize: function() {
    var args = $A(arguments);
    this.element = (args[0] && !isHash(args[0])) ? $(args.shift()) : this.build();
    
    this.$super(isHash(args[0]) ? args[0] : eval('('+this.element.get('data-slider-options')+')'));
    
    if (this.options.update) this.assignTo(this.options.update);
    
    this.element._slider = this.init();
  },
  
  // basic desctructor
  destroy: function() {
    this.handle.undoDraggable();
    delete(this.element._slider);
    return this;
  },
  
  /**
   * The value setter
   *
   * NOTE: will get snapped according to the options
   *
   * @param mixed string or number value
   * @return Slider this
   */
  setValue: function(value) {
    var value = isString(value) ? value.toFloat() : value;
    
    // rounding the value according to the options
    var base = Math.pow(10, this.options.round);
    value = (value * base).round() / base;
    
    // checking the value constraings
    if (this.options.snap) value = value - value % this.options.snap;
    if (value < this.options.min) value = this.options.min;
    if (value > this.options.max) value = this.options.max;
    
    this.moveTo(value);
    
    if (value !== this.value) {
      this.fire('change', this.value = value);
    }
    
    return this;
  },
  
  /**
   * Returns the value
   *
   * @return Float number
   */
  getValue: function() {
    return this.value;
  },
  
  /**
   * Sets the minimal value and rebuilds the dimensions cache
   *
   * @param Number optional value to reset
   * @return Slider this
   */
  reset: function(value) {
    return this.precalc().setValue([value, this.options.value, this.options.min].compact()[0]);
  },
  
  /**
   * Inserts the widget into the element
   *
   * @param mixed element reference
   * @param String optional position
   * @return Slider this
   */
  insertTo: function(element, position) {
    this.element.insertTo(element, position);
    return this.reset(this.value);
  },
  
  /**
   * Assigns the slider to feed an input element on change
   *
   * @param mixed an input element reference
   * @return Slider this
   */
  assignTo: function(element) {
    var element = $(element);
    var assign  = function(value) {
      element[element.setValue ? 'setValue' : 'update'](''+value);
    };
    assign(this.value);
    
    if (element.setValue) {
      element.onChange(function() {
        this.setValue(element.value);
      }.bind(this));
    }
    return this.onChange(assign);
  },
  
// protected
  
  // inits the slider handle and resets the whole thing
  init: function() {
    this.handle = this.element.first('div.right-slider-handle')
      .makeDraggable({
        onBefore: this.prepare.bind(this),
        onDrag: this.dragged.bind(this)
      });
      
    if (this.options.direction == 'y') {
      this.element.addClass('right-slider-vertical');
    } else {
      this.options.direction = this.element.hasClass('right-slider-vertical') ? 'y' : 'x';
    }
    
    // fixing the manual position calculations for Konqueror
    if (this.konqFix = (RightJS.version < '1.5.0' && !this.handle.getBoundingClientRect)) {
      var parent = this.element;
      var old_dims = this.handle.dimensions;
      this.handle.dimensions = function() {
        var dims = old_dims.call(this);
        var subset = parent.dimensions();
        
        dims.top  += subset.top;
        dims.left += subset.left;
        
        return dims;
      };
    }
    
      
    return this.reset();
  },
  
  // builds the slider prorgrammatically
  build: function() {
    return $E('div', {'class': 'right-slider'}).insert($E('div', {'class': 'right-slider-handle'}));
  },
  
  // callback for the element dragg
  dragged: function(draggable, event) {
    var position = draggable.element.style[this.horizontal ? 'left' : 'top'].toFloat();
    if (!this.horizontal) position = this.space - position;
    var value    = position / this.space * (this.options.max - this.options.min) + this.options.min;
    
    this.setValue(value);
  },
  
  // callback for the draggable before event
  prepare: function(draggable) {
    // moving the slider to the beginning position
    this.precalc().moveTo(this.value);
    
    var offset    = this.offset;
    var element   = this.dimensions;
    var options   = draggable.options;
    options.range = {};
    
    // calculating the ranges
    if ((options.axis = this.options.direction) == 'x') {
      options.range.x = [element.left + offset, element.left + element.width - offset];
      if (this.konqFix) options.range.x[0] -= element.left;
    } else {
      options.range.y = [element.top + offset, element.top  + element.height - offset];
      if (this.konqFix) options.range.y[0] -= element.top;
    }
    
    // calculating the snapping range
    if (this.options.snap) {
      options.snap = this.space / (this.options.max - this.options.min) * this.options.snap;
    }
  },
  
  // moves the slider to the given position
  moveTo: function(value) {
    var position = this.space / (this.options.max - this.options.min) * (value - this.options.min);
    
    if (!this.horizontal) position = this.space - position;
    
    this.handle.style[this.horizontal ? 'left' : 'top'] = position + 'px';
    
    return this;
  },
  
  // precalculates dimensions, direction and offset for further use
  precalc: function() {
    var handle      = this.handle.setStyle({left:'0', top:'0'}).dimensions();
    
    this.dimensions = this.element.dimensions();
    this.horizontal = this.options.direction == 'x';
    this.offset     = this.horizontal ? handle.left - this.dimensions.left : handle.top - this.dimensions.top;
    this.space      = (this.horizontal ? this.dimensions.width - handle.width : this.dimensions.height - handle.height) - this.offset * 2;
    
    return this;
  }
});

/**
 * Document onReady hook for sliders
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
document.onReady(Slider.rescan);

document.write("<style type=\"text/css\">div.right-slider,div.right-slider-handle{margin:0;padding:0;border:none;background:none}div.right-slider{height:0.4em;width:20em;border:1px solid #CCC;background:#EEE;-moz-border-radius:.2em;-webkit-border-radius:.2em;position:relative;margin:.6em 0}div.right-slider-handle{position:absolute;left:0;top:0;cursor:pointer;width:4pt;height:1em;margin-top:-0.4em;margin-left:0.1em;background:#CCC;border:1px solid #AAA;-moz-border-radius:.2em;-webkit-border-radius:.2em}div.right-slider-vertical{height:10em;width:0.4em;margin:0 .3em}div.right-slider-vertical div.right-slider-handle{margin:0;margin-left:-0.4em;margin-top:0.1em;height:4pt;width:1em}</style>");