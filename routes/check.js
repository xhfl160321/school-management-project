var express = require('express');
var router = express.Router();
const ejs = require('ejs'); 

var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  
    } else {
        res.redirect('/login');
    }
};

router.get('/', isAuthenticated, function (req, res) {
    console.log('학생정보확인');
    var loginname = req.user.name;
    var department = "req.user.department";
    var num = 'req.user.num';

    res.render('../views/check.ejs', {
        name1 : loginname,
        department1 : department,
        num1 : num
    });
});

// router.post('/', function(req, res){
//     console.log(req);
//     var loginname = req.user.name;
//     var department = req.user.department;
//     var num = req.user.num;
//     //res.render('..views/check.ejs',{name : loginname, department : department, name : num});
// });

module.exports = router;