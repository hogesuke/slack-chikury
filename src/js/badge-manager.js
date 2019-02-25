export default class BadgeManager {
  static updateMinutes(minutes) {
    chrome.browserAction.setBadgeText({ text: String(minutes) })
  }

  static turnOff() {
    chrome.browserAction.setBadgeBackgroundColor({ color: [51, 111, 232, 100] });
  }

  static turnOn() {
    chrome.browserAction.setBadgeBackgroundColor({ color: [224, 44, 44, 100] });
  }
}
