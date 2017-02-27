/**
 * Created by harshmehta6711 on 02-12-2016.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mysql = require("../AirbnbBackend/services/mysql");
var bcrypt = require('bcryptjs');

module.exports = function(passport)
{
    passport.use('login', new LocalStrategy(function(username, password, done) {

        var query = "select id,email,password,fname,lname from user where email='"+username+"'";
        mysql.fetchData(function(err,results){
            if(err)
            {
                console.log('in error');
                return done(err);
            }
            else
            {
                if(results.length > 0)
                {
                   if(bcrypt.compareSync(password,results[0].password))
                   // if(password == results[0].password)
                    {
                        console.log('in if');
                        console.log(results);
                        return done(null,results[0]);
                    }
                    else
                    {
                        console.log('in else password match');
                        return done(null,false);
                    }
                }
                else
                {
                    console.log('in else');
                    return done(null,false);
                }
            }
        },query);
    }));
}