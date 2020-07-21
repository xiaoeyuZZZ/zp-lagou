import {Notification} from 'element-ui'

/**
 * 全局提示
 * @param 'success' | 'error' | 'warn' | 'info'
 * @param msg
 */

export class Msg {
  static success(message, title) {
    Notification.closeAll();
    Notification({
      message,
      title: title || '提示',
      type: 'success'
    })
  }

  static error(message, title) {
    Notification.closeAll();
    Notification({
      message,
      title: title || '提示',
      type: 'error'

    })
  }

  static warn(message, title) {
    Notification.closeAll();
    Notification({
      message,
      title: title || '提示',
      type: 'warning'
    })
  }

  static info(message, title) {
    Notification.closeAll();
    Notification({
      message,
      title: title || '提示',
      type: 'info'
    })
  }
}
