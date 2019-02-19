export default class StorageAccessor {

  static getToken() {
    return this._getItem('token');
  }

  static setToken(token) {
    return this._setItem('token', token);
  }

  static getOpenTime() {
    return this._getItem('open-time');
  }

  static setOpenTime(openTime) {
    return this._setItem('open-time', openTime);
  }

  static getClosedTime() {
    return this._getItem('closed-time');
  }

  static setClosedTime(closedTime) {
    return this._setItem('closed-time', closedTime);
  }

  static getDayOfTheWeek() {
    return this._getItem('dayoftheweek', { isObject: true });
  }

  static setDayOfTheWeek(days) {
    return this._setItem('dayoftheweek', JSON.stringify(days));
  }

  static getEmoji() {
    return this._getItem('emoji');
  }

  static setEmoji(emoji) {
    return this._setItem('emoji', emoji);
  }

  static getProgressedSeconds() {
    return this._getItem('progressed-seconds', { isNumber: true });
  }

  static setProgressedSeconds(seconds) {
    return this._setItem('progressed-seconds', seconds);
  }

  static getProgressedMinutes() {
    return this._getItem('progressed-minutes', { isNumber: true });
  }

  static setProgressedMinutes(minutes) {
    return this._setItem('progressed-minutes', minutes);
  }

  static getLastUpdateDate() {
    return this._getItem('last-update-date');
  }

  static setLastUpdateDate(lastUpdateDate) {
    return this._setItem('last-update-date', lastUpdateDate);
  }

  static getURLs() {
    return this._getItem('urls', { isObject: true });
  }

  static setURLs(urls) {
    return this._setItem('urls', JSON.stringify(urls));
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
