/**
 * RightJS UI Slider unit (http://rightjs.org/ui/slider)
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
if (!self.RightJS || !self.Draggable) throw "Gimme RightJS w/ DnD";
var Slider=new Class(Observer,{extend:{EVENTS:$w('change'),Options:{min:0,max:100,snap:0,value:null,direction:'x',update:null,round:0},rescan:function(){$$('div.right-slider').each(function(e){if(!e._slider)new Slider(e)})}},initialize:function(){var a=$A(arguments);this.element=(a[0]&&!isHash(a[0]))?$(a.shift()):this.build();this.$super(isHash(a[0])?a[0]:eval('('+this.element.get('data-slider-options')+')'));if(this.options.update)this.assignTo(this.options.update);this.element._slider=this.init()},destroy:function(){this.handle.undoDraggable();delete(this.element._slider);return this},setValue:function(v){var v=isString(v)?v.toFloat():v;var b=Math.pow(10,this.options.round);v=(v*b).round()/b;if(this.options.snap)v=v-v % this.options.snap;if(v<this.options.min)v=this.options.min;if(v>this.options.max)v=this.options.max;this.moveTo(v);if(v!==this.value)this.fire('change',this.value=v);return this},getValue:function(){return this.value},reset:function(v){return this.precalc().setValue([v,this.options.value,this.options.min].compact()[0])},insertTo:function(e,p){this.element.insertTo(e,p);return this.reset(this.value)},assignTo:function(e){var e=$(e);var a=function(v){e[e.setValue?'setValue':'update'](''+v)};a(this.value);return this.onChange(a)},init:function(){this.handle=this.element.first('div.right-slider-handle').makeDraggable({onBefore:this.prepare.bind(this),onDrag:this.dragged.bind(this)});if(this.options.direction=='y')this.element.addClass('right-slider-vertical');else this.options.direction=this.element.hasClass('right-slider-vertical')?'y':'x';if(this.konqFix=(RightJS.version<'1.5.0'&&!this.handle.getBoundingClientRect)){var p=this.element;var o=this.handle.dimensions;this.handle.dimensions=function(){var d=o.call(this);var s=p.dimensions();d.top+=s.top;d.left+=s.left;return d}}return this.reset()},build:function(){return $E('div',{'class':'right-slider'}).insert($E('div',{'class':'right-slider-handle'}))},dragged:function(d,e){var p=d.element.style[this.horizontal?'left':'top'].toFloat();if(!this.horizontal)p=this.space-p;var v=p/this.space*(this.options.max-this.options.min)+this.options.min;this.setValue(v)},prepare:function(d){this.precalc().moveTo(this.value);var o=this.offset;var e=this.dimensions;var a=d.options;a.range={};if((a.axis=this.options.direction)=='x'){a.range.x=[e.left+o,e.left+e.width-o];if(this.konqFix)a.range.x[0]-=e.left}else{a.range.y=[e.top+o,e.top+e.height-o];if(this.konqFix)a.range.y[0]-=e.top}if(this.options.snap)a.snap=this.space/(this.options.max-this.options.min)*this.options.snap},moveTo:function(v){var p=this.space/(this.options.max-this.options.min)*(v-this.options.min);if(!this.horizontal)p=this.space-p;this.handle.style[this.horizontal?'left':'top']=p+'px';return this},precalc:function(){var h=this.handle.setStyle({left:'0',top:'0'}).dimensions();this.dimensions=this.element.dimensions();this.horizontal=this.options.direction=='x';this.offset=this.horizontal?h.left-this.dimensions.left:h.top-this.dimensions.top;this.space=(this.horizontal?this.dimensions.width-h.width:this.dimensions.height-h.height)-this.offset*2;return this}});document.onReady(Slider.rescan);document.write("<style type=\"text/css\">div.right-slider,div.right-slider-handle{margin:0;padding:0;border:none;background:none}div.right-slider{height:0.4em;width:20em;border:1px solid #CCC;background:#EEE;-moz-border-radius:.2em;-webkit-border-radius:.2em;position:relative;margin:.6em 0}div.right-slider-handle{position:absolute;left:0;top:0;cursor:pointer;width:4pt;height:1em;margin-top:-0.4em;margin-left:0.1em;background:#CCC;border:1px solid #AAA;-moz-border-radius:.2em;-webkit-border-radius:.2em}div.right-slider-vertical{height:10em;width:0.4em;margin:0 .3em}div.right-slider-vertical div.right-slider-handle{margin:0;margin-left:-0.4em;margin-top:0.1em;height:4pt;width:1em}</style>");