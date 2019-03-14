import WebStorage from './web-storage';

export default class TimeKeeper {

  static isApplied() {
    const current = new Date();
    return this._isWithinTimeRange(current) && this._isTargetDayOfTheWeek(current);
  }

  static hasChangedDate () {
    const lastUpdateDate = new Date(WebStorage.getLastUpdateDate());
    const currentDate = new Date();
    return this._getYYYYMD(lastUpdateDate) !== this._getYYYYMD(currentDate);
  }

  static _isWithinTimeRange(date) {
    const openTime = WebStorage.getOpenTime();
    const closedTime = WebStorage.getClosedTime();

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
    const targetDays = WebStorage.getDayOfTheWeek();
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
