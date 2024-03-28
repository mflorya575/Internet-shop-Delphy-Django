!function(e){"use strict";function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(jQuery);i.default.syotimerLang={rus:{second:["секунда","секунды","секунд"],minute:["минута","минуты","минут"],hour:["час","часа","часов"],day:["день","дня","дней"],handler:function(e,t){return e%100>4&&e%100<20?t[2]:t[[2,0,1,1,1,2][e%10<5?e%10:5]]}},eng:{second:["second","seconds"],minute:["minute","minutes"],hour:["hour","hours"],day:["day","days"]},por:{second:["segundo","segundos"],minute:["minuto","minutos"],hour:["hora","horas"],day:["dia","dias"]},spa:{second:["segundo","segundos"],minute:["minuto","minutos"],hour:["hora","horas"],day:["día","días"]},heb:{second:["שניה","שניות"],minute:["דקה","דקות"],hour:["שעה","שעות"],day:["יום","ימים"]}};var n="day",a="hour",o="minute",s="second",r={d:n,h:a,m:o,s:s},d={list:[s,o,a,n],next:function(e){var t=this.list.indexOf(e);return t<this.list.length?this.list[t+1]:null},prev:function(e){var t=this.list.indexOf(e);return t>0?this.list[t-1]:null}},l={second:!1,minute:!1,hour:!1,day:!1},u={date:0,layout:"dhms",periodic:!1,periodInterval:7,periodUnit:"d",doubleNumbers:!0,effectType:"none",lang:"eng",headTitle:"",footTitle:"",afterDeadline:function(e){e.bodyBlock.html('<p style="font-size: 1.2em;">The countdown is finished!</p>')},itemTypes:["day","hour","minute","second"],itemsHas:i.default.extend({},l)};function c(e){switch(e){case"d":case n:return 86400;case"h":case a:return 3600;case"m":case o:return 60;case"s":case s:default:return 1}}var m=function(e,t){return 1===e?t[0]:t[1]};function h(e,t,i){return($.syotimerLang[t].handler||m)(e,$.syotimerLang[t][i])}var f=function(){function e(e,t){this.element=i.default(e),this.element.data("syotimer-options",t),this.render()}return e.prototype.render=function(){for(var e,t,n,a=this.element.data("syotimer-options"),o=(e=$("<div/>",{class:"syotimer-cell__value",text:"0"}),t=$("<div/>",{class:"syotimer-cell__unit"}),(n=$("<div/>",{class:"syotimer-cell"})).append(e).append(t),n),s=i.default("<div/>",{class:"syotimer__head"}).html(a.headTitle),r=i.default("<div/>",{class:"syotimer__body"}),d=i.default("<div/>",{class:"syotimer__footer"}).html(a.footTitle),l={},u=0;u<a.itemTypes.length;u+=1){var c=o.clone();c.addClass("syotimer-cell_type_"+a.itemTypes[u]),r.append(c),l[a.itemTypes[u]]=c}var m={headBlock:s,bodyBlock:r,footBlock:d};this.element.data("syotimer-blocks",m).data("syotimer-items",l).addClass("syotimer").append(s).append(r).append(d)},e.prototype.tick=function(){var e=this.element.data("syotimer-options");i.default(".syotimer-cell > .syotimer-cell__value",this.element).css("opacity",1);var t=(new Date).getTime(),n=function(e,t){var i,n=e/1e3;if(n=Math.floor(n),!t.periodic)return n;var a=c(t.periodUnit),o=e/(1e3*a);o=Math.ceil(o),o=Math.abs(o),n>=0?(i=0==(i=o%t.periodInterval)?t.periodInterval:i,i-=1):i=t.periodInterval-o%t.periodInterval;var s=n%a;return 0===s&&n<0&&(i-=1),Math.abs(i*a+s)}((e.date instanceof Date?e.date.getTime():e.date)-t,e);if(n>=0)this.refreshUnitsDom(n),this.applyEffectSwitch(e.effectType);else{var a=i.default.extend(this.element,this.element.data("syotimer-blocks"));e.afterDeadline(a)}},e.prototype.refreshUnitsDom=function(e){var t,a,o=this.element.data("syotimer-options"),s=this.element.data("syotimer-items"),r=o.itemTypes,l=function(e){var t=e,i=n,a={day:0,hour:0,minute:0,second:0};do{var o=c(i);a[i]=Math.floor(t/o),t%=o}while(i=d.prev(i));return a}(e);o.itemsHas.day||(l.hour+=24*l.day),o.itemsHas.hour||(l.minute+=60*l.hour),o.itemsHas.minute||(l.second+=60*l.minute);for(var u=0;u<r.length;u+=1){var m=r[u],f=l[m],y=s[m];y.data("syotimer-unit-value",f),i.default(".syotimer-cell__value",y).html((t=f,a=m!==n&&o.doubleNumbers,t<=9&&a?"0"+t:String(t))),i.default(".syotimer-cell__unit",y).html(h(f,o.lang,m))}},e.prototype.applyEffectSwitch=function(e,t){var n=this;switch(void 0===t&&(t=s),e){case"opacity":var a=this.element.data("syotimer-items")[t];if(a){var o=d.next(t),r=a.data("syotimer-unit-value");i.default(".syotimer-cell__value",a).animate({opacity:.1},1e3,"linear",(function(){return n.tick()})),o&&0===r&&this.applyEffectSwitch(e,o)}return;case"none":default:setTimeout((function(){return n.tick()}),1e3)}},e}();function y(e,t){var n=i.default.extend({},u,t||{});n.itemTypes=function(e){for(var t=[],i=0;i<e.length;i+=1)t.push(r[e[i]]);return t}(n.layout),n.itemsHas=i.default.extend({},l);for(var a=0;a<n.itemTypes.length;a+=1)n.itemsHas[n.itemTypes[a]]=!0;return e.each((function(){new f(this,n).tick()}))}var p={setOption:function(e,t){var n=i.default(this),a=n.data("syotimer-options");Object.prototype.hasOwnProperty.call(a,e)&&(a[e]=t,n.data("syotimer-options",a))}};i.default.fn.extend({syotimer:function(e,t,n){return"string"==typeof e&&"setOption"===e?this.each((function(){p[e].apply(this,[t,n])})):null==e||"object"==typeof e?y(this,e):i.default.error("SyoTimer. Error in call methods: methods is not exist")}})}();