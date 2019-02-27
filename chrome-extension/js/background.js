!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=4)}([function(t,e,s){"use strict";s.d(e,"a",function(){return r});var i=s(1);class r{static getToken(){return this._getItem(i.b.TOKEN)}static setToken(t){return this._setItem(i.b.TOKEN,t)}static getOpenTime(){return this._getItem(i.b.OPEN_TIME)}static setOpenTime(t){return this._setItem(i.b.OPEN_TIME,t)}static getClosedTime(){return this._getItem(i.b.CLOSED_TIME)}static setClosedTime(t){return this._setItem(i.b.CLOSED_TIME,t)}static getDayOfTheWeek(){return this._getItem(i.b.DAY_OF_THE_WEEK,{isObject:!0})}static setDayOfTheWeek(t){return this._setItem(i.b.DAY_OF_THE_WEEK,JSON.stringify(t))}static getEmoji(){return this._getItem(i.b.EMOJI)}static setEmoji(t){return this._setItem(i.b.EMOJI,t)}static getProgressedSeconds(){return this._getItem(i.b.PROGRESSED_SECONDS,{isNumber:!0})}static setProgressedSeconds(t){return this._setItem(i.b.PROGRESSED_SECONDS,t)}static getProgressedMinutes(){return this._getItem(i.b.PROGRESSED_MINUTES,{isNumber:!0})}static setProgressedMinutes(t){return this._setItem(i.b.PROGRESSED_MINUTES,t)}static getLastUpdateDate(){return this._getItem(i.b.LAST_UPDATE_DATE)}static setLastUpdateDate(t){return this._setItem(i.b.LAST_UPDATE_DATE,t)}static getURLs(){return this._getItem(i.b.URLS,{isObject:!0})}static setURLs(t){return this._setItem(i.b.URLS,JSON.stringify(t))}static _getItem(t,{isNumber:e=!1,isObject:s=!1}={}){const i=localStorage.getItem(t);return null===i?null:e?parseInt(i,10):s?JSON.parse(i):i}static _setItem(t,e){localStorage.setItem(t,e)}}},function(t,e,s){"use strict";s.d(e,"a",function(){return i}),s.d(e,"b",function(){return r});const i={OPEN_TIME:"09:00",CLOSED_TIME:"18:00",DAY_OF_THE_WEEK:["mon","tue","wed","thu","fri"],EMOJI:"eyes",URLS:["https://twitter.com/*"]},r={TOKEN:"token",OPEN_TIME:"open-time",CLOSED_TIME:"closed-time",DAY_OF_THE_WEEK:"dayoftheweek",EMOJI:"emoji",PROGRESSED_SECONDS:"progressed-seconds",PROGRESSED_MINUTES:"progressed-minutes",LAST_UPDATE_DATE:"last-update-date",URLS:"urls"}},,,function(t,e,s){"use strict";s.r(e);var i=s(0);class r{static post({minutes:t=0,title:e=""}={}){return this._postProfile({status_text:`[見てる] [${e}] [計 ${t}分]`,status_emoji:`:${i.a.getEmoji()}:`})}static clear(){return this._postProfile({status_text:"",status_emoji:""})}static async _postProfile(t){const e=i.a.getToken();return e?fetch("https://slack.com/api/users.profile.set",{method:"POST",headers:{Authorization:`Bearer ${e}`,"content-type":"application/json"},body:JSON.stringify({profile:t})}):Promise.reject()}}class a{constructor(t=[]){this.tabs=t,console.log("tabs",t)}isEmpty(){return this.tabs.length<=0}getCurrentSaboriTab(){if(this.tabs.length<=0)return null;const t=this.tabs.find(t=>t.active);if(t)return t;const e=Math.max(...this.tabs.map(t=>t.id));return this.tabs.find(t=>t.id===e)}}class n{static async detectSaboriTabs(){const t=i.a.getURLs();if(t)return new Promise(e=>{chrome.tabs.query({url:t},t=>{e(new a(t))})})}}class o{static isApplied(){const t=new Date;return this._isWithinTimeRange(t)&&this._isTargetDayOfTheWeek(t)}static _isWithinTimeRange(t){const e=i.a.getOpenTime(),s=i.a.getClosedTime();if(!e||!s)return!1;const r=this._getParsedTime(`${t.getHours()}:${t.getMinutes()}`),a=this._getParsedTime(e),n=this._getParsedTime(s);return!(r.hours<a.hours||n.hours<r.hours)&&(!(r.hours===a.hours&&r.minutes<a.minutes)&&!(r.hours===n.hours&&n.minutes<r.minutes))}static _isTargetDayOfTheWeek(t){const e=i.a.getDayOfTheWeek(),s=["sun","mon","tue","wed","thu","fri","sat"][t.getDay()];return e.includes(s)}static _getParsedTime(t){const e=t.split(":");return{hours:parseInt(e[0]),minutes:parseInt(e[1])}}}class u{static calcTotalSaboriTime(){const t=i.a.getProgressedSeconds(),e=new Date(i.a.getLastUpdateDate()),s=new Date;if(this._getYYYYMD(e)!==this._getYYYYMD(s))return{seconds:0,minutes:0};const r=(s-e)/1e3+t;return{seconds:r,minutes:Math.ceil(r/60)}}static _getYYYYMD(t){return t?""+t.getFullYear()+(t.getMonth()+1)+t.getDate():""}}class c{static updateMinutes(t){chrome.browserAction.setBadgeText({text:String(t)})}static turnOff(){chrome.browserAction.setBadgeBackgroundColor({color:[51,111,232,100]})}static turnOn(){chrome.browserAction.setBadgeBackgroundColor({color:[224,44,44,100]})}}var d=s(1);(new class{constructor(){this.init(),this.isChikurying=!1}init(){null!==i.a.getProgressedMinutes()||i.a.setProgressedMinutes(0),null!==i.a.getProgressedSeconds()||i.a.setProgressedSeconds(0),i.a.getLastUpdateDate()||i.a.setLastUpdateDate((new Date).toISOString()),i.a.getOpenTime()||i.a.setOpenTime(d.a.OPEN_TIME),i.a.getClosedTime()||i.a.setClosedTime(d.a.CLOSED_TIME),i.a.getDayOfTheWeek()||i.a.setDayOfTheWeek(d.a.DAY_OF_THE_WEEK),i.a.getEmoji()||i.a.setEmoji(d.a.EMOJI),i.a.getURLs()||i.a.setURLs(d.a.URLS)}async run(){chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this)),chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this)),c.updateMinutes(i.a.getProgressedMinutes()),c.turnOff();const t=await n.detectSaboriTabs();!t.isEmpty()&&o.isApplied()?this.startSabori(t):this.exitSabori()}async onTabUpdated(t,e){if(!e.url)return;console.log("changeInfo",e);const s=await n.detectSaboriTabs();!s.isEmpty()&&o.isApplied()?this.startSabori(s):this.exitSabori()}async onTabRemoved(){(await n.detectSaboriTabs()).isEmpty()&&this.exitSabori()}startSabori(t){if(this.isChikurying)return void console.log("startSabori 何もしない");console.log("startSabori"),console.log("tabs",t),this.timeUpdateInterval&&clearInterval(this.timeUpdateInterval);const e=t.getCurrentSaboriTab(),s=i.a.getProgressedMinutes(),r=i.a.getProgressedSeconds();this.postChikury({minutes:s,seconds:r},e.title),c.updateMinutes(s),c.turnOn(),this.timeUpdateInterval=setInterval(this.intervalUpdater.bind(this),1e4)}async intervalUpdater(){console.log("timeUpdateInterval");const t=await n.detectSaboriTabs();if(t.isEmpty()||!o.isApplied())return void this.exitSabori();const e=i.a.getProgressedMinutes(),s=u.calcTotalSaboriTime(),r=t.getCurrentSaboriTab();e!==s.minutes&&(this.postChikury(s,r.title),c.updateMinutes(s.minutes))}exitSabori(){if(!this.isChikurying)return void console.log("exitSabori 何もしない");console.log("exitSabori"),clearInterval(this.timeUpdateInterval);const t=u.calcTotalSaboriTime();i.a.setLastUpdateDate((new Date).toISOString()),i.a.setProgressedMinutes(t.minutes),i.a.setProgressedSeconds(t.seconds),c.turnOff(),this.clearChikury()}postChikury(t,e){return r.post({minutes:t.minutes,title:e}).then(()=>{i.a.setLastUpdateDate((new Date).toISOString()),i.a.setProgressedMinutes(t.minutes),i.a.setProgressedSeconds(t.seconds),this.isChikurying=!0}).catch(()=>{})}clearChikury(){return r.clear().then(()=>{this.isChikurying=!1}).catch(()=>{})}}).run()}]);