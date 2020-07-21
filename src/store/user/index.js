/* eslint-disable no-throw-literal */
/**
 * user
 */

import {Msg} from '../../tools/message';
import {Auth} from './auth';
import db from './db'

const defaultUser = {loginStr: '', password: '', remember: false};

export default {
  state: {
    /** 用户登陆账户密码 */
    accountPwd: Auth.getAccountPwd() || defaultUser,
    /** 是否登陆 */
    isLogin: db.get('m_user') || false,
    isC_Login: db.get('c_user') || false,
    isA_Login: db.get('a_user') || false,
    /** 用户登陆角色信息 */
    userInfo: db.get('user.info') || {},
    /** 角色权限点 */
    permission: [],
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    isLoginMH(state){
      state.isLogin = db.get('m_user') || false
    },
    isLoginC(state){
      state.isC_Login = db.get('c_user') || false
    },
    isLoginA(state){
      state.isA_Login = db.get('a_user') || false
    },
    ACCOUNT_AUTH_USERNAME(state,data) {
      db.set('user.login', true)
      db.set('user.info', data)
      state.userInfo = data
    }, //全局获取userName的方法
    ACCOUNT_AUTH_STATUS_CHANGED(state, data) {
      const d = data.data.data;
      if (data.params.remember) {
        state.accountPwd = data.params;
        const obj = {
          loginStr: data.params.loginStr
        };
        Auth.setAccountPwd(obj) // 存储密码
      }
      // Auth.setToken(d.token); // 存储token

      console.log('%c 当前登录角色信息： %o', 'color:#bada55', d);
    },
    ACCOUNT_LOGOUT_FAILURE(state) {
      if (!state.accountPwd.remember) {
        Auth.removeAccountPwd();
      }
      state.token = null;
      state.userInfo = {};
      state.accountPwd = {};
      state.permission = [];
      state.isLogin = false;
      // Auth.removeToken();
      db.remove('user.login');
      db.remove('user.info');
      db.remove('user.permission');
    },
    ACCOUNT_LOGOUT_ROULES(state, data) {
      if (data) {
        const {permissionKeys, ...others} = data;
        state.userInfo = others;
        state.isLogin = true;
        db.set('user.login', true);// 存储登录状态
        db.set('user.info', others);// 存储用户信息
        db.set('user.permission', permissionKeys || []);// 存储用户权限点
      }
    },
    ACCOUNT_LOGOUT_SETPERMISSION(state) {
      state.permission = db.get('user.permission') || [];
    },

    ACCOUNT_LOGOUT_RESULT_PATCHA(state) {
      state.accountPwd = {
        ...state.accountPwd,
        captcha: ''
      };
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 登录 */
    accountLoginSubmit({commit}, params) {
      return new Promise((resolve, reject) => {
        Ge.GE0001A02(params).then((res) => {
          const data = res.data.data || {};
          // 资助二期账户无权限，需要登录
          // if (data.permissionKeys && data.permissionKeys.length) {
            commit('ACCOUNT_AUTH_STATUS_CHANGED', {...res, params});
            commit('ACCOUNT_LOGOUT_ROULES', data);
            resolve()
          // } else {
          //   Msg.warn('此账户无访问权限，请登录其他账户设置');
          //   throw '此账户无访问权限，请登录其他账户设置'
          // }
        }).catch(err => {
          reject(err);
          if (err.data.message === '验证码不正确或已过期') {
            commit('ACCOUNT_LOGOUT_RESULT_PATCHA');
          } else {
            commit('ACCOUNT_LOGOUT_FAILURE');
          }
        })
      })
    },
    /** 登出 */
    accountLogoutSubmit({commit}) {
      return new Promise((resolve, reject) => {
        commit('ACCOUNT_LOGOUT_FAILURE');
        resolve()
      })
    },
    /** 动态获取权限点并赋值角色权限 */
    accountGetPermission({commit}) {
      return new Promise(resolve => {
        commit('ACCOUNT_LOGOUT_SETPERMISSION');
        resolve()
      })
    }
  }
}
