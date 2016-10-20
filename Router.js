const express = require('express');
const ResourceHandler = require('./ResourceHandler');
const Model = require('./Model');

router = express.Router();

// log
router.use(function (req, res, next) {
	res.on('finish', (e) => {
		console.log(`${(new Date()).Format('yyyy-MM-dd hh:mm:ss')} ${req.method} ${res.statusCode} ${req.url}`);
	});
	next();
});


// pages
router.get('/', (req, res) => {
	res.render('index');
});
router.get('/login', (req, res) => {
	res.render('login');
});
router.get('/signup', (req, res) => {
	res.render('signup');
});


// statics
router.get('/static/*', (req, res) => {
	ResourceHandler.handleStatic(req, res);
});


// interfaces
router.post('/login', (req, res) => {
	Model.login(req, res);
});

module.exports = router;