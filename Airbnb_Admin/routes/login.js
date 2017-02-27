var ejs = require("ejs");
var mysql = require("./mysql");
var bcrypt = require('bcryptjs');

function login(req,res)
{
	var username = req.param('username');
	var password = req.param('password');
	var response;
	console.log(password);

	var query = "select id,fname,lname,email,address,city,state,zipcode,phone,password from admin where email='"+username+"'";
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
				//if(bcrypt.compareSync(password,results[0].password))
				if(password == results[0].password)
				{
					console.log('in if');
					console.log(results[0]);
					req.session.login = results[0];
					response = {"statusCode":200,"data":results[0]};
					res.send(JSON.stringify(response));
				}
				else
				{
					console.log('in else');
					response = {"statusCode":401,"data":null};
					res.send(JSON.stringify(response));
				}
			}
			else
			{
				console.log('in else');
				response = {"statusCode":401,"data":null};
				res.send(JSON.stringify(response));
			}
		}
	},query);
}

function getHomePage(req,res)
{
	ejs.renderFile('./views/home.ejs',function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}

function registerAdmin(req,res)
{
	console.log("in register user");
	var admin = req.param('admin');
	var passwordToSave = bcrypt.hashSync(admin.password);
	var response;
	var query = "insert into admin (fname,lname,address,city,state,zipcode,phone,email,password) values('"+admin.fname+"','"+admin.lname+"','"+admin.address+"','"+admin.city+"','"+admin.state+"',"+admin.zip+","+admin.phone+",'"+admin.email+"','"+passwordToSave+"')";
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
			response = {"statusCode":200,"data":results};
			res.send(JSON.stringify(response));
		}
	},query);
}

function logout(req,res)
{
	var response;
	req.session.destroy();
	response = {"statusCode":200,"data":null};
	res.send((response));
}


exports.registerAdmin = registerAdmin;
exports.login = login;
exports.getHomePage = getHomePage;
exports.logout = logout;