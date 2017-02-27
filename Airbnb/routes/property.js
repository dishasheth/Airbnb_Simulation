var ejs = require("ejs");
var mq_client = require('../rpc/client');

function getPropertyListing(req,res)
{
	// check user already exists
	//var getUser="select * from users where emailid='"+req.param("username")+"'";
	//var username =req.param("host_id");
    var username =req.param("host_id");
	var msg_payload = { "username": username };
		
	console.log("In POST Request = UserName:"+ username);
	
	mq_client.make_request('propertyListing_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("Found Properties");
				
				res.send({"statusCode":"200","listing":results.properties});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"listing":"null"});
			}
		}  
	});
	
}
exports.getBilling=function(req,res)
{
    // check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var username =req.param('host_id');

    var msg_payload = { "username": username };

    console.log("In POST Request = UserName:"+ username);

    mq_client.make_request('billing_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("Found Bills");

                res.send({"statusCode":"200","billing":results.billing});
            }
            else {

                console.log("Invalid Login");
                res.send({"billing":"null"});
            }
        }
    });

}

exports.approveBilling=function(req,res)
{
    // check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var billid =req.param("billid");
    var approve=req.param("approve");
    console.log("In POST Request = UserName:"+ billid +approve);
    var msg_payload = { "billid": billid,"approve":approve };

//

    mq_client.make_request('approvebill_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("Found Bills");

                res.send({"statusCode":"200"});
            }
            else {

                console.log("Invalid Login");
               // res.send({"billing":"null"});
            }
        }
    });

}

//add Image------------------------------------------------------------------
exports.addImage=function(req,res)
{
    // check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var image =req.param("image");
    var propertyid=req.param("property_id");
    console.log("In POST Request = UserName:"+ propertyid +image);
    var msg_payload = { "propertyid": propertyid,"image":image };

//

    mq_client.make_request('addImage_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("Found Bills");

                res.send({"statusCode":"200"});
            }
            else {

                console.log("Invalid Login");
                // res.send({"billing":"null"});
            }
        }
    });

}

//------------------------------------------------------------------------------


exports.addVideo=function(req,res)
{
    // check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var image =req.param("image");
    var propertyid=req.param("propertyid");
    console.log("In POST Request = UserName:"+ propertyid +image);
    var msg_payload = { "propertyid": propertyid,"image":image };

//

    mq_client.make_request('addVideo_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("Found Bills");

                res.send({"statusCode":"200"});
            }
            else {

                console.log("Invalid Login");
                // res.send({"billing":"null"});
            }
        }
    });

}


//-----------------------------------------------------------------------------

exports.getPropertyListing=getPropertyListing;
