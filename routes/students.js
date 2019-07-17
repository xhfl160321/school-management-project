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
    console.log(loginname);

    var id = req.user.id;
    connection.query('select * from studentinfo where id=?', id, function(err, rows){
        if(rows.length>0){
            for (let i=0; i<rows.length; ++i)
            {
                console.log('');
                console.log('이  름: ' + rows[i].name);
                console.log('아이디: ' + rows[i].id);
                console.log('학  과: ' + rows[i].department);
                console.log('학  번: ' + rows[i].num);
            }  
            //학생 정보가 입력되어 있을 시 바로 성적 입력 페이지로 이동
            res.redirect('/grade');
        }else{
            res.render('../views/studentsInfo.ejs', {name : loginname});      
        }
    });    
});

router.post('/', function(req, res) {
    var id = req.user.id;
    var name = req.body['name'];
    var department = req.body['department'];
    var num = req.body['num'];

    var query = connection.query('insert into studentinfo (id, name, department, num) values ("' + id + '","' + name + '","' + department + '","' + num + '")', function(err, rows){
        if(err) { throw err;}
        console.log("");
        console.log("정보 입력");
    });
});

// router.get('/view_student', (req, res) => {
//     connection.query('select * from studentinfo', (err, rows, fields) => {
//         if (!err)
//         {
//             console.log('result: ' + JSON.stringify(rows));

//             console.log('print values ----------');
//             for (let i=0; i<rows.length; ++i)
//             {
//                 console.log('name: ' + rows[i].name);
//                 console.log('id: ' + rows[i].id);
//                 console.log('department: ' + rows[i].department);
//                 console.log('num: ' + rows[i].num);
//             }
//         }
//         else
//             console.log('view student error ' + err);
//     });
// });

module.exports = router;