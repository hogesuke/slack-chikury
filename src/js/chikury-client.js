export default class ChikuryClient {

  constructor (token) {
    this.token = token;
  }

  post (minutes) {
    return this._postProfile({
      status_text: `${minutes}分`,
      status_emoji: ':herb:'
    });
  }

  clear () {
    return this._postProfile({
      status_text: '',
      status_emoji: ':palm_tree:'
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
