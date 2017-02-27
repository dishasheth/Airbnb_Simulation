var mysql=require('mysql');

function getConnection(){
    var connection = mysql.createConnection({
        host : 'localhost', //host where mysql server is running
        user : 'root', //user for the mysql application
        password : '1234', //password for the mysql application
        database : 'airbnb11', //database name
        port : 3306 //port, it is 3306 by default for mysql
    });
    return connection;
}
function fetchData(callback,sqlQuery){
    console.log("\nSQL Query::"+sqlQuery);
    var connection=getConnection();
    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
            callback(err, null);
        }
        else
        { // return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}
exports.fetchData=fetchData;

var pool      =    mysql.createPool({
    connectionLimit : 500,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'airbnb11',
    debug    :  false
});

exports.getData= function(query,callback)
{
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            throw err;
        }
        console.log("executing query..."+query);
        connection.query(query,callback);

        connection.release();
    });
}

function getId(callback,sqlQuery){
    console.log("\nSQL Query::"+sqlQuery);
    var connection=getConnection();
    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
            callback(err, null);
        }
        else
        { // return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    console.log("\nConnection closed..");
    connection.end();
}

exports.getId=getId;