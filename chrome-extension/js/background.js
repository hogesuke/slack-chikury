/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/api-client.js":
/*!******************************!*\
  !*** ./src/js/api-client.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return APIClient; });
/* harmony import */ var _web_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web-storage */ "./src/js/web-storage.js");


class APIClient {

  static post ({ minutes = 0, title = '' } = {}) {
    return this._postProfile({
      status_text: `[見てる] [${title}] [計 ${minutes}分]`,
      status_emoji: `:${_web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getEmoji()}:`
    });
  }

  static clear () {
    return this._postProfile({
      status_text: '',
      status_emoji: ''
    });
  }

  static async _postProfile (profile) {
    const token = _web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getToken();

    if (!token) return Promise.reject();

    return fetch('https://slack.com/api/users.profile.set', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        profile
      })
    });
  }
}


/***/ }),

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chikury__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chikury */ "./src/js/chikury.js");


new _chikury__WEBPACK_IMPORTED_MODULE_0__["default"]().run();


/***/ }),

/***/ "./src/js/badge-manager.js":
/*!*********************************!*\
  !*** ./src/js/badge-manager.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BadgeManager; });
class BadgeManager {
  static updateMinutes(minutes) {
    chrome.browserAction.setBadgeText({ text: String(minutes) })
  }

  static turnOff() {
    chrome.browserAction.setBadgeBackgroundColor({ color: [51, 111, 232, 100] });
  }

  static turnOn() {
    chrome.browserAction.setBadgeBackgroundColor({ color: [224, 44, 44, 100] });
  }
}


/***/ }),

/***/ "./src/js/chikury.js":
/*!***************************!*\
  !*** ./src/js/chikury.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chikury; });
/* harmony import */ var _api_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api-client */ "./src/js/api-client.js");
/* harmony import */ var _sabori_detector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sabori-detector */ "./src/js/sabori-detector.js");
/* harmony import */ var _time_keeper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time-keeper */ "./src/js/time-keeper.js");
/* harmony import */ var _time_calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time-calculator */ "./src/js/time-calculator.js");
/* harmony import */ var _web_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./web-storage */ "./src/js/web-storage.js");
/* harmony import */ var _badge_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./badge-manager */ "./src/js/badge-manager.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");








class Chikury {

  constructor() {
    this.init();
    this.isChikurying = false;
  }

  init() {
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getProgressedMinutes() !== null || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedMinutes(0);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getProgressedSeconds() !== null || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedSeconds(0);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getLastUpdateDate() || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setLastUpdateDate(new Date().toISOString());
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getOpenTime() || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setOpenTime(_constants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT"].OPEN_TIME);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getClosedTime() || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setClosedTime(_constants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT"].CLOSED_TIME);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getDayOfTheWeek() || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setDayOfTheWeek(_constants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT"].DAY_OF_THE_WEEK);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getEmoji() || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setEmoji(_constants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT"].EMOJI);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getURLs() || _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setURLs(_constants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT"].URLS);
  }

  async run() {
    chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
    chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));

    _badge_manager__WEBPACK_IMPORTED_MODULE_5__["default"].updateMinutes(_web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getProgressedMinutes());
    _badge_manager__WEBPACK_IMPORTED_MODULE_5__["default"].turnOff();

    this.judge();
  }

  async onTabUpdated(tabId, changeInfo) {
    if (!changeInfo.url) return;

    console.log('changeInfo', changeInfo);

    this.judge();
  }

  async onTabRemoved() {
    const tabs = await _sabori_detector__WEBPACK_IMPORTED_MODULE_1__["default"].detectSaboriTabs();
    if (tabs.isEmpty()) {
      this.exitSabori();
    }
  }

  async judge() {
    const tabs = await _sabori_detector__WEBPACK_IMPORTED_MODULE_1__["default"].detectSaboriTabs();

    if (_time_keeper__WEBPACK_IMPORTED_MODULE_2__["default"].hasChangedDate()) {
      _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setLastUpdateDate(new Date().toISOString());
      _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedMinutes(0);
      _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedSeconds(0);
    }

    if (!tabs.isEmpty() && _time_keeper__WEBPACK_IMPORTED_MODULE_2__["default"].isApplied()) {
      this.startSabori(tabs);
    } else {
      this.exitSabori();
    }
  }

  startSabori(tabs) {
    // すでにチクり中であれば何もしない
    if (this.isChikurying) {
      console.log('startSabori 何もしない')
      return;
    }

    console.log('startSabori');
    console.log('tabs', tabs);

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    const tab = tabs.getCurrentSaboriTab();
    const minutes = _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getProgressedMinutes();
    const seconds = _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getProgressedSeconds();

    this.postChikury({
      minutes,
      seconds
    }, tab.title);

    _badge_manager__WEBPACK_IMPORTED_MODULE_5__["default"].updateMinutes(minutes);
    _badge_manager__WEBPACK_IMPORTED_MODULE_5__["default"].turnOn();

    this.timeUpdateInterval = setInterval(this.intervalUpdater.bind(this), 30000);
  }

  async intervalUpdater() {
    console.log('timeUpdateInterval');
    const tabs = await _sabori_detector__WEBPACK_IMPORTED_MODULE_1__["default"].detectSaboriTabs();

    if (tabs.isEmpty() || !_time_keeper__WEBPACK_IMPORTED_MODULE_2__["default"].isApplied()) {
      this.exitSabori();
      return;
    }

    const lastUpdateMinutes = _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].getProgressedMinutes();
    const saboriTime = _time_keeper__WEBPACK_IMPORTED_MODULE_2__["default"].hasChangedDate() ? _time_calculator__WEBPACK_IMPORTED_MODULE_3__["default"].initialSaboriTime : _time_calculator__WEBPACK_IMPORTED_MODULE_3__["default"].calcTotalSaboriTime();
    const tab = tabs.getCurrentSaboriTab();

    // 経過分が変わったときだけ更新
    if (lastUpdateMinutes !== saboriTime.minutes) {
      this.postChikury(saboriTime, tab.title);
      _badge_manager__WEBPACK_IMPORTED_MODULE_5__["default"].updateMinutes(saboriTime.minutes);
    }
  }

  exitSabori() {
    if (!this.isChikurying) {
      console.log('exitSabori 何もしない')
      return;
    }

    console.log('exitSabori')

    clearInterval(this.timeUpdateInterval)

    const saboriTime = _time_keeper__WEBPACK_IMPORTED_MODULE_2__["default"].hasChangedDate() ? _time_calculator__WEBPACK_IMPORTED_MODULE_3__["default"].initialSaboriTime : _time_calculator__WEBPACK_IMPORTED_MODULE_3__["default"].calcTotalSaboriTime();
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setLastUpdateDate(new Date().toISOString());
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedMinutes(saboriTime.minutes);
    _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedSeconds(saboriTime.seconds);

    _badge_manager__WEBPACK_IMPORTED_MODULE_5__["default"].turnOff();

    this.clearChikury()
  }

  postChikury(saboriTime, title) {
    return _api_client__WEBPACK_IMPORTED_MODULE_0__["default"]
      .post({ minutes: saboriTime.minutes, title })
      .then(() => {
        _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setLastUpdateDate(new Date().toISOString());
        _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedMinutes(saboriTime.minutes);
        _web_storage__WEBPACK_IMPORTED_MODULE_4__["default"].setProgressedSeconds(saboriTime.seconds);
        this.isChikurying = true;
      }).catch(() => {
        // NOP
      });
  }

  clearChikury() {
    return _api_client__WEBPACK_IMPORTED_MODULE_0__["default"]
      .clear()
      .then(() => {
        this.isChikurying = false;
      }).catch(() => {
        // NOP
      });
  }
}


/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! exports provided: DEFAULT, KEY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT", function() { return DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY", function() { return KEY; });
const DEFAULT = {
  OPEN_TIME: '09:00',
  CLOSED_TIME: '18:00',
  DAY_OF_THE_WEEK: ['mon', 'tue', 'wed', 'thu', 'fri'],
  EMOJI: 'eyes',
  URLS: ['https://twitter.com/*']
}

const KEY = {
  TOKEN: 'token',
  OPEN_TIME: 'open-time',
  CLOSED_TIME: 'closed-time',
  DAY_OF_THE_WEEK: 'dayoftheweek',
  EMOJI: 'emoji',
  PROGRESSED_SECONDS: 'progressed-seconds',
  PROGRESSED_MINUTES: 'progressed-minutes',
  LAST_UPDATE_DATE: 'last-update-date',
  URLS: 'urls'
}


/***/ }),

/***/ "./src/js/sabori-detector.js":
/*!***********************************!*\
  !*** ./src/js/sabori-detector.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SaboriDetector; });
/* harmony import */ var _sabori_tab_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sabori-tab-collection */ "./src/js/sabori-tab-collection.js");
/* harmony import */ var _web_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-storage */ "./src/js/web-storage.js");



class SaboriDetector {

  static async detectSaboriTabs() {
    const urls = _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getURLs();

    if (!urls) return;

    return new Promise(resolve => {
      chrome.tabs.query({
        url: urls
      }, tabs => {
        resolve(new _sabori_tab_collection__WEBPACK_IMPORTED_MODULE_0__["default"](tabs));
      });
    });
  }
}


/***/ }),

/***/ "./src/js/sabori-tab-collection.js":
/*!*****************************************!*\
  !*** ./src/js/sabori-tab-collection.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SaboriTabCollection; });
class SaboriTabCollection {

  constructor(tabs = []) {
    this.tabs = tabs;
    console.log('tabs', tabs);
  }

  isEmpty() {
    return this.tabs.length <= 0;
  }

  getCurrentSaboriTab() {
    if (this.tabs.length <= 0) return null;

    const activeTab = this.tabs.find(a => a.active);
    if (activeTab) return activeTab;

    const id = Math.max(...this.tabs.map(a => a.id));
    return this.tabs.find(a => a.id === id);
  }
}


/***/ }),

/***/ "./src/js/time-calculator.js":
/*!***********************************!*\
  !*** ./src/js/time-calculator.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeCalculator; });
/* harmony import */ var _web_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web-storage */ "./src/js/web-storage.js");


class TimeCalculator {

  static calcTotalSaboriTime() {
    const progressedSeconds = _web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getProgressedSeconds();
    const lastUpdateDate = new Date(_web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getLastUpdateDate());
    const currentDate = new Date();

    const seconds = ((currentDate - lastUpdateDate) / 1000) + progressedSeconds
    const minutes = Math.ceil(seconds / 60);

    return {
      seconds,
      minutes
    };
  }

  static get initialSaboriTime() {
    return {
      seconds: 0,
      minutes: 0
    };
  }
}


/***/ }),

/***/ "./src/js/time-keeper.js":
/*!*******************************!*\
  !*** ./src/js/time-keeper.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeKeeper; });
/* harmony import */ var _web_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./web-storage */ "./src/js/web-storage.js");


class TimeKeeper {

  static isApplied() {
    const current = new Date();
    return this._isWithinTimeRange(current) && this._isTargetDayOfTheWeek(current);
  }

  static hasChangedDate () {
    const lastUpdateDate = new Date(_web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getLastUpdateDate());
    const currentDate = new Date();
    return this._getYYYYMD(lastUpdateDate) !== this._getYYYYMD(currentDate);
  }

  static _isWithinTimeRange(date) {
    const openTime = _web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getOpenTime();
    const closedTime = _web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getClosedTime();

    if (!openTime || !closedTime) return false;

    const current = this._getParsedTime(`${date.getHours()}:${date.getMinutes()}`);
    const open = this._getParsedTime(openTime);
    const closed = this._getParsedTime(closedTime);

    if (current.hours < open.hours || closed.hours < current.hours) {
      return false;
    }
    if (current.hours === open.hours && current.minutes < open.minutes) {
      return false;
    }
    if (current.hours === closed.hours && closed.minutes < current.minutes) {
      return false;
    }

    return true;
  }

  static _isTargetDayOfTheWeek(date) {
    const targetDays = _web_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getDayOfTheWeek();
    const currentDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][date.getDay()]
    return targetDays.includes(currentDay);
  }

  static _getParsedTime(timeString) {
    const time = timeString.split(':');
    return {
      hours: parseInt(time[0]),
      minutes: parseInt(time[1])
    }
  }

  static _getYYYYMD(date) {
    if (!date) return '';
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  }
}


/***/ }),

/***/ "./src/js/web-storage.js":
/*!*******************************!*\
  !*** ./src/js/web-storage.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WebStorage; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");


class WebStorage {

  static getToken() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].TOKEN);
  }

  static setToken(token) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].TOKEN, token);
  }

  static getOpenTime() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].OPEN_TIME);
  }

  static setOpenTime(openTime) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].OPEN_TIME, openTime);
  }

  static getClosedTime() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].CLOSED_TIME);
  }

  static setClosedTime(closedTime) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].CLOSED_TIME, closedTime);
  }

  static getDayOfTheWeek() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].DAY_OF_THE_WEEK, { isObject: true });
  }

  static setDayOfTheWeek(days) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].DAY_OF_THE_WEEK, JSON.stringify(days));
  }

  static getEmoji() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].EMOJI);
  }

  static setEmoji(emoji) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].EMOJI, emoji);
  }

  static getProgressedSeconds() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].PROGRESSED_SECONDS, { isNumber: true });
  }

  static setProgressedSeconds(seconds) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].PROGRESSED_SECONDS, seconds);
  }

  static getProgressedMinutes() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].PROGRESSED_MINUTES, { isNumber: true });
  }

  static setProgressedMinutes(minutes) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].PROGRESSED_MINUTES, minutes);
  }

  static getLastUpdateDate() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].LAST_UPDATE_DATE);
  }

  static setLastUpdateDate(lastUpdateDate) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].LAST_UPDATE_DATE, lastUpdateDate);
  }

  static getURLs() {
    return this._getItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].URLS, { isObject: true });
  }

  static setURLs(urls) {
    return this._setItem(_constants__WEBPACK_IMPORTED_MODULE_0__["KEY"].URLS, JSON.stringify(urls));
  }

  static _getItem(key, { isNumber = false, isObject = false } = {}) {
    const value = localStorage.getItem(key);

    if (value === null) return null;

    if (isNumber) return parseInt(value, 10);
    if (isObject) return JSON.parse(value);
    return value;
  }

  static _setItem(key, item) {
    localStorage.setItem(key, item);
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpLWNsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFkZ2UtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2hpa3VyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zYWJvcmktZGV0ZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3NhYm9yaS10YWItY29sbGVjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGltZS1jYWxjdWxhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90aW1lLWtlZXBlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvd2ViLXN0b3JhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvYmFja2dyb3VuZC5qc1wiKTtcbiIsImltcG9ydCBXZWJTdG9yYWdlIGZyb20gJy4vd2ViLXN0b3JhZ2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQSUNsaWVudCB7XG5cbiAgc3RhdGljIHBvc3QgKHsgbWludXRlcyA9IDAsIHRpdGxlID0gJycgfSA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuX3Bvc3RQcm9maWxlKHtcbiAgICAgIHN0YXR1c190ZXh0OiBgW+imi+OBpuOCi10gWyR7dGl0bGV9XSBb6KiIICR7bWludXRlc33liIZdYCxcbiAgICAgIHN0YXR1c19lbW9qaTogYDoke1dlYlN0b3JhZ2UuZ2V0RW1vamkoKX06YFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGNsZWFyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcG9zdFByb2ZpbGUoe1xuICAgICAgc3RhdHVzX3RleHQ6ICcnLFxuICAgICAgc3RhdHVzX2Vtb2ppOiAnJ1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIF9wb3N0UHJvZmlsZSAocHJvZmlsZSkge1xuICAgIGNvbnN0IHRva2VuID0gV2ViU3RvcmFnZS5nZXRUb2tlbigpO1xuXG4gICAgaWYgKCF0b2tlbikgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG5cbiAgICByZXR1cm4gZmV0Y2goJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5wcm9maWxlLnNldCcsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgcHJvZmlsZVxuICAgICAgfSlcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IENoaWt1cnkgZnJvbSAnLi9jaGlrdXJ5JztcblxubmV3IENoaWt1cnkoKS5ydW4oKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhZGdlTWFuYWdlciB7XG4gIHN0YXRpYyB1cGRhdGVNaW51dGVzKG1pbnV0ZXMpIHtcbiAgICBjaHJvbWUuYnJvd3NlckFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBTdHJpbmcobWludXRlcykgfSlcbiAgfVxuXG4gIHN0YXRpYyB0dXJuT2ZmKCkge1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFs1MSwgMTExLCAyMzIsIDEwMF0gfSk7XG4gIH1cblxuICBzdGF0aWMgdHVybk9uKCkge1xuICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFsyMjQsIDQ0LCA0NCwgMTAwXSB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEFQSUNsaWVudCBmcm9tICcuL2FwaS1jbGllbnQnO1xuaW1wb3J0IFNhYm9yaURldGVjdG9yIGZyb20gJy4vc2Fib3JpLWRldGVjdG9yJztcbmltcG9ydCBUaW1lS2VlcGVyIGZyb20gJy4vdGltZS1rZWVwZXInO1xuaW1wb3J0IFRpbWVDYWxjdWxhdG9yIGZyb20gJy4vdGltZS1jYWxjdWxhdG9yJztcbmltcG9ydCBXZWJTdG9yYWdlIGZyb20gJy4vd2ViLXN0b3JhZ2UnO1xuaW1wb3J0IEJhZGdlTWFuYWdlciBmcm9tICcuL2JhZGdlLW1hbmFnZXInO1xuaW1wb3J0ICogYXMgQ29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hpa3VyeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pc0NoaWt1cnlpbmcgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgV2ViU3RvcmFnZS5nZXRQcm9ncmVzc2VkTWludXRlcygpICE9PSBudWxsIHx8IFdlYlN0b3JhZ2Uuc2V0UHJvZ3Jlc3NlZE1pbnV0ZXMoMCk7XG4gICAgV2ViU3RvcmFnZS5nZXRQcm9ncmVzc2VkU2Vjb25kcygpICE9PSBudWxsIHx8IFdlYlN0b3JhZ2Uuc2V0UHJvZ3Jlc3NlZFNlY29uZHMoMCk7XG4gICAgV2ViU3RvcmFnZS5nZXRMYXN0VXBkYXRlRGF0ZSgpIHx8IFdlYlN0b3JhZ2Uuc2V0TGFzdFVwZGF0ZURhdGUobmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICBXZWJTdG9yYWdlLmdldE9wZW5UaW1lKCkgfHwgV2ViU3RvcmFnZS5zZXRPcGVuVGltZShDb25zdGFudHMuREVGQVVMVC5PUEVOX1RJTUUpO1xuICAgIFdlYlN0b3JhZ2UuZ2V0Q2xvc2VkVGltZSgpIHx8IFdlYlN0b3JhZ2Uuc2V0Q2xvc2VkVGltZShDb25zdGFudHMuREVGQVVMVC5DTE9TRURfVElNRSk7XG4gICAgV2ViU3RvcmFnZS5nZXREYXlPZlRoZVdlZWsoKSB8fCBXZWJTdG9yYWdlLnNldERheU9mVGhlV2VlayhDb25zdGFudHMuREVGQVVMVC5EQVlfT0ZfVEhFX1dFRUspO1xuICAgIFdlYlN0b3JhZ2UuZ2V0RW1vamkoKSB8fCBXZWJTdG9yYWdlLnNldEVtb2ppKENvbnN0YW50cy5ERUZBVUxULkVNT0pJKTtcbiAgICBXZWJTdG9yYWdlLmdldFVSTHMoKSB8fCBXZWJTdG9yYWdlLnNldFVSTHMoQ29uc3RhbnRzLkRFRkFVTFQuVVJMUyk7XG4gIH1cblxuICBhc3luYyBydW4oKSB7XG4gICAgY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKHRoaXMub25UYWJVcGRhdGVkLmJpbmQodGhpcykpO1xuICAgIGNocm9tZS50YWJzLm9uUmVtb3ZlZC5hZGRMaXN0ZW5lcih0aGlzLm9uVGFiUmVtb3ZlZC5iaW5kKHRoaXMpKTtcblxuICAgIEJhZGdlTWFuYWdlci51cGRhdGVNaW51dGVzKFdlYlN0b3JhZ2UuZ2V0UHJvZ3Jlc3NlZE1pbnV0ZXMoKSk7XG4gICAgQmFkZ2VNYW5hZ2VyLnR1cm5PZmYoKTtcblxuICAgIHRoaXMuanVkZ2UoKTtcbiAgfVxuXG4gIGFzeW5jIG9uVGFiVXBkYXRlZCh0YWJJZCwgY2hhbmdlSW5mbykge1xuICAgIGlmICghY2hhbmdlSW5mby51cmwpIHJldHVybjtcblxuICAgIGNvbnNvbGUubG9nKCdjaGFuZ2VJbmZvJywgY2hhbmdlSW5mbyk7XG5cbiAgICB0aGlzLmp1ZGdlKCk7XG4gIH1cblxuICBhc3luYyBvblRhYlJlbW92ZWQoKSB7XG4gICAgY29uc3QgdGFicyA9IGF3YWl0IFNhYm9yaURldGVjdG9yLmRldGVjdFNhYm9yaVRhYnMoKTtcbiAgICBpZiAodGFicy5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuZXhpdFNhYm9yaSgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGp1ZGdlKCkge1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCBTYWJvcmlEZXRlY3Rvci5kZXRlY3RTYWJvcmlUYWJzKCk7XG5cbiAgICBpZiAoVGltZUtlZXBlci5oYXNDaGFuZ2VkRGF0ZSgpKSB7XG4gICAgICBXZWJTdG9yYWdlLnNldExhc3RVcGRhdGVEYXRlKG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSk7XG4gICAgICBXZWJTdG9yYWdlLnNldFByb2dyZXNzZWRNaW51dGVzKDApO1xuICAgICAgV2ViU3RvcmFnZS5zZXRQcm9ncmVzc2VkU2Vjb25kcygwKTtcbiAgICB9XG5cbiAgICBpZiAoIXRhYnMuaXNFbXB0eSgpICYmIFRpbWVLZWVwZXIuaXNBcHBsaWVkKCkpIHtcbiAgICAgIHRoaXMuc3RhcnRTYWJvcmkodGFicyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXhpdFNhYm9yaSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0U2Fib3JpKHRhYnMpIHtcbiAgICAvLyDjgZnjgafjgavjg4Hjgq/jgorkuK3jgafjgYLjgozjgbDkvZXjgoLjgZfjgarjgYRcbiAgICBpZiAodGhpcy5pc0NoaWt1cnlpbmcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzdGFydFNhYm9yaSDkvZXjgoLjgZfjgarjgYQnKVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCdzdGFydFNhYm9yaScpO1xuICAgIGNvbnNvbGUubG9nKCd0YWJzJywgdGFicyk7XG5cbiAgICBpZiAodGhpcy50aW1lVXBkYXRlSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lVXBkYXRlSW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGNvbnN0IHRhYiA9IHRhYnMuZ2V0Q3VycmVudFNhYm9yaVRhYigpO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBXZWJTdG9yYWdlLmdldFByb2dyZXNzZWRNaW51dGVzKCk7XG4gICAgY29uc3Qgc2Vjb25kcyA9IFdlYlN0b3JhZ2UuZ2V0UHJvZ3Jlc3NlZFNlY29uZHMoKTtcblxuICAgIHRoaXMucG9zdENoaWt1cnkoe1xuICAgICAgbWludXRlcyxcbiAgICAgIHNlY29uZHNcbiAgICB9LCB0YWIudGl0bGUpO1xuXG4gICAgQmFkZ2VNYW5hZ2VyLnVwZGF0ZU1pbnV0ZXMobWludXRlcyk7XG4gICAgQmFkZ2VNYW5hZ2VyLnR1cm5PbigpO1xuXG4gICAgdGhpcy50aW1lVXBkYXRlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLmludGVydmFsVXBkYXRlci5iaW5kKHRoaXMpLCAzMDAwMCk7XG4gIH1cblxuICBhc3luYyBpbnRlcnZhbFVwZGF0ZXIoKSB7XG4gICAgY29uc29sZS5sb2coJ3RpbWVVcGRhdGVJbnRlcnZhbCcpO1xuICAgIGNvbnN0IHRhYnMgPSBhd2FpdCBTYWJvcmlEZXRlY3Rvci5kZXRlY3RTYWJvcmlUYWJzKCk7XG5cbiAgICBpZiAodGFicy5pc0VtcHR5KCkgfHwgIVRpbWVLZWVwZXIuaXNBcHBsaWVkKCkpIHtcbiAgICAgIHRoaXMuZXhpdFNhYm9yaSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxhc3RVcGRhdGVNaW51dGVzID0gV2ViU3RvcmFnZS5nZXRQcm9ncmVzc2VkTWludXRlcygpO1xuICAgIGNvbnN0IHNhYm9yaVRpbWUgPSBUaW1lS2VlcGVyLmhhc0NoYW5nZWREYXRlKCkgPyBUaW1lQ2FsY3VsYXRvci5pbml0aWFsU2Fib3JpVGltZSA6IFRpbWVDYWxjdWxhdG9yLmNhbGNUb3RhbFNhYm9yaVRpbWUoKTtcbiAgICBjb25zdCB0YWIgPSB0YWJzLmdldEN1cnJlbnRTYWJvcmlUYWIoKTtcblxuICAgIC8vIOe1jOmBjuWIhuOBjOWkieOCj+OBo+OBn+OBqOOBjeOBoOOBkeabtOaWsFxuICAgIGlmIChsYXN0VXBkYXRlTWludXRlcyAhPT0gc2Fib3JpVGltZS5taW51dGVzKSB7XG4gICAgICB0aGlzLnBvc3RDaGlrdXJ5KHNhYm9yaVRpbWUsIHRhYi50aXRsZSk7XG4gICAgICBCYWRnZU1hbmFnZXIudXBkYXRlTWludXRlcyhzYWJvcmlUaW1lLm1pbnV0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGV4aXRTYWJvcmkoKSB7XG4gICAgaWYgKCF0aGlzLmlzQ2hpa3VyeWluZykge1xuICAgICAgY29uc29sZS5sb2coJ2V4aXRTYWJvcmkg5L2V44KC44GX44Gq44GEJylcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygnZXhpdFNhYm9yaScpXG5cbiAgICBjbGVhckludGVydmFsKHRoaXMudGltZVVwZGF0ZUludGVydmFsKVxuXG4gICAgY29uc3Qgc2Fib3JpVGltZSA9IFRpbWVLZWVwZXIuaGFzQ2hhbmdlZERhdGUoKSA/IFRpbWVDYWxjdWxhdG9yLmluaXRpYWxTYWJvcmlUaW1lIDogVGltZUNhbGN1bGF0b3IuY2FsY1RvdGFsU2Fib3JpVGltZSgpO1xuICAgIFdlYlN0b3JhZ2Uuc2V0TGFzdFVwZGF0ZURhdGUobmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICBXZWJTdG9yYWdlLnNldFByb2dyZXNzZWRNaW51dGVzKHNhYm9yaVRpbWUubWludXRlcyk7XG4gICAgV2ViU3RvcmFnZS5zZXRQcm9ncmVzc2VkU2Vjb25kcyhzYWJvcmlUaW1lLnNlY29uZHMpO1xuXG4gICAgQmFkZ2VNYW5hZ2VyLnR1cm5PZmYoKTtcblxuICAgIHRoaXMuY2xlYXJDaGlrdXJ5KClcbiAgfVxuXG4gIHBvc3RDaGlrdXJ5KHNhYm9yaVRpbWUsIHRpdGxlKSB7XG4gICAgcmV0dXJuIEFQSUNsaWVudFxuICAgICAgLnBvc3QoeyBtaW51dGVzOiBzYWJvcmlUaW1lLm1pbnV0ZXMsIHRpdGxlIH0pXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIFdlYlN0b3JhZ2Uuc2V0TGFzdFVwZGF0ZURhdGUobmV3IERhdGUoKS50b0lTT1N0cmluZygpKTtcbiAgICAgICAgV2ViU3RvcmFnZS5zZXRQcm9ncmVzc2VkTWludXRlcyhzYWJvcmlUaW1lLm1pbnV0ZXMpO1xuICAgICAgICBXZWJTdG9yYWdlLnNldFByb2dyZXNzZWRTZWNvbmRzKHNhYm9yaVRpbWUuc2Vjb25kcyk7XG4gICAgICAgIHRoaXMuaXNDaGlrdXJ5aW5nID0gdHJ1ZTtcbiAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gTk9QXG4gICAgICB9KTtcbiAgfVxuXG4gIGNsZWFyQ2hpa3VyeSgpIHtcbiAgICByZXR1cm4gQVBJQ2xpZW50XG4gICAgICAuY2xlYXIoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmlzQ2hpa3VyeWluZyA9IGZhbHNlO1xuICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAvLyBOT1BcbiAgICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgREVGQVVMVCA9IHtcbiAgT1BFTl9USU1FOiAnMDk6MDAnLFxuICBDTE9TRURfVElNRTogJzE4OjAwJyxcbiAgREFZX09GX1RIRV9XRUVLOiBbJ21vbicsICd0dWUnLCAnd2VkJywgJ3RodScsICdmcmknXSxcbiAgRU1PSkk6ICdleWVzJyxcbiAgVVJMUzogWydodHRwczovL3R3aXR0ZXIuY29tLyonXVxufVxuXG5leHBvcnQgY29uc3QgS0VZID0ge1xuICBUT0tFTjogJ3Rva2VuJyxcbiAgT1BFTl9USU1FOiAnb3Blbi10aW1lJyxcbiAgQ0xPU0VEX1RJTUU6ICdjbG9zZWQtdGltZScsXG4gIERBWV9PRl9USEVfV0VFSzogJ2RheW9mdGhld2VlaycsXG4gIEVNT0pJOiAnZW1vamknLFxuICBQUk9HUkVTU0VEX1NFQ09ORFM6ICdwcm9ncmVzc2VkLXNlY29uZHMnLFxuICBQUk9HUkVTU0VEX01JTlVURVM6ICdwcm9ncmVzc2VkLW1pbnV0ZXMnLFxuICBMQVNUX1VQREFURV9EQVRFOiAnbGFzdC11cGRhdGUtZGF0ZScsXG4gIFVSTFM6ICd1cmxzJ1xufVxuIiwiaW1wb3J0IFNhYm9yaVRhYkNvbGxlY3Rpb24gZnJvbSAnLi9zYWJvcmktdGFiLWNvbGxlY3Rpb24nO1xuaW1wb3J0IFdlYlN0b3JhZ2UgZnJvbSAnLi93ZWItc3RvcmFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhYm9yaURldGVjdG9yIHtcblxuICBzdGF0aWMgYXN5bmMgZGV0ZWN0U2Fib3JpVGFicygpIHtcbiAgICBjb25zdCB1cmxzID0gV2ViU3RvcmFnZS5nZXRVUkxzKCk7XG5cbiAgICBpZiAoIXVybHMpIHJldHVybjtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHtcbiAgICAgICAgdXJsOiB1cmxzXG4gICAgICB9LCB0YWJzID0+IHtcbiAgICAgICAgcmVzb2x2ZShuZXcgU2Fib3JpVGFiQ29sbGVjdGlvbih0YWJzKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Fib3JpVGFiQ29sbGVjdGlvbiB7XG5cbiAgY29uc3RydWN0b3IodGFicyA9IFtdKSB7XG4gICAgdGhpcy50YWJzID0gdGFicztcbiAgICBjb25zb2xlLmxvZygndGFicycsIHRhYnMpO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gdGhpcy50YWJzLmxlbmd0aCA8PSAwO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNhYm9yaVRhYigpIHtcbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCA8PSAwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGFjdGl2ZVRhYiA9IHRoaXMudGFicy5maW5kKGEgPT4gYS5hY3RpdmUpO1xuICAgIGlmIChhY3RpdmVUYWIpIHJldHVybiBhY3RpdmVUYWI7XG5cbiAgICBjb25zdCBpZCA9IE1hdGgubWF4KC4uLnRoaXMudGFicy5tYXAoYSA9PiBhLmlkKSk7XG4gICAgcmV0dXJuIHRoaXMudGFicy5maW5kKGEgPT4gYS5pZCA9PT0gaWQpO1xuICB9XG59XG4iLCJpbXBvcnQgV2ViU3RvcmFnZSBmcm9tICcuL3dlYi1zdG9yYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZUNhbGN1bGF0b3Ige1xuXG4gIHN0YXRpYyBjYWxjVG90YWxTYWJvcmlUaW1lKCkge1xuICAgIGNvbnN0IHByb2dyZXNzZWRTZWNvbmRzID0gV2ViU3RvcmFnZS5nZXRQcm9ncmVzc2VkU2Vjb25kcygpO1xuICAgIGNvbnN0IGxhc3RVcGRhdGVEYXRlID0gbmV3IERhdGUoV2ViU3RvcmFnZS5nZXRMYXN0VXBkYXRlRGF0ZSgpKTtcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zdCBzZWNvbmRzID0gKChjdXJyZW50RGF0ZSAtIGxhc3RVcGRhdGVEYXRlKSAvIDEwMDApICsgcHJvZ3Jlc3NlZFNlY29uZHNcbiAgICBjb25zdCBtaW51dGVzID0gTWF0aC5jZWlsKHNlY29uZHMgLyA2MCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2Vjb25kcyxcbiAgICAgIG1pbnV0ZXNcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldCBpbml0aWFsU2Fib3JpVGltZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2Vjb25kczogMCxcbiAgICAgIG1pbnV0ZXM6IDBcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgV2ViU3RvcmFnZSBmcm9tICcuL3dlYi1zdG9yYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZUtlZXBlciB7XG5cbiAgc3RhdGljIGlzQXBwbGllZCgpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gdGhpcy5faXNXaXRoaW5UaW1lUmFuZ2UoY3VycmVudCkgJiYgdGhpcy5faXNUYXJnZXREYXlPZlRoZVdlZWsoY3VycmVudCk7XG4gIH1cblxuICBzdGF0aWMgaGFzQ2hhbmdlZERhdGUgKCkge1xuICAgIGNvbnN0IGxhc3RVcGRhdGVEYXRlID0gbmV3IERhdGUoV2ViU3RvcmFnZS5nZXRMYXN0VXBkYXRlRGF0ZSgpKTtcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIHRoaXMuX2dldFlZWVlNRChsYXN0VXBkYXRlRGF0ZSkgIT09IHRoaXMuX2dldFlZWVlNRChjdXJyZW50RGF0ZSk7XG4gIH1cblxuICBzdGF0aWMgX2lzV2l0aGluVGltZVJhbmdlKGRhdGUpIHtcbiAgICBjb25zdCBvcGVuVGltZSA9IFdlYlN0b3JhZ2UuZ2V0T3BlblRpbWUoKTtcbiAgICBjb25zdCBjbG9zZWRUaW1lID0gV2ViU3RvcmFnZS5nZXRDbG9zZWRUaW1lKCk7XG5cbiAgICBpZiAoIW9wZW5UaW1lIHx8ICFjbG9zZWRUaW1lKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fZ2V0UGFyc2VkVGltZShgJHtkYXRlLmdldEhvdXJzKCl9OiR7ZGF0ZS5nZXRNaW51dGVzKCl9YCk7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuX2dldFBhcnNlZFRpbWUob3BlblRpbWUpO1xuICAgIGNvbnN0IGNsb3NlZCA9IHRoaXMuX2dldFBhcnNlZFRpbWUoY2xvc2VkVGltZSk7XG5cbiAgICBpZiAoY3VycmVudC5ob3VycyA8IG9wZW4uaG91cnMgfHwgY2xvc2VkLmhvdXJzIDwgY3VycmVudC5ob3Vycykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY3VycmVudC5ob3VycyA9PT0gb3Blbi5ob3VycyAmJiBjdXJyZW50Lm1pbnV0ZXMgPCBvcGVuLm1pbnV0ZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnQuaG91cnMgPT09IGNsb3NlZC5ob3VycyAmJiBjbG9zZWQubWludXRlcyA8IGN1cnJlbnQubWludXRlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIF9pc1RhcmdldERheU9mVGhlV2VlayhkYXRlKSB7XG4gICAgY29uc3QgdGFyZ2V0RGF5cyA9IFdlYlN0b3JhZ2UuZ2V0RGF5T2ZUaGVXZWVrKCk7XG4gICAgY29uc3QgY3VycmVudERheSA9IFsnc3VuJywgJ21vbicsICd0dWUnLCAnd2VkJywgJ3RodScsICdmcmknLCAnc2F0J11bZGF0ZS5nZXREYXkoKV1cbiAgICByZXR1cm4gdGFyZ2V0RGF5cy5pbmNsdWRlcyhjdXJyZW50RGF5KTtcbiAgfVxuXG4gIHN0YXRpYyBfZ2V0UGFyc2VkVGltZSh0aW1lU3RyaW5nKSB7XG4gICAgY29uc3QgdGltZSA9IHRpbWVTdHJpbmcuc3BsaXQoJzonKTtcbiAgICByZXR1cm4ge1xuICAgICAgaG91cnM6IHBhcnNlSW50KHRpbWVbMF0pLFxuICAgICAgbWludXRlczogcGFyc2VJbnQodGltZVsxXSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2dldFlZWVlNRChkYXRlKSB7XG4gICAgaWYgKCFkYXRlKSByZXR1cm4gJyc7XG4gICAgcmV0dXJuICcnICsgZGF0ZS5nZXRGdWxsWWVhcigpICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpICsgZGF0ZS5nZXREYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIENvbnN0YW50cyBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlN0b3JhZ2Uge1xuXG4gIHN0YXRpYyBnZXRUb2tlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbShDb25zdGFudHMuS0VZLlRPS0VOKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRUb2tlbih0b2tlbikge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuVE9LRU4sIHRva2VuKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRPcGVuVGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbShDb25zdGFudHMuS0VZLk9QRU5fVElNRSk7XG4gIH1cblxuICBzdGF0aWMgc2V0T3BlblRpbWUob3BlblRpbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0SXRlbShDb25zdGFudHMuS0VZLk9QRU5fVElNRSwgb3BlblRpbWUpO1xuICB9XG5cbiAgc3RhdGljIGdldENsb3NlZFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5DTE9TRURfVElNRSk7XG4gIH1cblxuICBzdGF0aWMgc2V0Q2xvc2VkVGltZShjbG9zZWRUaW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldEl0ZW0oQ29uc3RhbnRzLktFWS5DTE9TRURfVElNRSwgY2xvc2VkVGltZSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0RGF5T2ZUaGVXZWVrKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtKENvbnN0YW50cy5LRVkuREFZX09GX1RIRV9XRUVLLCB7IGlzT2JqZWN0OiB0cnVlIH0pO1xuICB9XG5cbiAgc3RhdGljIHNldERheU9mVGhlV2VlayhkYXlzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldEl0ZW0oQ29uc3RhbnRzLktFWS5EQVlfT0ZfVEhFX1dFRUssIEpTT04uc3RyaW5naWZ5KGRheXMpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRFbW9qaSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbShDb25zdGFudHMuS0VZLkVNT0pJKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRFbW9qaShlbW9qaSkge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuRU1PSkksIGVtb2ppKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9ncmVzc2VkU2Vjb25kcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbShDb25zdGFudHMuS0VZLlBST0dSRVNTRURfU0VDT05EUywgeyBpc051bWJlcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRQcm9ncmVzc2VkU2Vjb25kcyhzZWNvbmRzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldEl0ZW0oQ29uc3RhbnRzLktFWS5QUk9HUkVTU0VEX1NFQ09ORFMsIHNlY29uZHMpO1xuICB9XG5cbiAgc3RhdGljIGdldFByb2dyZXNzZWRNaW51dGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtKENvbnN0YW50cy5LRVkuUFJPR1JFU1NFRF9NSU5VVEVTLCB7IGlzTnVtYmVyOiB0cnVlIH0pO1xuICB9XG5cbiAgc3RhdGljIHNldFByb2dyZXNzZWRNaW51dGVzKG1pbnV0ZXMpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0SXRlbShDb25zdGFudHMuS0VZLlBST0dSRVNTRURfTUlOVVRFUywgbWludXRlcyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TGFzdFVwZGF0ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5MQVNUX1VQREFURV9EQVRFKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRMYXN0VXBkYXRlRGF0ZShsYXN0VXBkYXRlRGF0ZSkge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuTEFTVF9VUERBVEVfREFURSwgbGFzdFVwZGF0ZURhdGUpO1xuICB9XG5cbiAgc3RhdGljIGdldFVSTHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5VUkxTLCB7IGlzT2JqZWN0OiB0cnVlIH0pO1xuICB9XG5cbiAgc3RhdGljIHNldFVSTHModXJscykge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuVVJMUywgSlNPTi5zdHJpbmdpZnkodXJscykpO1xuICB9XG5cbiAgc3RhdGljIF9nZXRJdGVtKGtleSwgeyBpc051bWJlciA9IGZhbHNlLCBpc09iamVjdCA9IGZhbHNlIH0gPSB7fSkge1xuICAgIGNvbnN0IHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoaXNOdW1iZXIpIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIGlmIChpc09iamVjdCkgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBfc2V0SXRlbShrZXksIGl0ZW0pIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIGl0ZW0pO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1pBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzlKQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDeERBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==