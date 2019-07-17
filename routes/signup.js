var express = require('express');
var router = express.Router();
//const fs = require('fs');
const mysql = require('mysql');
const path = require('path');

//var join = fs.readFileSync('./views/join.html');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '1234',
    database : 'my_db'
});

connection.connect();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/join.html'));
});

router.post('/', function(req, res) {
    var username = req.body['name'];
    var userid = req.body['Id'];
    var userpw = req.body['mbpw'];
    //var usertel = req.body['Tel'];

    var query = connection.query('insert into student (name, id, password) values ("' + username + '","' + userid + '","' + userpw + '")', function(err, rows) {
         if(err) { throw err;}
         console.log("Data inserted!");
    });

});

module.exports = router;