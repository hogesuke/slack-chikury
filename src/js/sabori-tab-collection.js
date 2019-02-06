export default class SaboriTabCollection {

  constructor(tabs = []) {
    this.tabs = tabs;
  }

  isEmpty() {
    return this.tabs.length <= 0;
  }

  getCurrentSaboriTab() {
    if (this.tabs.length <= 0) return null;

    const activeTab = this.tabs.find(a => a.active);
    if (activeTab) return activeTab;

    const id = Math.max(...this.tabs.map(a => a.id));
    return this.tabs.find(a => a.id === id);
  }
}
