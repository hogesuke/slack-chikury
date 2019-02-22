import StorageAccessor from './storage-accessor';

export default class TimeCalculator {

  static calcTotalSaboriTime(fromDate) {
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

  static _getYYYYMD(date) {
    if (!date) return '';
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  }
}