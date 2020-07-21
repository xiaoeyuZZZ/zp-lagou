var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var updateFile = require('./routes/updateFile');
var mhRouter = require('./routes/mh');
var mhUserRouter = require('./routes/mhUser')
var adminRouter = require('./routes/admin')
var exportRouter = require('./routes/exportExcel')

const app = express()
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Credentials",true); //允许带cookies
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// app.use(cors({credentials: true, origin: true}))
// app.get('/', (req, res) => res.send('Hello World!'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/updateFile', updateFile);
app.use('/mh',mhRouter);
app.use('/mhUser',mhUserRouter)
app.use('/admin',adminRouter)
app.use('/data',exportRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
