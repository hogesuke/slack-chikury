
import Chikury from './chikury';

chrome.tabs.onUpdated.addListener(tabId => chrome.pageAction.show(tabId));

new Chikury();
