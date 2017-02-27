
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
    , host = require('./routes/host')
    , userreviews = require('./routes/userreviews')
    , becomehost = require('./routes/becomehost')
    , property = require('./routes/property');

var redisClient = require('redis');
var redis = redisClient.createClient();
//var redis = redisClient(6379, 'localhost');


var app = express();
var passport = require('passport');
require('./routes/passport')(passport);

//Airbnb required modules
var mysql=require('mysql');
var bcrypt = require('bcryptjs');

var expressSession = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSession);

var mongoURL="mongodb://localhost:27017/airbnb";
var login=require('./routes/login');
var room=require('./routes/room');
var profile=require('./routes/profile');
//Session configuration
app.use(expressSession({  secret: 'Airbnb',
  resave: false,
  //don't save session if unmodified   // don't create session until something stored
  saveUninitialized: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({   url: mongoURL  })
}));
//uncomment below middleware once passport startegy is defined
app.use(passport.initialize());
//app.use(passport.session());



//
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/loginUser', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if(err) {
            response = {"statusCode":403,"data":null};
            res.send(JSON.stringify(response));
        }

        if(!user) {
            response = {"statusCode":401,"data":null};
            res.send(JSON.stringify(response));
        }

        req.logIn(user, {session:false}, function(err) {
            if(err) {
                response = {"statusCode":401,"data":null};
                res.send(JSON.stringify(response));
            }

            req.session.login = user;
            console.log("inside passport"+req.session.login);
            console.log('inside passport login: '+user.fname);
            console.log(user);
            response = {"statusCode":200,"data":user};
            res.send(JSON.stringify(response));
        })
    })(req, res, next);
});
app.post('/getLoginSession',login.getLoginSession);

app.get('/loginUser', isAuthenticated, function(req, res) {
    res.render('successLogin', {user:{username: req.session.user}});
});

function isAuthenticated(req, res, next) {
    console.log('inside isauth');
    if(req.session.user) {
        console.log('in inside isauth');
        console.log(req.session.user);
        return next();
    }

    res.redirect('/');
};

redis.on('connect', function() {
    console.log('connected');
});

// development only
app.post('/registerUser',login.register);


app.get('/',routes.index);
app.get('/users', user.list);
//calls to routes for airbnb

//app.post('/register',login.register);

//api to get all the room details
app.post('/getRoom',room.getDetails);
//app.post('/getRoomd',room.getRoomDetails);
//for redis start

app.post('/getRoomd', function (req, res) {
    if (!req.param('data'))
    {res.status(400).send("Please send a proper title");

        console.log("in if of app redis details"+req);
    }
    else {
        room.getRoomDetailsCached(redis, req.param('data'), function (room) {
            if (!room) res.status(500).send("Server error");
            else res.status(200).send(room);
        });
    }
});

//for redis end




app.post('/getRoomFil',room.getfilrooms);

app.post('/gethostprofile',profile.getHostProfile);
app.post('/checkout',room.checkout);

app.post('/bookproperty',room.bookRoom);

app.get('/logout', function(req,res) {
    req.session.destroy();
    res.redirect('/');
});

var fs = require('fs');
app.post('/getPropertyListing',property.getPropertyListing);
app.post('/getBilling',property.getBilling);
app.post('/uploadimage', uploadimage);
app.post('/uploadvideo', uploadvideo);
//app.get('/rate_host', host.rate_host);
app.post('/review_host', host.review_host);
app.get('/reviewhost', host.reviewhost);
app.post('/getcurrentrating', host.getcurrentrating);
app.post('/becomehost', becomehost.addhost);
app.post('/getPropertyDetails', becomehost.getPropertyDetails);
app.post('/updateTitle', becomehost.updateTitle);
app.post('/updateCalendar', becomehost.updateCalendar);
app.post('/updatePrice', becomehost.updatePrice);
app.post('/approvebill', property.approveBilling);
app.post('/getcurrentratingforuser', userreviews.getcurrentratingforuser);
app.post('/review_user', userreviews.review_user);
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function uploadimage(req,res) {
    sleep(5000);
    var inStr =  fs.createReadStream("/Users/mbars/Downloads/"+req.param("image"));
    var outStr = fs.createWriteStream("/Users/mbars/Documents/Airbnb/Airbnb-master/Airbnb-master/Airbnb-master/public/"+req.param("image"));

    inStr.pipe(outStr);
    property.addImage(req,res);

}
function uploadvideo(req,res) {
    sleep(5000);
    var inStr =  fs.createReadStream("/Users/mbars/Downloads/"+req.param("image"));
    var outStr = fs.createWriteStream("/airbnb/RabbitMQApplication/RabbitMQApplication/RabbitMQ-Client/public/images/"+req.param("image"));

    inStr.pipe(outStr);
    property.addVideo(req,res);

}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
