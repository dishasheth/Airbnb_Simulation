var mysql=require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://127.0.0.1:27017/airbnb";
var MongoClient = require('mongodb').MongoClient;
exports.getUserByUserId=function(id,callback)
{
    mysql.getData("select * from user where id="+id,callback);

}
exports.getCurrentReviewsForUser=function(userid,callback)
{
    // mysql.getData("select * from property where host_id="+user_id,callback);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('usertohost');
        console.log("prop"+userid);
        coll.find({"userid":userid }).toArray(callback);
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
    });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}
exports.updateReviewForUser=function(host,review,rating,userid,fname,lname,profile_image,callback)
{
    var date=new Date().getMonth()+" "+new Date().getDate();
    host[0].reviews.push( { "hostid" : userid,"rating":rating,"review":review,"fname":fname,"lname":lname,
        "profile_image":profile_image,"reviewdate":date});
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('usertohost');
        console.log("user -----"+host[0].id);
        coll.remove({"id":host[0].id },callback);
    });
}
exports.insertReviewForUser=function(host,callback)
{
  //  property[0].images.push( { "img1" : "../"+image });
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('usertohost');
        console.log("host -----"+host[0].id);
        coll.insert(host[0],callback);
    });
}


exports.getRatingForUsers=function(user_id,callback)
{
    // mysql.getData("select * from property where host_id="+user_id,callback);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('hosttouser');
        console.log("user  ----"+user_id);
        coll.find({"user_id":user_id }).toArray(callback);
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
    });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}