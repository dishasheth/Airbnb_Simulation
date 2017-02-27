var ejs = require("ejs");
var mq_client = require('../rpc/client');

exports.addhost=function(req,res)
{
    // check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var placetype =req.param("placetype");
    var guests=req.param("guests");
    var address=req.param("address");
    var city =req.param("city");
    var state=req.param("state");
    var zipcode=req.param("zipcode");
    hostid=req.param("host_id");

    console.log("In POST Request = UserName:"+ hostid );
    var msg_payload = { "hostid": hostid,"placetype":placetype,"guests":guests,"address":address,"city":city,"state":state,"zipcode":zipcode};

//

    mq_client.make_request('becomehost_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("Added host");
                console.log("Property id is"+results.id);
                req.session.property_id=results.id;
                res.send({"statusCode":"200","property_id":results.id});
            }
            else {

                res.send({"statusCode":"401"});
            }
        }
    });

}

exports.getPropertyDetails=function(req,res)
{
    // check user already exists
    var state=req.param("state");

    console.log("In POST Request = UserName:"+ state );
    var msg_payload = {"state":state};
//

    mq_client.make_request('getProperties_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("getting all properties");

                res.send({"statusCode":"200","properties":results.properties});
            }
            else {

                res.send({"statusCode":"401"});
            }
        }
    });

}

exports.updateCalendar=function(req,res)
{
    // check user already exists
    var id=req.param("property_id");
    var todate=req.param("todate");
    var fromdate=req.param("fromdate");
    var userid="shim.simon@sjsu.edu0";
  //  console.log("In POST Request = UserName:"+ state );
    var msg_payload = {"todate":todate,"fromdate":fromdate,"id":id,"hostid":userid};
//

    mq_client.make_request('updatecalendar_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("getting all properties");

                res.send({"statusCode":"200"});
            }
            else {

                res.send({"statusCode":"401"});
            }
        }
    });

}



exports.updateTitle=function(req,res)
{
    // check user already exists
    var id=req.param("property_id");
    var title=req.param("title");

    console.log("In POST Request = UserName:"+ title );
    var msg_payload = {"id":id,"title":title};
//

    mq_client.make_request('updatetitle_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("updated title");

                res.send({"statusCode":"200"});
            }
            else {

                res.send({"statusCode":"401"});
            }
        }
    });

}
exports.updatePrice=function(req,res)
{
    // check user already exists
    var id=req.param("property_id");
    var price=req.param("price");

  //  console.log("In POST Request = UserName:"+ state );
    var msg_payload = {"id":id,"price":price};
//

    mq_client.make_request('updateprice_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.code == 200){
                console.log("getting all properties");

                res.send({"statusCode":"200"});
            }
            else {

                res.send({"statusCode":"401"});
            }
        }
    });

}

