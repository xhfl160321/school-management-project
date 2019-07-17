var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
const path = require('path');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1234',
    database : 'my_db'
});
connection.connect();

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  
    } else {
        res.redirect('/login');
    }
};

router.get('/', isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../views/student_grade_input.html'));
});

router.post('/', function(req, res) {
    var name1 = req.user.name;
    var divi = req.body['major'];
    var subject= req.body['subject'];
    var stcore= req.body['grade'];
    var hakjum = req.body['hakjum'];

	var insertValues = [name1, divi, subject, stcore, hakjum];
	var sqlInput = 'INSERT INTO student_grade (name, divi, subject, stcore, grade)VALUES (?,?,?,?,?)';

    var query = connection.query(sqlInput, insertValues, function(err, rows){
        if(err) { throw err;}
        console.log("");
        console.log("Data inserted!");
        
    });
});

module.exports = router;
