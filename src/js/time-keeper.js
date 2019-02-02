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
    }
  }

  calcTotalSaboriTime(fromDate) {
    const lastUpdateMinutes = parseInt(StorageAccessor.getProgressedMinutes()) || 0;
    const savedSeconds = parseInt(StorageAccessor.getProgressedSeconds()) || 0;

    if (!fromDate) {
      return {
        seconds: savedSeconds,
        minutes: lastUpdateMinutes
      }
    }

    const lastUpdateDateString = StorageAccessor.getLastUpdateDate();
    const lastDate = lastUpdateDateString ? new Date(lastUpdateDateString) : null;
    const currentDate = new Date();

    // 日付をまたいだ場合リセット
    if (this._getYYYYMD(lastDate) !== this._getYYYYMD(currentDate)) {
      return 0;
    }

    const seconds = ((currentDate - fromDate) / 1000) + savedSeconds
    const minutes = Math.ceil(seconds / 60);

    return {
      seconds,
      minutes
    };
  }

  _getYYYYMD(date) {
    if (!date) return '';
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  }
}
