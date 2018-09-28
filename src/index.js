let RouteList = [];
let ParentPath = '';
let ParentCallBacks = [];

const HttpMethod = { get: 'get', post: 'post', put: 'put', delete: 'delete' };




/** define group routers */
let _group = function () {
	let args = arguments;

	if (args.length > 1)//at least two arguments,too make gourp routes.
	{
		let i = 0;
		let arg_length = args.length;
		if (typeof args[0] == 'string') {
			ParentPath = args[0];
			i++;
		}
		for (i; i < arg_length - 1; i++) {
			ParentCallBacks.push(args[i]);
		}
		let last_func = args[arg_length - 1];

		last_func();//register the routes

		ParentPath = '';
		ParentCallBacks = [];
	} else {
		//ParentCallBacks.push(args);
	}

};

/**http get method */
let _get = function () {

	action(HttpMethod.get, arguments);
};
/**http post method */
let _post = function () {

	action(HttpMethod.post, arguments);
};
/**http delete method */
let _delete = function () {
	action(HttpMethod.delete, arguments);
};
/**http put method */
let _put = function () {
	easyRouter.action(HttpMethod.put, arguments);
};
/**hook routes to main route tree list */
let action = (method, args) => {

	let path = args[0];

	let callbacks = [];
	for (var i = 1; i < args.length; i++) {
		let arg_type = typeof args[i];
		if (arg_type == 'string') {
			let at_func_str = args[i].split('@');
			let action = at_func_str[1];
			let at_func_obj = require(at_func_str[0]);
			let at_func = eval('at_func_obj.' + action);
			callbacks.push(at_func);
		} else {
			callbacks.push(args[i]);
		}
	}


	let router = {
		_path: path.length > 1 && method == HttpMethod.get ? ParentPath + path : path
		, _callbacks: ParentCallBacks.length > 0 ? ParentCallBacks.concat(callbacks) : callbacks
		, _method: method
	}

	RouteList.push(router);
};
/**bind the route tree list to express app */
let _bind = (app) => {
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


	})

};
/**retuen the route list hooked on express app */
let routerlist = () => {
	return RouteList;
}
let easyRouter = {
	put: _put,
	get: _get,
	post: _post,
	delete: _delete,
	group: _group,
	bind: _bind,
	list: routerlist
}
Object.freeze(easyRouter);

export default easyRouter;