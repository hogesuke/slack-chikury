import SaboriTabCollection from './sabori-tab-collection';

export default class SaboriDetector {

  constructor(targetUrls = []) {
    this.targetUrls = targetUrls;
  }

  async detectSaboriTabs() {
    return new Promise(resolve => {
      chrome.tabs.query({
        url: this.targetUrls
      }, tabs => {
        resolve(new SaboriTabCollection(tabs));
      });
    });
  }
}
