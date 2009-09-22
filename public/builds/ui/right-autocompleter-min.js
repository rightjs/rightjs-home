/**
 * The autocompletion feature implemented with RightJS
 *
 * Home page: http://rightjs.org/ui/autocompleter
 *
 * @copyright (C) 2009 Nikolay V. Nemshilov aka St.
 */
if (!RightJS) { throw "Gimme RightJS. Please." };
var Autocompleter=new Class(Observer,{extend:{EVENTS:$w('show hide update load select done'),Options:{url:document.location.href,param:'search',method:'get',minLength:1,threshold:200,cache:true,local:null,fxName:'slide',fxDuration:'short',spinner:'native',relName:'autocompleter'}},initialize:function(i,o){this.$super(o);this.input=$(i).onKeyup(this.watch.bind(this)).onBlur(this.hide.bind(this));this.container=$E('div',{'class':'autocompleter'}).insertTo(this.input,'after');this.checkSpinner()},setOptions:function(o){this.$super(o);if(!this.options.url.includes('%{search}'))this.options.url=(this.options.url.includes('?')?'&':'?')+this.options.param+'=%{search}'},show:function(){if(this.container.hidden()){var d=this.input.dimensions();this.container.setStyle({top:(d.top+d.height)+'px',left:d.left+'px',width:d.width+'px'}).show(this.options.fxName,{duration:this.options.fxDuration,onFinish:this.fire.bind(this,'show')})}return Autocompleter.current=this},hide:function(){if(this.container.visible()){this.container.hide();this.fire.bind(this,'hide')}Autocompleter.current=null;return this},prev:function(){return this.select('prev',this.container.select('li').last())},next:function(){return this.select('next',this.container.first('li'))},done:function(c){var c=c||this.container.first('li.current');if(c)this.input.value=c.innerHTML.stripTags();return this.fire('done').hide()},select:function(w,f){var c=this.container.first('li.current');if(c)c=c[w]('li')||c;return this.fire('select',(c||f).radioClass('current'))},watch:function(e){if([27,37,38,39,40,13].include(e.keyCode))return;if(this.input.value.length>=this.options.minLength){if(this.timeout)this.timeout.cancel();this.timeout=this.trigger.bind(this).delay(this.options.threshold)}else return this.hide()},trigger:function(){this.timeout=null;this.cache=this.cache||{};var s=this.input.value;if(s.length<this.options.minLength)return this.hide();if(this.cache[s])this.suggest(this.cache[s],s);else if(this.options.local)this.suggest(this.findLocal(s),s);else this.request=Xhr.load(this.options.url.replace('%{search}',encodeURIComponent(s)),{method:this.options.method,spinner:this.options.spinner,onComplete:function(r){this.fire('load').suggest(r.responseText,s)}.bind(this)})},suggest:function(r,s){this.container.update(r).select('li').each(function(l){l.onmouseover=function(){l.radioClass('current')};l.onmousedown=function(){this.done(l)}.bind(this)},this);if(this.options.cache)this.cache[s]=r;return this.fire('update').show()},findLocal:function(s){var r=new RegExp("("+RegExp.escape(s)+")",'ig');return $E('ul').insert(this.options.local.map(function(o){if(r.test(o))return $E('li',{html:o.replace(r,'<strong>$1</strong>')})}).compact())},checkSpinner:function(){if(this.options.spinner=='native'){var b=this.input.dimensions();this.options.spinner=$E('div',{'class':'autocompleter-spinner'}).setStyle({top:(b.top+1)+'px',height:(b.height-2)+'px',lineHeight:(b.height-2)+'px',left:(b.left+b.width-19)+'px'}).insertTo(this.input,'after');var c='123'.split('').map(function(a){return $E('div',{'class':'dot-'+a,html:'&raquo;'})});(function(){var d=c.shift();c.push(d);this.options.spinner.update(d)}.bind(this)).periodical(400)}}});document.onReady(function(){$$('input[rel^="autocompleter"]').each(function(i){var m=i.get('rel').match(/^[a-z]+\[(.*?)\]$/);if(m){var u=m[1],o={};if(u.match(/^['"].*?['"]$/))o.local=eval('['+u+']');else if(!u.blank())o.url=u;i.autocompleter=new Autocompleter(i,o)}})}).onKeydown(function(e){if(Autocompleter.current){var n;switch(e.keyCode){case 27:n='hide';break;case 37:n='prev';break;case 39:n='next';break;case 38:n='prev';break;case 40:n='next';break;case 13:n='done';break}if(n){Autocompleter.current[n]();e.stop()}}});document.write("<style type=\"text/css\">div.autocompleter{display:none;position:absolute;z-index:1000000000000;border:none;margin:0;padding:0;background:white;-moz-box-shadow:#BBB .2em .2em .4em;-webkit-box-shadow:#BBB .2em .2em .4em;overflow:hidden}div.autocompleter ul{list-style:none;margin:0;padding:0;border:none;background:none;*border-bottom:1px solid #CCC}div.autocompleter ul li{list-style:none;font-weight:normal;margin:0;padding:.2em .4em;border:1px solid #CCC;border-top:none;border-bottom:none;background:none;cursor:pointer}div.autocompleter ul li:first-child{border-top:1px solid #CCC}div.autocompleter ul li:last-child{border-bottom:1px solid #CCC;*border-bottom:none}div.autocompleter ul li.current{background:#DDD}div.autocompleter-spinner{position:absolute;z-index:1000000000000;width:18px;text-align:center;font-size:140%;font-family:Georgia;background:#DDD;color:#666;display:none;margin:0;padding:0}div.autocompleter-spinner div.dot-1{margin-left:-4px}div.autocompleter-spinner div.dot-2{}div.autocompleter-spinner div.dot-3{margin-left:4px}</style>");