var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , session = require('client-sessions')
  , login = require('./routes/login')
  , http = require('http')
  , admin = require('./routes/admin')
  , path = require('path');

var app = express();

app.use(session({   
	  
	cookieName: 'session',    
	secret: 'airbnb_admin',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently

// all environments
app.set('port', process.env.PORT || 3001);
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/home',login.getHomePage);

app.post('/registerAdmin',login.registerAdmin);
app.post('/getLoginSession',admin.getLoginSession);
app.post('/login',login.login);
app.post('/logout',login.logout);
app.post('/updateAdmin',admin.updateAdmin);
app.post('/getHeaderValues',admin.getHeaderValues);
app.post('/getTopHosts',admin.getTopHosts);
app.post('/getTopProperties',admin.getTopProperties);
app.post('/approveHosts',admin.approveHosts);
app.post('/getHostToApprove',admin.getHostToApprove);
app.post('/getClicks',admin.getClicks);
app.post('/search',admin.search);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
