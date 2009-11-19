/**
 * Selectable unit for RightJS (http://rightjs.org/ui/selectable)
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
if (!self.RightJS) throw "Gimme RightJS";
var Selectable=new Class(Observer,{extend:{EVENTS:$w('change select unselect disable enable hover leave show hide'),Options:{options:null,selected:null,disabled:null,multiple:true,fxName:'slide',fxDuration:'short',update:null,parseIds:false,refresh:true},rescan:function(){$$('*.right-selectable').each(function(e){if(!e._selectable)new Selectable(e)})}},baseClass:'right-selectable',singleClass:'right-selectable-single',selectedClass:'right-selectable-selected',disabledClass:'right-selectable-disabled',containerClass:'right-selectable-container',initialize:function(){var a=$A(arguments);if(a[0]&&!isHash(a[0]))this.element=$(a[0]);this.$super(isHash(a.last())?a.last():this.element?eval('('+this.element.get('data-selectable-options')+')'):null);if(!this.element)this.element=this.build();this.element._selectable=this.init()},destroy:function(){this.items.each(function(i){i.stopObserving('click',this.onClick).stopObserving('mouseout',this.onMouseout).stopObserving('mouseover',this.onMouseover).stopObserving('mousedown',this.onMousedown).stopObserving('mouseup',this.onMouseup)},this);delete(this.element._selectable)},setValue:function(v){if(isString(v))v=v.split(',').map('trim').filter(function(a){return!a.blank()});this.items.each('removeClass',this.selectedClass);var i=this.mapEnabled(v).each('addClass',this.selectedClass);if(this.isSingle)this.showItem(i[0]);return this.calcValue()},getValue:function(){return this.value},insertTo:function(e,p){this.element.insertTo(e,p);if(this.isSingle)this.container.insertTo(this.element,'before');return this},assignTo:function(b){var a=function(e,v){if(e=$(e)){if(v===undefined||v===null)v='';e[e.setValue?'setValue':'update'](''+v)}}.curry(b);var c=function(e,o){var e=$(e);if(e&&e.onChange)e.onChange(function(){this.setValue(e.value)}.bind(o))}.curry(b);if($(b)){a(this.value);c(this)}else document.onReady(function(){a(this.value);c(this)}.bind(this));return this.onChange(a)},disable:function(k){this.mapOrAll(k).each(function(i){this.fire('disable',i.addClass(this.disabledClass))},this);return this},enable:function(k){this.mapOrAll(k).each(function(i){this.fire('enable',i.removeClass(this.disabledClass))},this);return this},disabled:function(k){return this.mapOrAll(k).every('hasClass',this.disabledClass)},select:function(k){var a=this.mapEnabled(k);if(this.isSingle&&a){this.items.each('removeClass',this.selectedClass);a=[a[0]]}a.each(function(i){this.fire('select',i.addClass(this.selectedClass))},this);return this},unselect:function(k){this.mapEnabled(k).each(function(i){this.fire('unselect',i.removeClass(this.selectedClass))},this);return this},selected:function(k){return this.mapEnabled(k).every('hasClass',this.selectedClass)},refresh:function(){this.items=this.element.select('li').each(function(i){if(!this.items||!this.items.include(i))i.on({click:this.onClick,mouseup:this.onMouseup,mousedown:this.onMousedown,mouseover:this.onMouseover,mouseout:this.onMouseout})},this);return this},init:function(){this.element.addClass(this.baseClass);if(this.isSingle=!this.options.multiple||this.element.hasClass(this.singleClass))this.buildSingle().element.addClass(this.singleClass);this.onMousedown=this.mousedown.bind(this);this.onMouseup=this.mouseup.bind(this);this.onMouseover=this.mouseover.bind(this);this.onMouseout=this.mouseout.bind(this);this.onClick=this.click.bind(this);this.value=null;this.refresh().onSelect('calcValue').onUnselect('calcValue');if(this.isSingle)this.onSelect('showItem');if(this.options.disabled)this.disable(this.options.disabled);if(this.options.selected)this.select(this.options.selected);if(this.options.update)this.assignTo(this.options.update);if(this.isSingle){if(this.options.selected===null)this.select(this.items[0]);this.onSelect('hideList')}if(this.options.refresh){var o=this.element.update;this.element.update=function(){var r=o.apply(this.element,arguments);this.refresh();return r}.bind(this)}return this},calcValue:function(){if(this.isSingle){var a=this.items.first('hasClass',this.selectedClass);var v=a?this.itemValue(a):null}else var v=this.items.filter('hasClass',this.selectedClass).map(function(i){return this.itemValue(i)},this);if(v!=this.value){this.value=v;this.fire('change',v,this)}return this},itemValue:function(i){return i.id?this.options.parseIds?i.id.match(/\d+/):i.id:this.items.indexOf(i)},fire:function(n,i){if(i&&i.tagName)this.$super(n,i,this.items.indexOf(i),this);else this.$super.apply(this,arguments);return this},map:function(c){if(!isArray(c))c=[c];return c.map(function(k){var i=(isString(k)&&/^\d+$/.test(k))?k.toInt():k,b=k;if(isNumber(i))b=this.items[i];else if(isString(k))b=this.items.first(function(a){return a.id==k});return b},this).compact()},mapOrAll:function(k){return k?this.map(k):this.items},mapEnabled:function(k){return this.mapOrAll(k).filter(function(i){return!i.hasClass(this.disabledClass)},this)},mousedown:function(e){e.stop();var c=e.target;if(!this.disabled(c)){if(this.isSingle)this.select(c);else if(this.selected(c)){this.unselect(c);this._massRemove=true}else{this.select(c);this._massSelect=true}if((e.shiftKey||e.metaKey)&&this._prevItem){var a=this.items.indexOf(this._prevItem);var b=this.items.indexOf(c);if(a!=b){if(a>b){var t=a;a=b;b=a}for(var i=a;i<b;i++)this[this._prevItem.hasClass(this.selectedClass)?'select':'unselect'](this.items[i])}}this._prevItem=c}},mouseup:function(e){e.stop();this._massRemove=this._massSelect=false},mouseover:function(e){var i=e.target;this.fire('hover',i);if(!this.isSingle){if(this._massSelect)this.select(i);else if(this._massRemove)this.unselect(i)}},mouseout:function(e){this.fire('leave',e.target)},click:function(e){e.stop()},build:function(){var e=$E('ul'),a=this.options.options;if(isArray(a))a.each(function(o){e.insert($E('li',{html:o}))});else for(var k in a)e.insert($E('li',{id:k,html:a[k]}));return e},buildSingle:function(){this.container=$E('div',{'class':this.containerClass}).insert([$E('div',{'html':'&bull;','class':'right-selectable-handle'}),$E('ul')]).insertTo(this.element,'before').onClick(this.showList.bind(this));document.onClick(this.hideList.bind(this));return this},showList:function(e){e.stop();if(this.isSingle){var d=this.container.dimensions();this.element.setStyle({top:(d.top+d.height)+'px',left:d.left+'px',width:d.width+'px'}).show(this.options.fxName,{duration:this.options.fxDuration,onFinish:this.fire.bind(this,'show',this)});if(!this.options.fxName)this.fire('show',this)}},hideList:function(){if(this.isSingle&&this.element.visible()){this.element.hide(this.options.fxName,{duration:this.options.fxDuration,onFinish:this.fire.bind(this,'hide',this)});if(!this.options.fxName)this.fire('hide',this)}},showItem:function(i){this.container.first('ul').update(i?i.cloneNode(true):'<li>&nbsp;</li>')}});document.onReady(function(){Selectable.rescan()});document.write("<style type=\"text/css\">*.right-selectable,*.right-selectable li,*.right-selectable dt,*.right-selectable dd,*.right-selectable ul,div.right-selectable-container ul,div.right-selectable-container ul li{margin:0;padding:0;border:none;background:none;list-style:none}*.right-selectable{border:1px solid #CCC;border-bottom:none;display:inline-block;*display:inline;*zoom:1;min-width:10em;-moz-border-radius:.2em;-webkit-border-radius:.2em}*.right-selectable li{padding:.3em 1em;cursor:pointer;border-bottom:1px solid #CCC}*.right-selectable li:hover{background:#EEE}*.right-selectable li.right-selectable-selected{font-weight:bold;background:#DDD}*.right-selectable li.right-selectable-disabled,*.right-selectable li.right-selectable-disabled:hover{background:#CCC;color:#777;cursor:default}dl.right-selectable dt{padding:.3em .5em;cursor:default;font-weight:bold;font-style:italic;color:#444;background:#EEE;border-bottom:1px solid #CCC}dl.right-selectable dd li{padding-left:1.5em}*.right-selectable-single{-moz-box-shadow:#AAA .2em .2em .5em;-webkit-box-shadow:#AAA .2em .2em .5em;display:none;position:absolute;background:#FFF}div.right-selectable-container{border:1px solid #CCC;-moz-border-radius:.2em;-webkit-border-radius:.2em;display:inline-block;*display:inline;*zoom:1;*width:10em;min-width:10em;cursor:pointer;height:1.6em}div.right-selectable-container div.right-selectable-handle{font-family:Arial;float:right;width:0.8em;background:#DDD;text-align:center;height:100%;line-height:0.8em;font-size:200%;color:#888;border-left:1px solid #CCC}div.right-selectable-container:hover div{color:#666}div.right-selectable-container ul{display:block;width:auto;margin-right:2em;overflow:hidden}div.right-selectable-container ul li{line-height:1.6em;padding:0 .5em}</style>");