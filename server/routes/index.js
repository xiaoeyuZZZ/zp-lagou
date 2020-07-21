const express = require('express');
const router = express.Router();
const {companyUserModel,positionSchema,seekerSchema,mhUserSchema} = require('../db/models')
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
 * 修改公司信息
 */
router.post('/company/editorCompany', function(req, res) {
  const c_id = req.cookies.c_id
  const params = req.body
  delete params._id
  companyUserModel.findByIdAndUpdate({_id:c_id},params, {new: true},(err,result) => {
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
 * 修改求职者状态
 */
router.post('/company/seekerStatus', (req,res) => {
  const _id = req.body.id
  const params = req.body.status
  seekerSchema.findByIdAndUpdate({_id},{status:params},(err,seeker) => {
    if(seeker){
      // let params = {...resume}
      res.send({
        code: 0,
        msg: '状态修改成功！',
      })
    } else {
      res.send({
        code: 1,
        msg: '状态修改失败！'
      })
    }
  })
})

/**
 * 获取简历
 */
router.get('/company/resume', (req,res) => {
  const _id = req.query._id
  mhUserSchema.findById({_id},filter1,(err,resume) => {
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
 * 求职者列表分页获取接口
 */
router.get('/company/seekerList', function(req, res) {
  const c_id = req.cookies.c_id
  let {p_id,name,status,pageSize,page} = req.query
  let params = {
    name: {$regex:name},
    p_id,
    c_id,
    status,
  }
  for(let i in params){
    if(params[i] ===''){
      delete params[i]
    }
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
 * 单个职位删除接口
 */
router.get('/company/deletePosition', function(req, res) {
  const _id = req.query.id
  positionSchema.remove({_id} ,(err,result) => {
    if(result){
      positionSchema.find({c_id:result.c_id,isPush: '1'}).count(async (err,count) => {
       await companyUserModel.findByIdAndUpdate({_id:result.c_id},{position_count:count})
      })
      res.send({
        code: 0,
        msg: '删除成功',
      })
    } else {
      res.send({
        code: 1,
        msg: '删除失败'
      })
    }
  })
})

/**
 *    企业创建职位接口
 * */
router.post('/company/position', (req, res, next) => {
  const c_id = req.cookies.c_id
  companyUserModel.findById(c_id, (err, userDoc) => {
    const params = {
      ...req.body,
      c_id: c_id,
      company: userDoc.company,
      link: userDoc.link,
      trademark: userDoc.trademark,
      industry: userDoc.industry,
      shortName: userDoc.shortName,
      scale: userDoc.scale,
      slogan: userDoc.slogan
    }
    new positionSchema(params).save((err, user) => {
      if (user) {
        positionSchema.find({c_id:c_id,isPush: '1'}).count(async (err,count) => {
          await companyUserModel.findByIdAndUpdate({_id:c_id},{position_count:count})
        })
        res.send({code: 0, msg: '创建成功'})
      } else {
        res.send({
          code: 1,
          msg: '网络出错！'
        })
      }
    })
  })
})


/**
 * 单个职位修改接口
 */
router.post('/company/updatePosition', function(req, res) {
  const _id = req.body.id
  const c_id = req.cookies.c_id
  companyUserModel.findById(c_id,(err,userDoc) => {
    const params = {
      ...req.body,
      c_id: c_id,
      company: userDoc.company,
      link: userDoc.link,
      trademark: userDoc.trademark,
      industry: userDoc.industry,
      scale: userDoc.scale,
      slogan: userDoc.slogan
    }
    delete params.id
    positionSchema.findByIdAndUpdate({_id},params ,(err,result) => {
      if(result){
        positionSchema.find({c_id:c_id,isPush: '1'}).count(async (err,count) => {
          await companyUserModel.findByIdAndUpdate({_id:c_id},{position_count:count})
        })
        res.send({
          code: 0,
          msg: '修改成功',
        })
      } else {
        res.send({
          code: 1,
          msg: '修改失败'
        })
      }
    })
  })
});

/**
 * 单个职位获取接口
 */
router.get('/company/position', function(req, res) {
  const _id = req.query.id
  positionSchema.findOne({_id},filter1,(err,result) => {
    if(result){
      const data = result
      res.send({
        code: 0,
        msg: '获取成功',
        data
      })
    } else {
      res.send({
        code: 1,
        msg: '获取失败'
      })
    }
  })
});

/**
 * 职位列表分页获取接口
 */
router.get('/company/positionList', function(req, res) {
  const c_id = req.cookies.c_id
  let {position_name,isPush,pageSize,page} = req.query
  let params = {
    position_name: {$regex:position_name},
    isPush,
    c_id
  }
  for(let i in params){
    if(params[i] ===''){
      delete params[i]
    }
  }
  pageSize = parseInt(pageSize)
  page = parseInt(page)
  const result = positionSchema.find(params).skip((page-1)*pageSize).limit(pageSize);
  const total = positionSchema.find(params)
  result.sort({'_id':'desc'}); //排序[asc表示升序，desc表示降序]
  result.exec(function(err,data){
    execCallback(total,err,data,res)
  })
});

/**
 * 企业hr注册接口
 */
router.post('/company/register', function(req, res) {
  const companyUser = req.body
  const {account} = companyUser
  companyUserModel.findOne({account}, (err, userDoc) => {
    if (userDoc) { //判断是否存在用户
      res.send({
        code: 1,
        msg: '账号已存在'
      })
    } else { //保存用户，注册成功
      new companyUserModel(companyUser).save(filter,(err, user) => {
        const data = {...companyUser, _id: user._id}
        delete data.password
        // 生成一个 cookie(companyUserId: user._id), 并交给浏览器保存
        res.cookie('c_id', user._id, {maxAge: 1000 * 60 * 60 * 7})
        res.send({code: 0, data, msg:'注册成功'})
      })
    }
  })
});

/**
 *    企业登录接口
 * */
router.post('/company/login', (req, res, next) => {
  const {account, password} = req.body

  companyUserModel.findOne({account,password}, filter,(err, userDoc) => { // filter过滤掉指定的属性
    if (userDoc) { //判断是否存在用户
      const data = userDoc
      // 生成一个 cookie(userid: user._id), 并交给浏览器保存
      // res.cookie('c_id', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
      res.cookie('c_id', userDoc._id, {maxAge: 1000 * 60 * 60 * 7})
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
 *    企业修改简介接口
 * */
router.post('/company/introduce', (req, res, next) => {
  const {introduce} = req.body
  const c_id = req.cookies.c_id
  if(!c_id) {
    return res.send({
      code: 1,
      msg: '请先登录'
    })
  }
  companyUserModel.findByIdAndUpdate(c_id, {introduce} ,(err, userDoc) => { // filter过滤掉指定的属性
    if (userDoc) { //判断是否存在用户
      const data = {introduce}

      res.send({code: 0, data , msg:'编辑成功！'})
    } else {
      res.send({
        code: 1,
        msg: '编辑失败'
      })
    }
  })
})

/**
 *    企业获取简介接口
 * */
router.get('/company/introduce', (req, res, next) => {
  const c_id = req.cookies.c_id
  // console.log(req.cookies)
  if(!c_id) {
    return res.send({
      code: 1,
      msg: '请先登录'
    })
  }
  companyUserModel.findById(c_id ,(err, userDoc) => { // filter过滤掉指定的属性
    if (userDoc) {
      const introduce = userDoc.introduce
      const data = {introduce}

      res.send({code: 0, data , msg:'获取成功！'})
    } else {
      res.send({
        code: 1,
        msg: '网络出错！'
      })
    }
  })
})


module.exports = router;
