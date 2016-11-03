const mysql = require('mysql');

exports.createConnection = createConnection;

function createConnection() {
	// var connection = mysql.createConnection({
	// 	host: '127.0.0.1',
	// 	// localAddress:'127.0.0.1',
	// 	user: 'root',
	// 	password: '123456',
	// 	database: 'warehouse'
	// });
	var connection = mysql.createConnection('mysql://root:123456@127.0.0.1/warehouse');
	connection.connect(function(err) {
		if (err) {
			throw err;
		}
	});
	return connection;
};

exports.login = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select * from user where username = ? and password = ?',
		values: [param.username, param.password]
	}, (err, result, fields) => {
		if (result.length == 1) {
			rs(result[0]);
		} else {
			rj();
		}
	});
	connection.end();
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
	connection.end();
}

exports.getalluser = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select uid,username from user'
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs(result);
	});
	connection.end();
};

exports.resetpassword = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'update user set password = ? where uid = ?',
		values: [param.password, param.uid]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
	connection.end();
};

exports.deleteuser = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'delete from user where uid = ?',
		values: [param.uid]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs();
	});
	connection.end();
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
	connection.end();
};

exports.addcargo = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'insert into cargo (cargoid,cargoname,cargovalue,cargoisvalid) values(null,?,?,1)',
		values: [param.cargoname, param.cargovalue]
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs(result.insertId);
	});
	connection.end();
};

exports.editcargo = function(rs, rj, param) {
	var connection;

	var seq = new Promise((rs_seq, rj_seq) => {
		connection = createConnection();
		connection.beginTransaction(function(err) {
			if (err) {
				throw err;
			}
		});
		return new Promise((rs_seqq, rj_seqq) => {
			connection.query({
				sql: 'update cargo set cargoisvalid = 0 where cargoid = ?',
				values: [param.cargoid]
			}, (err, result) => {
				if (err) {
					throw err;
					return;
				}
				rs_seqq();
			});
		}).then(() => {
			return new Promise((rs_insert, rj_insert) => {
				connection.query({
					sql: 'insert into cargo (cargoid,cargoname,cargovalue,cargoisvalid) values(null,?,?,1)',
					values: [param.cargoname, param.cargovalue]
				}, (err, result) => {
					if (err) {
						throw err;
						return;
					}
					rs_insert(result.insertId);
				});
			})
		}).then((id) => {
			connection.commit(function(err) {
				if (err) {
					throw err;
					return;
				}
				rs_seq(id);
			});
		}).catch((err) => {
			connection.rollback();
			throw err;
		})
	}).then((id) => {
		rs(id);
		connection.end();
	}).catch(() => {
		rj();
		connection.end();
	});
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
	connection.end();
};

exports.getstorage = function(rs, rj, param) {
	var connection = createConnection();
	connection.query({
		sql: 'select cargo.cargoid,cargoname,cargovalue,storage.amount from storage,cargo where storage.cargoid = cargo.cargoid'
	}, (err, result) => {
		if (err) {
			rj();
			return;
		}
		rs(result);
	});
	connection.end();
};


exports.getpackinglist = function(rs, rj, param) {
	var connection = createConnection();
	try {
		connection.query({
			sql: 'select packinglist.listid,listdate,listtype,listoperator,listremark,cargo.cargoid,cargoname,cargovalue,amount from packinglist,list_cargo,cargo where packinglist.listid = list_cargo.listid and list_cargo.cargoid = cargo.cargoid order by listid desc'
		}, (err, result) => {
			if (err) {
				throw err;
				return;
			}
			var tmp = {};
			for (x of result) {
				if (!(x.listid in tmp)) {
					// console.log(x.listdate.Format('yyyy-MM-dd hh:mm:ss'))
					tmp[x.listid] = {
						listid: x.listid,
						listdate: x.listdate.Format('yyyy-MM-dd hh:mm:ss'),
						listtype: x.listtype,
						listoperator: x.listoperator,
						listremark: x.listremark,
						content: []
					};
				}
				tmp[x.listid].content.push({
					cargoid: x.cargoid,
					cargoname: x.cargoname,
					cargovalue: x.cargovalue,
					amount: x.amount
				});
			}
			var data = [];
			for (x in tmp) {
				data.unshift(tmp[x]);
			}
			rs(data);
		});
	} catch (e) {
		rj();
	} finally {
		connection.end();
	}
};


exports.addpackinglist = function(rs, rj, param) {
	if (param.listtype === 0) {
		_addpackinglistimport(rs, rj, param);
	} else {
		_addpackinglistexport(rs, rj, param);
	}

};

function _addpackinglistimport(rs, rj, param) {
	var connection = createConnection();
	var seq = new Promise((rs_whole, rj_whole) => {
		connection.beginTransaction((err) => {
			if (err) {
				rj_whole(err);
				return;
			}
			var seq_add_list = new Promise((rs_list, rj_list) => {
				connection.query({
					sql: 'insert into packinglist (listid,listdate,listtype,listoperator,listremark) values(null,now(),?,?,?)',
					values: [param.listtype, param.listoperator, param.listremark]
				}, (err, result) => {
					if (err) {
						rj_list(err);
						return;
					}
					rs_list(result.insertId);
				});
			}).then((listid) => { // rs_list: insert into packinglist successful
				// insert all data into list_cargo
				console.log('ATTENTION!!!!!!!!!!!!!')
				return Promise.all((() => {
					var arr = [];
					// list_cargo
					param.data.forEach(function(v, i, a) {
						arr.push(new Promise(function(rs_all, rj_all) {
							connection.query({
								sql: 'insert into list_cargo (id,listid,cargoid,amount) values(null,?,?,?)',
								values: [listid, v.id, v.amount]
							}, (err, result) => {
								if (err) {
									rj_all(err);
									return;
								}
								rs_all();
							});
						}));
					});
					// storage
					param.data.forEach(function(v, i, a) {
						arr.push(new Promise(function(rs_all, rj_all) {
							connection.query({
								sql: 'select * from storage where cargoid = ?',
								values: [v.id]
							}, (err, result) => {
								if (err) {
									rj_all(err);
									return;
								}
								var sql;
								if (result.length === 1) {
									sql = mysql.format('update storage set amount = amount + ? where cargoid = ?', [v.amount, v.id]);
								} else {
									sql = mysql.format('insert into storage (storageid,cargoid,amount) values (null,?,?)', [v.id, v.amount]);
								}
								connection.query({ sql: sql }, (err, result) => {
									if (err) {
										rj_all(err);
										return;
									}
									rs_all();
								});
							});
						}));
					});
					return arr;
				})()); // all Promise
			}).then((message) => { // insert into list_cargo was successful
				rs_whole();
				connection.commit(function(err) {
					if (err) {
						throw err;
					}
				});
			}).catch((err) => { // rj_list: any of up above action failed
				connection.rollback();
				rj_whole(err);
			}); // seq_add_list Promise
		}); // connect.beginTransaction
	}).then((message) => { // rs_whole: all action was success
		// all action was successful
		connection.end();
		rs();
	}, (err) => { // rj_whole: failed to begin transaction or process wasn't successful
		console.log(err)
		connection.end();
		rj();
	}); // seq Promise
};


function _addpackinglistexport(rs, rj, param) {
	var connection = createConnection();
	var seq = new Promise((rs_whole, rj_whole) => {
		connection.beginTransaction((err) => {
			if (err) {
				rj_whole(err);
				return;
			}
			var seq_add_list = new Promise((rs_list, rj_list) => {
				connection.query({
					sql: 'insert into packinglist (listid,listdate,listtype,listoperator,listremark) values(null,now(),?,?,?)',
					values: [param.listtype, param.listoperator, param.listremark]
				}, (err, result) => {
					if (err) {
						rj_list(err);
						return;
					}
					rs_list(result.insertId);
				});
			}).then((listid) => { // rs_list: insert into packinglist successful
				// insert all data into list_cargo
				console.log('ATTENTION!!!!!!!!!!!!!')
				return Promise.all((() => {
					var arr = [];
					// list_cargo
					param.data.forEach(function(v, i, a) {
						arr.push(new Promise(function(rs_all, rj_all) {
							connection.query({
								sql: 'insert into list_cargo (id,listid,cargoid,amount) values(null,?,?,?)',
								values: [listid, v.id, v.amount]
							}, (err, result) => {
								if (err) {
									rj_all(err);
									return;
								}
								rs_all();
							});
						}));
					});
					// storage
					param.data.forEach(function(v, i, a) {
						arr.push(new Promise(function(rs_all, rj_all) {
							connection.query({
								sql: 'update storage set amount = amount - ? where cargoid = ?',
								values: [v.amount, v.id]
							}, (err, result) => {
								if (err) {
									rj_all(err);
									return;
								}
								rs_all();
							});
						}));
					});
					arr.push(new Promise(function(rs_all, rj_all) {
						connection.query({
							sql: 'delete from storage where amount = 0'
						}, (err, result) => {
							if (err) {
								rj_all(err);
								return;
							}
							rs_all();
						});
					}));
					return arr;
				})()); // all Promise
			}).then((message) => { // insert into list_cargo was successful
				rs_whole();
				connection.commit(function(err) {
					if (err) {
						throw err;
					}
				});
			}).catch((err) => { // rj_list: any of up above action failed
				connection.rollback();
				rj_whole(err);
			}); // seq_add_list Promise
		}); // connect.beginTransaction
	}).then((message) => { // rs_whole: all action was success
		// all action was successful
		connection.end();
		rs();
	}, (err) => { // rj_whole: failed to begin transaction or process wasn't successful
		console.log(err)
		connection.end();
		rj();
	}); // seq Promise
};