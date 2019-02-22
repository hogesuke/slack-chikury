import APIClient from './api-client';
import SaboriDetector from './sabori-detector';
import TimeKeeper from './time-keeper';
import TimeCalculator from './time-calculator';
import StorageAccessor from './storage-accessor'; // todo クラス名変える
import * as Constants from './constants';

export default class Chikury {

  constructor() {
    // todo localStorageから取得できなかった場合の処理
    const token = StorageAccessor.getToken();
    const urls = StorageAccessor.getURLs();

    this.client = new APIClient(token);
    this.detector = new SaboriDetector(urls);

    this.isChikurying = false;
  }

  init() {
    StorageAccessor.getOpenTime() || StorageAccessor.setOpenTime(Constants.DEFAULT.OPEN_TIME);
    StorageAccessor.getClosedTime() || StorageAccessor.setClosedTime(Constants.DEFAULT.CLOSED_TIME);
    StorageAccessor.getDayOfTheWeek() || StorageAccessor.setDayOfTheWeek(Constants.DEFAULT.DAY_OF_THE_WEEK);
    StorageAccessor.getEmoji() || StorageAccessor.setEmoji(Constants.DEFAULT.EMOJI);
    StorageAccessor.getURLs() || StorageAccessor.setURLs(Constants.DEFAULT.URLS);
  }

  async run() {
    chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
    chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));

    const tabs = await this.detector.detectSaboriTabs();

    if (!tabs.isEmpty() && TimeKeeper.isApplied()) {
      this.startSabori(tabs);
    } else {
      this.exitSabori();
    }
  }

  async onTabUpdated(tabId, changeInfo) {
    if (!changeInfo.url) return;

    console.log('changeInfo', changeInfo);

    const tabs = await this.detector.detectSaboriTabs();

    if (!tabs.isEmpty() && TimeKeeper.isApplied()) {
      this.startSabori(tabs);
    } else {
      this.exitSabori();
    }
  }

  async onTabRemoved() {
    const tabs = await this.detector.detectSaboriTabs();
    if (tabs.isEmpty()) {
      this.exitSabori();
    }
  }

  startSabori(tabs) {
    // すでにチクり中であれば何もしない
    if (this.isChikurying) {
      console.log('startSabori 何もしない')
      return;
    }

    console.log('startSabori');
    console.log('tabs', tabs);

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    const saboriTime = TimeCalculator.calcTotalSaboriTime(new Date());
    const tab = tabs.getCurrentSaboriTab();

    this.postChikury(saboriTime, tab.title);

    this.timeUpdateInterval = setInterval(this.intervalUpdater.bind(this), 10000); // todo intervalの間隔を広くするように要修正（30000ぐらい)
  }

  async intervalUpdater() {
    console.log('timeUpdateInterval');
    const tabs = await this.detector.detectSaboriTabs();

    if (tabs.isEmpty() || !TimeKeeper.isApplied()) {
      this.exitSabori();
      return;
    }

    const lastUpdateMinutes = StorageAccessor.getProgressedMinutes();
    const lastUpdateDate = StorageAccessor.getLastUpdateDate() ? new Date(StorageAccessor.getLastUpdateDate()) : null
    const saboriTime = TimeCalculator.calcTotalSaboriTime(lastUpdateDate);
    const tab = tabs.getCurrentSaboriTab();

    // 経過分が変わったときだけ更新
    if (lastUpdateMinutes !== saboriTime.minutes) {
      this.postChikury(saboriTime, tab.title);
    }
  }

  exitSabori() {
    if (!this.isChikurying) {
      console.log('exitSabori 何もしない')
      return;
    }

    console.log('exitSabori')

    clearInterval(this.timeUpdateInterval)

    const saboriTime = TimeCalculator.calcTotalSaboriTime();

    StorageAccessor.setProgressedSeconds(saboriTime.seconds);

    this.clearChikury()
  }

  postChikury(saboriTime, title) {

    this.client
      .post({ minutes: saboriTime.minutes, title })
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
