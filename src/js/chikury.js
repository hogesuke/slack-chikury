import ChikuryClient from './chikury-client';
import SaboriDetector from './sabori-detector';
import TimeKeeper from './time-keeper';
import StorageAccessor from './storage-accessor';

export default class Chikury {

  constructor() {
    // todo localStorageから取得できなかった場合の処理
    const token = StorageAccessor.getToken();

    this.client = new ChikuryClient(token);
    this.detector = new SaboriDetector(['https://twitter.com/*']);
    this.timeKeeper = new TimeKeeper();

    this.isChikurying = false;
  }

  async run() {
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

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    const saboriTime = this.timeKeeper.calcTotalSaboriTime(new Date());

    this.postChikury(saboriTime);

    this.timeUpdateInterval = setInterval(this.intervalUpdater.bind(this), 10000); // todo intervalの間隔を広くするように要修正（30000ぐらい)
  }

  async intervalUpdater() {
    console.log('timeUpdateInterval');
    const exists = await this.detector.existsSaboriTab();
    const isWithinTimeRange = this.timeKeeper.isWithinTimeRange();

    if (!exists || !isWithinTimeRange) {
      this.exitSabori();
      return;
    }

    const lastUpdateMinutes = StorageAccessor.getProgressedMinutes();
    const lastUpdateDate = StorageAccessor.getLastUpdateDate() ? new Date(StorageAccessor.getLastUpdateDate()) : null
    const saboriTime = this.timeKeeper.calcTotalSaboriTime(lastUpdateDate);

    // 経過分が変わったときだけ更新
    if (lastUpdateMinutes !== saboriTime.minutes) {
      this.postChikury(saboriTime);
    }
  }

  exitSabori() {
    if (!this.isChikurying) {
      console.log('exitSabori 何もしない')
      return;
    }

    console.log('exitSabori')

    clearInterval(this.timeUpdateInterval)

    const saboriTime = this.timeKeeper.calcTotalSaboriTime();

    StorageAccessor.setProgressedSeconds(saboriTime.seconds);

    this.clearChikury()
  }

  postChikury(saboriTime) {

    this.client
      .post(saboriTime.minutes)
      .then(() => {
        StorageAccessor.setLastUpdateDate(new Date().toISOString());
        StorageAccessor.setProgressedMinutes(saboriTime.minutes);
        StorageAccessor.setProgressedSeconds(saboriTime.seconds);
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
