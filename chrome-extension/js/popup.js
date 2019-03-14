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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/popup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/style.scss":
/*!****************************!*\
  !*** ./src/css/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "./src/js/popup.js":
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.scss */ "./src/css/style.scss");
/* harmony import */ var _css_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web-storage */ "./src/js/web-storage.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");




document.addEventListener('DOMContentLoaded', () => {
  // token
  {
    const tokenInput = document.querySelector('.input-token');

    tokenInput.value = _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getToken() || '';

    tokenInput.addEventListener('blur', () => {
      _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setToken(tokenInput.value);
    });
  }

  // open time, closed time
  {
    const openTimeInput = document.querySelector('.input-opentime');
    const closedTimeInput = document.querySelector('.input-closedtime');
    const openTime = _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getOpenTime() || '';
    const closedTime = _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getClosedTime() || '';

    openTimeInput.value = openTime;
    closedTimeInput.value = closedTime;

    openTimeInput.addEventListener('blur', () => {
      let time = openTimeInput.value;
      if (!time) {
        time = _constants__WEBPACK_IMPORTED_MODULE_2__["DEFAULT"].OPEN_TIME;
        openTimeInput.value = time;
      }
      _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setOpenTime(time);
    });

    closedTimeInput.addEventListener('blur', () => {
      let time = closedTimeInput.value;
      if (!time) {
        time = _constants__WEBPACK_IMPORTED_MODULE_2__["DEFAULT"].CLOSED_TIME;
        closedTimeInput.value = time;
      }
      _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setClosedTime(time);
    });
  }

  // Day of the week
  {
    const dayOfTheWeekForm = document.querySelector('.dayoftheweek-form');
    const days = _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getDayOfTheWeek() || [];

    days.forEach(day => {
      (dayOfTheWeekForm.querySelector(`.input-dayoftheweek[value=${day}]`) || {}).checked = true;
    });

    dayOfTheWeekForm.addEventListener('input', () => {
      const checks = Array.from(dayOfTheWeekForm.querySelectorAll('.input-dayoftheweek:checked')).map(a => a.value);
      _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setDayOfTheWeek(checks);
    });
  }

  // emoji
  {
    const emojiInput = document.querySelector('.input-emoji');
    const emoji = _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getEmoji() || '';

    emojiInput.value = emoji;

    emojiInput.addEventListener('blur', () => {
      let emoji = emojiInput.value;
      if (!emoji) {
        emoji = _constants__WEBPACK_IMPORTED_MODULE_2__["DEFAULT"].EMOJI;
        emojiInput.value = emoji;
      }
      _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setEmoji(emoji);
    });
  }

  // urls
  {
    const urlsTextarea = document.querySelector('.textarea-urls');

    urlsTextarea.value = (_web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].getURLs() || []).join('\n');

    urlsTextarea.addEventListener('blur', () => {
      const urls = (() => {
        const text = urlsTextarea.value;
        return text ? text.split(/\n/) : [];
      })();

      _web_storage__WEBPACK_IMPORTED_MODULE_1__["default"].setURLs(urls);
    });
  }
});


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9zdHlsZS5zY3NzPzM5ZWYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3dlYi1zdG9yYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL3BvcHVwLmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiZXhwb3J0IGNvbnN0IERFRkFVTFQgPSB7XG4gIE9QRU5fVElNRTogJzA5OjAwJyxcbiAgQ0xPU0VEX1RJTUU6ICcxODowMCcsXG4gIERBWV9PRl9USEVfV0VFSzogWydtb24nLCAndHVlJywgJ3dlZCcsICd0aHUnLCAnZnJpJ10sXG4gIEVNT0pJOiAnZXllcycsXG4gIFVSTFM6IFsnaHR0cHM6Ly90d2l0dGVyLmNvbS8qJ11cbn1cblxuZXhwb3J0IGNvbnN0IEtFWSA9IHtcbiAgVE9LRU46ICd0b2tlbicsXG4gIE9QRU5fVElNRTogJ29wZW4tdGltZScsXG4gIENMT1NFRF9USU1FOiAnY2xvc2VkLXRpbWUnLFxuICBEQVlfT0ZfVEhFX1dFRUs6ICdkYXlvZnRoZXdlZWsnLFxuICBFTU9KSTogJ2Vtb2ppJyxcbiAgUFJPR1JFU1NFRF9TRUNPTkRTOiAncHJvZ3Jlc3NlZC1zZWNvbmRzJyxcbiAgUFJPR1JFU1NFRF9NSU5VVEVTOiAncHJvZ3Jlc3NlZC1taW51dGVzJyxcbiAgTEFTVF9VUERBVEVfREFURTogJ2xhc3QtdXBkYXRlLWRhdGUnLFxuICBVUkxTOiAndXJscydcbn1cbiIsImltcG9ydCAnLi4vY3NzL3N0eWxlLnNjc3MnO1xuaW1wb3J0IFdlYlN0b3JhZ2UgZnJvbSAnLi93ZWItc3RvcmFnZSc7XG5pbXBvcnQgKiBhcyBDb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvLyB0b2tlblxuICB7XG4gICAgY29uc3QgdG9rZW5JbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC10b2tlbicpO1xuXG4gICAgdG9rZW5JbnB1dC52YWx1ZSA9IFdlYlN0b3JhZ2UuZ2V0VG9rZW4oKSB8fCAnJztcblxuICAgIHRva2VuSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgIFdlYlN0b3JhZ2Uuc2V0VG9rZW4odG9rZW5JbnB1dC52YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBvcGVuIHRpbWUsIGNsb3NlZCB0aW1lXG4gIHtcbiAgICBjb25zdCBvcGVuVGltZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LW9wZW50aW1lJyk7XG4gICAgY29uc3QgY2xvc2VkVGltZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWNsb3NlZHRpbWUnKTtcbiAgICBjb25zdCBvcGVuVGltZSA9IFdlYlN0b3JhZ2UuZ2V0T3BlblRpbWUoKSB8fCAnJztcbiAgICBjb25zdCBjbG9zZWRUaW1lID0gV2ViU3RvcmFnZS5nZXRDbG9zZWRUaW1lKCkgfHwgJyc7XG5cbiAgICBvcGVuVGltZUlucHV0LnZhbHVlID0gb3BlblRpbWU7XG4gICAgY2xvc2VkVGltZUlucHV0LnZhbHVlID0gY2xvc2VkVGltZTtcblxuICAgIG9wZW5UaW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgIGxldCB0aW1lID0gb3BlblRpbWVJbnB1dC52YWx1ZTtcbiAgICAgIGlmICghdGltZSkge1xuICAgICAgICB0aW1lID0gQ29uc3RhbnRzLkRFRkFVTFQuT1BFTl9USU1FO1xuICAgICAgICBvcGVuVGltZUlucHV0LnZhbHVlID0gdGltZTtcbiAgICAgIH1cbiAgICAgIFdlYlN0b3JhZ2Uuc2V0T3BlblRpbWUodGltZSk7XG4gICAgfSk7XG5cbiAgICBjbG9zZWRUaW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpID0+IHtcbiAgICAgIGxldCB0aW1lID0gY2xvc2VkVGltZUlucHV0LnZhbHVlO1xuICAgICAgaWYgKCF0aW1lKSB7XG4gICAgICAgIHRpbWUgPSBDb25zdGFudHMuREVGQVVMVC5DTE9TRURfVElNRTtcbiAgICAgICAgY2xvc2VkVGltZUlucHV0LnZhbHVlID0gdGltZTtcbiAgICAgIH1cbiAgICAgIFdlYlN0b3JhZ2Uuc2V0Q2xvc2VkVGltZSh0aW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERheSBvZiB0aGUgd2Vla1xuICB7XG4gICAgY29uc3QgZGF5T2ZUaGVXZWVrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXlvZnRoZXdlZWstZm9ybScpO1xuICAgIGNvbnN0IGRheXMgPSBXZWJTdG9yYWdlLmdldERheU9mVGhlV2VlaygpIHx8IFtdO1xuXG4gICAgZGF5cy5mb3JFYWNoKGRheSA9PiB7XG4gICAgICAoZGF5T2ZUaGVXZWVrRm9ybS5xdWVyeVNlbGVjdG9yKGAuaW5wdXQtZGF5b2Z0aGV3ZWVrW3ZhbHVlPSR7ZGF5fV1gKSB8fCB7fSkuY2hlY2tlZCA9IHRydWU7XG4gICAgfSk7XG5cbiAgICBkYXlPZlRoZVdlZWtGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgY29uc3QgY2hlY2tzID0gQXJyYXkuZnJvbShkYXlPZlRoZVdlZWtGb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dC1kYXlvZnRoZXdlZWs6Y2hlY2tlZCcpKS5tYXAoYSA9PiBhLnZhbHVlKTtcbiAgICAgIFdlYlN0b3JhZ2Uuc2V0RGF5T2ZUaGVXZWVrKGNoZWNrcyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBlbW9qaVxuICB7XG4gICAgY29uc3QgZW1vamlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lbW9qaScpO1xuICAgIGNvbnN0IGVtb2ppID0gV2ViU3RvcmFnZS5nZXRFbW9qaSgpIHx8ICcnO1xuXG4gICAgZW1vamlJbnB1dC52YWx1ZSA9IGVtb2ppO1xuXG4gICAgZW1vamlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgICAgbGV0IGVtb2ppID0gZW1vamlJbnB1dC52YWx1ZTtcbiAgICAgIGlmICghZW1vamkpIHtcbiAgICAgICAgZW1vamkgPSBDb25zdGFudHMuREVGQVVMVC5FTU9KSTtcbiAgICAgICAgZW1vamlJbnB1dC52YWx1ZSA9IGVtb2ppO1xuICAgICAgfVxuICAgICAgV2ViU3RvcmFnZS5zZXRFbW9qaShlbW9qaSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB1cmxzXG4gIHtcbiAgICBjb25zdCB1cmxzVGV4dGFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dGFyZWEtdXJscycpO1xuXG4gICAgdXJsc1RleHRhcmVhLnZhbHVlID0gKFdlYlN0b3JhZ2UuZ2V0VVJMcygpIHx8IFtdKS5qb2luKCdcXG4nKTtcblxuICAgIHVybHNUZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKCkgPT4ge1xuICAgICAgY29uc3QgdXJscyA9ICgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHQgPSB1cmxzVGV4dGFyZWEudmFsdWU7XG4gICAgICAgIHJldHVybiB0ZXh0ID8gdGV4dC5zcGxpdCgvXFxuLykgOiBbXTtcbiAgICAgIH0pKCk7XG5cbiAgICAgIFdlYlN0b3JhZ2Uuc2V0VVJMcyh1cmxzKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iLCJpbXBvcnQgKiBhcyBDb25zdGFudHMgZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJTdG9yYWdlIHtcblxuICBzdGF0aWMgZ2V0VG9rZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5UT0tFTik7XG4gIH1cblxuICBzdGF0aWMgc2V0VG9rZW4odG9rZW4pIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0SXRlbShDb25zdGFudHMuS0VZLlRPS0VOLCB0b2tlbik7XG4gIH1cblxuICBzdGF0aWMgZ2V0T3BlblRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5PUEVOX1RJTUUpO1xuICB9XG5cbiAgc3RhdGljIHNldE9wZW5UaW1lKG9wZW5UaW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldEl0ZW0oQ29uc3RhbnRzLktFWS5PUEVOX1RJTUUsIG9wZW5UaW1lKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDbG9zZWRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtKENvbnN0YW50cy5LRVkuQ0xPU0VEX1RJTUUpO1xuICB9XG5cbiAgc3RhdGljIHNldENsb3NlZFRpbWUoY2xvc2VkVGltZSkge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuQ0xPU0VEX1RJTUUsIGNsb3NlZFRpbWUpO1xuICB9XG5cbiAgc3RhdGljIGdldERheU9mVGhlV2VlaygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbShDb25zdGFudHMuS0VZLkRBWV9PRl9USEVfV0VFSywgeyBpc09iamVjdDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzZXREYXlPZlRoZVdlZWsoZGF5cykge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuREFZX09GX1RIRV9XRUVLLCBKU09OLnN0cmluZ2lmeShkYXlzKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0RW1vamkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5FTU9KSSk7XG4gIH1cblxuICBzdGF0aWMgc2V0RW1vamkoZW1vamkpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0SXRlbShDb25zdGFudHMuS0VZLkVNT0pJLCBlbW9qaSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvZ3Jlc3NlZFNlY29uZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldEl0ZW0oQ29uc3RhbnRzLktFWS5QUk9HUkVTU0VEX1NFQ09ORFMsIHsgaXNOdW1iZXI6IHRydWUgfSk7XG4gIH1cblxuICBzdGF0aWMgc2V0UHJvZ3Jlc3NlZFNlY29uZHMoc2Vjb25kcykge1xuICAgIHJldHVybiB0aGlzLl9zZXRJdGVtKENvbnN0YW50cy5LRVkuUFJPR1JFU1NFRF9TRUNPTkRTLCBzZWNvbmRzKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9ncmVzc2VkTWludXRlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0SXRlbShDb25zdGFudHMuS0VZLlBST0dSRVNTRURfTUlOVVRFUywgeyBpc051bWJlcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRQcm9ncmVzc2VkTWludXRlcyhtaW51dGVzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NldEl0ZW0oQ29uc3RhbnRzLktFWS5QUk9HUkVTU0VEX01JTlVURVMsIG1pbnV0ZXMpO1xuICB9XG5cbiAgc3RhdGljIGdldExhc3RVcGRhdGVEYXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtKENvbnN0YW50cy5LRVkuTEFTVF9VUERBVEVfREFURSk7XG4gIH1cblxuICBzdGF0aWMgc2V0TGFzdFVwZGF0ZURhdGUobGFzdFVwZGF0ZURhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0SXRlbShDb25zdGFudHMuS0VZLkxBU1RfVVBEQVRFX0RBVEUsIGxhc3RVcGRhdGVEYXRlKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRVUkxzKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRJdGVtKENvbnN0YW50cy5LRVkuVVJMUywgeyBpc09iamVjdDogdHJ1ZSB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRVUkxzKHVybHMpIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0SXRlbShDb25zdGFudHMuS0VZLlVSTFMsIEpTT04uc3RyaW5naWZ5KHVybHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBfZ2V0SXRlbShrZXksIHsgaXNOdW1iZXIgPSBmYWxzZSwgaXNPYmplY3QgPSBmYWxzZSB9ID0ge30pIHtcbiAgICBjb25zdCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG5cbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGlzTnVtYmVyKSByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBpZiAoaXNPYmplY3QpIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzdGF0aWMgX3NldEl0ZW0oa2V5LCBpdGVtKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBpdGVtKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBOzs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==