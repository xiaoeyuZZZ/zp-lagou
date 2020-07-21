export const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  accountPwd: state => state.user.accountPwd,
  addRouters: state => state.permission.addRouters,
  permission: state => state.user.permission,
};
