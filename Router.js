const express = require('express');
const ResourceHandler = require('./ResourceHandler');
const Model = require('./Model');

router = express.Router();

// log
router.use(function(req, res, next) {
	res.on('finish', (e) => {
		console.log(`${(new Date()).Format('yyyy-MM-dd hh:mm:ss')} ${req.method} ${res.statusCode} ${req.url}`);
	});
	next();
});


// *pages
router.get('/', (req, res) => {
	res.render('index', { req: req });
});

router.get('/login', (req, res) => {
	renderCheckNotLogin('login', '/', { req: req }, req, res);
});

router.get('/signup', (req, res) => {
	res.render('signup', { req: req });
});

router.get('/useradmin', (req, res) => {
	renderCheckLogin('useradmin', '/', { req: req }, req, res);
});

router.get('/cargo', (req, res) => {
	renderCheckLogin('cargo', '/', { req: req }, req, res);
});

router.get('/storage', (req, res) => {
	renderCheckLogin('storage', '/', { req: req }, req, res);
});

router.get('/packinglist', (req, res) => {
	renderCheckLogin('packinglist', '/', { req: req }, req, res);
});

router.get('/packinglistimport', (req, res) => {
	renderCheckLogin('packinglistimport', '/', { req: req }, req, res);
});

router.get('/packinglistexport', (req, res) => {
	renderCheckLogin('packinglistexport', '/', { req: req }, req, res);
});



// *statics
router.get('/static/*', (req, res) => {
	ResourceHandler.handleStatic(req, res);
});


// *interfaces
// login
router.all('/login', (req, res) => {
	Model.login(req, res);
});

router.get('/logout', (req, res) => {
	Model.logout(req, res);
});

router.all('/signup', (req, res) => {
	Model.signup(req, res);
});

// useradmin
router.all('/getalluser', (req, res) => {
	Model.getalluser(req, res);
});

router.all('/resetpassword', (req, res) => {
	Model.resetpassword(req, res);
});

router.all('/deleteuser', (req, res) => {
	Model.deleteuser(req, res);
});

// cargo
router.all('/getcargo', (req, res) => {
	Model.getcargo(req, res);
});

router.all('/addcargo', (req, res) => {
	Model.addcargo(req, res);
});

router.all('/editcargo', (req, res) => {
	Model.editcargo(req, res);
});

router.all('/removecargo', (req, res) => {
	Model.removecargo(req, res);
});

// packinglist
router.all('/getpackinglist', (req, res) => {
	Model.getpackinglist(req, res);
});

router.all('/addpackinglist', (req, res) => {
	Model.addpackinglist(req, res);
});

// router.all('/editpackinglist', (req, res) => {
// Model.editpackinglist(req, res);
// });

// router.all('/removepackinglist', (req, res) => {
// Model.removepackinglist(req, res);
// });


module.exports = router;


function isLogined(req) {
	return req.session.logined === true;
}

function renderCheckNotLogin(ejs, redirect, object, req, res) {
	if (isLogined(req)) {
		res.redirect(redirect);
		return;
	}
	res.render(ejs, object);
}

function renderCheckLogin(ejs, redirect, object, req, res) {
	if (!isLogined(req)) {
		res.redirect(redirect);
		return;
	}
	res.render(ejs, object);
}