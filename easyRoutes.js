var express = require('express');
var easyRouter=express.Router();
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
		else
        {
        
		cmdstr='v1';
        }
		var exestr="easyRouter."+method+"("+cmdstr+")";
		eval(exestr);
	
}

	//router's get method

module.exports.get=function(){
	
	routerAction(arguments,routerMethods.get);
	/*
	 var arglength=arguments.length; //Get the arguments length.
        var v1=arguments[0];		 //Get the first argument.
		
        if(arglength===3)			
        {
		    var str=arguments[2];//The third argument,could be path of view or callback function.
			var v2=arguments[1];//we don't do anything here.
			if((typeof str!='string')||str.constructor!=String)
			{
				easyRouter.get(v1,v2,str);
			}
			else
			{
            var v3=arguments[2].split('@');
            var obj=require(v3[0]);
			var action=v3[1];			
            var cbkstr='obj.'+action;
            
            easyRouter.get(v1,v2,eval(cbkstr));
			}
        }else if(arglength===2)
        {   
			var str=arguments[1];//The second argument,could be path of view or callback function.
			if((typeof str!='string')||str.constructor!=String)
			{
				easyRouter.get(v1,str);
				
			}
			else
			{
			var v2=arguments[1].split('@');	
            var obj=require(v2[0]);
			var action=v2[1];			
            var cbkstr='obj.'+action;
			
			
            easyRouter.get(v1,eval(cbkstr));
			}
			
        }
		else
        {
        easyRouter.get(v1);
        }
		*/
},

//router's post method
module.exports.post=function(){
	routerAction(arguments,routerMethods.post);
}


module.exports.bind=function(app){
	
	app.use(easyRouter);
}
