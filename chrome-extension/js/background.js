!function(t){var e={};function r(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(i,a,function(e){return t[e]}.bind(null,a));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}({2:function(t,e,r){"use strict";r.r(e);chrome.tabs.onUpdated.addListener(t=>chrome.pageAction.show(t)),(new class{constructor(){this.token=localStorage.getItem("token"),this.isChikurying=!1,this.startDate=null}init(){chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this)),chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this))}onTabUpdated(t,e){e.url&&(/^https:\/\/twitter\.com/.test(e.url)?!this.isChikurying&&this.startSabori():this.isChikurying&&this.exitSabori())}onTabRemoved(){this.isChikurying&&this.exitSabori()}startSabori(){this.startDate=this.startDate?this.startDate:new Date,this.timeUpdateInterval&&clearInterval(this.timeUpdateInterval);const t=this.calcTotalSaboriMinutes();this.timeUpdateInterval=setInterval(()=>{const e=this.calcTotalSaboriMinutes();t!==e&&this.chikuru(e)},1e4),this.chikuru(t)}exitSabori(){this.validateTwitterTabExistence().then(t=>{t||(clearInterval(this.timeUpdateInterval),localStorage.setItem("seconds",this.calcTotalSaboriSeconds()),this.startDate=null,this.clearChikuri())})}calcTotalSaboriSeconds(){const t=localStorage.getItem("last-update"),e=t?new Date(t):null,r=e?e.getYear()+e.getMonth()+e.getDate():null,i=new Date;if(r!==i.getYear()+i.getMonth()+i.getDate())return localStorage.setItem("seconds",0),0;const a=parseInt(localStorage.getItem("seconds"))||0;return(i-this.startDate)/1e3+a}calcTotalSaboriMinutes(){return Math.ceil(this.calcTotalSaboriSeconds()/60)}async validateTwitterTabExistence(){return new Promise(t=>{chrome.tabs.query({url:"https://twitter.com/*"},e=>{t(e.length>0)})})}postProfile(t){return fetch("https://slack.com/api/users.profile.set",{method:"POST",headers:{Authorization:`Bearer ${this.token}`,"content-type":"application/json"},body:JSON.stringify({profile:t})})}chikuru(t){this.postProfile({status_text:`${t}分`,status_emoji:":herb:"}).then(()=>{this.isChikurying=!0,localStorage.setItem("last-update",(new Date).toISOString())})}clearChikuri(){this.postProfile({status_text:"",status_emoji:":palm_tree:"}).then(()=>this.isChikurying=!1)}}).init()}});