/**
 * Created by mbars on 12/2/2016.
 */
var ejs = require("ejs");
var mq_client = require('../rpc/client');
exports.reviewuser = function(req, res){
    res.render('userreviews', { title: 'Express' });
};
exports.getcurrentratingforuser=function(req,res) {
// check user already exists
    //var getUser="select * from users where emailid='"+req.param("username")+"'";
    var userid = req.param("userid");

    var msg_payload = {"userid": userid};

    console.log("In POST Request = UserName:" + userid);

    mq_client.make_request('getuserreviews_queue', msg_payload, function (err, results) {

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
    exports.review_user=function(req,res)
    {
        // check user already exists
        //var getUser="select * from users where emailid='"+req.param("username")+"'";
        var userid =req.param("userid");
        var review=req.param("review");
        var rating=req.param("rating");
        hostid="123456780";
        fname="Harsh";
        lname="Mehta";
        profile_image="person1.jpg";
        console.log("In POST Request = UserName:"+ userid +review);
        var msg_payload = { "userid": userid,"review":review,"hostid":hostid,"rating":rating,"fname":fname,"lname":lname,"profile_image":profile_image };

//

        mq_client.make_request('review_user_queue',msg_payload, function(err,results){

            console.log(results);
            if(err){
                throw err;
            }
            else
            {
                if(results.code == 200){
                    console.log("Reviewed user");

                    res.send({"statusCode":"200"});
                }
                else {

                    console.log("Invalid Login");
                    // res.send({"billing":"null"});
                }
            }
        });

    }



