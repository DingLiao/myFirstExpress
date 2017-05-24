var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', {title: 'Login'});
});

router.post('/login', function(req, res, next) {
	var user = {
		username: 'admin',
		password: 'admin'
	};

	if(req.body.username === user.username && req.body.password===user.password) {
		req.session.user = user;
		res.redirect('/home');
	} else {
		res.redirect('/login');
	}
});

router.get('/logout', function(req, res, next) {
	req.session.user = null;
	res.redirect('/');
});

router.get('/home', function(req,res, next) {
	res.render('home', {title: 'Home'});
});


module.exports = router;
