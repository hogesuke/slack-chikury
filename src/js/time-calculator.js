import WebStorage from './web-storage';

export default class TimeCalculator {

  static calcTotalSaboriTime() {
    const progressedSeconds = WebStorage.getProgressedSeconds();
    const lastUpdateDate = new Date(WebStorage.getLastUpdateDate());
    const currentDate = new Date();

    // 日付をまたいだ場合リセット
    if (this._getYYYYMD(lastUpdateDate) !== this._getYYYYMD(currentDate)) {
      return {
        seconds: 0,
        minutes: 0
      };
    }

    const seconds = ((currentDate - lastUpdateDate) / 1000) + progressedSeconds
    const minutes = Math.ceil(seconds / 60);

    return {
      seconds,
      minutes
    };
  }

  static _getYYYYMD(date) {
    if (!date) return '';
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  }
}
