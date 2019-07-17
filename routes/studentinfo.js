var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');
const path = require('path');
const ejs = require('ejs');

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
    var loginname = req.user.name;

    var div = new Array();
    var sub = new Array();
    var grade = new Array();
    var score = new Array();

    connection.query(`select * from student_grade where name='${loginname}'`, (err, rows, fields) => {
        if (!err) {
            for (let i=0; i<rows.length; i++) {
                div[i] = rows[i].divi;
                sub[i] = rows[i].subject;
                grade[i] = rows[i].stcore;
                score[i] = rows[i].grade;
            }
                res.render('../views/info.ejs', {
                    name : loginname,
                    div1 : div[0],
                    sub1 : sub[0],
                    score1 : score[0],
                    grade1 : grade[0],
                    div2 : div[1],
                    sub2 : sub[1],
                    score2 : score[1],
                    grade2 : grade[1],
                    div3 : div[2],
                    sub3 : sub[2],
                    score3 : score[2],
                    grade3 : grade[2],
                    div4 : div[3],
                    sub4 : sub[3],
                    score4 : score[3],
                    grade4 : grade[3],
                    div5 : div[4],
                    sub5 : sub[4],
                    score5 : score[4],
                    grade5 : grade[4],
                    div6 : div[5],
                    sub6 : sub[5],
                    score6 : score[5],
                    grade6 : grade[5],
                });
            
        } else {
            console.log(err);
        }
    });
});

router.post('/', function(req, res) {
    // var name = req.body['name'];
    // var department = req.body['department'];
    // var num = req.body['num'];

    // var query = connection.query('insert into studentinfo (name, major, num) values ("' + name + '","' + department + '","' + num + '")', function(err, rows){
    //     if(err) { throw err;}
    //     console.log("Data inserted!");
    // });
});

module.exports = router;