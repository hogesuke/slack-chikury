import StorageAccessor from './storage-accessor';

export default class TimeKeeper {

  static isApplied() {
    const current = new Date();
    return this._isWithinTimeRange(current) && this._isTargetDayOfTheWeek(current);
  }

  static _isWithinTimeRange(date) {
    // todo localStorageから取得できなかった場合の処理
    const openTime = StorageAccessor.getOpenTime();
    const closedTime = StorageAccessor.getClosedTime();

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
    const targetDays = StorageAccessor.getDayOfTheWeek();
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
}
