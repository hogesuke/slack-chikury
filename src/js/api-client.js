import StorageAccessor from './storage-accessor'

export default class APIClient {

  constructor (token) {
    this.token = token;
  }

  post ({ minutes = 0, title = '' } = {}) {
    return this._postProfile({
      status_text: `:shushing_face: [見てる] [${title}] [計 ${minutes}分]`,
      status_emoji: `:${StorageAccessor.getEmoji()}:`
    });
  }

  clear () {
    return this._postProfile({
      status_text: '',
      status_emoji: ''
    });
  }

  _postProfile (profile) {
    return fetch('https://slack.com/api/users.profile.set', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        profile
      })
    });
  }
}
