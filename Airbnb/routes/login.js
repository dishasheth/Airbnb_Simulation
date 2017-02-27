/**
 * Created by harshmehta6711 on 02-12-2016.
 */
var mq_client = require('../rpc/client');
var createlog=require("./createLog");

function register(req,res)
{
    var email = req.param('email');
    var password = req.param('password');
    var first_name = req.param('fname');
    var last_name = req.param('lname');
    var response;

    var msg_payload = {"email":email,"password":password,"first_name":first_name,"last_name":last_name,"action":"Register"};
    mq_client.make_request('login_queue',msg_payload, function(err,results){
        console.log(results);
        if(err){
            response = {"statusCode":401,"data":"User already exists"};
            console.log('inside 401 error');
            res.send((response));
        }
        else
        {

            console.log("results "+ results.code);
            if(results.code == 200){
                console.log('inside routes:200');
                response = {"statusCode":200,"fname":first_name,"email":email};
                console.log(results);
                req.session.login = {"first_name":first_name,"email":email};
                console.log(response);
                console.log('before log');
                createlog.log(email+ " Registered ");   //USER LOG
                console.log('after log');
                res.send((response));

            }
            else {
                console.log('inside routes error');
                response = {"statusCode":403,"data":null};
                createlog.log(email+"  Unsuccessful Registeration ");   //USER LOG
                res.send((response));
            }
        }
    });
}

function getLoginSession(req,res)
{
    var response;
    if(req.session.login)
    {
        console.log(req.session.login);
        response = {"statusCode":200,"data":req.session.login};
        res.send(JSON.stringify(response));
    }
    else
    {
        response = {"statusCode":401,"data":null};
        res.send(JSON.stringify(response));
    }
}

exports.register = register;
exports.getLoginSession = getLoginSession;