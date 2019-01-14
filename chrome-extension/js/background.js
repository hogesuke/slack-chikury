chrome.tabs.onUpdated.addListener(tabId => chrome.pageAction.show(tabId));

// todo tokenが取得できなかった場合の処理
const token = localStorage.getItem('token');

const postProfile = profile => {
  return fetch('https://slack.com/api/users.profile.set', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ profile })
  });
};

chrome.tabs.onUpdated.addListener(tab => {
  if (/^https:\/\/twitter\.com/.test(tab.url)) {
    postProfile({ status_text: 'aaa', status_emoji: ':herb:' });
  }
});

chrome.tabs.onRemoved.addListener(() => {
  chrome.tabs.query({ url: 'https://twitter.com/*' }, tabs => {
    if (tabs.length <= 0) {
      postProfile({ status_text: 'bbb', status_emoji: ':palm_tree:' });
    }
  });
})
