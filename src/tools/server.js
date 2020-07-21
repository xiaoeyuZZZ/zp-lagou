import axios from 'axios'
import qs from 'qs'
import {Msg} from './message';
import {version} from '../../package'
import db from '../store/user/db';
// import {BaseApi2} from './servers2';

// 配置不需要消息提示的模块名称
const unMsg = ['/zz', '/mh', '/xm', '/cf', '/sj', 'localhost', '192'];

/**
 * 请求类
 */
export class BaseApi {
  servers;
  hot;

  /**
   * 初始化servers
   */
  constructor(hot) {
    this.hot = hot;
    this.servers = axios.create({
      baseURL: hot,
      headers: {
        'App-Version': version,
      },
      timeout: 600000,
      withCredentials: true
    });
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      !unMsg.find(v => hot.indexOf(v) >= 0) && response.data.message && Msg.success(response.data.message || '操作成功');
      return response
    }, function (error) {
      let msg = '';
      if (error.response) {
        switch (error.response.status) {
          case 400:
            msg = error.response.data.message;
            break;
          case 500:
            msg = error.response.data.message;
            break;
          default:
            msg = '网络繁忙，请稍候再试！'
        }
      } else {
        msg = '网络繁忙，请稍候再试！'
      }
      // !unMsg.find(v => hot.indexOf(v) >= 0) && Msg.error(msg);
      return Promise.reject(error.response || '网络繁忙，请稍候再试！');
    })
  }

  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @param fileList
   * @param fileKey
   * @returns {Promise<any>}
   */
  connection(method = 'GET', url, body, fileList, fileKey = 'files') {
    // this.getStatusToken();
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'};
      const param = new window.FormData();
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key)) param.append(key, body[key]);
      }
      fileList.forEach(file => param.append(fileKey, file));
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (method === 'get') {
      url = url + (url.indexOf('?') >= 0 ? '&' : '?' + qs.stringify(body));
      body = {}
    }
    return Promise.resolve(this.servers[method](url, body))
  }

  /**
   * 设置token
   */
  getStatusToken() {
    const user = db.get('user.info');
    if (db.get('user.login') && user) {
      this.servers.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
  }
}

export const server = new BaseApi(process.env.BASE_API);
