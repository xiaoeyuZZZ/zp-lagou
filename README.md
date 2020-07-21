# zp-lagou
基于vue2.0 + element-ui + mongodb + node.js + express的招聘网站
# 目录大致
├── build                      // 构建相关  
├── config                     // 配置相关
├── exampleImgs                // 项目示例图片
├── outdb                      // 导入数据库的初始化数据
├── server                     // node服务端
│   ├── api.js                    // 封装的接口请求
│   ├── db.js                     // db数据模型定义
│   ├── index.js                  // express服务器
│   ├── mutils.js                 // 服务端工具类
├── src                        // 源代码
│   ├── assets                 // 图片等静态资源
│   ├── components             // 全局公用组件
│   ├── config                 // 接口请求配置
│   ├── fonts                  // fontawesome字体库文件
│   ├── layout                 // 全局 组件
│   ├── page                   // 项目所有的视图
│   ├── register               // 第三方库注册
│   ├── router                 // 登录路由
│   ├── store                  // 项目vuex数据存储器
│   ├── style                  // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .gitignore                 // git 忽略项
├── eslintrc.js                // eslint 配置项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
├── package.json               // 包依赖配置
└── README.md                  // 说明文件

