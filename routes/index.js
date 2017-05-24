var express = require('express');
var router = express.Router();

router.all('/login', notAuthentication);
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
		req.session.error="Wrong username or password.";
		res.redirect('/login');
	}
});

router.get('/logout', authentication);
router.get('/logout', function(req, res, next) {
	req.session.user = null;
	res.redirect('/');
});

router.get('/home', authentication);
router.get('/home', function(req,res, next) {
	res.render('home', {title: 'Home'});
});

function authentication(req, res, next) {
	if(!req.session.user) {
		req.session.error="Please log in first";
		return res.redirect('/login');
	}
	next();
}

function notAuthentication(req, res, next) {
	if(req.session.user) {
		req.session.error="Already login";
		return res.redirect('/');
	}
	next();
}

module.exports = router;
