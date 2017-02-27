/**
 * Created by mbars on 12/2/2016.
 */
var ejs = require("ejs");
var mq_client = require('../rpc/client');
exports.reviewhost = function(req, res){
    res.render('index2', { title: 'Express' });
};
exports.getcurrentrating=function(req,res) {
// check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var hostid = req.param("hostid");

    var msg_payload = {"hostid": hostid};

    console.log("In POST Request = UserName:" + hostid);

    mq_client.make_request('gethostreviews_queue', msg_payload, function (err, results) {

        console.log(results);
        if (err) {
            throw err;
        }
        else {
            if (results.code == 200) {
                console.log("Found Properties");

                res.send({"statusCode": "200", "reviews": results.reviews});
            }
            else {

                console.log("Invalid Login");
                res.send({"listing": "null"});
            }
        }
    });

}
    exports.review_host=function(req,res)
    {
        // check user already exists
        //var getUser="select * from users where emailid='"+req.param("username")+"'";
        var hostid =req.param("hostid");
        var review=req.param("review");
        var rating=req.param("rating");
        userid="123456780";
        fname="Harsh";
        lname="Mehta";
        profile_image="person1.jpg";
        console.log("In POST Request = UserName:"+ hostid +review);
        var msg_payload = { "hostid": hostid,"review":review,"userid":userid,"rating":rating,"fname":fname,"lname":lname,"profile_image":profile_image };

//

        mq_client.make_request('review_host_queue',msg_payload, function(err,results){

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



