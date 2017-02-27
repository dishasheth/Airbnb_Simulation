var mysql=require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://127.0.0.1:27017/airbnb";
var MongoClient = require('mongodb').MongoClient;
exports.getHostByHostId=function(id,callback)
{
    mysql.getData("select * from host where id="+id,callback);
  /**  mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');

        coll.findOne({"host": user_id}, callback);**/
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
   // });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}
exports.getBillingByHostId=function(user_id,callback)
{
    mysql.getData(" select b.id,b.approved,b.to_date,b.from_date,b.price,u.fname,u.lname,u.avg_rating,u.num_rating," +
        "u.id as user_id,u.email,p.ptitle,p.description,p.address " +
        "from billing b, property p, user u " +
        "where b.property_id=p.id && b.user_id=u.id " +
        "&& p.host_id="+user_id +"&& approved is null",callback);
    /**  mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');

        coll.findOne({"host": user_id}, callback);**/
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
    // });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}
exports.approvebill=function(approve,billid,callback)
{
    mysql.getData("update billing set approved="+approve+" where id="+billid,callback);
    /**  mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');

        coll.findOne({"host": user_id}, callback);**/
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
    // });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}

exports.getCurrentReviews=function(hostid,callback)
{
   // mysql.getData("select * from property where host_id="+user_id,callback);
      mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('hosttouser');
          console.log("prop"+hostid);
        coll.find({"hostid":hostid }).toArray(callback);
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
     });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}
exports.getRatingForHosts=function(user_id,callback)
{
    // mysql.getData("select * from property where host_id="+user_id,callback);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('usertohost');
        console.log("host -----"+user_id);
        coll.find({"user_id":user_id }).toArray(callback);
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
    });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}
exports.addImage=function(propertyid,image,callback)
{

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');
       console.log("host -----"+propertyid);
        coll.findOne({"id":propertyid },callback);
   });
}
exports.updateReview=function(host,review,rating,userid,fname,lname,profile_image,callback)
{
    var date=new Date().getMonth()+" "+new Date().getDate();
    host[0].reviews.push( { "userid" : userid,"rating":rating,"review":review,"fname":fname,"lname":lname,
        "profile_image":profile_image,"reviewdate":date});
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('hosttouser');
        console.log("host -----"+host[0].id);
        coll.remove({"id":host[0].id },callback);
    });
}
exports.insertReview=function(host,callback)
{
  //  property[0].images.push( { "img1" : "../"+image });
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('hosttouser');
        console.log("host -----"+host[0].id);
        coll.insert(host[0],callback);
    });
}

exports.updateVideo=function(property,image,callback)
{
    property[0].videos.push( { "vid1" : "images/"+image });
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');
        console.log("host -----"+property[0].id);
        coll.remove({"id":property[0].id },callback);
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