import WebStorage from './web-storage';

export default class TimeCalculator {

  static calcTotalSaboriTime() {
    const progressedSeconds = WebStorage.getProgressedSeconds();
    const lastUpdateDate = new Date(WebStorage.getLastUpdateDate());
    const currentDate = new Date();

    const seconds = ((currentDate - lastUpdateDate) / 1000) + progressedSeconds
    const minutes = Math.ceil(seconds / 60);

    return {
      seconds,
      minutes
    };
  }

  static get initialSaboriTime() {
    return {
      seconds: 0,
      minutes: 0
    };
  }
}
