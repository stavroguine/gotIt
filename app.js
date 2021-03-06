var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var index = require('./routes/index');
var user = require('./routes/user');
var admin = require('./routes/admin');
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var test = require('./routes/test');
var form = require('./routes/form');
var api = require('./routes/api');
// var authenticate = require("./tools/authentication");

//connect to MongoDB
let mongodburl;
let mongo_ip = process.env.MONGO_IP || 'localhost' ;
if(typeof process.env.MONGO_PORT !== 'undefined' && process.env.MONGO_PORT){
  let mongo_port
  mongodburl = 'mongodb://'+ mongo_ip + ':' + mongo_port + '/gotit';  
} else {
  mongodburl = 'mongodb://'+ mongo_ip + '/gotit';
}
console.log(mongodburl);
mongoose.connect(mongodburl);
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    let origin = 'https://gotit.behumble.pw'
    //req.app.get('env') === 'development' ? console.log('dev') : console.log('prod')
    if(mongo_ip === 'localhost')
      origin = 'http://localhost:8080'
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials',true);
    next();
})
// app.use(authenticate);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user', user);
app.use('/admin', admin);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/test', test);
app.use('/form', form);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
