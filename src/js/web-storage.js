import * as Constants from './constants';

export default class WebStorage {

  static getToken() {
    return this._getItem(Constants.KEY.TOKEN);
  }

  static setToken(token) {
    return this._setItem(Constants.KEY.TOKEN, token);
  }

  static getOpenTime() {
    return this._getItem(Constants.KEY.OPEN_TIME);
  }

  static setOpenTime(openTime) {
    return this._setItem(Constants.KEY.OPEN_TIME, openTime);
  }

  static getClosedTime() {
    return this._getItem(Constants.KEY.CLOSED_TIME);
  }

  static setClosedTime(closedTime) {
    return this._setItem(Constants.KEY.CLOSED_TIME, closedTime);
  }

  static getDayOfTheWeek() {
    return this._getItem(Constants.KEY.DAY_OF_THE_WEEK, { isObject: true });
  }

  static setDayOfTheWeek(days) {
    return this._setItem(Constants.KEY.DAY_OF_THE_WEEK, JSON.stringify(days));
  }

  static getEmoji() {
    return this._getItem(Constants.KEY.EMOJI);
  }

  static setEmoji(emoji) {
    return this._setItem(Constants.KEY.EMOJI, emoji);
  }

  static getProgressedSeconds() {
    return this._getItem(Constants.KEY.PROGRESSED_SECONDS, { isNumber: true });
  }

  static setProgressedSeconds(seconds) {
    return this._setItem(Constants.KEY.PROGRESSED_SECONDS, seconds);
  }

  static getProgressedMinutes() {
    return this._getItem(Constants.KEY.PROGRESSED_MINUTES, { isNumber: true });
  }

  static setProgressedMinutes(minutes) {
    return this._setItem(Constants.KEY.PROGRESSED_MINUTES, minutes);
  }

  static getLastUpdateDate() {
    return this._getItem(Constants.KEY.LAST_UPDATE_DATE);
  }

  static setLastUpdateDate(lastUpdateDate) {
    return this._setItem(Constants.KEY.LAST_UPDATE_DATE, lastUpdateDate);
  }

  static getURLs() {
    return this._getItem(Constants.KEY.URLS, { isObject: true });
  }

  static setURLs(urls) {
    return this._setItem(Constants.KEY.URLS, JSON.stringify(urls));
  }

  static _getItem(key, { isNumber = false, isObject = false } = {}) {
    const value = localStorage.getItem(key);

    if (isNumber) return parseInt(value, 10);
    if (isObject) return JSON.parse(value);
    return value;
  }

  static _setItem(key, item) {
    localStorage.setItem(key, item);
  }
}
