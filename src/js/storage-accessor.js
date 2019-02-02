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

  static getProgressedSeconds() {
    return this._getItem('seconds');
  }

  static setProgressedSeconds(seconds) {
    return this._setItem('seconds', seconds);
  }

  static getLastUpdateMinutes() {
    return this._getItem('last-update-minutes');
  }

  static setLastUpdateMinutes(minutes) {
    return this._setItem('last-update-minutes', minutes);
  }

  static getLastUpdateDate() {
    return this._getItem('last-update-date');
  }

  static setLastUpdateDate(lastUpdateDate) {
    return this._setItem('last-update-date', lastUpdateDate);
  }

  static _getItem(key) {
    return localStorage.getItem(key);
  }

  static _setItem(key, item) {
    localStorage.setItem(key, item);
  }
}
