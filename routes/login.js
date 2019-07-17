var express = require('express');
var router = express.Router();
//const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
var session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1234',
    database : 'my_db'
});

connection.connect();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    connection.query('SELECT * FROM student WHERE id=?', [id], function(err, rows) {
        var user = rows[0];
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pwd1'
}, function(username, password, done) {
    connection.query('SELECT * FROM student WHERE `id`=?', [username], function(err, rows) {
        var user = rows[0];
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message : 'Incorrect username'});
        }
        if (user.password !== password) {
            return done(null, false, {message : 'Incorrect password'});
        }
        return done(null, user);
    });
}));

router.get('/',  (req, res) => { 
    console.log('로그인 창');
	res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/', passport.authenticate('local', {
    successRedirect : '/students',
    failureRedirect : '/',
    failureFlash : true
}));

module.exports = router;
