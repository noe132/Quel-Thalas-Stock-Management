const url = require('url');
const querystring = require('querystring');
const Mysql = require('./Mysql');

exports.login = function(req, res) {
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	})
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		Mysql.login((result) => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');

			// set session
			req.session.logined = true;
			req.session.username = result.username;
			res.end(JSON.stringify({
				status: 0,
				message: '登陆成功！'
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '用户名或密码错误！'
			}));
		}, param);
	});
};

exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};


exports.signup = function(req, res) {
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		Mysql.signup(() => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '注册成功，请登录！'
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '用户名已被占用！'
			}));
		}, param);
	});
};

exports.getalluser = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	Mysql.getalluser((result) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.end(JSON.stringify({
			status: 0,
			users: result
		}));
	});
};

exports.resetpassword = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		Mysql.resetpassword(() => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '密码重置成功！'
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '重置失败！'
			}));
		}, param);
	});
};

exports.deleteuser = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		if (req.session.username === param.username) {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '不能删除自己！'
			}));
		}
		Mysql.deleteuser(() => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '用户删除成功！'
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '删除失败！'
			}));
		}, param);
	});
};


exports.getcargo = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	Mysql.getcargo((result) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.end(JSON.stringify({
			status: 0,
			cargo: result
		}));
	});
};


exports.addcargo = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		Mysql.addcargo((id) => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '货物添加成功！',
				id: id
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '货物添加失败！'
			}));
		}, param);
	});
};


exports.editcargo = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		Mysql.editcargo((id) => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '货物修改成功！',
				id: id
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '货物修改失败！'
			}));
		}, param);
	});
};



exports.removecargo = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = querystring.parse(data.toString());
		Mysql.removecargo(() => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '货物删除成功！'
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '货物删除失败！'
			}));
		}, param);
	});
};


exports.getstorage = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	Mysql.getstorage((result) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.end(JSON.stringify({
			status: 0,
			storage: result
		}));
	});
};

exports.getpackinglist = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	Mysql.getpackinglist((result) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.end(JSON.stringify({
			status: 0,
			packinglist: result
		}));
	});
};

exports.addpackinglist = function(req, res) {
	if (!isLogined(req)) {
		writeNotLogin(res);
		return;
	}
	var data = Buffer.alloc(0);
	req.on('data', (chunk) => {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', () => {
		var param = JSON.parse(decodeURIComponent(data.toString()));
		param.listoperator = req.session.username;
		Mysql.addpackinglist(() => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 0,
				message: '货单添加成功！'
			}));
		}, () => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.end(JSON.stringify({
				status: 1,
				message: '货单添加失败！'
			}));
		}, param);
	});
};



function isLogined(req) {
	return req.session.logined === true;
}

function writeNotLogin(res) {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.end(JSON.stringify({
		status: 1,
		message: '尚未登录！'
	}));
}