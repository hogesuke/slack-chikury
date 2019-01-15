chrome.tabs.onUpdated.addListener(tabId => chrome.pageAction.show(tabId));

// todo tokenが取得できなかった場合の処理
const token = localStorage.getItem('token');
let isChikurying = false;

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

const clearProfile = () => {
  // Twitterのタブがひとつも開いていなければステータスを更新
  chrome.tabs.query({ url: 'https://twitter.com/*' }, tabs => {
    if (tabs.length <= 0) {
      postProfile({ status_text: 'bbb', status_emoji: ':palm_tree:' })
        .then(() => isChikurying = false);
    }
  });
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url) { return; }

  // Twitterが開かれたら
  if (/^https:\/\/twitter\.com/.test(changeInfo.url) && !isChikurying) {
    return postProfile({ status_text: 'aaa', status_emoji: ':herb:' })
      .then(() => isChikurying = true);
  }

  clearProfile();
});

chrome.tabs.onRemoved.addListener(() => {
  clearProfile();
})
