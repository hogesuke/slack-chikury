import APIClient from './api-client';
import SaboriDetector from './sabori-detector';
import TimeKeeper from './time-keeper';
import TimeCalculator from './time-calculator';
import WebStorage from './web-storage';
import BadgeManager from './badge-manager';
import * as Constants from './constants';

export default class Chikury {

  constructor() {
    this.init();
    this.isChikurying = false;
  }

  init() {
    WebStorage.getProgressedMinutes() !== null || WebStorage.setProgressedMinutes(0);
    WebStorage.getProgressedSeconds() !== null || WebStorage.setProgressedSeconds(0);
    WebStorage.getLastUpdateDate() || WebStorage.setLastUpdateDate(new Date().toISOString());
    WebStorage.getOpenTime() || WebStorage.setOpenTime(Constants.DEFAULT.OPEN_TIME);
    WebStorage.getClosedTime() || WebStorage.setClosedTime(Constants.DEFAULT.CLOSED_TIME);
    WebStorage.getDayOfTheWeek() || WebStorage.setDayOfTheWeek(Constants.DEFAULT.DAY_OF_THE_WEEK);
    WebStorage.getEmoji() || WebStorage.setEmoji(Constants.DEFAULT.EMOJI);
    WebStorage.getURLs() || WebStorage.setURLs(Constants.DEFAULT.URLS);
  }

  async run() {
    chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
    chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));

    BadgeManager.updateMinutes(WebStorage.getProgressedMinutes());
    BadgeManager.turnOff();

    this.judge();
  }

  async onTabUpdated(tabId, changeInfo) {
    if (!changeInfo.url) return;

    console.log('changeInfo', changeInfo);

    this.judge();
  }

  async onTabRemoved() {
    const tabs = await SaboriDetector.detectSaboriTabs();
    if (tabs.isEmpty()) {
      this.exitSabori();
    }
  }

  async judge() {
    const tabs = await SaboriDetector.detectSaboriTabs();

    if (TimeKeeper.hasChangedDate()) {
      WebStorage.setLastUpdateDate(new Date().toISOString());
      WebStorage.setProgressedMinutes(0);
      WebStorage.setProgressedSeconds(0);
    }

    if (!tabs.isEmpty() && TimeKeeper.isApplied()) {
      this.startSabori(tabs);
    } else {
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

    const tab = tabs.getCurrentSaboriTab();
    const minutes = WebStorage.getProgressedMinutes();
    const seconds = WebStorage.getProgressedSeconds();

    this.postChikury({
      minutes,
      seconds
    }, tab.title);

    BadgeManager.updateMinutes(minutes);
    BadgeManager.turnOn();

    this.timeUpdateInterval = setInterval(this.intervalUpdater.bind(this), 30000);
  }

  async intervalUpdater() {
    console.log('timeUpdateInterval');
    const tabs = await SaboriDetector.detectSaboriTabs();

    if (tabs.isEmpty() || !TimeKeeper.isApplied()) {
      this.exitSabori();
      return;
    }

    const lastUpdateMinutes = WebStorage.getProgressedMinutes();
    const saboriTime = TimeKeeper.hasChangedDate() ? TimeCalculator.initialSaboriTime : TimeCalculator.calcTotalSaboriTime();
    const tab = tabs.getCurrentSaboriTab();

    // 経過分が変わったときだけ更新
    if (lastUpdateMinutes !== saboriTime.minutes) {
      this.postChikury(saboriTime, tab.title);
      BadgeManager.updateMinutes(saboriTime.minutes);
    }
  }

  exitSabori() {
    if (!this.isChikurying) {
      console.log('exitSabori 何もしない')
      return;
    }

    console.log('exitSabori')

    clearInterval(this.timeUpdateInterval)

    const saboriTime = TimeKeeper.hasChangedDate() ? TimeCalculator.initialSaboriTime : TimeCalculator.calcTotalSaboriTime();
    WebStorage.setLastUpdateDate(new Date().toISOString());
    WebStorage.setProgressedMinutes(saboriTime.minutes);
    WebStorage.setProgressedSeconds(saboriTime.seconds);

    BadgeManager.turnOff();

    this.clearChikury()
  }

  postChikury(saboriTime, title) {
    return APIClient
      .post({ minutes: saboriTime.minutes, title })
      .then(() => {
        WebStorage.setLastUpdateDate(new Date().toISOString());
        WebStorage.setProgressedMinutes(saboriTime.minutes);
        WebStorage.setProgressedSeconds(saboriTime.seconds);
        this.isChikurying = true;
      }).catch(() => {
        // NOP
      });
  }

  clearChikury() {
    return APIClient
      .clear()
      .then(() => {
        this.isChikurying = false;
      }).catch(() => {
        // NOP
      });
  }
}
