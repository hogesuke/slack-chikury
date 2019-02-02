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

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    const time = this.timeKeeper.calcTotalSaboriTime(new Date());

    this.postChikury(time);

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

    const lastUpdateMinutes = StorageAccessor.getLastUpdateMinutes();
    const lastUpdateDate = StorageAccessor.getLastUpdateDate() ? new Date(StorageAccessor.getLastUpdateDate()) : null
    const time = this.timeKeeper.calcTotalSaboriTime(lastUpdateDate);

    // 経過分が変わったときだけ更新
    if (lastUpdateMinutes !== time.minutes) {
      this.postChikury(time);
    }
  }

  exitSabori() {
    if (!this.isChikurying) {
      console.log('exitSabori 何もしない')
      return;
    }

    console.log('exitSabori')

    clearInterval(this.timeUpdateInterval)

    const time = this.timeKeeper.calcTotalSaboriTime();

    StorageAccessor.setProgressedSeconds(time.seconds);

    this.clearChikury()
  }

  postChikury(time) {

    this.client
      .post(time.minutes)
      .then(() => {
        StorageAccessor.setLastUpdateDate(new Date().toISOString());
        StorageAccessor.setLastUpdateMinutes(time.minutes);
        StorageAccessor.setProgressedSeconds(time.seconds);
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
