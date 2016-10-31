const express = require('express');
const Router = require('./Router');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
require('./DateExtension').dateExtension();

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '123456',
	database: 'warehouse'
};

var app = express();

// use session
app.use(session({
	secret: 'some random keyword',
	maxAge: 1000 * 60 * 60 * 24,
	store: new MySQLStore(options),
	resave: false,
	saveUninitialized: false
}));

// use Router
app.use(Router);

// setting view path
app.set('views', './www');

// setting view engine
app.set('view engine', 'ejs');

// error handling
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(8080, '0.0.0.0', function() {
	console.log("server is now running on 0.0.0.0:80 \n");
});