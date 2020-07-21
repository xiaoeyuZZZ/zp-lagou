import adminRoute from '../../router/zp-admin'
import db from './db'

// const Jurisdiction = [
//   ...zw,
// ];

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
export function hasPermission(roles, route) {
  if (route.meta && route.meta.permission) {
    return roles.some(role => route.meta.permission.indexOf(role) >= 0)
  }
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permission
 */
function filterAsyncRouter(asyncRouterMap, permission) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(permission, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permission)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    isCollapse: false,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state) => {
      const route = db.get('a_user').permission
      adminRoute.forEach(v => {
        v.children = v.children.filter(e => route.indexOf(e.name) > -1)
      })
      state.addRouters = adminRoute;
    },
    COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SLIDER_OPEN(state) {
      state.isCollapse = false
    },
    SLIDER_CLOSE(state) {
      state.isCollapse = true
    }
  },
  actions: {
    GetRouters({commit}, permission) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', filterAsyncRouter(Jurisdiction, permission));
        resolve()
      })
    }
  }
};

export default permission
