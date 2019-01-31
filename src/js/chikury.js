import ChikuryClient from './chikury-client';
import SaboriDetector from './sabori-detector';
import TimeKeeper from './time-keeper';

export default class Chikury {

  constructor() {
    // todo localStorageから取得できなかった場合の処理
    const token = localStorage.getItem('token');

    this.client = new ChikuryClient(token);
    this.detector = new SaboriDetector(['https://twitter.com/*']);
    this.timeKeeper = new TimeKeeper();

    this.isChikurying = false;
  }

  async init() {
    chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
    chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));

    const exists = await this.detector.existsSaboriTab();
    const isWithinTimeRange = this.timeKeeper.isWithinTimeRange();

    if (exists && isWithinTimeRange) {
      this.startSabori();
    } else {
      this.exitSabori();
    }
  }

  async onTabUpdated(tabId, changeInfo) {
    if (!changeInfo.url) return;

    console.log('changeInfo', changeInfo);

    const exists = await this.detector.existsSaboriTab();
    const isWithinTimeRange = this.timeKeeper.isWithinTimeRange();

    if (exists && isWithinTimeRange) {
      this.startSabori();
    } else {
      this.exitSabori();
    }
  }

  async onTabRemoved() {
    const exists = await this.detector.existsSaboriTab();
    if (!exists) {
      this.exitSabori();
    }
  }

  startSabori() {
    // すでにチクり中であれば何もしない
    if (this.isChikurying) {
      console.log('startSabori 何もしない')
      return;
    }

    console.log('startSabori');

    const startDate = localStorage.getItem('sabori-start-date');

    console.log('startDate', startDate, !!startDate);

    if (!startDate) {
      localStorage.setItem('sabori-start-date', new Date().toISOString());
    }

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    let minutes = this.timeKeeper.calcTotalSaboriMinutes();

    this.postChikury(minutes);

    this.timeUpdateInterval = setInterval(async () => {
      console.log('timeUpdateInterval');
      const exists = await this.detector.existsSaboriTab();
      const isWithinTimeRange = this.timeKeeper.isWithinTimeRange();

      if (!exists || !isWithinTimeRange) {
        this.exitSabori();
        return;
      }

      const updatedMinutes = this.timeKeeper.calcTotalSaboriMinutes();

      // 経過分が変わったときだけ更新
      if (minutes !== updatedMinutes) {
        minutes = updatedMinutes;
        this.postChikury(updatedMinutes);
      }
    }, 10000); // todo intervalの間隔を広くするように要修正（30000ぐらい)
  }

  exitSabori() {
    if (!this.isChikurying) {
      console.log('exitSabori 何もしない')
      return;
    }

    console.log('exitSabori')

    clearInterval(this.timeUpdateInterval)
    localStorage.setItem('seconds', this.timeKeeper.calcTotalSaboriSeconds());
    localStorage.setItem('sabori-start-date', '');
    this.clearChikury()
  }

  postChikury(minutes) {
    this.client
      .post(minutes)
      .then(() => {
        localStorage.setItem('last-update-date', new Date().toISOString());
        this.isChikurying = true;
      });
  }

  clearChikury() {
    this.client
      .clear()
      .then(() => {
        this.isChikurying = false;
      });
  }
}
