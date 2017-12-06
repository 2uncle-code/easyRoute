var express = require('express');
var easyRouter=express.Router();
var routeGroupV1,	//The first argument for route group,can be mount path or any other thing,for routeGroup.
	routeGroupV2,   //Deal with two arguments condition,for routeGroup.
	middlewares;	//Deal with three arguments condition,middlewares for routeGroup.


var routerMethods={
	get:'get',
	post:'post',
}

var routerAction=function(args,method){
		var arglength=args.length; //Get the arguments length.
        var v1=args[0];		 //Get the first argument.
		var cmdstr='';		 //
        if(arglength===3)			
        {
		    var str=args[2];//The third argument,could be path of view or callback function.			
			var v2=args[1];//we don't do anything here.
			if((typeof str!='string')||str.constructor!=String)
			{
				
				cmdstr='v1,v2,str';
			}
			else
			{
            var v3=args[2].split('@');
            var obj=require(v3[0]);
			var action=v3[1];			
            var cbkstr='obj.'+action;      
            cmdstr='v1,v2,eval(cbkstr)';
			}
        }else if(arglength===2)
        {   
			var str=args[1];//The second argument,could be path of view or callback function.
			if((typeof str!='string')||str.constructor!=String)
			{
				
				cmdstr='v1,str';
				
			}
			else
			{
			var v2=args[1].split('@');	
            var obj=require(v2[0]);
			var action=v2[1];			
            var cbkstr='obj.'+action;
			
			
            
			cmdstr='v1,eval(cbkstr)';
			}
			
        }
		else if(arglength===1)
        {
        
		cmdstr='v1';
        }
		var exestr="easyRouter."+method+"("+cmdstr+")";
		eval(exestr);
	
}

	//Router's get method

module.exports.get=function(){
	
	routerAction(arguments,routerMethods.get);
	
},

//Router's post method
module.exports.post=function(){
	routerAction(arguments,routerMethods.post);
}

//Router's group method
module.exports.group=function(){
	var args=arguments;//All arguments we got.
	var arglength=args.length;	
	var v1=args[0];
	routeGroupV1=v1;//first argument
	if(arglength===1)
	{
		easyRouter.use(v1);
	}
	else if(arglength===2)
	{	var v2=routeGroupV2=args[1];
		//easyRouter.use(v2);
	}
	else if(arglength===3) //If we got three arguments,the second argument must be middleware.
	{
		middlewares=args[1];
	}
	
}

//Bind routers to app
module.exports.bind=function(app){
	
	
	
		if(typeof(middlewares)!="undefined")
		{
			app.use(routeGroupV1,middlewares,easyRouter);
		}
		else if(typeof(routeGroupV2)!="undefined")
		{
		app.use(routeGroupV1,easyRouter);		
		}	
		else
		{
			app.use(easyRouter);
		}
}
