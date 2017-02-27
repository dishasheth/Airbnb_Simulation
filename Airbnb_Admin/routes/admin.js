var ejs = require("ejs");
var mysql = require("./mysql");
var LineByLineReader = require('line-by-line');
lr = new LineByLineReader('user.log');

function getLoginSession(req,res)
{
	var response;
	if(req.session.login)
	{	
		response = {"statusCode":200,"data":req.session.login};
		res.send(JSON.stringify(response));
	}
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}
}

function updateAdmin(req,res)
{
	console.log("in update admin");
	var admin = req.param('admin');
	var response;
	var query = "update admin set fname='"+admin.fname+"',lname='"+admin.lname+"',address='"+admin.address+"',city='"+admin.city+"',zipcode='"+admin.zipcode+"',phone="+admin.phone+" where email= '"+admin.email+"'";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			console.log("data inserted");
			req.session.login = admin;
			response = {"statusCode":200,"data":results};
			res.send(JSON.stringify(response));
		}
	},query);
}

function getHeaderValues(req,res)
{
    var total_user,total_hosts,total_properties,total_revenue,host_approved,total_trips;
    console.log('header values');
    var query = "select count(u.id) as total_user from user u";
    mysql.fetchData(function(err,results){
        if(err)
        {
            console.log('in error');
            response = {"statusCode":401,"data":null};
            res.send(JSON.stringify(response));
        }
        else
        {
            total_user = results[0].total_user;
            var query1 = "select count(h.id) as host_approved from host h where h.approved = false";
            mysql.fetchData(function(err,results){
                if(err)
                {
                    console.log('in error');
                    response = {"statusCode":401,"data":null};
                    res.send(JSON.stringify(response));
                }
                else
                {
                    host_approved = results[0].host_approved;
                    console.log(results[0].host_approved);
                    var query2 = "select sum(totalprice) as total_revenue from trip";
                    mysql.fetchData(function(err,results){
                        if(err)
                        {
                            console.log('in error');
                            response = {"statusCode":401,"data":null};
                            res.send(JSON.stringify(response));
                        }
                        else
                        {
                            total_revenue = results[0].total_revenue;
                            var query3 = "select count(u.id) as total_host from host u";
                            mysql.fetchData(function(err,results){
                                if(err)
                                {
                                    console.log('in error');
                                    response = {"statusCode":401,"data":null};
                                    res.send(JSON.stringify(response));
                                }
                                else
                                {
                                    total_hosts = results[0].total_host;
                                    var query4 = "select count(u.id) as total_property from property u";
                                    mysql.fetchData(function(err,results){
                                        if(err)
                                        {
                                            console.log('in error');
                                            response = {"statusCode":401,"data":null};
                                            res.send(JSON.stringify(response));
                                        }
                                        else
                                        {
                                            total_properties = results[0].total_property;
                                            var query5 = "select count(id) as total_trip from trip u";
                                            mysql.fetchData(function(err,results){
                                                if(err)
                                                {
                                                    console.log('in error');
                                                    response = {"statusCode":401,"data":null};
                                                    res.send(JSON.stringify(response));
                                                }
                                                else
                                                {
                                                    total_trips = results[0].total_trip;
                                                    response = {"statusCode":200,"data":{"total_user":total_user,"total_hosts":total_hosts,"total_properties":total_properties,"total_trips":total_trips,"host_approved":host_approved,"total_revenue":total_revenue}};
                                                    console.log("host approved "+response.data.host_approved);
                                                    res.send(JSON.stringify(response));

                                                }
                                            },query5);
                                        }
                                    },query4);
                                }
                            },query3);
                        }
                    },query2);
                }
            },query1);
        }
    },query);
}

function getTopHosts(req,res)
{
	var response;
	var query = "select h.fname,sum(totalprice) as totalprice from host h,trip t where t.host_id = h.id group by h.id limit 10";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			var fname1 = [],totalprice1 = [];
			for(var i=0;i<results.length;i++)
			{
				fname1.push(results[i].fname);
				totalprice1.push(results[i].totalprice);
			}	
			
			response = {"statusCode":200,"data":{"fname":fname1,"totalprice":totalprice1}};
			res.send(JSON.stringify(response));
		}
	},query);
}

function getTopProperties(req,res)
{
	console.log("in top properties");
	var response;
	var query = "select p.ptitle,sum(totalprice) as totalprice from property p,trip t where p.id = t.property_id group by p.id limit 10;";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			var fname1 = [],totalprice1 = [];
			for(var i=0;i<results.length;i++)
			{
				fname1.push(results[i].ptitle);
				totalprice1.push(results[i].totalprice);
			}	
			
			response = {"statusCode":200,"data":{"fname":fname1,"totalprice":totalprice1}};
			console.log(fname1);
			res.send(JSON.stringify(response));
		}
	},query);
}

function getHostToApprove(req,res)
{
	var response,data = [];
	var query = "select fname,email from host where approved = false";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			if(results.length > 0)
			{
				for(var i=0;i<results.length;i++)
				{
					data.push({"fname":results[i].fname,"email":results[i].email,"checked":true});
				}
				response = {"statusCode":200,"data":data};
			}
			else
				response = {"statusCode":403,"data":data};
			res.send(JSON.stringify(response));
		}
	},query);
}

function approveHosts(req,res)
{
	var response,emails="";
	var hosts = req.param('hosts');
	console.log(hosts[0].email);
	for(var i=0;i<hosts.length;i++)
	{
		if(hosts[i].checked)
			emails += ",'"+hosts[i].email+"'";
	}	
	emails = emails.substr(1);
	var query = "update host set approved=true where email in ("+emails+")";
	mysql.fetchData(function(err,results){
		if(err)
		{
			console.log('in error');
			response = {"statusCode":401,"data":null};
			res.send(JSON.stringify(response));
		}
		else
		{
			response = {"statusCode":200,"data":results};
			res.send(JSON.stringify(response));
		}
	},query);
}

function getClicks(req,res)
{
	console.log('in get clicks');
	var home_count = 0,search_count = 0,profile_count = 0,sign_up_count = 0,property_count = 0,trip_count = 0,
	bill_count = 0,review_count = 0;
	var home_count1 = 0,search_count1 = 0,profile_count1 = 0,sign_up_count1 = 0,property_count1 = 0,trip_count1 = 0,
	bill_count1 = 0,review_count1 = 0;

	var fs = require('fs'),
	readline = require('readline');

	var rd = readline.createInterface({
		input: fs.createReadStream('user.log'),
		output: process.stdout,
		terminal: false
	});

	rd.on('line', function(line) {
	 	if(line.includes("Home"))
			++home_count;
		else if(line.includes("Profile"))
			++profile_count;
		else if(line.includes("Sign Up"))
			++sign_up_count;
		else if(line.includes("Property"))
			++property_count;
		else if(line.includes("Trip"))
			++trip_count;
		else if(line.includes("Bill"))
			++bill_count;
		else if(line.includes("Review"))
			++review_count;
		else if(line.includes("Search"))
			++search_count;
	});

	rd.on('close', function(line) {
		var max = Math.max(home_count,profile_count,sign_up_count,property_count,trip_count,bill_count,review_count,search_count);
		home_count1	 = (home_count*100)/max;
		profile_count1 = (profile_count*100)/max;
		sign_up_count1 = (sign_up_count*100)/max;
		property_count1 = (property_count*100)/max;
		trip_count1 = (trip_count*100)/max;
		bill_count1= (bill_count*100)/max;
		review_count1 = (review_count*100)/max;
		search_count1 = (search_count*100)/max;
		response = {"statusCode":200,"data":{"home":home_count1,"profile":profile_count1,"sign_up":sign_up_count1,"property":property_count1,"trip":trip_count1,"bill":bill_count1,"review":review_count1,"search":search_count1,"home_count":home_count,"profile_count":profile_count,"sign_up_count":sign_up_count,"property_count":property_count,"trip_count":trip_count,"bill_count":bill_count,"review_count":review_count,"search_count":search_count}};
		res.send(JSON.stringify(response));
	});
}

function search(req,res)
{
	var search_txt = req.param('search_txt');
	var type = req.param('search_host_bill');
	
	if(type == 'Host')
	{
		var query = "select id,fname,email,phone from host where id='"+search_txt+"' or fname = '"+search_txt+"' or lname  = '"+search_txt+"' or address  = '"+search_txt+"' or email  = '"+search_txt+"' or phone  = '"+search_txt+"'";
		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error host');
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				response = {"statusCode":200,"data":results};
				res.send(JSON.stringify(response));
			}
		},query);
	}	
	else if(type == 'Bill')
	{
		var query = "select b.id,fname,email,p.ptitle,b.to_date,b.from_date,b.price from user u,billing b,property p where p.id = u.property_id and u.id = b.user_id and b.id = "+search_txt+" and approved = true";
		mysql.fetchData(function(err,results){
			if(err)
			{
				console.log('in error bill');
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
			else
			{
				response = {"statusCode":200,"data":results};
				res.send(JSON.stringify(response));
			}
		},query);
	}	
	else
	{
		response = {"statusCode":401,"data":null};
		res.send(JSON.stringify(response));
	}	
}

exports.getLoginSession = getLoginSession;
exports.updateAdmin = updateAdmin;
exports.getHeaderValues = getHeaderValues;
exports.getTopHosts = getTopHosts;
exports.getTopProperties = getTopProperties;
exports.approveHosts = approveHosts;
exports.getHostToApprove = getHostToApprove;
exports.getClicks = getClicks;
exports.search = search;