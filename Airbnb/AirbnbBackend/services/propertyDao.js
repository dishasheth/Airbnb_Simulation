var mysql=require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://127.0.0.1:27017/airbnb";
var MongoClient = require('mongodb').MongoClient;
exports.getProprtyByHostId=function(user_id,callback)
{
    mysql.getData("select * from property where host_id="+user_id,callback);

}
exports.getBillingByHostId=function(user_id,callback)
{
    mysql.getData(" select b.id,b.approved,b.to_date,b.from_date,b.totalprice,u.fname,u.lname,u.avg_rating,u.num_rating," +
        "u.id as user_id,u.email,p.ptitle,p.description,p.address " +
        "from trip b, property p, user u " +
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
    mysql.getData("update trip set approved="+approve+" where id="+billid,callback);
    /**  mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');

        coll.findOne({"host": user_id}, callback);**/
//	mysql.getData("Select * from user where email='"+username+"' and password='"+password+"'",callback);
    // });
    //mysql.getData("select * from user where user_id="+user_id,callback);
}

exports.getMediaForProperties=function(property_id,callback)
{
   // mysql.getData("select * from property where host_id="+user_id,callback);
      mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');
          console.log("prop"+property_id);
        coll.find({"id":property_id }).toArray(callback);
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
exports.updateImage=function(property,image,callback)
{
    property[0].images.push( { "img1" : "../images/"+image });
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');
        console.log("host -----"+property[0].id);
        coll.remove({"id":property[0].id },callback);
    });
}
exports.insertImage=function(property,image,callback)
{
  //  property[0].images.push( { "img1" : "../"+image });
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');
        console.log("host -----"+property[0].id);
        coll.insert(property[0],callback);
    });
}

exports.updateVideo=function(property,image,callback)
{
    property[0].videos.push( { "vid1" : "../images/"+image });
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