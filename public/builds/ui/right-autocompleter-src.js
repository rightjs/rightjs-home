/**
 * The autocompletion feature implemented with RightJS
 *
 * Home page: http://rightjs.org/ui/autocompleter
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
if (!RightJS) { throw "Gimme RightJS. Please." };

/**
 * The RightJS UI Autocompleter unit base class
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
var Autocompleter = new Class(Observer, {
  extend: {
    EVENTS: $w('show hide update load select done'),
    
    Options: {
      url:        document.location.href,
      param:      'search',
      method:     'get',
      
      minLength:  1,         // the minimal length when it starts work
      threshold:  200,       // the typing pause threshold
      
      cache:      true,      // the use the results cache
      local:      null,      // an optional local search results list
      
      fxName:     'slide',
      fxDuration: 'short',
      
      spinner:    'native',
      
      relName:    'autocompleter'
    }
  },
  
  /**
   * basic constructor
   *
   * @param mixed the input element reference, a string id or the element instance
   * @param Object options
   */
  initialize: function(input, options) {
    this.$super(options);
    
    this.input     = $(input).onKeyup(this.watch.bind(this)).onBlur(this.hide.bind(this));
    this.container = $E('div', {'class': 'autocompleter'}).insertTo(this.input, 'after');
    
    this.checkSpinner();
  },
  
  // catching up with some additonal options
  setOptions: function(options) {
    this.$super(options);
    
    // building the correct url template with a placeholder
    if (!this.options.url.includes('%{search}')) {
      this.options.url = (this.options.url.includes('?') ? '&' : '?') + this.options.param + '=%{search}';
    }
  },
  
  // handles the list appearance
  show: function() {
    if (this.container.hidden()) {
      var dims = this.input.dimensions();
      
      this.container.setStyle({
        top: (dims.top + dims.height) + 'px',
        left: dims.left + 'px',
        width: dims.width + 'px'
      }).show(this.options.fxName, {
        duration: this.options.fxDuration,
        onFinish: this.fire.bind(this, 'show')
      });
    }
    
    return Autocompleter.current = this;
  },
  
  // handles the list hidding
  hide: function() {
    if (this.container.visible()) {
      this.container.hide();
      this.fire.bind(this, 'hide');
    }
    
    Autocompleter.current = null;
    
    return this;
  },
  
  // selects the next item on the list
  prev: function() {
    return this.select('prev', this.container.select('li').last());
  },
  
  // selects the next item on the list
  next: function() {
    return this.select('next', this.container.first('li'));
  },
  
  // marks it done
  done: function(current) {
    var current = current || this.container.first('li.current');
    if (current) {
      this.input.value = current.innerHTML.stripTags();
    }
    
    return this.fire('done').hide();
  },
  
// protected

  // works with the 'prev' and 'next' methods
  select: function(what, fallback) {
    var current = this.container.first('li.current');
    if (current) {
      current = current[what]('li') || current;
    }
    
    return this.fire('select', (current || fallback).radioClass('current'));
  },

  // receives the keyboard events out of the input element
  watch: function(event) {
    // skip the overlaping key codes that are already watched in the hooker.js
    if ([27,37,38,39,40,13].include(event.keyCode)) return;
    
    if (this.input.value.length >= this.options.minLength) {
      if (this.timeout) {
        this.timeout.cancel();
      }
      this.timeout = this.trigger.bind(this).delay(this.options.threshold);
    } else {
      return this.hide();
    }
  },
  
  // triggers the actual action
  trigger: function() {
    this.timeout = null;
    
    this.cache = this.cache || {};
    var search = this.input.value;
    
    if (search.length < this.options.minLength) return this.hide();
    
    if (this.cache[search]) {
      this.suggest(this.cache[search], search);
    } else if (this.options.local) {
      this.suggest(this.findLocal(search), search);
    } else {
      this.request = Xhr.load(this.options.url.replace('%{search}', encodeURIComponent(search)), {
        method:  this.options.method,
        spinner: this.options.spinner,
        onComplete: function(response) {
          this.fire('load').suggest(response.responseText, search);
        }.bind(this)
      });
    }
  },
  
  // updates the suggestions list
  suggest: function(result, search) {
    this.container.update(result).select('li').each(function(li) {
      // we reassiging the events each time so the were no doublecalls
      li.onmouseover = function() { li.radioClass('current'); };
      li.onmousedown = function() { this.done(li); }.bind(this);
    }, this);
    
    // saving the result in cache
    if (this.options.cache) {
      this.cache[search] = result;
    }
    
    return this.fire('update').show();
  },
  
  // performs the locals search
  findLocal: function(search) {
    var regexp = new RegExp("("+RegExp.escape(search)+")", 'ig');
    return $E('ul').insert(
      this.options.local.map(function(option) {
        if (regexp.test(option)) {
          return $E('li', {html:
            option.replace(regexp, '<strong>$1</strong>')
          });
        }
      }).compact()
    );
  },
  
  // builds a native textual spinner if necessary
  checkSpinner: function() {
    if (this.options.spinner == 'native') {
      var dims = this.input.dimensions();
      
      this.options.spinner = $E('div', {
        'class': 'autocompleter-spinner'
      }).setStyle({
        top: (dims.top + 1) + 'px',
        height: (dims.height - 2) + 'px',
        lineHeight: (dims.height - 2) + 'px',
        left: (dims.left + dims.width - 19) + 'px'
      }).insertTo(this.input, 'after');
      
      var dots = '123'.split('').map(function(i) {
        return $E('div', {'class': 'dot-'+i, html: '&raquo;'});
      });
      
      (function() {
        var dot = dots.shift();
        dots.push(dot);
        this.options.spinner.update(dot);
      }.bind(this)).periodical(400);
    }
  }
});

/**
 * The document events hooking
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
document.onReady(function() {
  $$('input[rel^="autocompleter"]').each(function(input) {
    var match = input.get('rel').match(/^[a-z]+\[(.*?)\]$/);
    if (match) {
      var url = match[1], options = {};
      
      // if looks like a list of local options
      if (url.match(/^['"].*?['"]$/)) {
        options.local = eval('['+url+']');
      } else if (!url.blank()) {
        options.url = url;
      }
      
      input.autocompleter = new Autocompleter(input, options);
    }
  });
}).onKeydown(function(event) {
  // the autocompletion list navigation
  if (Autocompleter.current) {
    var name;
    
    switch (event.keyCode) {
       case 27: name = 'hide'; break;
       case 37: name = 'prev'; break;
       case 39: name = 'next'; break;
       case 38: name = 'prev'; break;
       case 40: name = 'next'; break;
       case 13: name = 'done'; break;
    }
    
    if (name) {
      Autocompleter.current[name]();
      event.stop();
    }
  }
});

document.write("<style type=\"text/css\">div.autocompleter{display:none;position:absolute;z-index:1000000000000;border:none;margin:0;padding:0;background:white;-moz-box-shadow:#BBB .2em .2em .4em;-webkit-box-shadow:#BBB .2em .2em .4em;overflow:hidden}div.autocompleter ul{list-style:none;margin:0;padding:0;border:none;background:none;*border-bottom:1px solid #CCC}div.autocompleter ul li{list-style:none;font-weight:normal;margin:0;padding:.2em .4em;border:1px solid #CCC;border-top:none;border-bottom:none;background:none;cursor:pointer}div.autocompleter ul li:first-child{border-top:1px solid #CCC}div.autocompleter ul li:last-child{border-bottom:1px solid #CCC;*border-bottom:none}div.autocompleter ul li.current{background:#DDD}div.autocompleter-spinner{position:absolute;z-index:1000000000000;width:18px;text-align:center;font-size:140%;font-family:Georgia;background:#DDD;color:#666;display:none;margin:0;padding:0}div.autocompleter-spinner div.dot-1{margin-left:-4px}div.autocompleter-spinner div.dot-2{}div.autocompleter-spinner div.dot-3{margin-left:4px}</style>");