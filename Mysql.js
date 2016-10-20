const mysql = require('mysql');


exports.createConnection = createConnection;

function createConnection() {
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'warehouse'
	});
};

exports.login = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select * from user where username = ? and password = ?',
		values: [param.username, param.password]
	}, (err, result, fields) => {
		if (result.length === 1) {
			rs();
		} else {
			rj();
		}
	});
}