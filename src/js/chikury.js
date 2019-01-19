export default class Chikury {

  constructor() {
    this.isChikurying = false;
    // todo tokenが取得できなかった場合の処理
    this.token = localStorage.getItem('token');
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
      !this.isChikurying && this.chikuru();
    } else {
      this.isChikurying &&
        this.validateTwitterTabExistence().then(exists => !exists && this.clear());
    }
  }

  onTabRemoved() {
    this.isChikurying &&
      this.validateTwitterTabExistence().then(exists => !exists && this.clear());
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

  chikuru() {
    this.postProfile({
      status_text: 'aaa',
      status_emoji: ':herb:'
    }).then(
      () => (this.isChikurying = true)
    );
  }

  clear() {
    this.postProfile({
      status_text: 'bbb',
      status_emoji: ':palm_tree:'
    }).then(
      () => (this.isChikurying = false)
    );
  }
}
