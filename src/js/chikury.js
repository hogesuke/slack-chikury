export default class Chikury {

  constructor() {
    // todo tokenが取得できなかった場合の処理
    this.token = localStorage.getItem('token');
    this.isChikurying = false;
    this.startDate = null;
  }

  init() {
    chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
    chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));
  }

  onTabUpdated(tabId, changeInfo) {
    if (!changeInfo.url) {
      return;
    }

    // Twitterが開かれたら
    if (/^https:\/\/twitter\.com/.test(changeInfo.url)) {
      !this.isChikurying && this.startSabori();
    } else {
      this.isChikurying && this.exitSabori();
    }
  }

  onTabRemoved() {
    this.isChikurying && this.exitSabori();
  }

  startSabori() {
    this.startDate = this.startDate ? this.startDate : new Date();

    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    const minutes = this.calcTotalSaboriMinutes();

    this.timeUpdateInterval = setInterval(() => {
      const updatedMinutes = this.calcTotalSaboriMinutes();

      if (minutes !== updatedMinutes) {
        this.chikuru(updatedMinutes);
      }
    }, 10000);

    this.chikuru(minutes);
  }

  exitSabori() {
    this.validateTwitterTabExistence().then(exists => {
      if (!exists) {
        clearInterval(this.timeUpdateInterval)
        localStorage.setItem('seconds', this.calcTotalSaboriSeconds());
        this.startDate = null;
        this.clearChikuri()
      }
    });
  }

  calcTotalSaboriSeconds() {
    const lastUpdateString = localStorage.getItem('last-update')
    const last = lastUpdateString ? new Date(lastUpdateString) : null;
    const lastYYYYMMDD = last ? last.getYear() + last.getMonth() + last.getDate() : null;
    const current = new Date();
    const currentYYYYMMDD = current.getYear() + current.getMonth() + current.getDate();

    if (lastYYYYMMDD !== currentYYYYMMDD) {
      localStorage.setItem('seconds', 0);
      return 0;
    }

    const savedSeconds = parseInt(localStorage.getItem('seconds')) || 0;
    return ((current - this.startDate) / 1000) + savedSeconds;
  }

  calcTotalSaboriMinutes() {
      return Math.ceil(this.calcTotalSaboriSeconds() / 60);
  }

  async validateTwitterTabExistence() {
    return new Promise(resolve => {
      chrome.tabs.query({
        url: 'https://twitter.com/*'
      }, tabs => {
        resolve(tabs.length > 0);
      });
    });
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
      this.isChikurying = true;
      localStorage.setItem('last-update', new Date().toISOString());
    });
  }

  clearChikuri() {
    this.postProfile({
      status_text: '',
      status_emoji: ':palm_tree:'
    }).then(
      () => (this.isChikurying = false)
    );
  }
}
