export default class TimeKeeper {

  constructor() {
  }

  isWithinTimeRange () {
    // todo localStorageから取得できなかった場合の処理
    this.openTime = localStorage.getItem('open-time');
    this.closedTime = localStorage.getItem('closed-time');

    const date = new Date();
    const current = this.getParsedTime(`${date.getHours()}:${date.getMinutes()}`);
    const open = this.getParsedTime(this.openTime);
    const closed = this.getParsedTime(this.closedTime);

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

  getParsedTime (timeString) {
      const time = timeString.split(':');
      return {
        hours: parseInt(time[0]),
        minutes: parseInt(time[1])
      };
  }

  calcTotalSaboriSeconds() {
    const savedSeconds = parseInt(localStorage.getItem('seconds')) || 0;
    const startDateString = localStorage.getItem('sabori-start-date');

    if (!startDateString) return savedSeconds;

    const lastUpdateString = localStorage.getItem('last-update-date')
    const last = lastUpdateString ? new Date(lastUpdateString) : null;
    const current = new Date();

    // 日付をまたいだ場合リセット
    if (this.getYYYYMD(last) !== this.getYYYYMD(current)) {
      localStorage.setItem('seconds', 0);
      return 0;
    }

    return ((current - new Date(startDateString)) / 1000) + savedSeconds;
  }

  calcTotalSaboriMinutes() {
      return Math.ceil(this.calcTotalSaboriSeconds() / 60);
  }

  getYYYYMD (date) {
    if (!date) return '';
    return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  }
}
