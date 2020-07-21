/**
 * zw-12345
 */
export default [
  {
    path: '/admin',
    name: 'admin',
    meta: {
      modules: 'zp-admin',
      label: '拉钩后台管理系统',
    },
    component: () => import('../packages/components/admin'),
    children: [
      {
        path: 'personnel',
        name: 'personnel',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/personnel',
          modules: 'zp-admin',
          label: '员工管理',
          icon: 'el-icon-bank-card'
        },
        component: () => import('../view/admin/personnel')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/menu',
          modules: 'zp-admin',
          label: '导航栏管理',
          icon: 'el-icon-menu',
          // childrenHidden: true
        },
        component: () => import('../view/admin/menu'),
      },
      {
        path: 'resources',
        name: 'resources',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/resources',
          modules: 'zp-admin',
          label: '资源管理',
          icon: 'el-icon-coin',
          // childrenHidden: true
        },
        component: () => import('../view/admin/resources'),
      },
      {
        path: 'carousel',
        name: 'carousel',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/carousel',
          modules: 'zp-admin',
          label: '轮播图管理',
          icon: 'el-icon-picture',
          // childrenHidden: true
        },
        component: () => import('../view/admin/carousel'),
      },
      {
        path: 'editorInfo',
        name: 'editorInfo',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/editorInfo',
          modules: 'zp-admin',
          label: '账号信息',
          icon: 'el-icon-edit',
          // childrenHidden: true
        },
        component: () => import('../view/admin/editorInfo'),
      },
      {
        path: 'company',
        name: 'company',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/company',
          modules: 'zp-admin',
          label: '公司用户信息',
          icon: 'el-icon-suitcase',
          // childrenHidden: true
        },
        component: () => import('../view/admin/company'),
      },
      {
        path: 'mhUser',
        name: 'mhUser',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/mhUser',
          modules: 'zp-admin',
          label: '门户用户信息',
          icon: 'el-icon-user-solid',
          // childrenHidden: true
        },
        component: () => import('../view/admin/mhUser'),
      },
      {
        path: 'mhUser',
        name: 'mhUser',
        meta: {
          link: 'http://127.0.0.1:8080/#/admin/mhUser',
          modules: 'zp-admin',
          label: '门户用户信息',
          icon: 'el-icon-user-solid',
          // childrenHidden: true
        },
        component: () => import('../view/admin/mhUser'),
      },

    ]
  },
]
