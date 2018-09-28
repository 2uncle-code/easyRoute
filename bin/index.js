'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var RouteList = [];
var ParentPath = '';
var ParentCallBacks = [];

var HttpMethod = { get: 'get', post: 'post', put: 'put', delete: 'delete' };

/** define group routers */
var _group = function _group() {
	var args = arguments;

	if (args.length > 1) //at least two arguments,too make gourp routes.
		{
			var i = 0;
			var arg_length = args.length;
			if (typeof args[0] == 'string') {
				ParentPath = args[0];
				i++;
			}
			for (i; i < arg_length - 1; i++) {
				ParentCallBacks.push(args[i]);
			}
			var last_func = args[arg_length - 1];

			last_func(); //register the routes

			ParentPath = '';
			ParentCallBacks = [];
		} else {
		//ParentCallBacks.push(args);
	}
};

/**http get method */
var _get = function _get() {

	action(HttpMethod.get, arguments);
};
/**http post method */
var _post = function _post() {

	action(HttpMethod.post, arguments);
};
/**http delete method */
var _delete = function _delete() {
	action(HttpMethod.delete, arguments);
};
/**http put method */
var _put = function _put() {
	easyRouter.action(HttpMethod.put, arguments);
};
/**hook routes to main route tree list */
var action = function action(method, args) {

	var path = args[0];

	var callbacks = [];
	for (var i = 1; i < args.length; i++) {
		var arg_type = _typeof(args[i]);
		if (arg_type == 'string') {
			var at_func_str = args[i].split('@');
			var _action = at_func_str[1];
			var at_func_obj = require(at_func_str[0]);
			var at_func = eval('at_func_obj.' + _action);
			callbacks.push(at_func);
		} else {
			callbacks.push(args[i]);
		}
	}

	var router = {
		_path: path.length > 1 && method == HttpMethod.get ? ParentPath + path : path,
		_callbacks: ParentCallBacks.length > 0 ? ParentCallBacks.concat(callbacks) : callbacks,
		_method: method
	};

	RouteList.push(router);
};
/**bind the route tree list to express app */
var _bind = function _bind(app) {
	RouteList.forEach(function (item) {

		switch (item._method) {
			case HttpMethod.get:
				if (item._callbacks.length == 0) //this is for app.get(name);
					{
						return app.get(item.path);
					}
				app.get(item._path, item._callbacks);
				break;
			case HttpMethod.post:
				app.post(item._path, item._callbacks);
				break;
			case HttpMethod.delete:
				app.delete(item._path, item._callbacks);
				break;
		}
	});
};
/**retuen the route list hooked on express app */
var routerlist = function routerlist() {
	return RouteList;
};
var easyRouter = {
	put: _put,
	get: _get,
	post: _post,
	delete: _delete,
	group: _group,
	bind: _bind,
	list: routerlist
};
Object.freeze(easyRouter);

exports.default = easyRouter;