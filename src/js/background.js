
import Chikury from './chikury';

chrome.tabs.onUpdated.addListener(tabId => {
  if (chrome.runtime.lastError) return;
  chrome.pageAction.show(tabId)
});

new Chikury().init();
