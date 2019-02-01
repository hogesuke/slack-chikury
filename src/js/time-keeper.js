import StorageAccessor from './storage-accessor';

export default class TimeKeeper {

  constructor() {}

  isWithinTimeRange() {
    // todo localStorageから取得できなかった場合の処理
    this.openTime = StorageAccessor.getOpenTime();
    this.closedTime = StorageAccessor.getClosedTime();

    const date = new Date();
    const current = this._getParsedTime(`${date.getHours()}:${date.getMinutes()}`);
    const open = this._getParsedTime(this.openTime);
    const closed = this._getParsedTime(this.closedTime);

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

  _getParsedTime(timeString) {
    const time = timeString.split(':');
    return {
      hours: parseInt(time[0]),
      minutes: parseInt(time[1])
    };
  }

  calcTotalSaboriSeconds() {
    const savedSeconds = parseInt(StorageAccessor.getProgressedSeconds()) || 0;
    const startDateString = StorageAccessor.getSaboriStartDate();

    if (!startDateString) return savedSeconds;

    const lastUpdateString = StorageAccessor.getLastUpdateDate();
    const last = lastUpdateString ? new Date(lastUpdateString) : null;
    const current = new Date();

    // 日付をまたいだ場合リセット
    if (this._getYYYYMD(last) !== this._getYYYYMD(current)) {
      StorageAccessor.setProgressedSeconds(0);
      return 0;
    }

    return ((current - new Date(startDateString)) / 1000) + savedSeconds;
  }

  calcTotalSaboriMinutes() {
    return Math.ceil(this.calcTotalSaboriSeconds() / 60);
  }

  _getYYYYMD(date) {
    if (!date) return '';
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  }
}
