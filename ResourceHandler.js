const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

exports.StaticResource = StaticResource;


function StaticResource() {

}

exports.handleStatic = function(req, res) {
	var urlobj = url.parse(req.url);
	var filename = urlobj.pathname.split('/');
	filename = filename[filename.length - 1];
	var suffix = filename.match(/\.(\w*?)$/)[1];
	res.setHeader('Content-Type', getContentType(suffix));
	fs.readFile('.' + req.url.replace(/\?.*/, ""), (err, data) => {
		if (err) {
			error404(req, res);
			return;
		}
		res.write(data);
		res.end();
	});
}

exports.renderEJS = function(req, res, file) {
	file = './www' + file;
	res.setHeader('Content-Type', getContentType('htm'));
	fs.readFile(file, (err, data) => {
		if (err) {
			error404(req, res);
			return;
		}
		res.write(ejs.render(data.toString(), {}, {
			filename: file
		}), 'utf-8');
		res.end();
	});
};

// exports.handleFile = function(req, res, file) {
// 	res.setHeader('Content-Type', getContentType(file.match(/\.(\w*?)$/)[1]));
// 	fs.readFile('./www' + file, (err, data) => {
// 		if (err) {
// 			error404(req, res);
// 			return;
// 		}
// 		res.write(data);
// 		res.end();
// 	});
// };


function error404(req, res) {
	res.writeHead(404, "File Not Found");
	res.write("<h1>404 Not Found</h1>");
	res.end();
}

function getContentType(suffix) {
	var contenttype = {
		css: 'text/css; charset=utf-8',
		eot: 'application/octet-stream',
		htm: 'text/html; charset=utf-8',
		html: 'text/html; charset=utf-8`',
		ico: 'image/x-icon',
		jpg: 'image/jpeg',
		js: 'application/x-javascript; charset=utf-8',
		png: 'image/png',
		ttf: 'application/octet-stream',
		woff: 'application/octet-stream',
	}
	if (suffix in contenttype) {
		return contenttype[suffix];
	} else {
		return 'text/plain; charset=utf-8';
	}
}