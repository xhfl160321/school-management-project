const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var loginRouter = require('./routes/login');
var joinRouter = require('./routes/signup');
var studentRouter = require('./routes/students');
var gradeRouter = require('./routes/grade');
var infoRouter = require('./routes/studentinfo');
var homeRouter = require('./routes/studentHome.js');
// var logoutRouter = require('./routes/logout.js');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res){
    res.redirect('/login');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session ({
    secret : 'enter secret key',
    resave : false,
    saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
app.use('/signup', joinRouter);
app.use('/students', studentRouter);
app.use('/grade', gradeRouter);
app.use('/info', infoRouter);
app.use('/home', homeRouter);
// app.use('/logout', logoutRouter);

app.listen(4000, () => {
    console.log('server start');
});
