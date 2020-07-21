const express = require('express');
const router = express.Router();
const {companyUserModel,positionSchema,seekerSchema} = require('../db/models')
const filter = {password: 0,account: 0, __v: 0} // 对数据查询的数据过滤掉特别的属性
const filter1 = {jobSeeker:0, __v: 0} // 对数据查询的数据过滤掉特别的属性

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
 * 门户用户注册接口
 */


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

/**
 * 职位分页接口
 */
router.get('/positionList', (req,res) => {
    let {position_name,workExp,scale,academic,industry,workCity,kinds,pageSize,page} = req.query
    const params = {
        position_name: {$regex:position_name},
        workExp,
        scale,
        academic,
        industry,
        workCity,
        kinds,
        isPush: '1',
    }
    for(let i in params){
        if(params[i] ===''){
            delete params[i]
        }
    }
    pageSize = parseInt(pageSize)
    page = parseInt(page)
    const result = positionSchema.find(params,filter1).skip((page-1)*pageSize).limit(pageSize);
    const total = positionSchema.find(params)
    result.sort({'_id':'desc'}); //排序[asc表示升序，desc表示降序]
    result.exec(function(err,data){
        execCallback(total,err,data,res)
    })
})

/**
 * 单个职位详情接口
 */
router.get('/positionDetails',(req,res) => {
    const _id = req.query.id
    const p_id = _id
    const m_id = req.cookies.m_id
    positionSchema.findById({_id},filter1,(err, position) => {
        if(position){
            seekerSchema.findOne({p_id,m_id},(err1,result) => {
                if(result) {
                    res.send({
                        code: 0,
                        msg: '数据获取成功',
                        data: position,
                        show: 1
                    })
                } else {
                    res.send({
                        code: 0,
                        msg: '数据获取成功',
                        data: position,
                        show: 0
                    })
                }
            })
        } else {
            res.send({
                code: 1,
                msg: '数据获取失败',
                // data: position
            })
        }
    })
})

/**
 * 推荐职位接口
 */
router.get('/hotPosition', function(req, res) {
    // const val = req.query || ''
    const params = {
        position_name: {$regex:''},
        isPush: '1'
    }
    positionSchema.find(params,filter1,(err,position) => {
        if(position && position.length >=9){
            const data = []
            // data.push(position[0])
            let i = 0
            let c_ids = []
            // c_ids.push(position[0].c_id)
            while(data.length < 9 && i < position.length) {
                if(!(c_ids.indexOf(JSON.stringify(position[i].c_id)) >= 0)){
                    data.push(position[i])
                    c_ids.push(JSON.stringify(position[i].c_id))
                }
                i++
            }
            res.send({
                code: 0,
                data: data,
                msg: '数据获取成功1',
            })
        } else if(position && position.length <9) {
            for(let j = 0; j < position.length; j++){
            }
            res.send({
                code: 0,
                data: position,
                msg: '数据获取成功',
            })
        } else {
            res.send({
                code: 1,
                // data: position,
                msg: '数据获取失败',
            })
        }
    })
});

/**
 * mh公司主页接口
 */
router.get('/company',(req,res) => {
    const _id = req.query.id
    let count = 0
    positionSchema.find({c_id:_id,isPush:'1'}).count((err,result) => {
        count = result
    })
    let citys = []
    let kinds = []
    positionSchema.find({c_id:_id},filter1,(err,result) => {
        result.forEach(e => {
            citys.push(e.workCity)
            kinds.push(e.kinds)
        })
        citys = [...new Set(citys)].sort();
        kinds = [...new Set(kinds)].sort();
    })
    companyUserModel.findById({_id},filter,(err,company) => {
        if(company){
            res.send({
                code: 0,
                msg: '数据获取成功',
                data: company,
                count: count,
                citys: citys,
                kinds: kinds
            })
        } else {
            res.send({
                code: 1,
                msg: '网络错误！',
            })
        }
    })
})

/**
 * mh公司职位分页接口
 */

router.get('/companyPosition', (req,res) => {
    let {c_id,workCity,kinds,pageSize,page} = req.query
    const params = {
        c_id,
        workCity,
        kinds,
        isPush: '1',
    }
    for(let i in params){
        if(params[i] ===''){
            delete params[i]
        }
    }
    pageSize = parseInt(pageSize)
    page = parseInt(page)
    const result = positionSchema.find(params,filter1).skip((page-1)*pageSize).limit(pageSize);
    const total = positionSchema.find(params)
    result.sort({'_id':'desc'}); //排序[asc表示升序，desc表示降序]
    result.exec(function(err,data){
        execCallback(total,err,data,res)
    })
})

module.exports = router;
