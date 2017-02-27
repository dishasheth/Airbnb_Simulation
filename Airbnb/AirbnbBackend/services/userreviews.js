var propertyDao = require('./propertyDao');
var userDao = require('./hostDao')
exports.getcurrentreviewsForUser=function(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
    var res={};
    var userid=msg.userid;
    userDao.getUserByUserId(userid,function(err,rows){
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
                userDao.getCurrentReviewsForUser(
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

exports.review_user=function (msg, callback){

    var res = {};
    console.log("In handle request:"+ msg.userid+msg.review+ msg.rating+msg.hostid);
    var res={};
   // var user_id=msg.username;
    userDao.getCurrentReviewsForUser(msg.userid,function(err,rating){
        if(err){

            throw err;

        }
        else
        {
            console.log(rating);
            var prop=rating;
            userDao.updateReviewForUser(prop,msg.review,msg.rating,msg.hostid,
                msg.fname,msg.lname,msg.profile_image,function(err,rating)
                {
                    userDao.insertReviewForUser(prop,function(err,property)
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


