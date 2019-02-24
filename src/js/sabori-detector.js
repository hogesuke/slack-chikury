import SaboriTabCollection from './sabori-tab-collection';
import WebStorage from './web-storage';

export default class SaboriDetector {

  static async detectSaboriTabs() {
    const urls = WebStorage.getURLs();

    if (!urls) return;

    return new Promise(resolve => {
      chrome.tabs.query({
        url: urls
      }, tabs => {
        resolve(new SaboriTabCollection(tabs));
      });
    });
  }
}
