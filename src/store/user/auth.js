import Cookies from 'js-cookie'

export class Auth {
  static setAccountPwd(value = {}) {
    return Cookies.set('user.accountPwd', JSON.stringify(value))
  }

  static getAccountPwd() {
    const accountPwd = Cookies.get('user.accountPwd');
    return accountPwd ? JSON.parse(accountPwd) : null
  }

  static removeAccountPwd() {
    return Cookies.remove('user.accountPwd')
  }

  static setToken(value) {
    return Cookies.set('user.token', value)
  }

  static getToken() {
    return Cookies.get('user.token')
  }

  static removeCookie(val) {
    return Cookies.remove(val)
  }
}
