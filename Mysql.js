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
		console.log(result[0].isvalid)
		rs(result[0]);
	});
}

exports.signup = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'insert into user (uid,username,password) values(null,?,?)',
		values: [param.username, param.password]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
}

exports.getalluser = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select * from user'
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs(result);
	});
};

exports.resetpassword = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'update user set password = ? where username = ?',
		values: [param.password, param.username]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
};

exports.deleteuser = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'delete from user where username = ?',
		values: [param.username]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
};

exports.getcargo = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select * from cargo where cargoisvalid = 1 order by cargoid desc'
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs(result);
	});
};

exports.addcargo = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'insert into cargo (cargoid,cargoname,cargovalue,cargoisvalid) values(null,?,?,?,1)',
		values: [param.cargoname, param.cargovalue, param.cargoisvalid]
	}, (err, result) => {
		if (err) {
			rj(result.insertId);
			return;
		}
		rs();
	});
};

exports.editcargo = function(rs, rj, param) {
	try {
		var connection = createConnection();
		connection.beginTransaction(function(err) {
			if (err) {
				throw err;
			}
		});
		connection.query({
			sql: 'update cargo set cargoisvalid = 0 where cargoid = ?',
			values: [param.cargoid]
		}, (err, result) => {
			if (err) {
				return connection.rollback(function() {
					throw err;
				});
			}
			connection.query({
				sql: 'insert into cargo (cargoid,cargoname,cargovalue,cargoisvalid) values(null,?,?,1)',
				values: [param.cargoname, param.cargovalue]
			}, (err, result) => {
				if (err) {
					return connection.rollback(function() {
						throw err;
					});
				}
				connection.commit(function(err) {
					if (err) {
						return connection.rollback(function() {
							throw err;
						});
					}
					rs();
				});
			});
		});
	} catch (e) {
		rj();
	}
};


exports.removecargo = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'delete from cargo where cargoid = ?',
		values: [param.cargoid]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
};

exports.getpackinglist = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select * from packinglist'
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs(result);
	});
};


exports.addpackinglist = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'insert into packinglist (listid,listdate,listtype,listoperator,listremark) values(null,now(),?,?,1)',
		values: [param.listtype, param.listoperator, param.listremark]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
};