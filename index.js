let RouteList=[];
let ParentPath='';
let ParentCallBacks=[];
let Seo='';
const HttpMethod={get:'get',post:'post',put:'put',delete:'delete'};
let _importer=require('./lib/importer');

module.exports=easyRouter={
	importer:(path)=>{
		return _importer(path);
	},
	group:function(){
		let args=arguments;

		if(args.length>1)//at least two arguments,too make gourp routes.
		{	let i=0;
			let arg_length=args.length;
			if(typeof args[0]=='string'){
				ParentPath=args[0];
				i++;
			}
			for(i;i<arg_length-1;i++)
			{
				ParentCallBacks.push(args[i]);
			}
			let last_func=args[arg_length-1];
			
			last_func();//register the routes

			ParentPath='';
			ParentCallBacks=[];
		}else{
			//ParentCallBacks.push(args);
		}

	},
	enableseo:(sufix)=>{
		Seo=sufix;
	},
	get:function(){
		
		easyRouter.action(HttpMethod.get,arguments);
	},
	post:function(){
		
		easyRouter.action(HttpMethod.post,arguments);
	},
	delete:function(){
		easyRouter.action(HttpMethod.delete,arguments);
	},
	put:function(){
		easyRouter.action(HttpMethod.put,arguments);
	},
	action:(method,args)=>{
		
		let path=args[0];
		
		let callbacks=[];
		for(var i=1;i<args.length;i++)
		{		let arg_type=typeof args[i];
			if(arg_type=='string'){
				let at_func_str=args[i].split('@');
				let action=at_func_str[1];
				let at_func_obj=require(at_func_str[0]);
				let at_func=eval('at_func_obj.'+action);
				callbacks.push(at_func);
			}else{
				callbacks.push(args[i]);
			}
		}
		
		let sufix=Seo.length>0?'.'+Seo:Seo;
		let router={
			_path:path.length>1?ParentPath+path+sufix:path
			,_callbacks:ParentCallBacks.length>1?ParentCallBacks.push(callbacks):callbacks
			,_method:method
		}
		
		RouteList.push(router);
	},
	bind:(app)=>
	{		
		RouteList.forEach(function(item){
			
			switch(item._method){
				case HttpMethod.get:
					if(item._callbacks.length==0) //this is for app.get(name);
					{
					  return app.get(item.path);
					}
					app.get(item._path,item._callbacks);
					break;
				case HttpMethod.post:
					app.post(item._path,item._callbacks);
					break;
				case HttpMethod.delete:
					app.delete(item._path,item._callbacks);
					break;		
			}
			
			
		})
		
	}
}