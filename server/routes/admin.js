const express = require('express');
const router = express.Router();
const {companyUserModel,mhUserSchema,adminUserSchema,dataSchema} = require('../db/models')
const filter = {password: 0, __v: 0} // 对数据查询的数据过滤掉特别的属性
const filter1 = {_id: 0,jobSeeker:0,c_id:0, __v: 0} // 对数据查询的数据过滤掉特别的属性

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' })
});

// 获取数据
const execCallback = function(p,err,data,res){
    if(err){
        res.send({code:1,msg: '网络错误！',err});
    }else{
        //再次查询，获取总数
        p.find().count((err,result) => {
            if (err) {
                res.send({code:1,msg: '网络错误！'});
            } else {
                res.send({code:0,data:data,msg:'获取成功',totalCount:result});
            }
        });
    }
}

/**
 * 公司分页接口
 */
router.get('/mhUserList', (req,res) => {
    let {nickName,pageSize,page} = req.query
    const params = {
        nickName: {$regex:nickName},
    }
    for(let i in params){
        if(params[i] ===''){
            delete params[i]
        }
    }
    pageSize = parseInt(pageSize)
    page = parseInt(page)
    const result = mhUserSchema.find(params,filter).skip((page-1)*pageSize).limit(pageSize);
    const total = mhUserSchema.find(params)
    result.sort({'_id':'desc'}); //排序[asc表示升序，desc表示降序]
    result.exec(function(err,data){
        execCallback(total,err,data,res)
    })
})


/**
 * 公司分页接口
 */
router.get('/companyList', (req,res) => {
    let {company,pageSize,page} = req.query
    const params = {
        company: {$regex:company},
    }
    for(let i in params){
        if(params[i] ===''){
            delete params[i]
        }
    }
    pageSize = parseInt(pageSize)
    page = parseInt(page)
    const result = companyUserModel.find(params,filter).skip((page-1)*pageSize).limit(pageSize);
    const total = companyUserModel.find(params)
    result.sort({'_id':'desc'}); //排序[asc表示升序，desc表示降序]
    result.exec(function(err,data){
        execCallback(total,err,data,res)
    })
})


/**
 * 员工信息修改
 */
router.post('/editorInfo', (req, res, next) => {
    const _id = req.cookies.a_id
    const params = req.body
    adminUserSchema.findByIdAndUpdate({_id},params,{new: true},(err,result) => {
        if (result) {
            let data = {...result._doc}
            delete data.password
            res.send({code: 0, data ,msg: '修改成功！'})
        } else {
            res.send({
                code: 1,
                msg: '修改失败！'
            })
        }
    })
})

router.get('/data', (req, res, next) => {
    const _id = '5e9490f74c2df1079f68ac8f'
    dataSchema.findById({_id}, (err,result) => {
        if (result) { //判断是否存在用户
            const data = result
            res.send({code: 0, data})
        } else {
            res.send({
                code: 1,
                msg: '获取资源失败！'
            })
        }
    })
})

router.post('/updateData', (req, res, next) => {
    const _id = '5e9490f74c2df1079f68ac8f'
    const params = req.body
    dataSchema.findByIdAndUpdate({_id}, params,{new: true},(err,result) => {
        if (result) { //判断是否存在用户
            const data = result
            res.send({code: 0, data})
        } else {
            res.send({
                code: 1,
                msg: '获取资源失败！'
            })
        }
    })
})
/**
 *    后台管理登录接口
 * */
router.post('/login', (req, res, next) => {
    const {account, password} = req.body
    adminUserSchema.findOne({account, password}, filter, (err, userDoc) => { // filter过滤掉指定的属性
        if (userDoc) { //判断是否存在用户
            const data = userDoc
            // 生成一个 cookie(userid: user._id), 并交给浏览器保存
            // res.cookie('c_id', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
            res.cookie('a_id', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
            res.send({code: 0, data, msg: '登录成功！'})
        } else {
            res.send({
                code: 1,
                msg: '账号或者密码错误'
            })
        }
    })
})

/**
 *   删除修改员工接口
 * */
router.get('/personnel', (req, res, next) => {
   const _id = req.query._id
    adminUserSchema.remove({_id},(err,result) => {
        if (result) { //判断是否存在用户
            res.send({code: 0, msg: '删除成功！'})
        } else {
            res.send({
                code: 1,
                msg: '删除失败！'
            })
        }
    })
})

/**
 *   添加修改员工接口
 * */
router.post('/personnel', (req, res, next) => {
   if(req.body._id){
       const _id = req.body._id
       const params = req.body
       adminUserSchema.findByIdAndUpdate({_id},params,{new: true}, (err, result) => {
           if (result) { //判断是否存在用户
               res.send({code: 0, msg: '修改成功！'})
           } else {
               res.send({
                   code: 1,
                   msg: '修改失败！'
               })
           }
       })
   } else {
       const params = req.body
       new adminUserSchema(params).save((err, result) => {
           if (result) { //判断是否存在用户
               res.send({code: 0, msg: '添加成功！'})
           } else {
               res.send({
                   code: 1,
                   msg: '添加失败！'
               })
           }
       })
   }
})

/**
 * 员工列表分页获取接口
 */
router.get('/personnelList', function(req, res) {
    let {account,name,pageSize,page} = req.query
    let params = {
        // name: {$regex:name},
        account: {$regex:account}
    }
    for(let i in params){
        if(params[i] ===''){
            delete params[i]
        }
    }
    pageSize = parseInt(pageSize)
    page = parseInt(page)
    const result = adminUserSchema.find(params).skip((page-1)*pageSize).limit(pageSize);
    const total = adminUserSchema.find(params)
    result.sort({'_id':'asc'}); //排序[asc表示升序，desc表示降序]
    result.exec(function(err,data){
        execCallback(total,err,data,res)
    })
});

module.exports = router;
