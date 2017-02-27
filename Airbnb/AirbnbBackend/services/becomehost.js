var propertyDao = require('./propertyDao');
var becomehostDao = require('./BecomeHostDao');
exports.registerHost=function(msg, callback){
	

	console.log("In handle request:"+ msg.hostid+msg.placetype+""+msg.guests+msg.address+msg.state+msg.city+msg.zipcode);
    var res={};
    var hostid="123456789";

    becomehostDao.registerHost(hostid,msg.placetype,msg.guests,msg.address,msg.city,msg.state,msg.zipcode,function(err,rows){
        if(err){

            throw err;

        }
        else {

            becomehostDao.getPropertyId(function (err,rows) {
                if(err)
                {
                    res.code="401";
                }
                else{
                    for(i in rows)
                    {
                        console.log("rows "+rows[i].id);
                        id=rows[i].id;
                        becomehostDao.insertProperty(id,function(){
                        console.log("added property for host"+id);
                        res.statusCode = 200;

                            res.code="200";
                            res.id=id;
                            //res.media=media;

                            callback(null,res);

                        });

                    }
                }
            });

        }
    });
}

exports.getPropertyDetails=function (msg, callback){

    var res = {};

    var state=msg.state;
    becomehostDao.getPropertyDetails(state,function(err,rows){
        if(err){

            throw err;

        }
        else
        {


            console.log("results rows");
            res.statusCode=200;
            res.properties=rows;
            res.code="200";

                        callback(null,res);


        }
    });
}

exports.updatePrice=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.price);
    var res={};
    var price=msg.price;
    var id=msg.id;
    becomehostDao.setPropertyPrice(msg.price,msg.id,function(err,rows){
        if(err){

            throw err;

        }
        else
        {
            console.log("results rows");
            res.statusCode=200;


            res.code="200";
           // res.billing=billing;
            //res.media=media;

            callback(null,res);


        }
    });
}
exports.updateTitle=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.title);
    var res={};
    var title=msg.title;
    var id=msg.id;
    console.log("In handle request:"+ msg.id);
    becomehostDao.setPropertyTitle(title,id,function(err,rows){
        if(err){

            throw err;

        }
        else
        {

            console.log("results rows");
            res.statusCode=200;


            res.code="200";
            // res.billing=billing;
            //res.media=media;

            callback(null,res);


        }
    });
}
exports.updatePropertyCalendar=function (msg, callback){

    var res = {};
  //  console.log("In handle request:"+ msg.hostid+msg.review+ msg.rating+msg.userid);
    var res={};
   // var user_id=msg.username;
    becomehostDao.updatePropertyCalendar(msg.fromdate,msg.todate,msg.id,function(err,rating){
        if(err){

            throw err;

        }
        else
        {
            becomehostDao.insertHost(msg.hostid,function()
            {
                console.log("results rows");
                res.statusCode=200;
                res.code="200";
                // res.billing=billing;
                //res.media=media;

                callback(null,res);

            });

        }
    });
}





