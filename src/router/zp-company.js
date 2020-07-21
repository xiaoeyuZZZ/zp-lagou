/**
 * zw-12345
 */
export default [
  {
    path: '/company',
    name: 'company',
    meta: {
      modules: 'zp-company',
      label: '拉钩招聘系统',
    },
    component: () => import('../packages/components'),
    children: [
      {
        path: 'introduce',
        name: 'introduce',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/introduce',
          modules: 'zp-company',
          label: '公司简介',
          icon: 'icon iconfont icon-keyipingtaihezuofangan'
        },
        component: () => import('../view/company/introduce')
      },
      {
        path: 'addPosition',
        name: 'addPosition',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/addPosition',
          modules: 'zp-company',
          label: '新增职位',
          icon: 'icon iconfont icon-zhiboshenqing',
          // childrenHidden: true
        },
        component: () => import('../view/company/addPosition'),
      },
      {
        path: 'editorPosition/:id',
        name: 'editorPosition',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/addPosition',
          modules: 'zp-company',
          label: '修改职位',
          icon: 'icon iconfont icon-shimingrenzheng',
          childrenHidden: true
        },
        component: () => import('../view/company/addPosition'),
      },
      {
        path: 'job-management',
        name: 'job-management',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/job-management',
          modules: 'zp-company',
          label: '职位管理',
          icon: 'icon iconfont icon-shimingrenzheng',
          // childrenHidden: true
        },
        component: () => import('../view/company/job-management'),
      },
      {
        path: 'seeker-management/:id',
        name: 'seeker-management',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/seeker-management',
          modules: 'zp-company',
          label: '应聘者管理',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: true
        },
        component: () => import('../view/company/seeker-management'),
        props: (route) => ({
          position: route.query.position
        })
      },
      {
        path: 'seeker/:id',
        name: 'seeker',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/seeker',
          modules: 'zp-company',
          label: '应聘者简历',
          icon: 'icon iconfont icon-xiangmuguanli',
          childrenHidden: true
        },
        component: () => import('../view/company/seeker-management/seeker'),
        props: (route) => ({
          status: route.query.status,
          _id: route.query._id
        })
      },
      {
        path: 'editorCompany',
        name: 'editorCompany',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/editorCompany',
          modules: 'zp-company',
          label: '公司信息',
          icon: 'icon iconfont icon-qiyefuwudongtai',
          // childrenHidden: true
        },
        component: () => import('../view/company/editorCompany'),
      },
      {
        path: 'editorAccount',
        name: 'editorAccount',
        meta: {
          link: 'http://127.0.0.1:8080/#/company/editorAccount',
          modules: 'zp-company',
          label: '账号信息',
          icon: 'icon iconfont icon-fabuxuqiu',
          // childrenHidden: true
        },
        component: () => import('../view/company/editorAccount'),
      },
      // {
      //   path: 'preview',
      //   name: 'preview',
      //   meta: {
      //     modules: 'zp-company',
      //     label: '预览大屏',
      //     hidden: true
      //     // icon: 'icon iconfont icon-xiangmuguanli',
      //   },
      //   component: () => import('../view/company/preview'),
      // }
    ]
  },
]
