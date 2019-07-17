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
	var name, department, num;
	connection.query('SELECT * from studentinfo WHERE id = ?', req.user.id, function(error, results, fields){
		if(!error){
        console.log('');
		console.log('학생 정보 & 성적 확인');
			name = results[0].name;
			department = results[0].department;
			num = results[0].num;
		}
		console.log(name);
		var div = new Array();
		var sub = new Array();
		var grade = new Array();
		var score = new Array();
		connection.query(`select * from student_grade where name = ?`, name, (err, rows, fields) => {
        if (!err) {
            for (let i=0; i<rows.length; i++) {
                div[i] = rows[i].divi;
                sub[i] = rows[i].subject;
                grade[i] = rows[i].stcore;
                score[i] = rows[i].grade;
            }
		}
		res.render('../views/studentHome.ejs', {
					studentname : name,
					department : department,
					num : num,
					name: name,
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
		});
	}); 

});

// router.post('/', function(req, res) {
//     var name1 = req.user.name;
//     var divi = req.body['department'];
//     var subject= req.body['subject'];
//     var stcore= req.body['grade'];
//     var hakjum = req.body['hakjum'];

	

// 	var insertValues = [name1, divi, subject, stcore, hakjum];
// 	var sqlInput = 'INSERT INTO student_grade (name, divi, subject, stcore, grade)VALUES (?,?,?,?,?)';

//     var query = connection.query(sqlInput, insertValues, function(err, rows){
//         if(err) { throw err;}
//         console.log("student_grade Data inserted!");
//     });
// });

module.exports = router;