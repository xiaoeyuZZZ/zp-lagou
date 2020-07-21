import Vue from 'vue'
import Router from 'vue-router'
import company from './zp-company'
import mh from './zp-mh'
import admin from './zp-admin'

Vue.use(Router)
const moduleRoute = [
  ...company,
  ...mh,
  ...admin
];
const createRouter = () => new Router({
  routes: [
    {
      path: '/',
      component: () => import('../view/mh'),
      children: [
        {
          path: '/',
          name: '',
          component: () => import('../view/mh/homepage')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../packages/components/login')
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: () => import('../packages/components/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../packages/components/register')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../packages/components/404')
    },
    ...company,
    ...mh,
    ...admin,
    {path: '*', redirect: '/404'}
  ]
});
const router = createRouter();
export {moduleRoute}
export default router
