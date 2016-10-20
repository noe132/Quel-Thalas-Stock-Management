const mysql = require('mysql');

var r;
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'warehouse'
});


connection.query({
	sql: 'select * from user where username = ? and password = ?',
	values: ['admin1', 'admin']
}, (err, result, fields) => {
	r = result;
});

connection.end();