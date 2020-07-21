/**
 * zp-mh
 */
export default [
  {
    path: '/',
    meta: {
      modules: 'zp-mh',
      label: '首页',
    },
    component: () => import('../view/mh'),
    children: [
      {
        path: '/',
        name: '',
        // menu: '/',
        meta: {
          link: 'http://127.0.0.1:8080/#/',
          modules: 'zp-mh',
          label: '首页',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: false
        },
        component: () => import('../view/mh/homepage'),
      },
      {
        path: 'mh-company',
        name: 'mh-company',
        // menu: 'mh-company',
        meta: {
          link: 'http://127.0.0.1:8080/#/mh-company',
          modules: 'zp-mh',
          label: '公司',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: false
        },
        component: () => import('../view/mh/company'),
      },
      {
        path: 'mh-company/:id',
        name: 'mh-company',
        meta: {
          modules: 'zp-mh',
          label: '公司',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: true
        },
        component: () => import('../view/mh/company/companyDetails'),
        props: (route) => ({
          activeName: route.query.activeName,
        })
      },
      {
        path: 'mh-job',
        name: 'mh-job',
        meta: {
          modules: 'zp-mh',
          label: '工作',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: true
        },
        component: () => import('../view/mh/jobs'),
        props: (route) => ({
          kinds: route.query.kinds,
          search: route.query.search,
        })
      },
      {
        path: 'mh-job/:id',
        name: 'mh-jobs-details',
        meta: {
          modules: 'zp-mh',
          label: '工作详情',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: true
        },
        component: () => import('../view/mh/jobs/details'),
      },
      {
        path: 'resume',
        name: 'resume',
        meta: {
          link: 'http://127.0.0.1:8080/#/resume',
          modules: 'zp-mh',
          label: '个人简历',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: false
        },
        component: () => import('../view/mh/person'),
      },
      {
        path: 'deliveryBox',
        name: 'deliveryBox',
        meta: {
          link: 'http://127.0.0.1:8080//#/deliveryBox',
          modules: 'zp-mh',
          label: '投递箱',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: false
        },
        component: () => import('../view/mh/deliveryBox'),
      },
      {
        path: 'editorInfo',
        name: 'editorInfo',
        meta: {
          link: 'http://127.0.0.1:8080//#/editorInfo',
          modules: 'zp-mh',
          label: '账号设置',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: false
        },
        component: () => import('../view/mh/editorInfo'),
      },
    ]
  },
]
