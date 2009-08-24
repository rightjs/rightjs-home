/**
 * The native tooltips feature for RightJS
 *
 * See http://rightjs.org/ui/tooltips for more details
 *
 * Copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
if (!RightJS) throw "Gimme RightJS!";
var Tooltip=new Class({include:Options,extend:{Options:{checkTags:'*',relName:'tooltip',idSuffix:'-tooltip',fxName:'fade',fxDuration:400,delay:400},current:null},initialize:function(e){this.element=$E('div',{'class':'right-tooltip'}).insertTo(document.body).hide();this.container=$E('div',{'class':'right-tooltip-container'}).insertTo(this.element);this.setOptions().assignTo(e)},setText:function(t){this.container.update(t);return this},getText:function(){return this.container.innerHTML},hide:function(){Tooltip.current=null;this.cancelTimer();this.element.hide(this.options.fxName,{duration:this.options.fxDuration});return this},show:function(){Tooltip.current=this;this.element.show(this.options.fxName,{duration:this.options.fxDuration});return this},showDelayed:function(){Tooltip.current=this;this.timer=this.show.bind(this).delay(this.options.delay)},cancelTimer:function(){if(this.timer){this.timer.cancel();this.timer=null}},moveTo:function(e){this.element.style.left=e.pageX+'px';this.element.style.top=e.pageY+'px';return this},assignTo:function(e){this.setText(e.get('title')||e.get('alt'));e.setAttribute('title','');e.setAttribute('alt','');e.on({mouseover:this.showDelayed.bind(this),mouseout:this.hide.bind(this)});if(e.id)this.element.id=e.id+this.options.idSuffix;this.associate=e;return this}});document.onReady(function(){$$(Tooltip.Options.checkTags+'[rel='+Tooltip.Options.relName+']').each(function(e){var t=e.get('title')||e.get('alt');if(t)new Tooltip(e)});document.onMousemove(function(a){if(Tooltip.current)Tooltip.current.moveTo(a)})});document.write("<style type=\"text/css\">div.right-tooltip{position:absolute;margin-top:16pt;margin-left:2pt;border:1px solid #DDD;background-color:#FFF8EE;color:#666;font-size:80%;cursor:default;border-radius:.4em;-moz-border-radius:.4em;-webkit-border-radius:.4em;box-shadow:.4em .4em .4em #AAA;-moz-box-shadow:.4em .4em .4em #AAA;-webkit-box-shadow:.4em .4em .4em #AAA}div.right-tooltip-container{margin:.6em;border-left:2px solid brown;padding-left:.5em}</style>");