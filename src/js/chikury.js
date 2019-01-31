import SaboriDetector from './sabori-detector';
import TimeKeeper from './time-keeper';

export default class Chikury {

  constructor() {
    this.detector = new SaboriDetector(['https://twitter.com/*']);
    this.timeKeeper = new TimeKeeper();
    // todo localStorageから取得できなかった場合の処理
    this.token = localStorage.getItem('token');
    this.openTime = localStorage.getItem('open-time');
    this.closedTime = localStorage.getItem('closed-time');
    
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

    this.chikuru(minutes);

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
        this.chikuru(updatedMinutes);
      }
    }, 10000);
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
    this.clearChikuri()
  }


  postProfile(profile) {
    return fetch('https://slack.com/api/users.profile.set', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        profile
      })
    });
  }

  chikuru(minutes) {
    this.postProfile({
      status_text: `${minutes}分`,
      status_emoji: ':herb:'
    }).then(() => {
      localStorage.setItem('last-update-date', new Date().toISOString());
      this.isChikurying = true;
    });
  }

  clearChikuri() {
    this.postProfile({
      status_text: '',
      status_emoji: ':palm_tree:'
    }).then(() => {
      this.isChikurying = false;
    });
  }
}
