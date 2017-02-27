/**
 * Created by DELL on 11/30/2016.
 */
var mysql=require('../AirbnbBackend/services/mysql');
var mq_client = require('../rpc/client');

exports.getHostProfile=function (req,res)
{
    var msg_payload={
        id: req.param('id'),
        queue:"host_profile"
    }

    mq_client.make_request('login_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.statusCode === 200){
                console.log("valid Login");
                res.send({ "statusCode":200,"details":results.details,"hostmongo":results.hostmongo});
                console.log("success");
            }
            else {

                console.log("Invalid Login");
                res.send({"login":"Fail"});
            }
        }
    });

};