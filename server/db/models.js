/**
 *
 包含 n 个能操作 mongodb 数据库集合的 model 的模块 1. 连接数据库
 1.1. 引入 mongoose
 1.2. 连接指定数据库(URL 只有数据库是变化的) 1.3. 获取连接对象
 1.4. 绑定连接完成的监听(用来提示连接成功)
 2. 定义出对应特定集合的 Model 并向外暴露 2.1. 字义 Schema(描述文档结构)
 2.2. 定义 Model(与集合对应, 可以操作集合) 2.3. 导出 Model
 *
 * */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/zp_models')

mongoose.connection.on('connected', () => {
    console.log('数据库连接成功！')
})

/**
 * 公司hr用户表
 * */
const companyUserSchema = new Schema({
    name: {type: String, required: true}, // 姓名
    position: {type: String, required: true}, // 职位
    email: {type: String, required: true}, // 邮箱
    company: {type: String, required: true}, // 公司全称
    shortName: {type: String, required: true}, // 公司简称
    industry: {type: String, required: true}, // 行业领域
    scale: {type: String, required: true}, // 公司规模
    city: {type: String, required: true}, // 所在城市
    link: {type: String, required: true}, // 公司官网
    slogan: {type: String, required: true}, // 公司口号
    account: {type: String, required: true}, // 账号
    password: {type: String, required: true}, // 密码
    introduce: {type: String}, // 公司介绍
    trademark: {type: String}, // 公司商标
    headImg: {type: String}, // 头像
    position_count: {type: String,default: '0'}, //在招职位
})

/**
 * 职位表
 */
const positionSchema = new Schema({
    position_name: {type: String, required: true}, // 职位名称
    c_id: {type: Schema.Types.ObjectId, required: true}, // 所属公司id
    describe: {type: String, required: true}, // 职位描述
    workCity: {type: String, required: true}, // 工作城市
    salary: {type: String, required: true}, // 薪水
    workExp: {type: String, required: true}, // 工作经验 '应届/经验'
    address: {type: String, required: true}, // 具体地址
    academic: {type: String, required: true}, // 学历要求
    tag: {type: Array, default: []}, // 技术标签
    isPush: {type: String, default: '0'}, // 是否发布
    type: {type: String, required: true}, // 全职/实习生
    pushAtTime: {type: String},
    kinds: {type: String}, // 工作类型（技术，职能，其他……）
    totalCount: {type: String}, // 招聘人数
    jobSeeker: [{
        j_id: {type: Schema.Types.ObjectId}, // 求职者id
        status: {type: String}
    }],
    company: {type: String}, // 公司名称
    link: {type: String},
    trademark: {type: String},
    industry: {type: String},
    shortName: {type: String},// 公司简称
    scale: {type: String}, // 公司规模
    slogan: {type: String}, // 公司口号
})


/**
 * 门户用户表
 */
const mhUserSchema = new Schema({
    account: {type: String, required: true}, // 账号
    password: {type: String, required: true}, // 密码
    nickName: {type: String}, // 昵称
    headImg: {type: String}, // 头像
    imageUrl: {type: String}, // 简历头像
    basicInfo: {
        name: {type: String}, // 姓名
        school: {type: String}, // 学校
        education: {type: String}, // 学历
        isGraduates: {type: String}, // 是否应届毕业生
        birthday: {type: String}, // 生日
        phone: {type: String}, // 手机号
        email: {type: String}, // 邮箱
        sex: {type: String},
        city: {type: String}
    },
    education: [{
        level: {type: String}, // 学历
        major: {type: String}, // 专业
        school: {type: String}, // 学校
        time: {type: Array}, // 时间
    }],
    skill: [], // 个人技能
    project: [{
        describe: {type: String}, // 描述
        achievement: {type: String}, // 成就
        name: {type: String}, // 项目名
        time: {type: Array}, // 时间
        link: {type: String}, // 链接
    }],
    works: [{
        name: {type: String}, // 公司名
        department: {type: String}, // 部门
        position: {type: String}, // 职位
        content: {type: String}, // 工作内容
        time: {type: Array}, // 时间
    }],
    introduce: {type: String}, //自我评价
    intention: {  // 求职意向
        job: {type: String}, // 工作名称
        city: {type: String}, // 城市
        salary: {type: String}, // 薪资
    },
    status: {
        idea: {type: String}, // 目前状态
        time: {type: String}, // 到职时间
    },
    fileList: {
        name: {type:String},
        url: {type:String}
    }
})

/**
 * 求职者投递表
 * @type {Model}
 */
const seekerSchema = new Schema({
    m_id: {type: Schema.Types.ObjectId, required: true}, // 求职者id
    p_id: {type: Schema.Types.ObjectId, required: true}, // 职位id
    c_id: {type: Schema.Types.ObjectId, required: true}, // 所属公司id
    name: {type: String}, // 求职者姓名
    position_name: {type: String, required: true}, // 职位名称
    salary: {type: String}, // 薪资
    school: {type: String}, // 学校
    academic: {type: String}, // 学历
    deliveryTime:  {type: String}, //投递时间
    status: {type: Number, default: 0}, // 投递状态
    phone:  {type: String}, //投递时间
    email: {type: String}, // 期望薪资
    company: {type: String}, // 公司全称
    workCity: {type: String}, // 工作城市
    isFile: {type: String}, // 是否使用附件简历
})

/**
 * 管理员用户表
 */
const adminUserSchema = new Schema({
    name: {type: String}, // 姓名
    position: {type: String}, // 职位
    email: {type: String}, // 邮箱
    account: {type: String}, // 账号
    sex: {type: String}, // 性别
    password: {type: String, default: '123456'}, // 密码
    headImg: {type: String,default:'https://s0.lgstatic.com/i/image2/M01/0E/AC/CgotOVyhgcmAaD2nAABq7l7a11A980.png'}, // 头像
    permission: {type: Array}, // 权限
    status: {type: String, default: '0'}, // 信息为完善
    phone: {type: String}, // 邮箱

})

/**
 * 资源表
 */
const dataSchema = new Schema({
    menu: {type: Array,default: ['首页','公司','个人简历','投递箱','账号设置']}, // 导航栏
    menuLink: {type: Array,default: ['','mh-company','resume','deliveryBox','editorInfo']}, // 导航栏地址
    workCity: {type: Array,default:['全国','北京','上海','广州','深圳','杭州','重庆','成都','天津','南京','武汉','西安','厦门','长沙','苏州','合肥','贵阳','郑州']}, // 城市
    scale: {type: Array,default:['不限','少于15人','15-50人','50-150人','150-500人','500-2000人','2000人以上']}, // 公司规模
    industry: {type: Array,default:['不限','互联网','电商','金融','企业服务','教育','文娱｜内容','游戏','硬件','汽车','旅游｜出行','物流｜运输','广告营销','电子通讯']}, // 行业领域
    workExp: {type: Array,default:['不限','应届毕业生','3年及以下','3-5年','5-10年','10年以上']}, // 工作经验
    academic: {type: Array,default:['不限','大专','本科','硕士','博士']}, // 学历要求
    kinds: {type: Array,default:['技术','产品','设计','运营','市场','销售','职能','其他']}, // 技术种类
    homeImg: {type: Array,}, // 首页轮播图
    companyImg: {type: Array}, // 邮箱
})

const companyUser = mongoose.model('companyUser',companyUserSchema)
const position = mongoose.model('position',positionSchema)
const mhUser = mongoose.model('mhUser',mhUserSchema)
const seeker = mongoose.model('seeker',seekerSchema)
const admin = mongoose.model('admin', adminUserSchema)
const data = mongoose.model('data',dataSchema)

module.exports.companyUserModel = companyUser
module.exports.positionSchema = position
module.exports.mhUserSchema = mhUser
module.exports.seekerSchema = seeker
module.exports.adminUserSchema = admin
module.exports.dataSchema = data


