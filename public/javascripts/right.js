/**
 * RightJS - the right javascript framework
 *
 * The library released under terms of the MIT license
 * See http://github.com/rightjs/rightjs-core
 * for the original source codes
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
/**
 * this object will contain info about the current browser
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
self.Browser = {
  IE:           !!(window.attachEvent && !window.opera),
  Opera:        !!window.opera,
  WebKit:       navigator.userAgent.indexOf('AppleWebKit/') > -1,
  Gecko:        navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1,
  MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
  Konqueror:    navigator.userAgent.indexOf('Konqueror') != -1,
  
  // marker for the browsers which don't give access to the HTMLElement unit
  OLD:          navigator.userAgent.indexOf('MSIE 6') != -1 || navigator.userAgent.indexOf('MSIE 7') != -1,
  IE8:          navigator.userAgent.indexOf('MSIE 8') != -1
};

/**
 * There are some util methods
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
 
 /**
  * extends the first object with the keys and values of the second one
  *
  * NOTE: the third optional argument tells if the existing values
  *       of the first object should _NOT_ get updated by the values of the second object
  *
  * @param Object destintation object
  * @param Object source object
  * @param Boolean flag if the function should not overwrite intersecting values
  * @return Objecte extended destination object
  */
function $ext(dest, src, dont_overwrite) { 
  var src = src || {};

  for (var key in src)
    if (!(dont_overwrite && dest[key] !== undefined))
      dest[key] = src[key];

  return dest;
};

/**
 * tries to execute all the functions passed as arguments
 *
 * NOTE: will hide all the exceptions raised by the functions
 *
 * @param Function to execute
 * ......
 * @return mixed first sucessfully executed function result or undefined by default
 */
function $try() {
  for (var i=0; i < arguments.length; i++) {
    try {
      return arguments[i]();
    } catch(e) {}
  }
};

/**
 * evals the given javascript text in the context of the current window
 *
 * @param String javascript
 * @return void
 */
function $eval(text) {
  if (!isString(text) || text.blank()) return;
  if (window.execScript) {
    window.execScript(text);
  } else {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.text = text;
    document.body.appendChild(script);
  }
}

/**
 * throws an exception to break iterations throw a callback
 *
 * @return void
 * @throws Break
 */
function $break() {
  throw new Break();
};

/**
 * generates aliases for the object properties
 *
 * @param Object object
 * @param Object aliases hash
 * @return Object the extended objects
 */
function $alias(object, names) {
  for (var old_name in names) {
    object[names[old_name]] = object[old_name];
  }
  return object;
};

/**
 * checks if the given value or a reference points
 * to a really defined value
 *
 * NOTE: will return true for variables equal to null, false, 0, and so one.
 *
 * EXAMPLE:
 *
 *   var smth = null;
 *   defined(smth); <- will return true
 *
 *   var obj = {};
 *   defined(obj['smth']); <- will return false
 *
 * @param mixed value
 * @return boolean check result
 */
function defined(value) {
  return value !== undefined;
};

/**
 * checks if the given value is a hash-like object
 *
 * @param mixed value
 * @return boolean check result
 */
function isHash(value) {
  return typeof(value) == 'object' && value !== null && value.constructor &&
    value.constructor.toString().includes('function Object()') && 
    value.toString().indexOf('object HTML') == -1 && // <- Opera fix
    value.toString().indexOf('object NodeList') == -1;
};

/**
 * checks if the given value is a function
 *
 * @param mixed value
 * @return boolean check result
 */
function isFunction(value) {
  return typeof(value) == 'function';
};

/**
 * checks if the given value is a string
 *
 * @param mixed value
 * @return boolean check result
 */
function isString(value) {
  return typeof(value) == 'string';
};

/**
 * checks if the given value is an array
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isArray(value) {
  return value instanceof Array;
};

/**
 * checks if the given value is a number
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isNumber(value) {
  return typeof(value) == 'number';
};

/**
 * checks if the given value is an element
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isElement(value) {
  return value && !!value.tagName;
};

/**
 * checks if the given value is a DOM-node
 *
 * @param mixed value to check
 * @return boolean check result
 */
function isNode(value) {
  return value && !!value.nodeType;
};

/**
 * converts any iterables into an array
 *
 * @param Object iterable
 * @return Array list
 */
function $A(it) {
  if (it.item) {
    for (var a=[], i=0, length = it.length; i < length; i++)
      a[i] = it[i];
  } else {
    var a = Array.prototype.slice.call(it);
  }
  
  return a;
};

/**
 * shortcut to instance new elements
 *
 * @param String tag name
 * @param object options
 * @return Element instance
 */
function $E(tag_name, options) {
  return new Element(tag_name, options);
};

/**
 * searches an element by id and/or extends it with the framework extentions
 *
 * @param String element id or Element to extend
 * @return Element or null
 */
function $(element) {
  var element = typeof(element) == 'string' ? document.getElementById(element) : element;
  return Browser.OLD ? Element.prepare(element) : element;
};

/**
 * searches for elements in the document which matches the given css-rule
 *
 * @param String css-rule
 * @return Array matching elements list
 */
function $$(css_rule) {
  return new Selector(css_rule).select(document);
};

/**
 * shortcut, generates an array of words from a given string
 *
 * @param String string
 * @return Array of words
 */
function $w(string) {
  return string.trim().split(/\s+/);
}

/**
 * generates an unique id for an object
 *
 * @param Object object
 * @return Integer uniq id
 */
var _UID = 1;
var $uid = (Browser.IE) ? function(item){                                                                                                       
        return (item.uid || (item.uid = [_UID++]))[0];                                                                                                
} : function(item){                                                                                                                                         
        return item.uid || (item.uid = _UID++);                                                                                                       
};


/**
 * The Object class extentions
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Object, {
  /**
   * extracts the list of the attribute names of the given object
   *
   * @param Object object
   * @return Array keys list
   */
  keys: function(object) {
    var keys = [];
    for (var key in object)
      keys.push(key);
    return keys;
  },
  
  /**
   * extracts the list of the attribute values of the given object
   *
   * @param Object object
   * @return Array values list
   */
  values: function(object) {
    var values = [];
    for (var key in object)
      values.push(object[key]);
    return values;
  },
  
  /**
   * checks if the object-hash has no keys
   *
   * @param Object object
   * @return check result
   */
  empty: function(object) {
    for (var key in object) break;
    return !key;
  },
  
  /**
   * clones the given object
   *
   * @param Object original
   * @return Object clone
   */
  clone: function(object) {
    var clone = {};
    for (var key in object)
      clone[key] = object;
    return clone;
  },
  
  /**
   * returns a copy of the object which contains
   * all the same keys/values except the key-names
   * passed the the method arguments
   *
   * @param Object object
   * @param String key-name to exclude or an array of keys to exclude
   * .....
   * @return Object filtered copy
   */
  without: function() {
    var args = $A(arguments), object = args.shift(), filter = args[0] ? (
      isArray(args[0]) ? args[0] : args
    ) : [];
    
    var copy = {};
    
    for (var key in object)
      if (!filter.includes(key))
        copy[key] = object[key];
    
    return copy;
  },
  
  /**
   * returns a copy of the object which contains all the
   * key/value pairs from the specified key-names list
   *
   * NOTE: if some key does not exists in the original object, it will be just skipped
   *
   * @param Object object
   * @param String key name to exclude or an array of keys to exclude
   * .....
   * @return Object filtered copy
   */
  only: function() {
    var args = $A(arguments), object = args.shift(), filter = args[0] ? (
      isArray(args[0]) ? args[0] : args
    ) : [];
    
    var copy = {};
    
    for (var i=0; i < filter.length; i++) {
      if (defined(object[filter[i]]))
        copy[filter[i]] = object[filter[i]];
    }
    
    return copy;
  },
  
  /**
   * walks through the object key-value pairs and replaces the given object properties
   * with ones which the callback function returns
   *
   * NOTE: the callback function has to return an array like [key, value]
   *       if the callback function returns nothing or the array doesn't have
   *       the key the entry won't be changed
   *
   * WARNING: it is meant that the incomming object will be changed
   *
   * @param Object object to walk through
   * @param Function callback function
   * @return Object the incomming object with changes
   */
  walk: function(object, callback) {
    try {
      var keys = Object.keys(object);
      for (var i=0; i < keys.length; i++) {
        var values = callback(keys[i], object[keys[i]], object);

        if (values && values[0] && defined(values[1])) {
          delete(object[keys[i]]);
          object[values[0]] = values[1];
        }
      }
    } catch(e) { if (!(e instanceof Break)) throw(e); }
    
    return object;
  },
  
  /**
   * walks through the object keys and change/rename/remove them, keeping the values the same
   *
   * NOTE: if the callback function returns null, that means the key/value won't be changed
   *       so if you just need to iterate through the keys don't return anything in the
   *       callback function
   *
   * WARNING: will change the incoming object
   *
   * @param Object object to process
   * @param Function callback process
   * @return Object the incoming object after procesing
   */
  eachKey: function(object, callback) {
    return Object.walk(object, function(key, value) {
      return [callback(key), value];
    });
  },
  
  /**
   * merges the given objects and returns the result
   *
   * NOTE this method _DO_NOT_ change the objects, it creates a new object
   *      which conatins all the given ones. 
   *      if there is some keys introspections, the last object wins.
   *      all non-object arguments will be omitted
   *
   * @param Object object
   * @param Object mixing
   * ......
   * @return Object merged object
   */
  merge: function() {
    var args = $A(arguments), object = {};
    for (var i=0; i < args.length; i++) {
      if (typeof(args[i])=='object') {
        $ext(object, args[i]);
      }
    }
    return object;
  },
  
  /**
   * converts a hash-object into an equivalent url query string
   *
   * @param Object object
   * @return String query
   */
  toQueryString: function(object) {
    var tokens = [];
    for (var key in object) {
      tokens.push(key+'='+encodeURIComponent(object[key]))
    }
    return tokens.join('&');
  }
});

/**
 * here are the starndard Math object extends
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Math, {
  /**
   * the standard random method replacement, to make it more useful
   *
   * USE:
   *   Math.random();    // original functionality, returns a float between 0 and 1
   *   Math.random(10);  // returns an integer between 0 and 10
   *   Math.random(1,4); // returns an integer between 1 and 4
   *
   * @param Integer minimum value if there's two arguments and maximum value if there's only one
   * @param Integer maximum value
   * @return Float random between 0 and 1 if there's no arguments or an integer in the given range
   */
  random: function(min, max) {
    var rand = this._random();
    if (arguments.length == 0)
      return rand;
    
    if (arguments.length == 1)
      var max = min, min = 0;
    
    return Math.floor(rand * (max-min+1)+min);
  },
  _random: Math.random
});

/**
 * The Array class extentions
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Array.prototype, {
  /**
   * IE fix
   * returns the index of the value in the array
   *
   * @param mixed value
   * @param Integer optional offset
   * @return Integer index or -1 if not found
   */
  indexOf: Array.prototype.indexOf || function(value, from) {
    for (var i=(from<0) ? Math.max(0, this.length+from) : from || 0; i < this.length; i++)
      if (this[i] === value)
        return i;
    return -1;
  },
  
  /**
   * IE fix
   * returns the last index of the value in the array
   *
   * @param mixed value
   * @return Integer index or -1 if not found
   */
  lastIndexOf: Array.prototype.lastIndexOf || function(value) {
    for (var i=this.length-1; i >=0; i--)
      if (this[i] === value)
        return i;
    return -1;
  },
  
  /**
   * returns the first element of the array
   *
   * @return mixed first element of the array
   */
  first: function() {
    return this[0];
  },
  
  /**
   * returns the last element of the array
   *
   * @return mixed last element of the array
   */
  last: function() {
    return this[this.length-1];
  },
  
  /**
   * returns a random item of the array
   *
   * @return mixed a random item
   */
  random: function() {
    return this.length ? this[Math.random(this.length-1)] : null;
  },
  
  /**
   * returns the array size
   *
   * @return Integer the array size
   */
  size: function() {
    return this.length;
  },
  
  /**
   * cleans the array
   * @return Array this
   */
  clean: function() {
    this.length = 0;
    return this;
  },
  
  /**
   * checks if the array has no elements in it
   *
   * @return boolean check result
   */
  empty: function() {
    return !this.length;
  },
  
  /**
   * creates a copy of the given array
   *
   * @return Array copy of the array
   */
  clone: function() {
    return this.slice(0);
  },
  
  /**
   * calls the given callback function in the given scope for each element of the array
   *
   * @param Function callback
   * @param Object scope
   * @return Array this
   */
  each: function() {
    this._call(arguments, 'forEach');
    return this;
  },
  
  /**
   * creates a list of the array items converted in the given callback function
   *
   * @param Function callback
   * @param Object optional scope
   * @return Array collected
   */
  map: function() {
    return this._call(arguments, '_map');
  },
  
  /**
   * creates a list of the array items which are matched in the given callback function
   *
   * @param Function callback
   * @param Object optional scope
   * @return Array filtered copy
   */
  filter: function() {
    return this._call(arguments, '_filter');
  },
  
  /**
   * applies the given lambda to each element in the array
   *
   * NOTE: changes the array by itself
   *
   * @param Function callback
   * @param Object optional scope
   * @return Array this
   */
  walk: function() {
    this.map.apply(this, arguments).forEach(function(value, i) { this[i] = value; }, this);
    return this;
  },
    
  /**
   * similar to the concat function but it adds only the values which are not on the list yet
   *
   * @param Array to merge
   * ....................
   * @return Array new merged
   */
  merge: function() {
    for (var copy = this.clone(), arg, i=0; i < arguments.length; i++) {
      arg = arguments[i];
      if (isArray(arg)) {
        for (var j=0; j < arg.length; j++) {
          if (copy.indexOf(arg[j]) == -1)
            copy.push(arg[j]);
        }  
      } else if (copy.indexOf(arg) == -1) {
        copy.push(arg);
      }
    }
    return copy;
  },
  
  /**
   * flats out complex array into a single dimension array
   *
   * @return Array flatten copy
   */
  flatten: function() {
    var copy = [];
    this.forEach(function(value) {
      if (isArray(value)) {
        copy = copy.concat(value.flatten());
      } else {
        copy.push(value);
      }
    });
    return copy;
  },
  
  /**
   * returns a copy of the array whithout any null or undefined values
   *
   * @return Array filtered version
   */
  compact: function() {
    return this.without(null, undefined);
  },
  
  /**
   * returns a copy of the array which contains only the unique values
   *
   * @return Array filtered copy
   */
  uniq: function() {
    return [].merge(this);
  },
  
  /**
   * checks if all of the given values
   * exists in the given array
   *
   * @param mixed value
   * ....
   * @return boolean check result
   */
  includes: function() {
    for (var i=0; i < arguments.length; i++)
      if (this.indexOf(arguments[i]) == -1)
        return false;
    return true;
  },
  
  /**
   * returns a copy of the array without the items passed as the arguments
   *
   * @param mixed value
   * ......
   * @return Array filtered copy
   */
  without: function() {
    var filter = $A(arguments);
    return this.filter(function(value) {
      return !filter.includes(value);
    });
  },
  
  /**
   * checks if any of the array elements is logically true
   *
   * @param Function optional callback for checks
   * @param Object optional scope for the callback
   * @return mixed the first non-false item or false if nothing found
   */
  any: function() {
    return this._all(arguments, 'any');
  },
  
  /**
   * checks if all the array elements are logically true
   *
   * @param Function optional callback for checks
   * @param Object optional scope for the callback
   * @return Boolean check result
   */
  all: function() {
    return this._all(arguments, 'all');
  },
  
// private
  
  // recatching the original JS 1.6 method 
  forEach: Array.prototype.forEach || function(callback, scope) {
    for (var i=0; i < this.length; i++)
      callback.call(scope, this[i], i, this);
  },
  
  _filter: Array.prototype.filter || function(callback, scope) {
    for (var result=[], i=0; i < this.length; i++) {
      if (callback.call(scope, this[i], i, this))
        result.push(this[i]);
    }
    return result;
  },
  
  _map: Array.prototype.map || function(callback, scope) {
    for (var result=[], i=0; i < this.length; i++) {
      result.push(callback.call(scope, this[i], i, this));
    }
    return result;
  },

  // handles the each/map/filter methods wrapups
  _call: function(args, name) {
    try {
      return this[name].apply(this, this._guessCallback(args));
    } catch(e) { if (!(e instanceof Break)) throw(e); }
  },
  
  // processes the all and any methods
  _all: function(args, name) {
    var pair = this._guessCallback(args), callback = pair[0], scope = pair[1], break_value = name != 'all', result = null;
    if (!callback) callback = function(value) { return value; };
    
    for (var i=0; i < this.length; i++) {
      if (!!(callback.call(scope, this[i], i, this)) == break_value) {
        result = name == 'all' ? false : this[i];
        break;
      }
    }
    
    return result === null ? !break_value : result;
  },
  
  // guesses the callback/scope pair out of the arguments list
  _guessCallback: function(args) {
    var args = $A(args), callback = args.shift(), scope = this;
    
    if (isString(callback)) {
      var attr = callback;
      if (this.length && isFunction(this[0][attr])) {
        callback = function(object) { return object[attr].apply(object, args); };
      } else {
        callback = function(object) { return object[attr]; };
      }
    } else {
      scope = args.shift();
    }
    
    return [callback, scope];
  }
});

$alias(Array.prototype, {includes: 'include'});

/**
 * The String class extentions
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(String, {
  // this is for unicode regexps 
  UTF8_DOWNS: 'a-zàèìòùáéíóúýâêîôûãñõäëïöü¡¿çßøåæþðёйцукенгшщзхъфывапролджэячсмитьбю',
  UTF8_UPS: 'A-ZÀÈÌÒÙÁÉÍÓÚÝÂÊÎÔÛÃÑÕÄËÏÖÜ¡¿ÇØÅÆÞÐЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ'
});

$ext(String.prototype, {
  /**
   * checks if the string is an empty string
   *
   * @return boolean check result
   */
  empty: function() {
    return this == '';
  },
  
  /**
   * checks if the string contains only white-spaces
   *
   * @return boolean check result
   */
  blank: function() {
    return /^\s*$/.test(this);
  },
  
  /**
   * removes trailing whitespaces
   *
   * @return String trimmed version
   */
  trim: function() {
    return this.replace(/^\s+|\s+$/g, '');
  },
  
  /**
   * returns a copy of the string with all the tags removed
   * @return String without tags
   */
  stripTags: function() {
    return this.replace(/<\/?[^>]+>/ig, '');
  },
  
  /**
   * removes all the scripts declarations out of the string
   * @param mixed option. If it equals true the scrips will be executed, 
   *                      if a function the scripts will be passed in it
   * @return String without scripts
   */
  stripScripts: function(option) {
    var scripts = '';
    var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/img, function(match, source) {
      scripts += source.trim() + "\n";
      return '';
    });
    
    if (option === true)
      $eval(scripts);
    else if (isFunction(option))
      option(scripts, text);
    else if (isNumber(option))
      $eval.bind(scripts).delay(options);
    
    return text;
  },
  
  /**
   * extracts all the scripts out of the string
   *
   * @return String the extracted stcripts
   */
  extractScripts: function() {
    var scripts = '';
    this.stripScripts(function(s,t) { scripts = s; });
    return scripts;
  },
  
  /**
   * evals all the scripts in the string
   *
   * @return String self (unchanged version with scripts still in their place)
   */
  evalScripts: function() {
    $eval(this.extractScripts());
    return this;
  },
  
  /**
   * converts underscored or dasherized string to a camelized one
   * @returns String camelized version
   */
  camelize: function() {
    var prefix = this.match(/^(\-|_)+?/g) || ''; // <- keeps start dashes alive
    return prefix + this.substr(prefix.length, this.length).replace(
       new RegExp('(\\-|_)+?(\\D)', 'g'), function(match) {
         return match.replace(/\-|_/, '').toUpperCase();
      });
  },
  
  /**
   * converts a camelized or dasherized string into an underscored one
   * @return String underscored version
   */
  underscored: function() {
    return this.replace(/([a-z0-9])([A-Z]+)/g, function(match, first, second) {
      return first+"_"+(second.length > 1 ? second : second.toLowerCase());
    }).replace(/\-/g, '_');
  },

  /**
   * returns a capitalised version of the string
   *
   * @return String captialised version
   */
  capitalize: function() {
    return this.replace(new RegExp('(^|\\s|\\-|_)['+String.UTF8_DOWNS+']', 'g'), function(match) {
      return match.toUpperCase();
    });
  },
  
  /**
   * checks if the string contains the given substring
   *
   * @param String string
   * @return boolean check result
   */
  includes: function(string) {
    return this.indexOf(string) != -1;
  },
  
  /**
   * checks if the string starts with the given substring
   *
   * @param String string
   * @param boolean ignore the letters case
   * @return boolean check result
   */
  startsWith: function(string, ignorecase) {
    var start_str = this.substr(0, string.length);
    return ignorecase ? start_str.toLowerCase() == string.toLowerCase() : 
      start_str == string;
  },
  
  /**
   * checks if the string ends with the given substring
   *
   * @param String substring
   * @param boolean ignore the letters case
   * @return boolean check result
   */
  endsWith: function(string, ignorecase) {
    var end_str = this.substring(this.length - string.length);
    return ignorecase ? end_str.toLowerCase() == string.toLowerCase() :
      end_str == string;
  },
  
  /**
   * converts the string to an integer value
   * @param Integer base
   * @return Integer or NaN
   */
  toInt: function(base) {
    return parseInt(this, base || 10);
  },
  
  /**
   * converts the string to a float value
   * @param boolean flat if the method should not use a flexible matching
   * @return Float or NaN
   */
  toFloat: function(strict) {
    return parseFloat(strict ? this : this.replace(',', '.').replace(/(\d)-(\d)/g, '$1.$2'));
  },
  
  /**
   * converts the string into an insertable DocumentFramgent unit
   *
   * @return DocumentFragment node
   */
  toFragment: function() {
    var tmp = document.createElement('div');
    tmp.innerHTML = this;
    return Element.createFragment(tmp.childNodes);
  }
  
});

$alias(Array.prototype, {includes: 'include'});

/**
 * The Function class extentions
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Function.prototype, {
  /**
   * binds the function to be executed in the given scope
   *
   * @param Object scope
   * @param mixed optional curry (left) argument
   * ....
   * @return Function binded function
   */
  bind: function() {
    if (arguments.length < 2 && !defined(arguments[0])) return this;
    
    var _method = this, args = $A(arguments), scope = args.shift();
    return function() {
      return _method.apply(scope, args.concat($A(arguments)));
    };
  },
  
  /**
   * binds the function as an event listener to the given scope object
   *
   * @param Object scope
   * @param mixed optional curry (left) argument
   * .......
   * @return Function binded function
   */
  bindAsEventListener: function() {
    var _method = this, args = $A(arguments), scope = args.shift();
    return function(event) {
      return _method.apply(scope, [event || window.event].concat(args).concat($A(arguments)));
    };
  },
  
  /**
   * allows you to put some curry in your cookery
   *
   * @param mixed value to curry
   * ....
   * @return Function carried function
   */
  curry: function() {
    return this.bind.apply(this, [this].concat($A(arguments)));
  },
  
  /**
   * delays the function execution
   *
   * @param Integer delay ms
   * @param mixed value to curry
   * .....
   * @return Integer timeout marker
   */
  delay: function() {
    var args  = $A(arguments), timeout = args.shift();
    var timer = new Number(window.setTimeout(this.bind.apply(this, [this].concat(args)), timeout));
    
    timer['cancel'] = function() { window.clearTimeout(this); };
    
    return timer;
  },
  
  /**
   * creates a periodical execution of the function with the given timeout
   *
   * @param Integer delay ms
   * @param mixed value to curry
   * ...
   * @return Ineger interval marker
   */
  periodical: function() {
    var args  = $A(arguments), timeout = args.shift();
    var timer = new Number(window.setInterval(this.bind.apply(this, [this].concat(args)), timeout));
    
    timer['stop'] = function() { window.clearInterval(this); };
    
    return timer;
  }
});

/**
 * The Number class extentions
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Number.prototype, {
  /**
   * executes the given callback the given number of times
   *
   * @param Function callback
   * @param Object optional callback execution scope
   * @return void
   */
  times: function(callback, scope) {
    for (var i=0; i < this; i++)
      callback.call(scope, i);
    return this;
  },
  
  upto: function(number, callback, scope) {
    for (var i=this+0; i <= number; i++)
      callback.call(scope, i);
    return this;
  },
  
  downto: function(number, callback, scope) {
    for (var i=this+0; i >= number; i--)
      callback.call(scope, i);
    return this;
  },
  
  abs: function() {
    return Math.abs(this);
  },
  
  round: function() {
    return Math.round(this);
  },
  
  ceil: function() {
    return Math.ceil(this);
  },
  
  floor: function() {
    return Math.floor(this);
  }
});

/**
 * The Regexp class extentions
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(RegExp, {
  /**
   * Escapes the string for safely use as a regular expression
   *
   * @param String raw string
   * @return String escaped string
   */
  escape: function(string) {
    return String(string).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }
});

/**
 * The basic Class unit
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Class = function() {
  var args = $A(arguments), properties = args.pop() || {}, parent = args.pop();
  
  // if only the parent class has been specified
  if (arguments.length == 1 && isFunction(properties)) {
    parent = properties; properties = {};
  }
  
  // basic class object definition
  var klass = function() {
    return this.initialize ? this.initialize.apply(this, arguments) : this;
  };
  
  // attaching main class-level methods
  $ext(klass, Class.Methods);
  
  // handling the parent class assign
  Class.Util.catchSuper(klass, parent);
  klass.prototype.constructor = klass; // <- don't put it lower
  
  // handling the inlinde extends and includes
  Class.Util.catchExtends(klass, properties);
  Class.Util.catchIncludes(klass, properties);
  
  klass.include(properties);
  
  return klass;
};

/**
 * This module contains some utils which hepls handling new classes definition
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Class.Util = {
  /**
   * handles the class superclass catching up
   *
   * @param Function class
   * @param Class superclass
   * @return void
   */
  catchSuper: function(klass, parent) {
    if (parent && defined(parent.prototype)) {  
      klass.parent = parent;
      var s_klass = function() {};
      s_klass.prototype = parent.prototype;
      klass.prototype = new s_klass;
    }
    
    klass.ancestors = [];
    while (parent) {
      klass.ancestors.push(parent);
      parent = parent.parent;
    }
  },
  
  /**
   * handles the inline extendings on class definitions
   *
   * @param Function class
   * @param Object user's properties
   * @return void
   */
  catchExtends: function(klass, properties) {
    if (properties['extend']) {
      var exts = properties['extend'];
      if (!isArray(exts))
        exts = [exts];
      
      klass.extend.apply(klass, exts);
      delete(properties['extend']);
    }
  },
  
  /**
   * handles the inline includes of the class definitions
   *
   * @param Function class
   * @param Object user's properties
   * @return void
   */
  catchIncludes: function(klass, properties) {
    if (properties['include']) {
      var includes = properties['include'];
      if (!isArray(includes))
        includes = [includes];

      klass.include.apply(klass, includes);
      delete(properties['include']);
    }
  }
};

/**
 * This module contains the methods by which the Class instances
 * will be extended. It provides basic and standard way to work
 * with the classes.
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Class.Methods = {
  /**
   * this method will extend the class-level with the given objects
   *
   * NOTE: this method _WILL_OVERWRITE_ the existing itercecting entries
   *
   * NOTE: this method _WILL_NOT_OVERWRITE_ the class prototype and
   *       the class 'name' and 'parent' attributes. If one of those
   *       exists in one of the received modeuls, the attribute will be
   *       skipped
   *
   * @param Object module to extend
   * ....
   * @return Class the klass
   */
  extend: function() {
    var filter = ['prototype', 'name', 'parent', 'extend', 'include'];
    for (var i=0; i < arguments.length; i++) {
      if (isHash(arguments[i])) {
        for (var key in arguments[i]) {
          if (!filter.includes(key)) {
            this[key] = arguments[i][key];
          }
        }
      }
    }
    
    return this;
  },
  
  /**
   * extends the class prototype with the given objects
   * NOTE: this method _WILL_OVERWRITE_ the existing itercecting entries
   * NOTE: this method _WILL_NOT_OVERWRITE_ the 'klass' attribute of the klass.prototype
   *
   * @param Object module to include
   * ....
   * @return Class the klass
   */
  include: function() {
    for (var i=0; i < arguments.length; i++) {
      if (isHash(arguments[i])) {
        for (var key in arguments[i]) {
          if (key != 'klass' && key != 'constructor') {
            
            // handling the super methods
            var ancestor = this.ancestors.any(function(klass) { return isFunction(klass.prototype[key]); });
            
            if (ancestor) {
              (function(name, method, $super) {
                this.prototype[name] = function() {
                  this.$super = $super;
                  
                  return method.apply(this, arguments);
                };
              }).call(this, key, arguments[i][key], ancestor.prototype[key]);
            } else {
              this.prototype[key] = arguments[i][key];
            }
            
          }
        }
      }
    }
    return this;
  }
};

/**
 * This is a simple mix-in module to be included in other classes
 *
 * Basically it privdes the <tt>setOptions</tt> method which processes
 * an instance options assigment and merging with the default options
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Options = {
  /**
   * assigns the options by merging them with the default ones
   *
   * @param Object options
   * @return Object current instance
   */
  setOptions: function(options) {
    var names = $w('OPTIONS Options options'),
      objects = [this, this.constructor].concat(this.constructor.ancestors),
      OPTIONS = objects.map(function(object) {
        return names.map(function(name) { return object[name]; });
      }).flatten().any();
    
    this.options = Object.merge({}, OPTIONS, options);
    
    // hooking up the observer options
    if (isFunction(this.on)) {
      var match;
      for (var key in this.options) {
        if (match = key.match(/on([A-Z][a-z]+)/)) {
          this.on(match[1].toLowerCase(), this.options[key]);
          delete(this.options[key]);
        }
      }
    }
    
    return this;
  }
};

/**
 * standard Observer class. 
 *
 * Might be used as a usual class or as a builder over another objects
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var Observer = new Class({
  include: Options,
  
  /**
   * general constructor
   *
   * @param Object options
   */
  initialize: function(options) {
    this.setOptions(options);
    
    // catching up the event shortucts
    var ancestor, shorts = this.EVENTS || this.constructor.EVENTS ||
        ((ancestor = this.constructor.ancestors.any('EVENTS')) ?
          ancestor.EVENTS : null);
          
    Observer.createShortcuts(this, shorts);
  },
  
  /**
   * starts observing an event
   *
   * USAGE:
   *  observe(String event, Function callback[, arguments, ...]);
   *  observe(String event, String method_name[, arguments, ...]);
   *  observe(Object events_hash);
   *
   * @return Observer self
   */
  observe: function() {
    var args = $A(arguments), events = args.shift(), callback;
    if (!isHash(events)) { var hash = {}; hash[events] = args; events = hash; }
    
    if (!this.$listeners) this.$listeners = [];
    
    for (var name in events) {
      if (!isArray(events[name])) events[name] = [events[name]];
      callback = isString(events[name][0]) ? this[events[name][0]] : events[name][0];
      
      hash = { e: name, f: callback, a: events[name].slice(1) };
      this.$listeners.push(hash);
      if (this.$o && this.$o.add) this.$o.add.call(this, hash);
    }
    
    return this;
  },
  
  /**
   * checks if the observer observes given event and/or callback
   *
   * USAGE:
   *   observes(String event)
   *   observes(Function callback)
   *   observes(String event, Function callback)
   *
   * @retun Observer self
   */
  observes: function(event, callback) {
    if (this.$listeners) {
      if (!isString(event)) { callback = event; event = null; }
      
      return !!this.$listeners.any(function(i) {
        return (event && callback) ? i.e == event && i.f == callback :
          event ? i.e == event : i.f == callback;
      });
    }
    
    return false;
  },
  
  /**
   * stops observing an event or/and function
   *
   * USAGE:
   *   stopObserving(String event)
   *   stopObserving(Function callback)
   *   stopObserving(String event, Function callback)
   *
   * @return Observer self
   */
  stopObserving: function(event, callback) {
    if (this.$listeners) {
      if (!isString(event)) { callback = event; event = null; }
      
      this.$listeners = this.$listeners.filter(function(i) {
        var result = (event && callback) ? (i.e != event || i.f != callback) :
          (event ? i.e != event : i.f != callback);
        
        if (!result && this.$o && this.$o.remove) this.$o.remove.call(this, i);
        
        return result;
      }, this);
    }
    
    return this;
  },
  
  /**
   * returns the listeners list for the event
   *
   * NOTE: if no event was specified the method will return _all_
   *       event listeners for _all_ the events
   *
   * @param String event name
   * @return Array of listeners
   */
  listeners: function(event) {
    return (this.$listeners || []).filter(function(i) {
      return !event || i.e == event;
    }).map(function(i) { return i.f; }).uniq();
  },
  
  /**
   * initiates the event handling
   *
   * @param String event name
   * @param mixed optional argument
   * ........
   * @return Observer self
   */
  fire: function() {
    var args = $A(arguments), event = args.shift();
    
    (this.$listeners || []).each(function(i) {
      if (i.e == event) {
        (this.$o && this.$o.fire) ? this.$o.fire.call(this, event, args, i)  :
          i.f.apply(this, i.a.concat(args));
      }
    }, this);
    
    return this;
  },
  
  extend: {
    /**
     * adds an observer functionality to any object
     *
     * @param Object object
     * @param Array optional events list to build shortcuts
     * @return Object extended object
     */
    create: function(object, events) {
      $ext(object, Object.without(this.prototype, 'initialize', 'setOptions'), true);
      return this.createShortcuts(object, events || object['EVENTS']);
    },
    
    /**
     * builds shortcut methods to wire/fire events on the object
     *
     * @param Object object to extend
     * @param Array list of event names
     * @return Object extended object
     */
    createShortcuts: function(object, names) {
      (names || []).each(function(name) {
        var shortcuts = {}, name = name.replace(/:/g, '_').toLowerCase().camelize();
        shortcuts[name] = function() {
          return this.fire.apply(this, [name].concat($A(arguments)));
        };
        shortcuts['on'+name.capitalize()] = function() {
          return this.on.apply(this, [name].concat($A(arguments)));
        };
        $ext(object, shortcuts, true);
      });
      
      return object;
    }
  }
});

$alias(Observer.prototype, { observe: 'on' });

/**
 * iterators in-callbacks break exception
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var Break = new Class(Error, {
  message: "Manual iterator break"
});

/**
 * represents some additional functionality for the Event class
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Event = new Class(Event, {
  extend: {
    NATIVE:   Event,
    
    // mouse button codes
    BUTTONS: {
      click:       0,
      middleclick: 1,
      rightclick:  2
    },
    
    // key codes
    KEYS: {
      BACKSPACE:  8,
      TAB:        9,
      ENTER:     13,
      ESCAPE:    27,
      SPACE:     32,
      PAGE_UP:   33,
      PAGE_DOWN: 34,
      END:       35,
      HOME:      36,
      LEFT:      37,
      UP:        38,
      RIGHT:     39,
      DOWN:      40,
      INSERT:    45,
      DELETE:    46
    },
    
    /**
     * extends a native object with additional functionality
     *
     * @param Event event
     * @return Event same event but extended
     */
    ext: function(event) {
      if (!event.stop) {
        Event.Base.ext(event);
        
        event.eventName = Event.cleanName(event.type || '');
        if (Event.Mouse.NAMES.includes(event.eventName)) {
          Event.Mouse.ext(event);
        } else if (defined(event.keyCode)){
          Event.Keyboard.ext(event);
        }
      }
      
      return event;
    },
    
    /**
     * cleans up the event name
     *
     * @param String event name
     * @return String fixed event name
     */
    cleanName: function(name) {
      name = name.toLowerCase();
      name = name.startsWith('on') ? name.slice(2) : name;
      name = name == 'contextmenu' ? 'rightclick'  : name;
      return name;
    },
    
    /**
     * returns a real, browser specific event name 
     *
     * @param String clean unified name
     * @return String real name
     */
    realName: function(name) {
      if (name == 'mousewheel' && Browser.Gecko) name = 'DOMMouseScroll';
      if (name == 'rightclick' && Browser.IE)    name = 'contextmenu';
      return name;
    }
  },
  
  /**
   * constructor. pretty much plays a virtual factory, instances new events or extends
   * existing ones and always returns an event instead of void as a normal constructor
   *
   * @param mixed native Event instance or String event name
   * @param Object options
   * @return Event instance
   */
  initialize: function() {
    var args = $A(arguments), event = args.shift(), options = args.pop() || {};
    
    if (isString(event)) {
      var name = Event.cleanName(event);
      if (Event.Mouse.NAMES.includes(name)) {
        event = new Event.Mouse(name, options);
      } else if (Event.Keyboard.NAMES.includes(name)) {
        event = new Event.Keyboard(name, options);
      } else {
        event = new Event.Custom(name, options);
      }
    }
    
    return Event.ext(event);
  }
});

/**
 * presents the basic events class
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Event.Base = new Class(Event.NATIVE, {
  extend: {
    // basic default events options
    OPTIONS: {
      bubbles:    true,
      cancelable: true,
      altKey:     false,
      ctrlKey:    false,
      shiftKey:   false,
      metaKey:    false
    },
    
    Methods: {
      stopPropagation: function() {
        this.cancelBubble = true;
      },
      
      preventDefault: function() {
        this.returnValue = false;
      },
      
      stop: function() {
        this.stopPropagation();
        this.preventDefault();
        return this;
      }
    },
    
    /**
     * the basic events extending method
     *
     * NOTE: does not process the mouse/keyboard events related extensions
     *       see the Mouse/Keyboard classes for the code
     *
     * @param Event new event
     * @return Event extended event
     */
    ext: function(event) {
      $ext(event, this.Methods, true);
      
      // TODO all the rest of the extensions in here
      
      return event;
    }
  },
  
  /**
   * basic constructor
   *
   * NOTE: that's a virtual constructor, it returns a new object instance
   *       not the actual class instance.
   * 
   * @param String event name
   * @param Object options
   * @return Event new event
   */
  initialize: function(name, options) {
    return this.build(this.options(name, options || {}));
  },
  
// protected

  /**
   * default building method
   *
   * the main purpose is that IE browsers share events instaciation interface
   *
   * @param Object options
   * @return Event new event
   */
  build: Browser.IE ? function(options) {
    var event = document.createEventObject();
    event.type = event.eventType = "on" + options.name;
    event.altKey = options.altKey;
    event.ctrlKey = options.ctrlKey;
    event.shiftKey = options.shiftKey;
    return event;
  } : null,
  
  /**
   * initial options parsing
   *
   * @params Sting event name
   * @params Object user options
   * @return Object clean options
   */
  options: function(name, options) {
    options = Object.merge({}, Event.Base.OPTIONS, this.OPTIONS, options);
    options.name = name;
    
    return options;
  }
});

/**
 * presents the mouse events class
 *
 * NOTE: this class generally is for an internal usage, it builds a new clean
 *       unextended mouse event.
 *       Use the Event general constructor, if you need a usual extened event.
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Event.Mouse = new Class(Event.Base, {
  
  extend: {
    NAMES: $w('click middleclick rightclick dblclick mousedown mouseup mouseover mouseout mousemove'),
    
    Methods: {
      isLeftClick: function() {
        return this.which == 0;
      },

      isRightClick : function() {
        return this.which == 2;
      }
    },
    
    /**
     * proceses the event extending as if it's a mouse event
     *
     * @param Event new event
     * @return Event extended event
     */
    ext: function(event) {
      $ext(event, this.Methods, true);
      
      // TODO all the reset of the event extending
      
      return event;
    }
  },
  
  // default mouse events related options
  OPTIONS: {
    pointerX: 0,
    pointerY: 0,
    button:   0
  },

// protecteds
  build: function(options) {
    var event = Browser.IE ? this.$super(options) : document.createEvent("MouseEvent");
    this[Browser.IE ? 'initIE' : 'initW3C'](event, options);
    return $ext(event, this.Methods);
  },
  
  options: function(name, options) {
    options = this.$super(name, options);
    options.button = Event.BUTTONS[options.name] || 0;
    options.name   = Event.realName(options.name);
    if (Browser.IE) {
      options.button = options.button == 1 ? 4 : options.button; // <- IE gets the middle button as 4
    }
    return options;
  },
  
// private
  initIE: function(event, options) {
    event.clientX = options.pointerX;
    event.clientY = options.pointerY;
    event.button  = options.button;
  },
  
  initW3C: function(event, options) {
    event.initMouseEvent(options.name, options.bubbles, options.cancelable, document.defaultView,
      name == 'dblclick' ? 2 : 1, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.element
    );
  }
});

/**
 * presents the keyboard events class
 *
 * NOTE: this class generally is for an internal usage, it builds a new clean
 *       unextended mouse event.
 *       Use the Event general constructor, if you need a usual extened event.
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Event.Keyboard = new Class(Event.Base, {
  
  extend: {
    NAMES: $w('keypress keydown keyup'),
    
    /**
     * automatically generates the key checking methods like
     * isEscape()
     * isEnter()
     * etc
     */
    Methods: Object.walk(Object.clone(Event.KEYS), function(key, value) {
      return [('is_'+key.toLowerCase()).camelize(), function() { return (this.keyCode || this.charCode) == value; }];
    }),
    
    /**
     * processes the event extending as a keyboard event
     *
     * @param Event before extending
     * @return Event after extending
     */
    ext: function(event) {
      $ext(event, this.Methods, true);
      
      // TODO other extending stuff in here
      
      return event;
    }
  },
  
  // default keyboard related events options
  OPTIONS: {
    keyCode:  0,
    charCode: 0
  },
  
// protected
  build: function(options) {
    var event = null;
    
    if (Browser.IE) {
      event = this.$super(options);
      this.initIE(event, options)
    } else try {
      // Gecko, WebKit, Chrome
      event = document.createEvent('KeyboardEvent');
      this['init'+Browser.WebKit ? 'Webkit' : 'Gecko'](event, options);
    } catch(e) {
      // basically Opera
      event = document.createEvent('UIEvent');
      this.initDOM2(event, options);
    }
    
    return event;
  },
  
  initGecko: function(event, options) {
    event.initKeyEvent(options.name,
      options.bubbles, options.cancelable, document.defaultView,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
      options.keyCode, options.charCode
    );
  },
  
  initWebkit: function(event, options) {
    event.initKeyboardEvent(options.name,
      options.bubbles, options.cancelable, document.defaultView,
      null, 0, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey
    );
  },
  
  initDOM2: function(event, options) {
    event.initUIEvent(options.ame, options.bubbles, options.cancelable, document.defaultView, 1);

    event.keyCode   = options.keyCode;
    event.charCode  = options.charCode;
    event.altKey    = options.altKey;
    event.metaKey   = options.metaKey;
    event.ctrlKey   = options.ctrlKey;
    event.shiftKey  = options.shiftKey;
  },
  
  initIE: function(event, options) {
    event.keyCode  = options.keyCode;
    event.charCode = options.charCode;
  }
});

/**
 * custom events unit, used as a mediator for the artificial events handling in the generic observer
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Event.Custom = new Class({
  /**
   * constructor
   *
   * @param String event name
   * @param Object options
   */
  initialize: function(name, options) {
    this.eventName = Event.cleanName(name);
    this.options   = options;
  },
  
  // just a dummy function to prevent the event extending
  stop: function() {}
});

/**
 * The DOM Element unit handling
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
window.Element = new Class(window.Element, {
  /**
   * basic constructor
   *
   * @param String tag name
   * @param Object new element options
   * @return Element object
   */
  initialize: function(tag_name, options) {
    if (Browser.IE && tag_name == 'input' && options && options.checked) {
      tag_name = '<input checked="true"/>';
    }
    
    var element = $(document.createElement(tag_name)), options = options || {};
    
    if (options['html'])    { element.update(options['html']);     delete(options['html']);    }
    if (options['class'])   { element.setClass(options['class']);  delete(options['class']);   }
    if (options['style'])   { element.setStyle(options['style']);  delete(options['style']);   }
    if (options['observe']) { element.observe(options['observe']); delete(options['observe']); }
    
    return element.set(options);
  },
  
  extend: {
    Methods: {}, // DO NOT Extend this object manually unless you need it, use Element#addMethods
    
    /**
     * IE browsers manual elements extending
     *
     * @param Element
     * @return Element
     */
    prepare: function(element) {
      if (element && element.tagName && !element.set) {
        $ext(element, Element.Methods, true);
        
        switch(element.tagName) {
          case 'FORM':
            Form.ext(element);
            break;

          case 'INPUT':
          case 'SELECT':
          case 'BUTTON':
          case 'TEXTAREA':
            Form.Element.ext(element);
            break;
        }
      }
      return element;
    },
    
    /**
     * registeres the methods on the custom element methods list
     * will add them to prototype and will generate a non extensive static mirror
     * 
     * USAGE:
     *  Element.addMethods({
     *    foo: function(bar) {}
     *  });
     *
     *  $(element).foo(bar);
     *  Element.foo(element, bar);
     *
     * @param Object new methods list
     * @param Boolean flag if the method should keep the existing methods alive
     * @return Element the global Element object
     */
    addMethods: function(methods, dont_overwrite) {
      $ext(this.Methods, methods, dont_overwrite);
      
      try { // busting up the basic element prototypes
        $ext(HTMLElement.prototype, methods, dont_overwrite);
      } catch(e) {
        try { // IE8 native element extension
          $ext(this.parent.prototype, methods, dont_overwrite);
        } catch(e) {}
      }
      
      return this;
    },
    
    /**
     * creates a fragment out of the incomming data
     *
     * @param mixed a string of html, or a list of nodes or a single node
     * @return DocumentFragment
     */
    createFragment: function(content) {
      var fragment;
      
      if (isString(content)) {
        fragment = content.toFragment();
        
      } else {
        fragment = document.createDocumentFragment();
        
        if (isNode(content)) {
          fragment.appendChild(content);
        } else if (content && content.length) {
          for (var i=0, length = content.length; i < length; i++) {
            // in case of NodeList unit, the elements will be removed out of the list during the appends
            // therefore if that's an array we use the 'i' variable, and if it's a collection of nodes
            // then we always hit the first element of the stack
            fragment.appendChild(content[content.length == length ? i : 0]);
          }
        }
      }
      
      return fragment;
    }
  }
});

/**
 * The DOM Element unit structures handling module
 *
 * NOTE: all the methods will process and return only the Element nodes
 *       all the textual nodes will be skipped
 *
 * NOTE: if a css-rule was specified then the result of the method
 *       will be filtered/adjusted depends on the rule
 *
 *       the css-rule might be a string or a Selector instance
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Element.addMethods({
  parent: function(css_rule) {
    return css_rule ? this.parents(css_rule).first() : $(this.parentNode);
  },
  
  parents: function(css_rule) {
    return this.rCollect('parentNode', css_rule);
  },
  
  subNodes: function(css_rule) {
    return this.firstChild ? (this.firstChild.tagName ? [$(this.firstChild)] : []
      ).concat(this.rCollect.call(this.firstChild, 'nextSibling', css_rule)) : [];
  },
  
  siblings: function(css_rule) {
    return this.prevSiblings(css_rule).reverse().concat(this.nextSiblings(css_rule));
  },
  
  nextSiblings: function(css_rule) {
    return this.rCollect('nextSibling', css_rule);
  },
  
  prevSiblings: function(css_rule) {
    return this.rCollect('previousSibling', css_rule);
  },
  
  next: function(css_rule) {
    return this.nextSiblings(css_rule).first();
  },
  
  prev: function(css_rule) {
    return this.prevSiblings(css_rule).first();
  },
  
  first: function(css_rule) {
    return new Selector(css_rule).first(this);
  },
  
  select: function(css_rule) {
    return new Selector(css_rule).select(this);
  },
  
  match: function(css_rule) {
    return new Selector(css_rule).match(this);
  },
  
  /**
   * removes the elemnt out of this parent node
   *
   * @return Element self
   */
  remove: function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
    return this;
  },
  
  /**
   * handles the elements insertion functionality
   *
   * The content might be one of the following data
   *
   *  o) an element instance
   *  o) a String, which will be converted into content to insert (all the scripts will be parsed out and executed)
   *  o) a list of Elements 
   *  o) a hash like {position: content}
   *
   * @param mixed data to insert
   * @param String position to insert  top/bottom/before/after/instead
   * @return Element self
   */
  insert: function(content, position) {
    if (isHash(content)) {
      for (var position in content) {
        this.insert(content[position], position)
      }
    } else {
      var scripts = '';
      position = isString(position) ? position.toLowerCase() : 'bottom';
      
      if (isString(content)) {
        content = content.stripScripts(function(s, h) { scripts = s; });
      }
      
      this.insertions[position].call(this, Element.createFragment(content));
      $eval(scripts);
    }
    return this;
  },
  
  insertTo: function(element, position) {
    $(element).insert(this, position);
    return this;
  },
  
  /**
   * replaces the current element by the given content
   *
   * @param mixed content (a String, an Element or a list of elements)
   * @return Element self
   */
  replace: function(content) {
    return this.insert(content, 'instead');
  },
  
  /**
   * updates the content of the element by the given content
   *
   * @param mixed content (a String, an Element or a list of elements)
   * @return Element self
   */
  update: function(content) {
    if (isString(content)) {
      this.innerHTML = content.stripScripts();
      content.evalScripts();
    } else {
      this.clean().insert(content);
    }
    return this;
  },
  
  /**
   * wraps the element with the given element
   *
   * @param Element wrapper
   * @return Element self
   */
  wrap: function(element) {
    if (this.parentNode) {
      this.parentNode.replaceChild(element, this);
      element.appendChild(this);
    }
    return this;
  },
  
  /**
   * removes all the child nodes out of the element
   *
   * @return Element self
   */
  clean: function() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }
    
    return this;
  },
  
  /**
   * checks if the element has no child nodes
   *
   * @return boolean check result
   */
  empty: function() {
    return this.innerHTML.blank();
  },

  /**
   * recursively collects nodes by pointer attribute name
   *
   * @param String pointer attribute name
   * @param String optional css-atom rule
   * @return Array found elements
   */
  rCollect: function(attr, css_rule) {
    var node = this, nodes = [];

    while ((node = node[attr])) {
      if (node.tagName && (!css_rule || new Selector(css_rule).match(node))) {
        nodes.push(Browser.OLD ? Element.prepare(node) : node);
      }
    }
    
    return nodes;
  },
  
// protected
  
  // list of insertions handling functions
  // NOTE: each of the methods will be called in the contects of the current element
  insertions: {
    bottom: function(element) {
      this.appendChild(element);
    },
    
    top: function(element) {
      this.firstChild ? this.insertBefore(element, this.firstChild) : this.appendChild(element);
    },
    
    after: function(element) {
      if (this.parentNode) {
        this.nextSibling ? this.parentNode.insertBefore(element, this.nextSibling) : this.parentNode.appendChild(element);
      }
    },
    
    before: function(element) {
      if (this.parentNode) {
        this.parentNode.insertBefore(element, this);
      }
    },
    
    instead: function(element) {
      if (this.parentNode) {
        this.parentNode.replaceChild(element, this);
      }
    }
  }
});


/**
 * this module contains the element unit styles related methods
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Element.addMethods({
  /**
   * assigns styles out of the hash to the element
   *
   * NOTE: the style keys might be camelized or dasherized, both cases should work
   *
   * @param Object styles list or String style name
   * @param String style value in case of the first param a string style name
   * @return Element self
   */
  setStyle: function(hash, value) {
    if (value) { var style = {}; style[hash] = value; hash = style; }
    
    var c_key;
    for (var key in hash) {
      c_key = key.indexOf('-') != -1 ? key.camelize() : key;
      
      if (key == 'opacity') {
        this.setOpacity(hash[key]);
      } else if (key == 'float') {
        c_key = Browser.IE ? 'styleFloat' : 'cssFloat';
      }
      
      this.style[c_key] = hash[key];
    }
    
    return this;
  },
  
  /**
   * handles the opacity setting
   *
   * @param Float opacity value between 0 and 1
   * @return Element self
   */
  setOpacity: function(value) {
    var key = 'opacity';
    if (Browser.IE) {
      key = 'filter';
      value = 'alpha(opacity='+ value * 100 +')';
    }
    this.style[key] = value;
    return this;
  },
  
  /**
   * returns style of the element
   *
   * NOTE: will include the CSS level definitions
   *
   * @param String style key
   * @return String style value or null if not set
   */
  getStyle: function(key) {
    return this._getStyle(this.style, key) || this._getStyle(this.computedStyles(), key);
  },
  
  /**
   * returns the hash of computed styles for the element
   *
   * @return Object/CSSDefinition computed styles
   */
  computedStyles: function() {
    //     ole IE,              IE8,                 W3C
    return this.currentStyle || this.runtimeStyle || this.ownerDocument.defaultView.getComputedStyle(this, null) || {};
  },
  
  // cleans up the style value
  _getStyle: function(style, key) {
    var value, key = key.camelize();
    
    switch (key) {
      case 'opacity':
        value = !Browser.IE ? style[key] :
          (((style['filter'] || '').match(/opacity=(\d+)/i) || ['', '100'])[1].toInt() / 100)+'';
        break;
        
      case 'float':
        key   = Browser.IE ? 'styleFloat' : 'cssFloat';
        
      default:
        if (style[key]) {
          value = style[key];
        } else {
          var values = $w('top right bottom left').map(function(name) {
            var tokens = key.underscored().split('_'); tokens.splice(1, 0, name);
            return style[tokens.join('_').camelize()];
          }).uniq();

          if (values.length == 1) {
            value = values[0];
          }
        }
        
        // Opera returns named colors with quotes
        if (Browser.Opera && key.match(/color/i)) {
          var match = value.match(/"(.+?)"/);
          value = match ? match[1] : value;
        }
    }
    
    return value ? value : null;
  },
  
  /**
   * checks if the element has the given class name
   * 
   * @param String class name
   * @return boolean check result
   */
  hasClass: function(name) {
    return this.className.length && this.className.match(new RegExp('(^|\\s)'+ name + '(\\s|$)'));
  },
  
  /**
   * sets the whole class-name string for the element
   *
   * @param String class-name
   * @return Element self
   */
  setClass: function(class_name) {
    this.className = class_name;
    return this;
  },

  /**
   * adds the given class name to the element
   *
   * @param String class name
   * @return Element self
   */
  addClass: function(name) {
    if (!this.hasClass(name)) {
      this.className += (this.className.length ? ' ' : '') + name;
    }
    return this;
  },
  
  /**
   * removes the given class name
   *
   * @param String class name
   * @return Element self
   */
  removeClass: function(name) {
    this.className = this.className.replace(new RegExp('(^|\\s)' + name + '(?:\\s|$)'), '$1');
    return this;
  },
  
  /**
   * toggles the given class name on the element
   *
   * @param String class name
   * @return Element self
   */
   toggleClass: function(name) {
     return this[this.hasClass(name) ? 'removeClass' : 'addClass'](name);
   },
   
   /**
    * adds the given class-name to the element
    * and removes it from all the element siblings
    *
    * @param String class name
    * @return Element self
    */
   radioClass: function(name) {
     this.siblings().each('removeClass', name);
     return this.addClass(name);
   }
});

/**
 * Common DOM Element unit methods
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Element.addMethods({
  /**
   * sets the element attributes
   *
   * @param String attr name or Object attributes hash
   * @param mixed attribute value
   * @return Element self
   */
  set: function(hash, value) {
    if (value) { var val = {}; val[hash] = value; hash = val; }

    for (var key in hash)
      this[key] = hash[key];
      
    return this;
  },
  
  /**
   * returns the attribute value for the name
   *
   * @param String attr name
   * @return mixed value
   */
  get: function(name) {
    var value = this.getAttribute(name) || this[name];
    return value == '' ? null : value;
  },
  
  /**
   * checks if the element has that attribute
   *
   * @param String attr name
   * @return Boolean check result
   */
  has: function(name) {
    return this.get(name) != null;
  },
  
  /**
   * erases the given attribute of the element
   *
   * @param String attr name
   * @return Element self
   */
  erase: function(name) {
    this.removeAttribute(name);
    return this;
  },
  
  /**
   * checks if the elemnt is hidden
   *
   * NOTE: will check css level computed styles too
   *
   * @return boolean check result
   */
  hidden: function() {
    return this.getStyle('display') == 'none';
  },
  
  /**
   * checks if the element is visible
   *
   * @return boolean check result
   */
  visible: function() {
    return !this.hidden();
  },
  
  /**
   * hides the element
   *
   * @param String optional effect name
   * @param Object the optional effect options
   * @return Element self
   */
  hide: function(effect, options) {
    this.__prevDisplay = this.getStyle('display');
    this.style.display = 'none';
    return this;
  },
  
  /**
   * shows the element
   *
   * @param String optional effect name
   * @param Object the optional effect options
   * @return Element self
   */
  show: function(effect, options) {
    this.style.display = this.__prevDisplay == 'none' ? '' : this.__prevDisplay || '';
    return this;
  },
  
  /**
   * toggles the visibility state of the element
   *
   * @param String optional effect name
   * @param Object the optional effect options
   * @return Element self
   */
  toggle: function(effect, options) {
    return this[this.hidden() ? 'show' : 'hide'](effect, options);
  },
  
  /**
   * shows the element and hides all the sibligns
   *
   * @param String optional effect name
   * @param Object the optional effect options
   * @return Element self
   */
  radio: function(effect, options) {
    this.siblings().each('hide', effect, options);
    return this.show();
  }
});

/**
 * this module contains the Element's part of functionality 
 * responsible for the dimensions and positions getting/setting
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Element.addMethods({
  
  sizes: function() {
    return { x: this.offsetWidth, y: this.offsetHeight };
  },
  
  position: function() {
    var dims = this.dimensions();
    return { x: dims.left, y: dims.top };
  },
  
  scrolls: function() {
    return { x: this.scrollLeft, y: this.scrollTop };
  },
  
  /**
   * returns the element dimensions hash
   *
   * @return Object dimensions (top, left, width, height, scrollLeft, scrollTop)
   */
  dimensions: function() {
    var left = 0, top = 0;
    
    if (this.getBoundingClientRect) {
      var rect = this.getBoundingClientRect(), doc = this.ownerDocument.documentElement;
      left = rect.left + doc.scrollLeft - doc.clientLeft;
      top  = rect.top  + doc.scrollTop  - doc.clientTop;
    } else {
      // Manual version
      var element = this;
      while (element && element.tagName) {
        left += element.offsetLeft;
        top  += element.offsetTop;
        element = element.parentNode;
      }
    }
    
    return {
      top:        top,
      left:       left,
      width:      this.sizes().x,
      height:     this.sizes().y,
      scrollLeft: this.scrolls().x,
      scrollTop:  this.scrolls().y
    };
  },
  
  /**
   * sets the width of the element in pixels
   *
   * NOTE: will double assign the size of the element, so it match the exact
   *       size including any possible borders and paddings
   *
   * @param Integer width in pixels
   * @return Element self
   */
  setWidth: function(width_px) {
    this.style.width = width_px + 'px';
    if (this.offsetWidth) this.style.width = (2 * width_px - this.offsetWidth) + 'px';
    return this;
  },
  
  /**
   * sets the width of the element in pixels
   *
   * NOTE: will double assign the size of the element, so it match the exact
   *       size including any possible borders and paddings
   *
   * @param Integer height in pixels
   * @return Element self
   */
  setHeight: function(height_px) {
    this.style.height = height_px + 'px';
    if (this.offsetHeight) this.style.height = (2 * height_px - this.offsetHeight) + 'px';
    return this;
  },
  
  /**
   * sets the size of the element in pixels
   *
   * NOTE: will double assign the size of the element, so it match the exact
   *       size including any possible borders and paddings
   *
   * @param Integer width in pixels or {x: 10, y: 20} like object
   * @param Integer height
   * @return Element self
   */
  resize: function(width, height) {
    if (isHash(width)) {
      height = width.y;
      width  = width.x;
    }
    
    this.setWidth(width);
    return this.setHeight(height);
  },
  
  /**
   * sets the element position (against the window corner)
   *
   * @param Integer left position in pixels or an object like {x: 10, y: 20}
   * @return Element self
   */
  moveTo: function(left, top) {
    if (isHash(left)) {
      top  = left.y;
      left = left.x;
    }
    
    // FIXME make it for real
    this.setStyle({
      marginLeft: (left - this.position().x) + 'px',
      marginTop: (top - this.position().y) + 'px'
    });
    
    return this;
  },
  
  /**
   * sets the scroll position
   *
   * @param Integer left scroll px or an object like {x: 22, y: 33}
   * @param Integer top scroll px
   * @return Element self
   */
  scrollTo: function(left, top) {
    if (isHash(left)) {
      top  = left.y;
      left = left.x;
    }
    
    this.scrollLeft = left;
    this.scrollTop  = top;
    
    return this;
  },
  
  /**
   * makes the window be scrolled to the element
   *
   * @return Element self
   */
  scrollThere: function() {
    window.scrollTo(this);
    return this;
  }
});

/**
 * DOM Element events handling methods
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Element.addMethods((function() {
  var observer = Observer.create({});
  
  observer.$o = {
    add: function(hash) {
      var callback = hash.f, args = hash.a;
      hash.e = Event.cleanName(hash.e);
      hash.n = Event.realName(hash.e);
      
      hash.w = function() {
        Event.ext(arguments[0]);
        return callback.apply(this, $A(arguments).concat(args));
      };
      
      if (Browser.IE) hash.w = hash.w.bind(this);
      
      if (this.addEventListener) {
        this.addEventListener(hash.n, hash.w, false);
      } else {
        this.attachEvent('on'+ hash.n, hash.w);
      }
    },
    
    remove: function(hash) {
      if (this.removeEventListener) {
        this.removeEventListener(hash.n, hash.w, false);
      } else {
        this.detachEvent('on'+ hash.n, hash.w);
      }
    },
    
    fire: function(name, args, hash) {
      var event = new Event(name, args.shift());
      hash.f.apply(this, [event].concat(hash.a).concat(args));
    }
  };
  
  return observer;
})());


/**
 * The DOM elements selection handling class
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Selector = new Class({
  extend: {
    cache: {}
  },
    
  /**
   * constructor
   *
   * @param String css rule definition
   * @return void
   */
  initialize: function(css_rule) {
    var cached = isString(css_rule) ? Selector.cache[css_rule] : css_rule;
    if (cached) return cached;
    Selector.cache[css_rule] = this;
    
    this.setCssRule(css_rule);
    
    var strategy = 'Manual';
    if (document.querySelector) {
      strategy = 'Native';
    } else if (this.cssRule.includes(',')) {
      strategy = 'Multiple';
    }
    
    this.strategy = new Selector[strategy](this.cssRule);
  },
  
  /**
   * selects the first matching element which is a sub node of the given element
   * and matches the selector's css-rule
   *
   * @param Element element
   * @return Element matching element or null if nothing found
   */
  first: function(element) {
    var element = this.strategy.first(element);
    return  element ? $(element) : null;
  },
  
  /**
   * select all the subnodes of the element which are matching the rule
   *
   * @param Element element
   * @return Array list of found nodes
   */
  select: function(element) {
    var elements = this.strategy.select(element);
    return Browser.OLD ? elements.map(Element.prepare) : elements;
  },
  
  /**
   * checks if the element matches the rule
   *
   * @param Element element
   * @return Boolean check result
   */
  match: function(element) {
    return this.strategy.match(element);
  },
  
  /**
   * sets up the selector's css-rule
   *
   * @param String css-rule
   * @return Selector self
   */
  setCssRule: function(css_rule) {
    this.cssRule = css_rule || '*';
    
    // converting virtual selectors into real ones
    [
      [/:last(?!-)/g, ':last-child'],
      [/:only(?!-)/g, ':only-child'],
      [/:odd/g,  ':nth-child(2n+1)'],
      [/:even/g, ':nth-child(2n)'],
      [/:nth-child\(odd\)/g,  ':nth-child(2n+1)'],
      [/:nth-child\(even\)/g, ':nth-child(2n)'],
      [/:index\(\s*\d+\s*\)/g, function(m) {return ":nth-child("+(m.match(/\d+/).first().toInt() + 1)+")"}]
    ].each(function(pair) {
      this.cssRule = this.cssRule.replace(pair[0], pair[1]);
    }, this);
    
    return this;
  }
});


/**
 * this class represent a simple css-definition atom unit
 *
 * the main purpose is to organize the simpliest case of css-rule match for the manual matcher.
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Selector.Atom = new Class({
  id: null,
  tag: '*',
  classes: [],
  pseudo: null,
  pseudoValue: null,
  attrs: {},

  rel: ' ', // relations with the previous atom

  ID_RE:     /#([\w\-_]+)/,
  TAG_RE:    /^[\w\*]+/,
  CLASS_RE:  /\.([\w\-\._]+)/,
  PSEUDO_RE: /:([\w\-]+)(\((.+?)\))*$/,
  ATTRS_RE:  /\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/,

  /**
   * constructor
   *
   * @param String css-definition
   * @param String relation with the previous atom
   * @return void
   */
  initialize: function(css_rule, rel) {
    css_rule = css_rule.trim();
    this.rel = rel || ' ';
    this.hasNonTagMatcher = !css_rule.match(/^[a-z\*]+$/);
    
    // NOTE! dont change the order of the atom parsing, there might be collisions
    this.attrs = {};
    while((m = css_rule.match(this.ATTRS_RE))) {
      this.attrs[m[1]] = { op: m[2], value: m[5] || m[6] };
      css_rule = css_rule.replace(m[0], '');
    }
    
    if ((m = css_rule.match(this.PSEUDO_RE))) {
      this.pseudo = m[1];
      this.pseudoValue = m[3] == '' ? null : m[3];
      css_rule = css_rule.replace(m[0], '');
    } else {
      this.pseudo = null;
      this.pseudoValue = null;
    }
    
    this.id  = (css_rule.match(this.ID_RE) || [1, null])[1];
    this.tag = (css_rule.match(this.TAG_RE) || '*').toString().toUpperCase();
    this.classes = (css_rule.match(this.CLASS_RE) || [1, ''])[1].split('.').without('');
    
    this.buildMatch();
  },

  /**
   * cecks if the node matches the atom
   *
   * @param Element element
   * @return Boolean check result
   */
  match: null, // this method is dinamically generated depend on the situation

// protected

  // building the match method for the particular case
  buildMatch: function() {
    var matchers = [];
    
    if (this.id)                        matchers.push('matchId');
    if (this.tag != '*')                matchers.push('matchTag');
    if (this.classes.length)            matchers.push('matchClass');
    if (Object.keys(this.attrs).length) matchers.push('matchAttrs');
    if (this.pseudo)                    matchers.push('matchPseudo');
    
    if (matchers.length == 1) {
      this.match = this[matchers[0]];
    } else if (matchers.length) {
      this.match = function(element) {
        for (var i=0; i < matchers.length; i++)
          if (!this[matchers[i]](element))
            return false;
        return true;
      }
    } else {
      this.match = function() { return true; }
    }
  },

  matchId: function(element) {
    return element.id == this.id;
  },

  matchTag: function(element) {
    return element.tagName == this.tag;
  },

  matchClass: function(element) {
    if (element.className) {
      var names = element.className.split(' ');
      if (names.length == 1) {
        return this.classes.indexOf(names[0]) != -1;
      } else {
        for (var i=0; i < this.classes.length; i++)
          if (names.indexOf(this.classes[i]) == -1)
            return false;
            
        return true;
      }
    }
    return false;
  },

  matchAttrs: function(element) {
    var matches = true;
    for (var key in this.attrs) {
      matches &= this.matchAttr(element, key, this.attrs[key]['op'], this.attrs[key]['value']);
    }
    return matches;
  },
  
  matchAttr: function(element, name, operator, value) {
    var attr = element.getAttribute(name) || element[name] || '';
    switch(operator) {
      case '=':  return attr == value;
      case '*=': return attr.includes(value);
      case '^=': return attr.startsWith(value);
      case '$=': return attr.endsWith(value);
      case '!=': return attr != value;
      case '~=': return attr.split(' ').includes(value);
      case '|=': return attr.split('-').includes(value);
      default:   return attr != '';
    }
    return false;
  },

  matchPseudo: function(element) {
    return this.pseudoMatchers[this.pseudo].call(element, this.pseudoValue, this.pseudoMatchers);
  },

  /**
   * W3C pseudo matchers
   *
   * NOTE: methods of the module will be called in a context of an element
   */
  pseudoMatchers: {
    checked: function() {
      return this.checked;
    },
    
    disabled: function() {
      return this.disabled;
    },

    empty: function() {
      return !(this.innerText || this.innerHTML || this.textContent || '').length;
    },

    not: function(css_rule) {
      return !new Selector(css_rule).match(this);
    },

    contains: function(text) {
      return (this.innerText || this.innerHTML || this.textContent || '').includes(text);
    },

    'first-child': function(tag_name) {
      var node = this;
      while ((node = node.previousSibling)) {
        if (node.tagName && (!tag_name || node.tagName == tag_name)) {
          return false;
        }
      }
      return true;
    },
    
    'first-of-type': function() {
      return arguments[1]['first-child'].call(this, this.tagName);
    },

    'last-child': function(tag_name) {
      var node = this;
      while ((node = node.nextSibling)) {
        if (node.tagName && (!tag_name || node.tagName == tag_name)) {
          return false;
        }
      }
      return true;
    },
    
    'last-of-type': function() {
      return arguments[1]['last-child'].call(this, this.tagName);
    },

    'only-child': function(tag_name, matchers) {
      return matchers['first-child'].call(this, tag_name) 
        && matchers['last-child'].call(this, tag_name);
    },
    
    'only-of-type': function() {
      return arguments[1]['only-child'].call(this, this.tagName, arguments[1]);
    },

    'nth-child': function(number, matchers, tag_name) {
      if (!matchers.hasParent(this)) return false;
      number = number.toLowerCase();
      
      if (number == 'n') return true;
      
      if (number.includes('n')) {
        // parsing out the matching expression
        var a = b = 0;
        if (m = number.match(/^([+-]?\d*)?n([+-]?\d*)?$/)) {
          a = m[1] == '-' ? -1 : parseInt(m[1], 10) || 1;
          b = parseInt(m[2], 10) || 0;
        }
        
        // getting the element index
        var index = 1, node = this;
        while ((node = node.previousSibling)) {
          if (node.tagName && (!tag_name || node.tagName == tag_name)) index++;
        }
        
        return (index - b) % a == 0 && (index - b) / a >= 0;
        
      } else {
        return matchers['index'].call(this, number.toInt() - 1, matchers, tag_name);
      }
    },
    
    'nth-of-type': function(number) {
      return arguments[1]['nth-child'].call(this, number, arguments[1], this.tagName);
    },
    
// protected
    index: function(number, matchers, tag_name) {
      number = isString(number) ? number.toInt() : number;
      var node = this, count = 0;
      while ((node = node.previousSibling)) {
        if (node.tagName && (!tag_name || node.tagName == tag_name) && ++count > number) return false;
      }
      return count == number;
    },
    
    // checking if the element has a parent node
    // the '-----fake' parent is a temporary context for the element
    // just of the matching process
    hasParent: function(element) {
      return element.parentNode && element.parentNode.id != '-----fake';
    }
  }
});

/**
 * represents a manual (virtual) selector strategy
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Selector.Manual = new Class({
  ATOMS_SPLIT_RE: /(\s*([~>+ ])\s*)(?![^\s\)\]]*(\)|\]))/,
  
  /**
   * constructor
   *
   * @param String css-rule
   */
  initialize: function(css_rule) {
    var css_rule = css_rule.trim();
    this.cssRule = css_rule;
    
    this.atoms = [];

    var relation = null, match = null;

    while (match = css_rule.match(this.ATOMS_SPLIT_RE)) {
      separator_pos = css_rule.indexOf(match[0]);
      this.atoms.push(new Selector.Atom(css_rule.substring(0, separator_pos), relation));

      relation = match[2]; // <- puts the current relation to the next atom

      // chopping off the first atom of the rule
      css_rule = css_rule.substr(separator_pos+(match[1].length==1 ? 1 : match[1].length-1)).trim();
    }
    this.atoms.push(new Selector.Atom(css_rule, relation));
  },

  /**
   * searches for the first matching subnode
   *
   * @param Element base node
   * @return Element matching element or null if nothing found
   */
  first: function(node) {
    return this.select(node).first();
  },

  /**
   * selects all the matching subnodes
   *
   * @param Element base node
   * @return Array found nodes
   */
  select: function(node) {
    var founds, atom, index;
    
    for (var i=0; i < this.atoms.length; i++) {
      atom = this.atoms[i];
      if (i == 0) {
        founds =  this.find[atom.rel](node, atom);
        
      } else {
        var sub_founds;
        
        for (var j=0; j < founds.length; j++) {
          sub_founds = this.find[atom.rel](founds[j], atom);
          
          if (atom.rel == '>' && (index = founds.indexOf(founds[j])) < j) {
            // if element appeared on the list by some earlier search inject the reslut there
            founds.splice.apply(founds, [index+1,0].concat(sub_founds));
            j++;  
          } else {
            founds.splice.apply(founds, [j,1].concat(sub_founds));
          }
          
          j += sub_founds.length - 1;
        }
      }
    }
    
    return this.atoms.length > 1 ? this.uniq(founds) : founds;
  },

  /**
   * checks if the node matches the rule
   *
   * @param Element node to check
   * @return boolean check result
   */
  match: function(element) {
    // if there's more than one atom, we match the element in a context
    if (!this.atoms || this.atoms.length > 1) {
      if (element.parentNode) {
          // searching for the top parent node
          // NOTE: don't use the Element.parents in here to avoid annecessary elements extending
          var p = element, parent;
          while ((p = p.parentNode)) parent = p;
        } else {
          // putting the element in a temporary context so we could test it
          var parent = document.createElement('div'), parent_is_fake = true;
          parent.id = '-----fake'; // <- this id is used in the manual 'match' method,
                                   // to determine if the element originally had no parent node
          parent.appendChild(element);
        }

        var match = this.select(parent).includes(element);
        if (parent_is_fake) parent.removeChild(element);
    } else {
      // if there's just one atom, we simple match against it.
      var match = this.atoms[0].match(element);
    }
    
    return match;
  },
  
// protected
  uniq: function(elements) {
    var uniq = [], uids = {}, uid;
    for (var i=0; i < elements.length; i++) {
      uid = $uid(elements[i]);
      if (!uids[uid]) {
        uniq.push(elements[i]);
        uids[uid] = true;
      }
    }
    
    return uniq;
  },

  find: {
    /**
     * search for any descendant nodes
     */
    ' ': function(element, atom) {
      var founds = $A(element.getElementsByTagName(atom.tag));
      if (atom.hasNonTagMatcher) {
        var matching = [];
        for (var i=0; i < founds.length; i++) {
          if (atom.match(founds[i]))
            matching.push(founds[i]);
        }
        return matching;
      }
      return founds;
    },

    /**
     * search for immidate descendant nodes
     */
    '>': function(element, atom) {
      var node = element.firstChild, matched = [];
      while (node) {
        if (atom.match(node)) {
          matched.push(node);
        }
        node = node.nextSibling;
      }
      return matched;
    },

    /**
     * search for immiate sibling nodes
     */
    '+': function(element, atom) {
      while ((element = element.nextSibling)) {
        if (element.tagName) {
          return atom.match(element) ? [element] : [];
        }
      }
      return [];
    },

    /**
     * search for late sibling nodes
     */
    '~': function(element, atom) {
      var founds = [];
      while ((element = element.nextSibling)) {
        if (atom.match(element))
          founds.push(element);
      }
      return founds;
    }
  } 

});

/**
 * represents the native browser's based selector strategy
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Selector.Native = new Class({
  initialize: function(css_rule) {
    this.cssRule = css_rule;
  },
  
  first: function(element) {
    return element.querySelector(this.fixedCssRule(element));
  },
  
  select: function(element) {
    
    try {
      return $A(element.querySelectorAll(this.fixedCssRule(element)));
    } catch(e) {
      alert(this.fixedCssRule(element));
      alert(element.querySelectorAll(this.fixedCssRule(element)));
    }
    
  },
  
  // reusing the manual method, case it's the same
  match: Selector.Manual.prototype.match,
  
// protected

  // native method counts the element in the css rule scope by default
  // don't know why. probably just a Safari bug.
  // 
  // as a temporary solution add the element tag name as a scope so the result
  // contained only the internal nested nodes.
  fixedCssRule: function(element) {
    return (isElement(element) ? element.tagName+ ' ' : '') +this.cssRule;
  }
});

/**
 * represents a complex, multi ruled select strategy
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Selector.Multiple  = new Class({
  
  /**
   * constructor
   *
   * @param String css-rule
   */
  initialize: function(css_rule) {
    this.cssRule = css_rule;
    this.selectors = css_rule.split(',').map(function(rule) {
      return rule.blank() ? null : new Selector.Manual(rule);
    }).compact();
  },

  /**
   * searches for the first matching subnode
   *
   * @param Element base node
   * @return Element matching element or null if nothing found
   */
  first: function(node) {
    return this.selectors.map('first', node).any();
  },

  /**
   * selects all the matching subnodes
   *
   * @param Element base node
   * @return Array found nodes
   */
  select: function(node) {
    return this.selectors.map('select', node, null).flatten().uniq();
  },

  /**
   * checks if the node matches the rule
   *
   * @param Element node to check
   * @return boolean check result
   */
  match: function(node) {
    return !!this.selectors.any('match', node) || !this.selectors.length;
  }
});


/**
 * the window object extensions
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(self, {
  /**
   * returns the inner-sizes of the window
   *
   * @return Object x: d+, y: d+
   */
  sizes: function() {
    return this.innerWidth ? {x: this.innerWidth, y: this.innerHeight} :
      {x: document.documentElement.clientWidth, y: document.documentElement.clientHeight};
  },
  
  /**
   * returns the scrolls for the window
   *
   * @return Object x: d+, y: d+
   */
  scrolls: function() {
    return window.pageXOffset ? {x: window.pageXOffset, y: window.pageYOffset} :
      (this.body.scrollLeft || this.body.scrollTop) ? 
      {x: this.body.scrollLeft, y: this.body.scrollTop} :
      {x: this.documentElement.scrollLeft, y: this.documentElement.scrollTop};
  },
  
  /**
   * overloading the native scrollTo method to support hashes and element references
   *
   * @param mixed number left position, a hash position, element or a string element id
   * @param number top position
   * @return window self
   */
  scrollTo: function(left, top) {
    if(isElement(left) || (isString(left) && $(left))) {
      left = $(left).position();
    }
    
    if (isHash(left)) {
      top  = left.y;
      left = left.x;
    }
    
    this._scrollTo(left, top);
    
    return this;
  },
  _scrollTo: window.scrollTo
});

/**
 * The dom-ready event handling code
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
[window, document].each(function(object) {
  Observer.create(object, ['ready']);
  var ready = object.ready.bind(object);
  
  if (Browser.IE) {
    var tmp = $E('div');
    (function() {
      try {
        document.body.appendChild(tmp);
        tmp.remove();
        ready();
      } catch(e) { arguments.callee.delay(50);}
    })();
  } else if (document['readyState'] !== undefined) {
    (function() {
      $w('loaded complete').includes(document.readyState) ? ready() : arguments.callee.delay(50);
    })();
  } else {
    document.addEventListener('DOMContentLoaded', ready, false);
  }
  
});

/**
 * this module handles the work with cookies
 *
 * Copyright (C) 2008 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var Cookie = new Class({
  extend: {
    // sets the cookie
    set: function(name, value, options) {
      return new Cookie(name, options).set(value);
    },
    // gets the cookie
    get: function(name) {
      return new Cookie(name).get();
    },
    // deletes the cookie
    remove: function(name) {
      return new Cookie(name).remove();
    }
  },
  
  name: null,
  
  // some basic options
  options: {
    path: null,
    doman: null,
    duration: null,
    secure: false,
    document: document
  },
  
  /**
   * constructor
   * @param String cookie name
   * @param Object options
   * @return void
   */
  initialize: function(name, options) {
    this.name = name;
    this.options = $ext(this.options, options || {});
  },
  
  /**
   * sets the cookie with the name
   *
   * @param mixed value
   * @return Cookie this
   */
  set: function(value) {
    var value = encodeURIComponent(value);
    if (this.options.domain) value += '; domain=' + this.options.domain;
    if (this.options.path) value += '; path=' + this.options.path;
    if (this.options.duration){
      var date = new Date();
      date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
      value += '; expires=' + date.toGMTString();
    }
    if (this.options.secure) value += '; secure';
    this.options.document.cookie = this.key + '=' + value;
    return this;
  },
  
  /**
   * searches for a cookie with the name
   *
   * @return mixed saved value or null if nothing found
   */
  get: function() {
    var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
    return (value) ? decodeURIComponent(value[1]) : null;
  },
  
  /** 
   * removes the cookie
   *
   * @return Cookie this
   */
  remove: function() {
    this.options.duration = -1;
    this.write('');
    return this;
  }
});

/**
 * The form unit class and extensions
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Form = new Class(Element, {
  /**
   * generic forms creation constructor
   *
   * @param Object form options
   */
  initialize: function(options) {
    var options = options || {}, remote = options['remote'],
      form = this.$super('form', Object.without(options, 'remote'));
    
    if (remote) form.remotize();
    
    return form;
  },
  
  extend: {
    /**
     * IE browsers manual elements extending
     *
     * @param Element form
     * @return Form element
     */
    ext: function(element) {
      return $ext(element, this.Methods);
    },
    
    Methods: {
      /**
       * returns the form elements as an array of extended units
       *
       * @return Array of elements
       */
      getElements: function() {
        return $A(this.elements).map($);
      },
      
      /**
       * returns the list of all the input elements on the form
       *
       * @return Array of elements
       */
      inputs: function() {
        return this.getElements().filter(function(input) {
          return !input.type || !['submit', 'button', 'reset'].includes(input.type);
        });
      },
      
      /**
       * focuses on the first input element on the form
       *
       * @return Form this
       */
      focus: function() {
        var first = this.inputs().any(function(input) { return input.type != 'hidden'; });
        if (first) first.focus();
        return this.fire('focus');
      },
      
      /**
       * removes focus out of all the form elements
       *
       * @return Form this
       */
      blur: function() {
        this.getElements().each('blur');
        return this.fire('blur');
      },
      
      /**
       * disables all the elements on the form
       *
       * @return Form this
       */
      disable: function() {
        this.getElements().each('disable');
        return this.fire('disable');
      },
      
      /**
       * enables all the elements on the form
       *
       * @return Form this
       */
      enable: function() {
        this.getElements().each('enable');
        return this.fire('enable');
      },
      
      /**
       * returns the list of the form values
       *
       * @return Object values
       */
      values: function() {
        var values = {};
        
        this.inputs().each(function(input) {
          if (!input.disabled && input.name && (!['checkbox', 'radio'].includes(input.type) || input.checked))
            values[input.name] = input.getValue();
        });
        
        return values;
      },
      
      /**
       * returns the key/values organized ready to be sent via a get request
       *
       * @return String serialized values
       */
      serialize: function() {
        return Object.toQueryString(this.values());
      }
    }
  }
});

//Observer.createShortcuts(Form.Methods, $w('submit reset focus'));

try { // extending the form element prototype
  $ext(HTMLFormElement.prototype, Form.Methods);
} catch(e) {}


/**
 * there is the form-elements additional methods container
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Form.Element = {
  /**
   * IE browsers manual elements extending
   *
   * @param Element element
   * @return Element extended element
   */
  ext: function(element) {
    // highjack the native methods to be able to call them froum our wrappers
    element._blur   = element.blur;
    element._focus  = element.focus;
    element._select = element.select;
    
    return $ext(element, this.Methods);
  },
  
  Methods: {
   /**
    * uniform access to the element values
    *
    * @return String element value
    */
    getValue: function() {
      if (this.type == 'select-multiple') {
        return $A(this.getElementsByTagName('option')).map(function(option) {
          return option.selected ? option.value : null;
        }).compact();
      } else {
        return this.value;
      }
    },

    /**
    * uniform accesss to set the element value
    *
    * @param String value
    * @return Element this
    */
    setValue: function(value) {
      if (this.type == 'select-multiple') {
        value = (isArray(value) ? value : [value]).map(String);
        $A(this.getElementsByTagName('option')).each(function(option) {
          option.selected = value.includes(option.value);
        });
      } else {
        this.value = value;
      }
      return this;
    },

    /**
     * makes the element disabled
     *
     * @return Element this
     */
    disable: function() {
      this.disabled = true;
      this.fire('disable');
      return this;
    },

    /**
     * makes the element enabled
     *
     * @return Element this
     */
    enable: function() {
      this.disabled = false;
      this.fire('enable');
      return this;
    },
    
    /**
     * focuses on the element
     *
     * @return Element this
     */
    focus: function() {
      this._focus.apply(this);
      this.focused = true;
      this.fire('focus');
      return this;
    },
    
    /**
     * focuses on the element and selects its content
     *
     * @return Element this
     */
    select: function() {
      this.focus();
      this._select.apply(this);
      return this;
    },
    
    /**
     * looses the element focus
     *
     * @return Element this
     */
    blur: function() {
      this._blur.apply(this);
      this.focused = false;
      this.fire('blur');
      return this;
    }
  }
};

Observer.createShortcuts(Form.Element.Methods, $w('disable enable focus blur'));

try { // extending the input element prototypes
  [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement].each(function(klass) {
    $alias(klass.prototype, {
      blur:   '_blur',
      focus:  '_focus',
      select: '_select'
    });
    $ext(klass.prototype, Form.Element.Methods);
  });
} catch(e) {}


/**
 * XMLHttpRequest wrapper
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var Xhr = new Class(Observer, {
  extend: {
    // supported events list
    EVENTS: $w('success failure complete request cancel create'),
    
    // default options
    OPTIONS: {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
      },
      method:       'post',
      encoding:     'utf-8',
      async:        true,
      evalScripts:  false,
      evalResponse: false,
      evalJSON:     true,
      urlEncoded:   true,
      spinner:      null,
      params:       null
    },
    
    /**
     * Shortcut to initiate and send an XHR in a single call
     *
     * @param String url
     * @param Object options
     * @return Xhr request
     */
    load: function(url, options) {
      return new this(url, options).send();
    }
  },
  
  /**
   * basic constructor
   *
   * @param String url
   * @param Object options
   */
  initialize: function(url, options) {
    this.url = url;
    this.$super(options);
    
    // copying some options to the instance level attributes
    for (var key in Xhr.OPTIONS)
      this[key] = this.options[key];
      
    this.initCallbacks();
  },
  
  /**
   * sets a header 
   *
   * @param String header name
   * @param String header value
   * @return Xhr self
   */
  setHeader: function(name, value) {
    this.headers[name] = value;
    return this;
  },
  
  /**
   * tries to get a response header
   *
   * @return mixed String header value or undefined
   */
  getHeader: function(name) {
    try {
      return this.xhr.getResponseHeader(name);
    } catch(e) {}
  },
  
  /**
   * checks if the request was successful
   *
   * @return boolean check result
   */
  successful: function() {
    return (this.status >= 200) && (this.status < 300);
  },
  
  /**
   * performs the actual request sending
   *
   * @param Object options
   * @return Xhr self
   */
  send: function(params) {
    var add_params = {}, url = this.url.split('?'), url_params = url.length > 1 ? url[1] : '',
      url = url[0], params = this.prepareParams(params);
    
    var method = this.method.toUpperCase();
    if (['PUT', 'DELETE'].includes(method)) {
      add_params['_method'] = method.toLowerCase();
      method = 'POST';
    }
    
    if (this.urlEncoded && method == 'POST') {
      this.setHeader('Content-type', 'application/x-www-form-urlencoded; charset='+this.encoding);
    }
    
    this.xhr = this.createXhr();
    this.fire('create');
    
    this.xhr.open(method, url, this.async);
    
    this.xhr.onreadystatechange = this.stateChanged.bind(this);
    
    for (var key in this.headers) {
      this.xhr.setRequestHeader(key, this.headers[key]);
    }
    
    this.xhr.send(this.prepareData(this.params, url_params, params, add_params));
    this.fire('request');
    
    if (!this.async) this.stateChanged();
    
    return this;
  },
  
  /**
   * elements automaticall update method, creates an Xhr request 
   * and updates the element innerHTML value onSuccess.
   * 
   * @param Element element
   * @param Object optional request params
   * @return Xhr self
   */
  update: function(element, params) {
    return this.onSuccess(function(r) { element.update(r.text); }).send(params);
  },
  
  /**
   * stops the request processing
   *
   * @return Xhr self
   */
  cancel: function() {
    if (!this.xhr || this.xhr.canceled) return this;
    
    this.xhr.abort();
    this.xhr.onreadystatechange = function() {};
    this.xhr.canceled = true;
    
    return this.fire('cancel');
  },
  
// protected
  // wrapping the original method to send references to the xhr objects
  fire: function(name) {
    return this.$super(name, this, this.xhr);
  },
  
  // creates new request instance
  createXhr: function() {
    if (this.form && this.form.getElements().map('type').includes('file')) {
      return new Xhr.IFramed(this.form);
    } else try {
      return new XMLHttpRequest();
    } catch(e) {
      return new ActiveXObject('MSXML2.XMLHTTP');
    }
  },
  
  // prepares user sending params
  prepareParams: function(params) {
    if (params && params.tagName == 'FORM') {
      this.form = params;
      params = params.values();
    }
    return params;
  },
  
  // converts all the params into a url params string
  prepareData: function() {
    params = [];
    $A(arguments).each(function(param) {
      if (!isString(param)) {
        param = Object.toQueryString(param);
      }
      if (!param.blank()) {
        params.push(param);
      }
    });
    return params.join('&');
  },

  // handles the state change
  stateChanged: function() {
    if (this.xhr.readyState != 4 || this.xhr.canceled) return;
    
    try { this.status = this.xhr.status;
    } catch(e) { this.status = 0; }
    
    this.text = this.responseText = this.xhr.responseText;
    this.xml  = this.responseXML  = this.xhr.responseXML;
    
    this.fire('complete').fire(this.successful() ? 'success' : 'failure');
  },
  
  // called on success
  tryScripts: function(response) {
    if (this.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) {
      $eval(this.text);
    } else if ((/json/).test(this.getHeader('Content-type')) && this.evalJSON) {
      eval("this.json = this.responseJSON = "+this.text);
    } else if (this.evalScripts) {
      this.text.evalScripts();
    }
  },
  
  // initializes the request callbacks
  initCallbacks: function() {
    // global spinners are handled separately
    if (this.spinner == Xhr.OPTIONS.spinner) this.spinner = null;
    
    // creating an automatical spinner handling
    this.onCreate('showSpinner').onComplete('hideSpinner').onCancel('hideSpinner');
    
    // wiring the global xhr callbacks
    Xhr.EVENTS.each(function(name) {
      this.on(name, function() { Xhr.fire(name, this, this.xhr); });
    }, this);
    
    this.onSuccess('tryScripts');
  },
  
  showSpinner: function() { if (this.spinner) $(this.spinner).show(); },
  hideSpinner: function() { if (this.spinner) $(this.spinner).hide(); }
});

// creating the class level observer
Observer.create(Xhr);

// attaching the common spinner handling
$ext(Xhr, {
  counter: 0,
  showSpinner: function() {
    if (this.OPTIONS.spinner) $(this.OPTIONS.spinner).show();
  },
  hideSpinner: function() {
    if (this.OPTIONS.spinner) $(this.OPTIONS.spinner).hide();
  }
});

Xhr.on('create', function() {
  this.counter++;
  this.showSpinner();
}).on('complete', function() {
  this.counter--;
  if (this.counter < 1) this.hideSpinner();
}).on('cancel', function() {
  this.counter--;
  if (this.counter < 1) this.hideSpinner();
});


/**
 * Here are the Form unit Xhr extensions
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
$ext(Form.Methods, {
  /**
   * sends the form via xhr request
   *
   * @params Options xhr request options
   * @return Form this
   */
  send: function(options) {
    options = options || {};
    options['method'] = options['method'] || this.method || 'post';
    
    new Xhr(this.get('action') || document.location.href, options
      ).onRequest(this.disable.bind(this)
      ).onComplete(this.enable.bind(this)).send(this);
    
    return this;
  },
  
  /**
   * makes the form be remote by default
   *
   * @params Object default options
   * @return Form this
   */
  remotize: function(options) {
    this.onsubmit = function() { this.send.bind(this, options).delay(20); return false; };
    this.remote   = true;
    return this;
  },
  
  /**
   * removes the remote call hook
   *
   * NOTE: will nuke onsubmit attribute
   *
   * @return Form this
   */
  unremotize: function() {
    this.onsubmit = function() {};
    this.remote   = false;
    return this;
  }
});

try { // extending the form element prototype
  $ext(HTMLFormElement.prototype, Form.Methods);
} catch(e) {}

/**
 * this module contains the Element unit XHR related extensions
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Element.addMethods({
  /**
   * performs an Xhr request to the given url
   * and updates the element internals with the responseText
   *
   * @param String url address
   * @param Object xhr options
   * @return Element this
   */
  load: function(url, options) {
    new Xhr(url, Object.merge({method: 'get'}, options)).update(this);
    return this;
  }
});

/**
 * This unit presents a fake drop in replacement for the XmlHTTPRequest unit
 * but works with an iframe targeting in the background
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
Xhr.IFramed = new Class({
  /**
   * constructor
   *
   * @param Form form which will be submitted via the frame
   * @return void
   */
  initialize: function(form) {
    this.form = form;
    
    var id = 'xhr_frame_'+Math.random().toString().split('.').last();
    $E('div').insertTo(document.body).update('<iframe name="'+id+'" id="'+id+'" width="0" height="0" frameborder="0" src="about:blank"></iframe>');
    
    this.iframe = $(id);
    this.iframe.on('load', this.onLoad.bind(this));
  },
  
  send: function() {
    // stubbing the onsubmit method so it allowed us to submit the form
    var old_onsubmit = this.form.onsubmit,
        old_target   = this.form.target;
    
    this.form.onsubmit = function() {};
    this.form.target   = this.iframe.id;
    
    this.form.submit();
    
    this.form.onsubmit = old_onsubmit;
    this.form.target   = old_target;
  },
  
  onLoad: function() {
    this.status       = 200;
    this.readyState   = 4;
    this.responseText = this.iframe.document ? this.iframe.document.body.innerHTML : null;
    this.onreadystatechange();
  },
  
  // dummy API methods
  open:               function() {},
  abort:              function() {},
  setRequestHeader:   function() {},
  onreadystatechange: function() {}
});

/**
 * Basic visual effects class
 *
 * Credits: Mostly inspired by the MooTools project
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var Fx = new Class(Observer, {
  extend: {
    EVENTS: $w('start finish cancel'),
    
    // default options
    OPTIONS: {
      fps:        60,
      duration:   'normal',
      transition: 'Cos'
    },

    // named durations
    DURATIONS: {
      short:  200,
      normal: 400,
      long:   800
    },

    // list of basic transitions
    Transitions: {
      Cos: function(i) {
        return -(Math.cos(Math.PI * i) - 1) / 2;
      },
      
      Sin: function(i) {
        return 1 - Math.sin((1 - i) * Math.PI / 2);
      },
      
      Exp: function(i) {
        return Math.pow(2, 8 * (i - 1));
      },
      
      Log: function(i) {
        return Math.log(1 + (Math.E-1) * i);
      }
    }
  },
  
  /**
   * Basic constructor
   *
   * @param Object options
   */
  initialize: function(options) {
    this.$super(options);
  },
  
  /**
   * starts the transition
   *
   * @return Fx this
   */
  start: function() {
    if (this.queue(arguments)) return this;
    
    this.transition = Fx.Transitions[this.options.transition] || this.options.transition;
    var duration    = Fx.DURATIONS[this.options.duration]     || this.options.duration;
    
    this.steps  = (duration / 1000 * this.options.fps * (Browser.IE ? 0.5 : 1)).ceil();
    this.number = 1;
    
    return this.fire('start', this).startTimer();
  },
  
  /**
   * finishes the transition
   *
   * @return Fx this
   */
  finish: function() {
    return this.stopTimer().fire('finish', this);
  },
  
  /**
   * interrupts the transition
   *
   * @return Fx this
   */
  cancel: function() {
    return this.stopTimer().fire('cancel', this);
  },
  
  /**
   * pauses the transition
   *
   * @return Fx this
   */
  pause: function() {
    return this.stopTimer();
  },
  
  /**
   * resumes a paused transition
   *
   * @return Fx this
   */
  resume: function() {
    return this.startTimer();
  },
  
// protected

  // dummy method, should implement the actual things happenning
  render: function(value) {},
  
  // the periodically called method
  // NOTE: called outside of the instance scope!
  step: function($this) {
    if ($this.steps >= $this.number) {
      $this.render($this.transition($this.number / $this.steps));
      
      $this.number ++;
    } else {
      $this.finish();
    }
  },
  
  startTimer: function() {
    this.timer = this.step.periodical((1000 / this.options.fps).round(), this);
    return this;
  },
  
  stopTimer: function() {
    if (this.timer) {
      this.timer.stop();
    }
    return this;
  },

  // handles effects queing
  // should return false if there's no queue and true if there is a queue
  queue: function(args) {
    if (!this.element) return false;
    if (this.$chained) {
      delete(this['$chained']);
      return false;
    }

    var uid = $uid(this.element), chain;
    if (!this.constructor.$chains) this.constructor.$chains = {};
    if (!this.constructor.$chains[uid]) this.constructor.$chains[uid] = [];
    chain = this.constructor.$chains[uid];

    chain.push([args, this]);
    this.onFinish(function() {
      var next = chain.shift(); next = chain[0];
      if (next) {
        next[1].$chained = true;
        next[1].start.apply(next[1], next[0]);
      }
    });

    return chain[0][1] !== this;
  }
  
  
});

/**
 * Here are the Array class extensions depend on the fx library
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(Array.prototype, {
  /**
   * converts the array into a string rgb(R,G,B) definition
   *
   * @return String rgb(DDD, DDD, DDD) value
   */
  toRgb: function() {
    return 'rgb('+this.map(Math.round)+')';
  }
});

/**
 * There are the String unit extensions for the effects library
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
$ext(String, {
  COLORS: {
    maroon:  '#800000',
    red:     '#ff0000',
    orange:  '#ffA500',
    yellow:  '#ffff00',
    olive:   '#808000',
    purple:  '#800080',
    fuchsia: '#ff00ff',
    white:   '#ffffff',
    lime:    '#00ff00',
    green:   '#008000',
    navy:    '#000080',
    blue:    '#0000ff',
    aqua:    '#00ffff',
    teal:    '#008080',
    black:   '#000000',
    silver:  '#c0c0c0',
    gray:    '#808080',
    brown:   '#a52a2a'
  }
});

$ext(String.prototype, {
  /**
   * converts a #XXX or rgb(X, X, X) sring into standard #XXXXXX color string
   *
   * @return String hex color
   */
  toHex: function() {
    var match = this.match(/^#(\w)(\w)(\w)$/);
    
    if (match) {
      match = "#"+ match[1]+match[1]+match[2]+match[2]+match[3]+match[3];
    } else if (match = this.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
      match = "#"+ match.slice(1).map(function(bit) {
        bit = (bit-0).toString(16);
        return bit.length == 1 ? '0'+bit : bit;
      }).join('');
    } else {
      match = String.COLORS[this] || this;
    }
    
    return match;
  },
  
  /**
   * converts a hex string into an rgb array
   *
   * @param boolean flag if need an array
   * @return String rgb(R,G,B) or Array [R,G,B]
   */
  toRgb: function(array) {
    var match = (this.toHex()||'').match(/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i);
    
    if (match) {
      match = match.slice(1).map('toInt', 16);
      match = array ? match : match.toRgb();
    }
    
    return match;
  }
});

/**
 * This class provides the basic effect for styles manipulation
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Fx.Morph = new Class(Fx, {
  extend: {
    STYLES: $w('width height lineHeight opacity borderWidth borderColor padding margin color fontSize backgroundColor marginTop marginLeft marginRight marginBottom top left right bottom')
  },
  
  /**
   * basic constructor
   *
   * @param mixed element
   * @param Object options
   */
  initialize: function(element, options) {
    this.$super(options);
    this.element = $(element);
  },
  
  /**
   * starts the effect
   *
   * @param mixed an Object with an end style or a string with the end class-name(s)
   * @return Fx this
   */
  start: function(style) {
    this.endStyle   = this._findStyle(style);
    this.startStyle = this._getStyle(this.element, Object.keys(this.endStyle));

    this._cleanStyles(this.startStyle, this.endStyle);
    
    return Object.keys(this.endStyle).length ? this.$super() : this.finish();
  },
  
// protected
  render: function(delta) {
    var style = {}, value;
    
    for (var key in this.endStyle) {
      value = this._calcStyle(key, delta);
      if (key == 'opacity') {
        this.element.setOpacity(value);
      } else {
        this.element.style[key] = value;
      }
    }
  },
  
// private

  // calculates the current style value
  _calcStyle: function(key, delta) {
    var start = this.startStyle[key], end = this.endStyle[key];
    
    if (typeof(start) == 'number') {
      // handling floats like opacity
      return start + (end - start) * delta;
      
    } else if(start.length == 2) {
      // handling usual sizes with dimensions
      return (start[0] + (end[0] - start[0]) * delta) + end[1];
      
    } else if(start.length == 3) {
      // calculating colors
      return end.map(function(value, i) {
        return start[i] + (value - start[i]) * delta;
      }).toRgb();
    }
  },

  // finds the style definition by a css-selector string
  _findStyle: function(style) {
    Fx.Morph._container = Fx.Morph._container || $E('div').insertTo(document.body
      ).setStyle({ overflow: 'hidden', display: 'none' });
    
    var element = $E('div').insertTo(Fx.Morph._container)[isString(style) ? 'addClass' : 'setStyle'](style);
    var result  = this._getStyle(element, isString(style) ? Fx.Morph.STYLES : Object.keys(style));
    
    if (isString(style) && ('width' in result || 'height' in result) ) {
      // fixing the width and heights
      var styles = element.computedStyles();
      var width  = element._getStyle(styles, 'width');
      var height = element._getStyle(styles, 'height');
      
      if (!width  || width == 'auto')  delete(result['width']);
      if (!height || height == 'auto') delete(result['height']);
    }
    
    element.remove();
    
    return result;
  },
  
  // grabs computed styles with the given keys out of the element
  _getStyle: function(element, keys) {
    var style = {}, styles = element.computedStyles(), name;
    if (isString(keys)) { name = keys, keys = [keys]; }
    
    // keys preprocessing
    keys.map(function(key) {
      switch (key) {
        case 'background': return 'backgroundColor';
        case 'border':     return ['borderWidth', 'borderColor'];
        default:           return key;
      }
    }).flatten().each(function(key) {
      key = key.camelize();
      style[key] = element._getStyle(styles, key);
      
      if (!style[key] || style[key] == 'auto') {
        style[key] = key == 'width'  ? element.offsetWidth  + 'px' :
                     key == 'height' ? element.offsetHeight + 'px' : '';
      }
    });
    
    return name ? style[name] : style;
  },
  
  // prepares the style values to be processed correctly
  _cleanStyles: function() {
    // filling up missing styles
    for (var key in this.endStyle) {
      if (this.startStyle[key] === '' && this.endStyle[key].match(/^[\d\.]+[a-z]+$/)) {
        this.startStyle[key] = '0px';
      }
    }
    
    $A(arguments).each(this._cleanStyle, this);
    
    // removing duplications between start and end styles
    for (var key in this.endStyle) {
      if (this.endStyle[key] instanceof Array ?
         this.endStyle[key].join() === this.startStyle[key].join() :
         this.endStyle[key] === this.startStyle[key]) {
        delete(this.endStyle[key]);
        delete(this.startStyle[key]);
      }
    }
  },
  
  // cleans up a style object
  _cleanStyle: function(style) {
    var match;
    for (var key in style) {
      if (Fx.Morph.STYLES.includes(key) && style[key] !== '') {
        style[key] = String(style[key]);
        
        if (key.match(/color/i)) {
          // preparing the colors
          style[key] = style[key].toRgb(true);
          if (!style[key]) delete(style[key]);
        } else if (style[key].match(/^[\d\.]+$/)) {
          // preparing numberic values
          style[key] = style[key].toFloat();
        } else if (match = style[key].match(/^([\d\.]+)([a-z]+)$/i)) {
          // preparing values with dimensions
          style[key] = [match[1].toFloat(), match[2]];
        }
        
      } else {
        delete(style[key]);
      }
    }
  }
});

/**
 * the elements hightlighting effect
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Fx.Highlight = new Class(Fx.Morph, {
  extend: {
    OPTIONS: Object.merge(Fx.OPTIONS, {
      color:      '#FF8',
      transition: 'Sin'
    })
  },
  
  /**
   * starts the transition
   *
   * @param String the hightlight color
   * @param String optional fallback color
   * @return self
   */
  start: function(start, end) {
    var end_color = end || this._getStyle(this.element, 'backgroundColor');
    
    if (end_color == 'transparent' || end_color == 'rgba(0, 0, 0, 0)') {
      this.onFinish(function() { this.element.style.backgroundColor = 'transparent'; });
      end_color = '#FFF';
    }
    
    this.element.style.backgroundColor = (start || this.options.color);
    
    return this.$super({backgroundColor: end_color});
  }
});

/**
 * this is a superclass for the bidirectional effects
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Fx.Tween = new Class(Fx.Morph, {
  
  /**
   * hides the element if it meant to be switched off
   *
   * @return Fx self
   */
  finish: function() {
    if (this.how == 'out')
      this.element.hide();
      
    return this.$super();
  },

// protected
  
  /**
   * assigns the direction of the effect in or out
   *
   * @param String 'in', 'out' or 'toggle', 'toggle' by default
   */
  setHow: function(how) {
    this.how = how || 'toggle';
    
    if (this.how == 'toggle')
      this.how = this.element.visible() ? 'out' : 'in';
  }

});

/**
 * the slide effects wrapper
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Fx.Slide = new Class(Fx.Tween, {
  extend: {
    OPTIONS: Object.merge(Fx.OPTIONS, {
      direction: 'top'
    })
  },
  
  start: function(how) {
    this.setHow(how);

    this.element.show();
    this.sizes = this.element.sizes();
    this.styles = this._getStyle(this.element, $w('overflow height width marginTop marginLeft'));

    this.element.style.overflow = 'hidden';
    this.onFinish('_getBack').onCancel('_getBack');

    return this.$super(this._endStyle(this.options.direction));
  },

// protected
  _getBack: function() {
    this.element.setStyle(this.styles);
  },

  // calculates the final style
  _endStyle: function(direction) {
    var style = {}, marginLeft = this.styles.marginLeft.toFloat(), marginTop = this.styles.marginTop.toFloat();

    if (this.how == 'out') {
      style[['top', 'bottom'].includes(direction) ? 'height' : 'width'] = '0px';

      if (direction == 'right') {
        style['marginLeft'] = marginLeft + this.sizes.x+'px';
      } else if (direction == 'bottom') {
        style['marginTop'] = marginTop + this.sizes.y +'px';
      }

    } else if (this.how == 'in') {      
      if (['top', 'bottom'].includes(direction)) {
        style['height'] = this.sizes.y + 'px';
        this.element.style.height = '0px';
      } else {
        style['width'] = this.sizes.x + 'px';
        this.element.style.width = '0px';
      }

      if (direction == 'right') {
        this.element.style.marginLeft = marginLeft + this.sizes.x + 'px';
        style['marginLeft'] = marginLeft + 'px';
      } else if (direction == 'bottom') {
        this.element.style.marginTop = marginTop + this.sizes.y + 'px';
        style['marginTop'] = marginTop + 'px';
      }
    }

    return style;
  }

});

/**
 * The opacity effects wrapper
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Fx.Fade = new Class(Fx.Tween, {
  start: function(how) {
    this.setHow(how);
    
    if (this.how == 'in')
      this.element.setOpacity(0).show();
    
    this.$super({opacity: typeof(how) == 'number' ? how : this.how == 'in' ? 1 : 0});
  }
});

/**
 * This block contains additional Element shortcuts for effects easy handling
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Element.addMethods({
  /**
   * hides the element with given visual effect
   *
   * @param String fx name
   * @param Object fx options
   */
  hide: function(fx, options) {
    return fx ? this.fx(fx, ['out', options], this._hide) : this._hide();
  },
  _hide: Element.Methods.hide,
  
  /**
   * shows the element with the given visual effect
   *
   * @param String fx name
   * @param Object fx options
   */
  show: function(fx, options) {
    return fx ? this.fx(fx, ['in', options], this._show) : this._show();
  },
  _show: Element.Methods.show,
  
  /**
   * resizes the element using the Morph visual effect
   *
   * @param Integer width
   * @param Integer height
   * @param Object options
   */
  resize: function(width, height, options) {
    if (isHash(width)) {
      height = width.y;
      width  = width.x;
    }
    if (options) {
      var style = {};
      if (isNumber(height)) style.height = height+'px';
      if (isNumber(width))  style.width  = width +'px';
      
      if (!isHash(options)) options = {duration: options};
      
      return this.fx('morph', [style, options]);
    } else {
      return this._resize(width, height);
    }
  },
  _resize: Element.Methods.resize,
  
  /**
   * runs the Fx.Morth effect to the given style
   *
   * @param Object style or a String class names
   * @param Object optional effect options
   * @return Element self
   */
  morph: function(style, options) {
    return this.fx('morph', [style, options]);
  },
  
  /**
   * highlights the element
   *
   * @param String start color
   * @param String optional end color
   * @param Object effect options
   * @return Element self
   */
  highlight: function() {
    return this.fx('highlight', arguments);
  },
  
  /**
   * runs the Fx.Fade effect on the element
   *
   * @param mixed fade direction 'in' 'out' or a float number
   * @return Element self
   */
  fade: function() {
    return this.fx('fade', arguments);
  },
  
  /**
   * runs the Fx.Slide effect on the element
   *
   * @param String 'in' or 'out'
   * @param Object effect options
   * @return Element self
   */
  slide: function() {
    return this.fx('slide', arguments);
  },
  
// protected

  // runs an Fx on the element
  fx: function(name, args, on_finish) {
    var args = $A(args).compact(), options = {};
    if (isHash(args.last())) { options = args.pop(); }
    
    var fx = new Fx[name.capitalize()](this, options);
    if (on_finish) fx.onFinish(on_finish.bind(this));
    fx.start.apply(fx, args);
    
    return this;
  }
  
});

