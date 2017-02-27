var mysql=require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://127.0.0.1:27017/airbnb";
var MongoClient = require('mongodb').MongoClient;
exports.registerHost=function(hostid,placetype,guests,address,city,state,zipcode,callback)
{
    mysql.getData("insert into property (host_id,category,guests,address,city,state,zipcode) values ('"+hostid+"','"+placetype+"',"+guests+",'"+address+"','"+city+"','"+state+"',"+zipcode+")",callback);

}
exports.setPropertyTitle=function(title,id,callback)
{
    console.log("In handle request:"+ title);

    mysql.getData("update property set ptitle='"+title+"' where id="+id,callback);

}
exports.getPropertyId=function(callback)
{
    mysql.getData("select MAX(id) as id from property",callback);

}
exports.getPropertyDetails=function(state,callback)
{
    mysql.getData("select * from property where state='"+state+"'",callback);

}


exports.setPropertyPrice=function(price,id,callback)
{
    mysql.getData("update property set price="+price+" where id="+id,callback);

}
exports.updatePropertyCalendar=function(fromdate,todate,id,callback)
{
    mysql.getData("update property set available_from='"+fromdate+"',available_to='"+todate+"' where id="+id,callback);

}
exports.insertProperty=function(id,callback)
{
    //  property[0].images.push( { "img1" : "../"+image });
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('property');
        console.log("host -----"+id);

        coll.insertOne( {

            "id" : id,
            "images" : [],
            "videos" : []

        });
        callback();
    });
}
exports.insertHost=function(id,callback)
{
    mysql.getData("insert into host (id,fname,lname,address,city,state,zipcode,phone,email,cc_number,cvv,expiry,profile_image) values(select id,fname,lname,address,city,state,zipcode,phone,email,cc_number,cvv,expiry,profile_image from user where email='"+id+"')",callback);

}
