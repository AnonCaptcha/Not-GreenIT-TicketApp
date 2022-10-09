var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requestsRouter = require('./routes/requests');
var faqRouter = require('./routes/faq');
var dashboardRouter = require('./routes/dashboard');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/requests', requestsRouter);
app.use('/faq', faqRouter);
app.use('/dashboard', dashboardRouter);

app.disable('view cache');

// From scratch database process
fs.unlink('./public/data/greenit.db', function(err) {
  if (err) {
    console.log(err.message);
  }
  console.log('Previous db deleted');
});

const db_name = path.join(__dirname, 'public/data', 'greenit.db');
global.db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connection successfull to database");
})

const sql_users_table = fs.readFileSync('./script/USERS_TABLE.sql').toString();
const sql_requests_table = fs.readFileSync('./script/REQUESTS_TABLE.sql').toString();
const sql_users_datas = fs.readFileSync('./script/USERS_DATA.sql').toString();
const sql_requests_datas = fs.readFileSync('./script/REQUESTS_DATA.sql').toString();
db.run(sql_users_table, err => {
  if (err) {
    return console.log(err.message);
  }
  console.log('Tables users created');
  db.run(sql_requests_table, err => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Tables requests created');
    db.run(sql_users_datas, err => {
      if (err) {
        return console.log(err.message);
      }
      console.log('Users data loaded');
      db.run(sql_requests_datas, err => {
        if (err) {
          return console.log(err.message);
        }
        console.log('Requests data loaded');
      })
    })
  })
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
