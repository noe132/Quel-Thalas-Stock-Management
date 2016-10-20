const express = require('express');
const Router = require('./Router');
require('./DateExtension').dateExtension();

var app = express();

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