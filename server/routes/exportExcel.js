const nodeExcel = require("excel-export");//首先，引入excel模块：
const express = require('express');
const router = express.Router();
const {companyUserModel,mhUserSchema,adminUserSchema,seekerSchema,positionSchema} = require('../db/models')

/**
 * 导出求职者信息
 */
router.get('/exportSeeker', (req,res) => {
    let conf ={};//创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
    let cols =['姓名','联系方式','邮箱','学校','学历','投递时间','状态'];//手动创建表头中的内容
    conf.cols =[];//在conf中添加cols

    for(let i=0;i<cols.length;i++){
        let tits ={};//创建表头数据所对应的类型,其中包括 caption内容 type类型
        tits.caption = cols[i];//添加内容
        tits.type='string'//添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
        conf.cols.push(tits);//将每一个表头加入cols中
    }
    const p_id = req.query.p_id
    const p_name = req.query.p_name
    seekerSchema.find({p_id},(err,data) => {
        if(err){
            //执行出错
        }else{
            let rows = ['name','phone','email','school','academic','deliveryTime','status'];//创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
            let datas =[];//用于承载数据库中的数据
            for(let i=0;i<data.length;i++){//循环数据库得到的数据，因为取出的数据格式为
                //[{'id':2312,'name':'张三','age':'22','sex':'男','banji':'高三一班'},{…………},{…………}]
                let row =[];//用来装载每次得到的数据
                for(let j=0;j<rows.length;j++){//内循环取出每个
                    row.push(data[i][rows[j]].toString());//或者tow.push((data[i].tows[j]).toString());两种形式都是相同的
                }
                datas.push(row);//将每一个{ }中的数据添加到承载中
            }
            conf.rows = datas;//将所有行加入tows中
            let result =nodeExcel.execute(conf);//将所有数据写入nodeExcel中
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename="+encodeURIComponent(`${p_name}投递列表`) + ".xlsx")
            res.end(result,'binary');//将文件内容传入

        }
    });
});

/**
 * 导出招聘职位信息
 */
router.get('/exportPosition', (req,res) => {
    let conf ={};//创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
    let cols =['职位名称','招聘数量','工资待遇','发布时间','工作类型','状态','工作城市','具体地址','工作经验','学历要求','工作种类'];//手动创建表头中的内容
    conf.cols =[];//在conf中添加cols

    for(let i=0;i<cols.length;i++){
        let tits ={};//创建表头数据所对应的类型,其中包括 caption内容 type类型
        tits.caption = cols[i];//添加内容
        tits.type='string'//添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
        conf.cols.push(tits);//将每一个表头加入cols中
    }
    const c_id = req.cookies.c_id
    positionSchema.find({c_id},(err,data) => {
        if(err){
            //执行出错
        }else{
            let rows = ['position_name','totalCount','salary','pushAtTime','type','isPush','workCity','address','workExp','academic','kinds'];//创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
            let datas =[];//用于承载数据库中的数据
            for(let i=0;i<data.length;i++){//循环数据库得到的数据，因为取出的数据格式为
                //[{'id':2312,'name':'张三','age':'22','sex':'男','banji':'高三一班'},{…………},{…………}]
                let row =[];//用来装载每次得到的数据
                for(let j=0;j<rows.length;j++){//内循环取出每个
                    row.push(data[i][rows[j]].toString());//或者tow.push((data[i].tows[j]).toString());两种形式都是相同的
                }
                datas.push(row);//将每一个{ }中的数据添加到承载中
            }
            conf.rows = datas;//将所有行加入tows中
            let result =nodeExcel.execute(conf);//将所有数据写入nodeExcel中
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename="+encodeURIComponent(`职位信息列表`) + ".xlsx")
            res.end(result,'binary');//将文件内容传入

        }
    });
});

/**
 * 导出公司用户信息
 */
router.get('/exportCompanyUser', (req,res) => {
    let conf ={};//创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
    let cols =['公司名称','用户姓名','职位','在招职位','公司类型','公司规模','城市'];//手动创建表头中的内容
    conf.cols =[];//在conf中添加cols

    for(let i=0;i<cols.length;i++){
        let tits ={};//创建表头数据所对应的类型,其中包括 caption内容 type类型
        tits.caption = cols[i];//添加内容
        tits.type='string'//添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
        conf.cols.push(tits);//将每一个表头加入cols中
    }
    companyUserModel.find({},(err,data) => {
        if(err){
            //执行出错
        }else{
            let rows = ['company','name','position','position_count','industry','scale','city'];//创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
            let datas =[];//用于承载数据库中的数据
            for(let i=0;i<data.length;i++){//循环数据库得到的数据，因为取出的数据格式为
                //[{'id':2312,'name':'张三','age':'22','sex':'男','banji':'高三一班'},{…………},{…………}]
                let row =[];//用来装载每次得到的数据
                for(let j=0;j<rows.length;j++){//内循环取出每个
                    row.push(data[i][rows[j]].toString());//或者tow.push((data[i].tows[j]).toString());两种形式都是相同的
                }
                datas.push(row);//将每一个{ }中的数据添加到承载中
            }
            conf.rows = datas;//将所有行加入tows中
            let result =nodeExcel.execute(conf);//将所有数据写入nodeExcel中
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename="+encodeURIComponent(`公司用户信息列表`) + ".xlsx")
            res.end(result,'binary');//将文件内容传入

        }
    });
});

/**
 * 导出门户用户信息
 */
router.get('/exportMhUser', (req,res) => {
    let conf ={};//创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
    let cols =['姓名','学校','学历','手机','邮箱','所在城市','工作经验'];//手动创建表头中的内容
    conf.cols =[];//在conf中添加cols

    for(let i=0;i<cols.length;i++){
        let tits ={};//创建表头数据所对应的类型,其中包括 caption内容 type类型
        tits.caption = cols[i];//添加内容
        tits.type='string'//添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
        conf.cols.push(tits);//将每一个表头加入cols中
    }
    mhUserSchema.find({},(err,data) => {
        if(err){
            //执行出错
        }else{
            let rows = ['name','school','education','phone','email','city','isGraduates'];//创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
            let datas =[];//用于承载数据库中的数据
            for(let i=0;i<data.length;i++){//循环数据库得到的数据，因为取出的数据格式为
                //[{'id':2312,'name':'张三','age':'22','sex':'男','banji':'高三一班'},{…………},{…………}]
                let row =[];//用来装载每次得到的数据
                for(let j=0;j<rows.length;j++){//内循环取出每个
                    if(data[i].basicInfo){
                        row.push(data[i].basicInfo[rows[j]].toString());//或者tow.push((data[i].tows[j]).toString());两种形式都是相同的
                    }
                }
                datas.push(row);//将每一个{ }中的数据添加到承载中
            }
            conf.rows = datas;//将所有行加入tows中
            let result =nodeExcel.execute(conf);//将所有数据写入nodeExcel中
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename="+encodeURIComponent(`门户用户信息列表`) + ".xlsx")
            res.end(result,'binary');//将文件内容传入

        }
    });
});
module.exports = router;
