export default class SaboriDetector {

  constructor(targetUrls = []) {
    this.targetUrls = targetUrls;
  }

  async existsSaboriTab() {
    return new Promise(resolve => {
      chrome.tabs.query({
        url: this.targetUrls
      }, tabs => {
        resolve(tabs.length > 0);
      });
    });
  }
}
