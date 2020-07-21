const express = require('express');
const router = express.Router();
const {companyUserModel,seekerSchema,mhUserSchema} = require('../db/models')
const filter = {password: 0, __v: 0} // 对数据查询的数据过滤掉特别的属性
const filter1 = {password: 0,account: 0, __v: 0,nickName:0} // 对数据查询的数据过滤掉特别的属性

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// 获取数据
const execCallback = function(p,err,data,res){
    if(err){
        res.send({code:1,msg: '网络错误1！',err});
    }else{
        //再次查询，获取总数
        p.find().count((err,result) => {
            if (err) {
                res.send({code:1,msg: '网络错误1！'});
            } else {
                res.send({code:0,data:data,msg:'获取成功',totalCount:result});
            }
        });
    }
}

/**
 * 修改密码接口
 */
router.post('/editorPass', function(req, res) {
    const m_id = req.cookies.m_id
    const params = req.body
    mhUserSchema.findByIdAndUpdate({_id:m_id},params, {new: true},(err,result) => {
        if(result) {
            let data = {...result._doc}
            delete data.password
            // console.log(...result._doc)
            res.send({
                code: 0,
                msg: '修改成功！',
                data: data
            })
        } else {
            res.send({
                code: 1,
                msg: '修改失败！',
                // data: false
            })
        }
    })
});

/**
 * 投递职业分页获取接口
 */
router.get('/seekerList', function(req, res) {
    const m_id = req.cookies.m_id
    let {status,pageSize,page} = req.query
    let params = {
        m_id,
        status,
    }
    pageSize = parseInt(pageSize)
    page = parseInt(page)
    const result = seekerSchema.find(params).skip((page-1)*pageSize).limit(pageSize);
    const total = seekerSchema.find(params)
    result.sort({'_id':'asc'}); //排序[asc表示升序，desc表示降序]
    result.exec(function(err,data){
        execCallback(total,err,data,res)
    })
});

/**
 * 投递简历
 */
router.post('/deliveryResume', (req,res) => {
    const m_id = req.cookies.m_id
    const params = req.body
    params.m_id = m_id
    new seekerSchema(params).save((err, result)=> {
        if(result) {
            res.send({
                code: 0,
                msg: '投递成功！',
                data: 1
            })
        } else {
            res.send({
                code: 1,
                msg: '投递失败！',
                // data: false
            })
        }
    })
    // mhUserSchema.findById({_id:m_id},filter1,(err,resume) => {
    //     if(resume){
    //         // let params = {...resume}
    //         let data = {...resume._doc}
    //         data.intention = data.intention ? data.intention : {}
    //         data.status = data.status ? data.status : {}
    //         res.send({
    //             code: 0,
    //             msg: '简历获取成功',
    //             data: data
    //         })
    //     } else {
    //         res.send({
    //             code: 1,
    //             msg: '简历获取失败'
    //         })
    //     }
    // })
})

/**
 * 获取简历
 */
router.get('/resume', (req,res) => {
    const m_id = req.cookies.m_id
    mhUserSchema.findById({_id:m_id},filter1,(err,resume) => {
        if(resume){
            // let params = {...resume}
            let data = {...resume._doc}
            data.intention = data.intention ? data.intention : {}
            data.status = data.status ? data.status : {}
            res.send({
                code: 0,
                msg: '简历获取成功',
                data: data
            })
        } else {
            res.send({
                code: 1,
                msg: '简历获取失败'
            })
        }
    })
})


/**
 * 编辑简历
 */
router.post('/resume', (req,res) => {
    const params = req.body
    const m_id = req.cookies.m_id
    // for(let i in params){
    //     if(params[i] ===''){
    //         delete params[i]
    //     }
    // }
    // console.log(params)
    // mhUserSchema.findByIdAndUpdate({_id:m_id},{$pull:{education:{},project:{},works:{}}})
    mhUserSchema.findByIdAndUpdate({_id:m_id},params,(err,resume) => {
        if(resume){
            // const data = resume
            res.send({
                code: 0,
                msg: '修改成功'
            })
        } else {
            res.send({
                code: 1,
                msg: '修改失败'
            })
        }
    })
})


/**
 * 门户用户注册接口
 */
router.post('/mhUser', (req,res) => {
    const params = req.body
    const {account} = params
    mhUserSchema.findOne({account}, (err, userDoc) => {
        if (userDoc) { //判断是否存在用户
            res.send({
                code: 1,
                msg: '账号已存在'
            })
        } else { //保存用户，注册成功
            new mhUserSchema(params).save(filter,(err, user) => {
                const data = {...params, _id: user._id}
                delete data.password
                // 生成一个 cookie(companyUserId: user._id), 并交给浏览器保存
                res.cookie('m_id', user._id, {maxAge: 1000 * 60 * 60 * 7})
                res.send({code: 0, data, msg:'注册成功'})
            })
        }
    })
})

/**
 * 门户用户登录接口
 */
router.post('/loginMhUser', (req,res) => {
    const params = req.body
    const {account,password} = params
    mhUserSchema.findOne({account,password},filter, (err, userDoc) => {
        if (userDoc) { //判断是否存在用户
            const data = userDoc
            // 生成一个 cookie(userid: user._id), 并交给浏览器保存
            // res.cookie('c_id', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
            res.cookie('m_id', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
            res.send({code: 0, data,msg:'登录成功！'})
        } else {
            res.send({
                code: 1,
                msg: '账号或者密码错误'
            })
        }
    })
})

/**
 * 公司分页接口
 */
router.get('/companyList', (req,res) => {
    let {company,scale,industry,city,pageSize,page} = req.query
    const params = {
        company: {$regex:company},
        scale,
        industry,
        city,
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


module.exports = router;
