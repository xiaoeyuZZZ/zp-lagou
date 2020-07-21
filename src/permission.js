import router from './router'
import {store} from './store'
import db from './store/user/db';

/** 路由控制 */
// router.beforeEach(async (to, from, next) => {
//   /** 判断用户是否已经登录 */
//   if (!db.get('user.login')) {
//     /** 已经登录情况下访问 /login, 则直接进入 /admin */
//     if (to.path === '/login') {
//       next();
//     } else {
//       if (store.getters.addRouters.length === 0) {
//         /** 获取当前权限菜单加入到路由中 */
//         try {
//           await store.dispatch('accountGetPermission');
//           await store.dispatch('GetRouters', store.getters.permission);
//           router.addRoutes(store.getters.addRouters.concat([{path: '*', redirect: '/404'}]));
//           next({...to, replace: true}); // *** 后面不可再出现代码。否则会重复执行此函数 ***
//         } catch (e) {
//           await store.dispatch('accountLogoutSubmit');
//           next({path: '/'})
//         }
//       } else {
//         // console.log(noPermission(to.path) || hasPermission(store.getters.permission, to.meta.permission));
//         // if (noPermission(to.path) || hasPermission(store.getters.permission, to.meta.permission)) {
//         //   next()
//         // } else {
//         //   next({path: '/401', replace: true, query: {noGoBack: true}})
//         // }
//         next()
//       }
//     }
//   } else {
//     if (noPermission(to.path)) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });

function noPermission(path) {
  return ['/404', '/login', '/index'].indexOf(path) > -1
}



router.beforeEach(async (to, from, next) => {
  /** 判断用户是否已经登录 */
  if (db.get('user.login')) {
      next()
  } else {
    if (noPermission(to.path)) {
      next();
    } else {
      next('/login');
    }
  }
})


// let flag = true;
// /** 路由控制 */
// router.beforeEach(async (to, from, next) => {
//   /** 判断用户是否已经登录 */
//   if (store.getters.isLogin) {
//     /** 已经登录情况下访问 /login, 则直接进入 /admin */
//     if (to.path === '/login') {
//       next();
//     } else {
//       if (flag) {
//         try {
//           await store.dispatch('accountGetPermission');
//           await store.dispatch('GetRouters', store.getters.permission);
//           resetRouter(store.getters.addRouters.concat([{path: '*', redirect: '/404'}]));
//           flag = false;
//           next({...to, replace: true}); // *** 后面不可再出现代码。否则会重复执行此函数 ***
//         } catch (e) {
//           await store.dispatch('accountLogoutSubmit');
//           next({path: '/login'})
//         }
//       } else {
//         if (noPermission(to.path, true) || hasPermission(store.getters.permission, to)) {
//           next()
//         } else {
//           next({path: '/404', replace: true, query: {noGoBack: true}})
//         }
//       }
//     }
//   } else {
//     if (noPermission(to.path)) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });

// location.reload()
// router.afterEach(() => {
//   flag = true
// });
