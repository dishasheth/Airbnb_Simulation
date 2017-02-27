var propertyDao = require('./propertyDao');
var hostDao = require('./hostDao')
exports.getcurrentreviews=function(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
    var res={};
    var hostid=msg.hostid;
    hostDao.getHostByHostId(hostid,function(err,rows){
        if(err){

            throw err;

        }
        else
        {
			console.log("results rows");
            res.statusCode=200;
            var hosts=[];
			var props={};
            for(i in rows)
			{
				console.log("rows "+rows[i].id);
				hosts.push(rows[i]);

			}
var hostarr=[];
            for(i in hosts)
			{
                hostDao.getCurrentReviews(
                    hosts[i].id,function(err,ratings)
                    {
                        console.log(ratings);
                        console.log(hosts);
						for(j in ratings)
						{
                            console.log(props);
							props.details=hosts[j];
							props.ratings=ratings[j];
							hostarr.push(props);
						}
                        res.code="200";
                        res.reviews=hostarr;
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
exports.review_host=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.hostid+msg.review+ msg.rating+msg.userid);
    var res={};
   // var user_id=msg.username;
    hostDao.getCurrentReviews(msg.hostid,function(err,rating){
        if(err){

            throw err;

        }
        else
        {
            console.log(rating);
            var prop=rating;
            hostDao.updateReview(prop,msg.review,msg.rating,msg.userid,
                msg.fname,msg.lname,msg.profile_image,function(err,rating)
                {
                    hostDao.insertReview(prop,function(err,property)
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

