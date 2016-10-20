const http = require('http');
const ResourceHandler = require('./ResourceHandler');
const Model = require('./Model');
const Router = require('./Router');
const finalhandler = require('finalhandler')

require('./DateExtension').dateExtension();

var server = http.createServer();
var router = new Router.Router();

// pages
router.get('/', (req, res) => {
	ResourceHandler.renderEJS(req, res, '/index.ejs');
});
router.get('/login', (req, res) => {
	ResourceHandler.renderEJS(req, res, '/login.ejs');
});
router.get('/signup', (req, res) => {
	ResourceHandler.renderEJS(req, res, '/signup.ejs');
});

// statics
router.get('/static', (req, res) => {
	ResourceHandler.handleStatic(req, res);
});

// interfaces
router.post('/login', (req, res) => {
	console.log('post login');
	Model.login(req, res);
});


server.on('request', (req, res) => {

	router.handle(req, res, finalhandler(req, res));

	// log
	res.on('finish', (e) => {
		console.log(`${(new Date()).Format('yyyy-MM-dd hh:mm:ss')} ${req.method} ${res.statusCode} ${req.url}`);
	});
});


server.listen(8080, "0.0.0.0");
console.log("server is now running on 0.0.0.0:80 \n");