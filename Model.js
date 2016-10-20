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
		Mysql.login(() => {
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
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