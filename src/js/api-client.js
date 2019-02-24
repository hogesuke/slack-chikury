import WebStorage from './web-storage'

export default class APIClient {

  static post ({ minutes = 0, title = '' } = {}) {
    return this._postProfile({
      status_text: `[見てる] [${title}] [計 ${minutes}分]`,
      status_emoji: `:${WebStorage.getEmoji()}:`
    });
  }

  static clear () {
    return this._postProfile({
      status_text: '',
      status_emoji: ''
    });
  }

  static async _postProfile (profile) {
    const token = WebStorage.getToken();

    if (!token) return Promise.reject();

    return fetch('https://slack.com/api/users.profile.set', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        profile
      })
    });
  }
}
