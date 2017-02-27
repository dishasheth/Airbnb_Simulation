var propertyDao = require('./propertyDao')
function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
    var res={};
    var user_id=msg.username;
    propertyDao.getProprtyByHostId(msg.username,function(err,rows){
        if(err){

            throw err;

        }
        else
        {
			console.log("results rows");
            res.statusCode=200;
            var properties=[];
			var props={};
            for(i in rows)
			{
				console.log("rows "+rows[i].id);
				properties.push(rows[i]);

			}
var proparr=[];
            for(i in properties)
			{
                propertyDao.getMediaForProperties(
                    properties[i].id,function(err,media)
                    {
                        console.log(media);
                        console.log(properties);
						for(j in media)
						{
                            console.log(props);
							props.details=properties[j];
							props.media=media[j];
							proparr.push(props);
						}
                        res.code="200";
                        res.properties=proparr;
						//res.media=media;

                        callback(null,res);

                    }
                );
			}
        }
    });
}

exports.getBilling=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.username);
    var res={};
    var user_id=msg.username;
    propertyDao.getBillingByHostId(user_id,function(err,rows){
        if(err){

            throw err;

        }
        else
        {
            console.log("results rows");
            res.statusCode=200;
            var billing=[];

            for(i in rows)
            {
                console.log("rows "+rows[i].id);

                    billing.push(rows[i]);



            }

                        res.code="200";
                        res.billing=billing;
                        //res.media=media;

                        callback(null,res);


        }
    });
}

exports.approveBill=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.approve+ msg.billid);
    var res={};
    var user_id=msg.username;
    propertyDao.approvebill(msg.approve,msg.billid,function(err,rows){
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
exports.addImage=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.propertyid+ msg.image);
    var res={};
   // var user_id=msg.username;
    propertyDao.getMediaForProperties(msg.propertyid,function(err,property){
        if(err){

            throw err;

        }
        else
        {
            console.log(property);
            var prop=property;
            propertyDao.updateImage(prop,msg.image,function(err,property)
                {
                    propertyDao.insertImage(prop,msg.image,function(err,property)
                    {
                        console.log("results rows");
                        res.statusCode=200;


                        res.code="200";
                        // res.billing=billing;
                        //res.media=media;

                        callback(null,res);
                    });


                }
            )


        }
    });
}


exports.addVideo=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.propertyid+ msg.image);
    var res={};
    // var user_id=msg.username;
    propertyDao.getMediaForProperties(msg.propertyid,function(err,property){
        if(err){

            throw err;

        }
        else
        {
            console.log(property);
            var prop=property;
            propertyDao.updateVideo(prop,msg.image,function(err,property)
                {
                    propertyDao.insertImage(prop,msg.image,function(err,property)
                    {
                        console.log("results rows");
                        res.statusCode=200;


                        res.code="200";
                        // res.billing=billing;
                        //res.media=media;

                        callback(null,res);
                    });


                }
            )


        }
    });
}


exports.handle_request = handle_request;