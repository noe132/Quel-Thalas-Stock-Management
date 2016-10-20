exports.Router = Router;

const get = Symbol('get');
const post = Symbol('post');
const parent = Symbol('parent');

function Router() {
	this._path = {
		[parent]: null
	}
}

Router.prototype.handle = function(req, res, error) {
	var _this = this;
	var path = req.url.trim().split('/');
	path[0] = "root";

	var method = req.method === 'GET' ? get : post;
	var currentPath = _this._path;

	for (var v of path) {
		if (currentPath[v] === undefined) {
			break;
		}
		currentPath = currentPath[v];
	}

	while (currentPath !== null && !currentPath[method]) {
		currentPath = currentPath[parent];
	}

	if (currentPath === null) {
		error();
		return;
	}

	currentPath[method](req, res);
};

Router.prototype.get = function(path, callback) {
	if (typeof path === 'object') {
		path.forEach(function(v, i, a) {
			this._addRequestListener(get, v, callback);
		})
	} else {
		this._addRequestListener(get, path, callback);
	}
}

Router.prototype.post = function(path, callback) {
	if (typeof path === 'object') {
		path.forEach(function(v, i, a) {
			this._addRequestListener(post, v, callback);
		})
	} else {
		this._addRequestListener(post, path, callback);
	}
}

Router.prototype._get = function(path, callback) {
	this._addRequestListener(get, path, callback);
}

Router.prototype._post = function(path, callback) {
	this._addRequestListener(post, path, callback);
}

Router.prototype._addRequestListener = function(method, path, callback) {
	var _this = this;

	var path = path.split('/');
	path[0] = "root";

	var currentPath = _this._path;
	for (var v of path) {
		if (currentPath[v] === undefined) {
			currentPath[v] = {
				[parent]: currentPath
			};
		}
		currentPath = currentPath[v];
	}
	currentPath[method] = callback;
}