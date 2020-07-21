const express = require('express');
const router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
const multer = require('multer')
// const MAO = require('multer-aliyun-oss');
const upload = multer({dest: __dirname + '../../public/images'})
const upload1 = multer({dest: __dirname + '../../public/files'})

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file
  file.url = `http://localhost:3000/images/${file.filename}`
  res.send(file)
})

router.post('/file/uploading', function(req, res, next) {
  /* 生成multiparty对象，并配置上传目标路径 */
  var form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  //设置文件存储路劲
  form.uploadDir = './public/files';
  //设置文件大小限制
  form.maxFilesSize = 2 * 1024 * 1024;
  // form.maxFields = 1000;  //设置所有文件的大小总和
  //上传后处理
  form.parse(req, function(err, fields, files) {
    var filesTemp = JSON.stringify(files, null, 2);
    if(err) {
      console.log('parse error:' + err);
    }else {
      console.log('parse files:' + filesTemp);
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/files/' + inputFile.originalFilename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err) {
          console.log('rename error:' + err);
        }else {
          console.log('rename ok');
        }
      })
    }
    res.send({
      name: inputFile.originalFilename,
      url: 'http://localhost:3000/files/' + inputFile.originalFilename
    })
  })
})

router.get('/download', function(req, res, next) {

  let filename = req.query.file

  res.download('./public/files/' + filename)

})


module.exports = router;
