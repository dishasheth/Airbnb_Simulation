/**
 * Created by DELL on 11/26/2016.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/airbnb";
var mongoURLsess = "mongodb://localhost:27017/airbnbv10";
var mysql=require('./mysql');

var bcrypt = require('bcryptjs');

var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

/*
function handle_request(msg, callback){
console.log(msg.queue);
    if(msg.queue==="fil")
    {
        var res = {};

        var json_responses;

        console.log("IN QUEUE"+msg.queue);
        var places=msg.place.split(", ");
        var g=msg.guests.substring(0,1,msg.guests);
        console.log("GUESTS :"+g);
        console.log(places[0]+"--"+places[1]+"---"+places[2]);
        var city="%"+places[0]+"%";
        var state="%"+places[1]+"%";
        var country="%"+places[2]+"%";
        var type="%"+msg.type+"%";
        var price1=msg.price1;
        var price2=msg.price2;
var query="";
        if(type=="all")
        {
            if(price1!=undefined && price2!=undefined)
            {
               query="select * from property where (city like '"+city+"' or state like '"+state+"' or address like '"+city+"' or address like '"+state+"' or address like '"+country+"') and guests>="+g+" and price between "+price1+" AND "+price2+" ";
            }
            else {
                query = "select * from property where (city like '" + city + "' or state like '" + state + "' or address like '" + city + "' or address like '" + state + "' or address like '" + country + "') and guests>="+g+"";
            }
        }

        else
        {
            if(price1!=undefined && price2!=undefined) {
                query = "select * from property where (city like '" + city + "' or state like '" + state + "' or address like '" + city + "' or address like '" + state + "' or address like '" + country + "') and guests>=" + g + " and category like '" + type + "' and price between " + price1 + " AND " + price2 + " ";
            }
            else
            {
               query = "select * from property where (city like '" + city + "' or state like '" + state + "' or address like '" + city + "' or address like '" + state + "' or address like '" + country + "') and guests>="+ g +" and category like '"+ type +"'";
            }
        }
console.log(query);
        mysql.fetchData(function(err,results){
            if(err){
                console.log("Invalid Login");
                throw err;

            }
            else
            {
                if(results.length > 0){

                    var results1=[];
                    for(var i=0;i<results.length;i++) {
                        console.log(results[i].address+"====="+results[i].id);
                        results1[i]=results[i].id;
                    }

                    mongo.connect(mongoURL, function() {
                        console.log('Connected to mongo at: ' + mongoURL);
                        var mongorows=[];
                        for(i=0;i<results1.length;i++) {
                            mongo.collection('property').find({"id":results1[i]}).toArray(function (err, rows) {
                                if (rows) {
                                    for (var i in rows) {
                                        mongorows.push(rows[i]);
                                        console.log("HERE  " + rows[i].id+"    "+mongorows.length);

                                    }
                                }
                                else {
                                    console.log("MONGO SEARCH IN ERROR    " + err);
                                }
                                json_responses = {"statusCode": 200, "roomsql": results, "roommongo": mongorows};
                                console.log("before redirect");
                                callback(null, json_responses);
                            });
                        }
                    });
                    /!* json_responses = {"statusCode" : 200,"roomsql":results,"roommongo":results1};
                     console.log("before redirect");
                     callback(null, json_responses);*!/
                    // res.send(json_responses);
                    //}
                }
                else {
                    console.log("Invalid Login");
                    json_responses = {"statusCode" : 401};
                    //res.send(json_responses);
                    callback(null, json_responses);
                }
            }
        },query);
    }



   if(msg.queue==="login")
    {

        var res = {};

        var json_responses;


        var places=msg.place.split(", ");
        var g=msg.guests.substring(0,1,msg.guests);
        console.log("GUESTS :"+g);
        console.log(places[0]+"--"+places[1]+"---"+places[2]);
        var city="%"+places[0]+"%";
        var state="%"+places[1]+"%";
        var country="%"+places[2]+"%";
        var query = "select * from property where (city like '"+city+"' or state like '"+state+"' or address like '"+city+"' or address like '"+state+"' or address like '"+country+"') and guests>="+g+"";
        console.log(query);
        mysql.fetchData(function(err,results){
            if(err){
                console.log("Invalid Login");
                throw err;

            }
            else
            {
                if(results.length > 0){

                    var results1=[];
                    for(var i=0;i<results.length;i++) {
                        console.log(results[i].address+"====="+results[i].id);
                        results1[i]=results[i].id;
                    }

                    mongo.connect(mongoURL, function() {
                        console.log('Connected to mongo at: ' + mongoURL);
                        var mongorows=[];
                        for(i=0;i<results1.length;i++) {
                            mongo.collection('property').find({"id":results1[i]}).toArray(function (err, rows) {
                                if (rows) {
                                    for (var i in rows) {
                                        mongorows.push(rows[i]);
                                        console.log("HERE  " + rows[i].id+"    "+mongorows.length);

                                    }
                                }
                                else {
                                    console.log("MONGO SEARCH IN ERROR    " + err);
                                }
                                json_responses = {"statusCode": 200, "roomsql": results, "roommongo": mongorows};
                                console.log("before redirect");
                                callback(null, json_responses);
                            });
                        }
                    });
                   /!* json_responses = {"statusCode" : 200,"roomsql":results,"roommongo":results1};
                    console.log("before redirect");
                    callback(null, json_responses);*!/
                    // res.send(json_responses);
                    //}
                }
                else {
                    console.log("Invalid Login");
                    json_responses = {"statusCode" : 401};
                    //res.send(json_responses);
                    callback(null, json_responses);
                }
            }
        },query);
    }

   if(msg.queue=="room_details")
   {
       var json_responses;

       var pid=msg.proname;

       var query = "select * from property where id='"+pid+"'";
       console.log(query);
       mysql.fetchData(function(err,results){
           if(err){
               console.log("Invalid Login");
               throw err;

           }
           else
           {
               if(results.length > 0){
                   var proid=results[0].id;
                   var image;
                   console.log("This is the proid for selected pro"+ proid);

                   //mongo begins

                   mongo.connect(mongoURL, function() {
                       console.log("inside connect");
                       console.log('Connected to mongo at: ' + mongoURL);
                       var coll = mongo.collection('property');



                       coll.findOne({"id": results[0].id}, function (err, user) {
                           console.log('inside find');
                           if (user) {


                               console.log("the path is" + user.images[0].img1);
                               image=user.images;
                               //res.send(json_responses);

                               for(var i=0;i<results.length;i++) {
                                   console.log(results[i].address);
                                   console.log(results[i].ptitle);
                               }
                               console.log(image);
                               json_responses = {"statusCode" : 200,"room":results,"image":image};
                               console.log("before redirect");
                               callback(null, json_responses);



                           } else {
                               console.log("returned false"+err);


                           }


                       });
                   });


                   //mongo ends

                   //var dbpass=results[0].password;
                   //if(bcrypt.compareSync(password, dbpass))
                   //{
                   /!* for(var i=0;i<results.length;i++) {
                    console.log(results[i].address);
                    console.log(results[i].ptitle);
                    }
                    console.log(image);
                    json_responses = {"statusCode" : 200,"room":results,"image":image};
                    console.log("before redirect");
                    callback(null, json_responses);*!/
                   // res.send(json_responses);
                   //}
               }
               else {
                   console.log("Invalid Login");
                   json_responses = {"statusCode" : 401};
                   //res.send(json_responses);
                   callback(null, json_responses);
               }
           }
       },query);

   }

    if(msg.queue=="host_profile"){
        var json_responses;


        var query = "select * from host where id="+msg.id+"";
        console.log(query);
        mysql.fetchData(function(err,results){
            if(err){
                console.log("Invalid Login");
                throw err;

            }
            else
            {
                if(results.length > 0){

                    mongo.connect(mongoURL, function() {
                        console.log('Connected to mongo at: ' + mongoURL);
                        var mongorows=[];

                        mongo.collection('hosttouser').find({"hostid":msg.id}).toArray(function (err, rows) {
                            if (rows) {
                                for (var i in rows) {
                                    mongorows.push(rows[i]);
                                    console.log("HERE    "+mongorows.length);

                                }
                            }
                            else {
                                console.log("MONGO SEARCH IN ERROR    " + err);
                            }
                            json_responses = {"statusCode": 200, "details": results, "hostmongo": mongorows};
                            console.log("before redirect");
                            callback(null, json_responses);
                        });

                    });






                    /!* json_responses = {"statusCode": 200,"details":results};
                     console.log("before redirect");
                     callback(null, json_responses);*!/

                }
                else {
                    console.log("Invalid Login");
                    json_responses = {"statusCode" : 401};
                    //res.send(json_responses);
                    callback(null, json_responses);
                }
            }
        },query);



    }
    if(msg.queue=="book")
    {
        var json_responses;
        var fdate=new Date(msg.cin);
        var edate=new Date(msg.cout);

        var query = "INSERT INTO `airbnb11`.`trip`(`user_id`,`host_id`,`property_id`,`days`,`priceperday`,`totalprice`,`from_date`,`to_date`,`bill_path`)VALUES ('123456789', '"+msg.hostid+"', '1', '"+msg.days+"', '"+msg.price+"', '"+msg.amt+"','"+fdate+"','"+edate+"', '"+msg.path+"')";
        console.log(query);
         mysql.fetchData(function(err,results){
             if(err){
                 console.log("Invalid Login");
                throw err;

            }
             else
             {
                 if(results.length > 0) {
                     var json_responses = {"statusCode": 200, "details": results};
                     console.log("before redirect");
                     callback(null, json_responses);

                 }
                 }
              },query);
        //
        //             mongo.connect(mongoURL, function() {
        //                 console.log('Connected to mongo at: ' + mongoURL);
        //                 var mongorows=[];
        //
        //                 mongo.collection('hosttouser').find({"hostid":msg.id}).toArray(function (err, rows) {
        //                     if (rows) {
        //                         for (var i in rows) {
        //                             mongorows.push(rows[i]);
        //                             console.log("HERE    "+mongorows.length);
        //
        //                         }
        //                     }
        //                     else {
        //                         console.log("MONGO SEARCH IN ERROR    " + err);
        //                     }
        //                     json_responses = {"statusCode": 200, "details": results, "hostmongo": mongorows};
        //                     console.log("before redirect");
        //                     callback(null, json_responses);
        //                 });
        //
        //             });
        //
        //
        //
        //
        //
        //
        //             /!* json_responses = {"statusCode": 200,"details":results};
        //              console.log("before redirect");
        //              callback(null, json_responses);*!/
        //
        //         }
        //         else {
        //             console.log("Invalid Login");
        //             json_responses = {"statusCode" : 401};
        //             //res.send(json_responses);
        //             callback(null, json_responses);
        //         }
        //     }








    }
if(msg.action=="Register")
{
    console.log("in register user");
    var first_name = msg.first_name;
    var last_name = msg.last_name;
    var password = msg.password;
    var email = msg.email;
    var passwordToSave = bcrypt.hashSync(password);
    var res = {};
            //var id = results;
            var query = "insert into user(id,fname,lname,email,password) values('"+id+"','"+first_name+"','"+last_name+"','"+email+"','"+passwordToSave+"')";
            mysql.fetchData(function(err,results){
                if(err)
                {
                    console.log('in error');
                    res.code = 401;
                    res.value = null;
                }
                else
                {
                    res.code = 200;
                    res.value = results;
                    console.log("data inserted");
                }
                callback(null, res);
            },query);
}
    else {
       console("Failure: "+msg.queue);
        var json_responses = {
            "statusCode" : 401
        };
        callback(null,json_responses);


    }
}





exports.handle_request = handle_request;*/
/**
 * Created by DELL on 11/26/2016.
 */
/*
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/airbnbv10";
var mysql=require('./mysql');
var bcrypt = require('bcryptjs');
*/


function handle_request(msg, callback){

        console.log(msg.queue);
        if(msg.queue==="fil")
        {
            var res = {};

            var json_responses;

            console.log("IN QUEUE"+msg.queue);
            var places=msg.place.split(", ");
            var g=msg.guests.substring(0,1,msg.guests);
            console.log("GUESTS :"+g);
            console.log(places[0]+"--"+places[1]+"---"+places[2]);
            var city="%"+places[0]+"%";
            var state="%"+places[1]+"%";
            var country="%"+places[2]+"%";
            var type="%"+msg.type+"%";
            var price1=msg.price1;
            var price2=msg.price2;
            var query="";
            if(type=="all")
            {
                if(price1!=undefined && price2!=undefined)
                {
                    query="select * from property where (city like '"+city+"' or state like '"+state+"' or address like '"+city+"' or address like '"+state+"' or address like '"+country+"') and guests>="+g+" and price between "+price1+" AND "+price2+" ";
                }
                else {
                    query = "select * from property where (city like '" + city + "' or state like '" + state + "' or address like '" + city + "' or address like '" + state + "' or address like '" + country + "') and guests>="+g+"";
                }
            }

            else
            {
                if(price1!=undefined && price2!=undefined) {
                    query = "select * from property where (city like '" + city + "' or state like '" + state + "' or address like '" + city + "' or address like '" + state + "' or address like '" + country + "') and guests>=" + g + " and category like '" + type + "' and price between " + price1 + " AND " + price2 + " ";
                }
                else
                {
                    query = "select * from property where (city like '" + city + "' or state like '" + state + "' or address like '" + city + "' or address like '" + state + "' or address like '" + country + "') and guests>="+ g +" and category like '"+ type +"'";
                }
            }
            console.log(query);
            mysql.fetchData(function(err,results){
                if(err){
                    console.log("Invalid Login");
                    throw err;

                }
                else
                {
                    if(results.length > 0){

                        var results1=[];
                        for(var i=0;i<results.length;i++) {
                            console.log(results[i].address+"====="+results[i].id);
                            results1[i]=results[i].id;
                        }

                        mongo.connect(mongoURL, function() {
                            console.log('Connected to mongo at: ' + mongoURL);
                            var mongorows=[];
                            for(i=0;i<results1.length;i++) {
                                mongo.collection('property').find({"id":results1[i]}).toArray(function (err, rows) {
                                    if (rows) {
                                        for (var i in rows) {
                                            mongorows.push(rows[i]);
                                            console.log("HERE  " + rows[i].id+"    "+mongorows.length);

                                        }
                                    }
                                    else {
                                        console.log("MONGO SEARCH IN ERROR    " + err);
                                    }
                                    json_responses = {"statusCode": 200, "roomsql": results, "roommongo": mongorows};
                                    console.log("before redirect");
                                    callback(null, json_responses);
                                });
                            }
                        });
                        /* json_responses = {"statusCode" : 200,"roomsql":results,"roommongo":results1};
                         console.log("before redirect");
                         callback(null, json_responses);*/
                        // res.send(json_responses);
                        //}
                    }
                    else {
                        console.log("Invalid Login");
                        json_responses = {"statusCode" : 401};
                        //res.send(json_responses);
                        callback(null, json_responses);
                    }
                }
            },query);
        }




        if(msg.queue==="login")
        {

            var res = {};

            var json_responses;


            var places=msg.place.split(", ");
            var g=msg.guests.substring(0,1,msg.guests);
            console.log("GUESTS :"+g);
            console.log(places[0]+"--"+places[1]+"---"+places[2]);
            var city="%"+places[0]+"%";
            var state="%"+places[1]+"%";
            var country="%"+places[2]+"%";
            var query = "select * from property where (city like '"+city+"' or state like '"+state+"' or address like '"+city+"' or address like '"+state+"' or address like '"+country+"') and guests>="+g+"";
            console.log(query);
            mysql.fetchData(function(err,results){
                if(err){
                    console.log("Invalid Login");
                    throw err;

                }
                else
                {
                    if(results.length > 0){

                        var results1=[];
                        for(var i=0;i<results.length;i++) {
                            console.log(results[i].address+"====="+results[i].id);
                            results1[i]=results[i].id;
                        }

                        mongo.connect(mongoURL, function() {
                            console.log('Connected to mongo at: ' + mongoURL);
                            var mongorows=[];
                            for(i=0;i<results1.length;i++) {
                                mongo.collection('property').find({"id":results1[i]}).toArray(function (err, rows) {
                                    if (rows) {
                                        for (var i in rows) {
                                            mongorows.push(rows[i]);
                                            console.log("HERE  " + rows[i].id+"    "+mongorows.length);

                                        }
                                    }
                                    else {
                                        console.log("MONGO SEARCH IN ERROR    " + err);
                                    }
                                    json_responses = {"statusCode": 200, "roomsql": results, "roommongo": mongorows};
                                    console.log("before redirect");
                                    callback(null, json_responses);
                                });
                            }
                        });
                        /* json_responses = {"statusCode" : 200,"roomsql":results,"roommongo":results1};
                         console.log("before redirect");
                         callback(null, json_responses);*/
                        // res.send(json_responses);
                        //}
                    }
                    else {
                        console.log("Invalid Login");
                        json_responses = {"statusCode" : 401};
                        //res.send(json_responses);
                        callback(null, json_responses);
                    }
                }
            },query);
        }

        if(msg.queue=="room_details")
        {
            var json_responses;

            var pid=msg.proname;

            var query = "select * from property where id='"+pid+"'";
            console.log(query);
            mysql.fetchData(function(err,results){
                if(err){
                    console.log("Invalid Login");
                    throw err;

                }
                else
                {
                    if(results.length > 0){
                        var proid=results[0].id;
                        var image;
                        console.log("This is the proid for selected pro"+ proid);

                        //mongo begins

                        mongo.connect(mongoURL, function() {
                            console.log("inside connect");
                            console.log('Connected to mongo at: ' + mongoURL);
                            var coll = mongo.collection('property');



                            coll.findOne({"id": results[0].id}, function (err, user) {
                                console.log('inside find');
                                if (user) {


                                    console.log("the path is" + user.images[0].img1);
                                    image=user.images;
                                    //res.send(json_responses);

                                    for(var i=0;i<results.length;i++) {
                                        console.log(results[i].address);
                                        console.log(results[i].ptitle);
                                    }
                                    console.log(image);
                                    json_responses = {"statusCode" : 200,"room":results,"image":image};
                                    console.log("before redirect");
                                    callback(null, json_responses);



                                } else {
                                    console.log("returned false"+err);


                                }


                            });
                        });


                        //mongo ends

                        //var dbpass=results[0].password;
                        //if(bcrypt.compareSync(password, dbpass))
                        //{
                        /* for(var i=0;i<results.length;i++) {
                         console.log(results[i].address);
                         console.log(results[i].ptitle);
                         }
                         console.log(image);
                         json_responses = {"statusCode" : 200,"room":results,"image":image};
                         console.log("before redirect");
                         callback(null, json_responses);*/
                        // res.send(json_responses);
                        //}
                    }
                    else {
                        console.log("Invalid Login");
                        json_responses = {"statusCode" : 401};
                        //res.send(json_responses);
                        callback(null, json_responses);
                    }
                }
            },query);

        }

        if(msg.queue=="host_profile"){
            var json_responses;


            var query = "select * from host where id="+msg.id+"";
            console.log(query);
            mysql.fetchData(function(err,results){
                if(err){
                    console.log("Invalid Login");
                    throw err;

                }
                else
                {
                    if(results.length > 0){

                        mongo.connect(mongoURL, function() {
                            console.log('Connected to mongo at: ' + mongoURL);
                            var mongorows=[];

                            mongo.collection('hosttouser').find({"hostid":msg.id}).toArray(function (err, rows) {
                                if (rows) {
                                    for (var i in rows) {
                                        mongorows.push(rows[i]);
                                        console.log("HERE    "+mongorows.length);

                                    }
                                }
                                else {
                                    console.log("MONGO SEARCH IN ERROR    " + err);
                                }
                                json_responses = {"statusCode": 200, "details": results, "hostmongo": mongorows};
                                console.log("before redirect");
                                callback(null, json_responses);
                            });

                        });






                        /* json_responses = {"statusCode": 200,"details":results};
                         console.log("before redirect");
                         callback(null, json_responses);*/

                    }
                    else {
                        console.log("Invalid Login");
                        json_responses = {"statusCode" : 401};
                        //res.send(json_responses);
                        callback(null, json_responses);
                    }
                }
            },query);



        }
        if(msg.queue=="book")
        {
            var json_responses;
            var fdate=new Date(msg.cin);
            var edate=new Date(msg.cout);

            var query = "INSERT INTO `airbnb11`.`trip`(`user_id`,`host_id`,`property_id`,`days`,`priceperday`,`totalprice`,`from_date`,`to_date`,`bill_path`)VALUES ('123456789', '"+msg.hostid+"', '1', '"+msg.days+"', '"+msg.price+"', '"+msg.amt+"','"+fdate+"','"+edate+"', '"+msg.path+"')";
            console.log(query);
            mysql.fetchData(function(err,results){
                if(err){
                    console.log("Invalid Login");
                    throw err;

                }
                else
                {

                        var json_responses = {"statusCode": 200, "details": results};
                        console.log("before redirect");
                        callback(null, json_responses);


                }
            },query);
            //
            //             mongo.connect(mongoURL, function() {
            //                 console.log('Connected to mongo at: ' + mongoURL);
            //                 var mongorows=[];
            //
            //                 mongo.collection('hosttouser').find({"hostid":msg.id}).toArray(function (err, rows) {
            //                     if (rows) {
            //                         for (var i in rows) {
            //                             mongorows.push(rows[i]);
            //                             console.log("HERE    "+mongorows.length);
            //
            //                         }
            //                     }
            //                     else {
            //                         console.log("MONGO SEARCH IN ERROR    " + err);
            //                     }
            //                     json_responses = {"statusCode": 200, "details": results, "hostmongo": mongorows};
            //                     console.log("before redirect");
            //                     callback(null, json_responses);
            //                 });
            //
            //             });
            //
            //
            //
            //
            //
            //
            //             /* json_responses = {"statusCode": 200,"details":results};
            //              console.log("before redirect");
            //              callback(null, json_responses);*/
            //
            //         }
            //         else {
            //             console.log("Invalid Login");
            //             json_responses = {"statusCode" : 401};
            //             //res.send(json_responses);
            //             callback(null, json_responses);
            //         }
            //     }








        }
    if(msg.action=="Register")
    {
        console.log("in register user");
        var first_name = msg.first_name;
        var last_name = msg.last_name;
        var password = msg.password;
        var email = msg.email;

        var passwordToSave = bcrypt.hashSync(password);
        //var query1="select * from user where email='"+email+"'";




        var res = {};
        var query = "insert into user(fname,lname,email,password) values('"+first_name+"','"+last_name+"','"+email+"','"+passwordToSave+"')";
        mysql.fetchData(function(err,results) {
            if (err) {
                console.log('in error');
                res.code = 401;
                res.value = "ex";
                console.log('inside registration error');
                callback(null, res);
            }
            else {
                res.code = 200;
                res.value = results;
                console.log("data inserted");
                console.log(results);
                var sqlid = results.insertId;

                mongo.connect(mongoURL, function () {
                    console.log('Connected to mongo at: ' + mongoURL);
                    var coll = mongo.collection('hosttouser');
                    var coll1 = mongo.collection('usertohost');


                    coll.insertOne({

                        "id": sqlid,
                        "reviews": []


                    });
                    coll1.insertOne({

                        "id": sqlid,
                        "reviews": []


                    });


                });
                callback(null, res);
            }
        },query);
    }
    else {
       console("Failure: "+msg.queue);
        var json_responses = {
            "statusCode" : 401
        };
        callback(null,json_responses);


    }
}





exports.handle_request = handle_request;
