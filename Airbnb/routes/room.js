/**
 * Created by harshmehta6711 on 22-11-2016.
 */

var mysql=require('../AirbnbBackend/services/mysql');
var mq_client = require('../rpc/client');
var moment=require('moment');
var pdfgen=require('pdfkit');
var fs=require('fs');

exports.getfilrooms=function (req,res) {
    var msg_payload={
        place: req.param('place'),
        start: req.param('start'),
        end: req.param('end'),
        guests: req.param('guests'),
        type:req.param('type'),
        price1:req.param('price1'),
        price2:req.param('price2'),
        queue:"fil"
    };

    mq_client.make_request('login_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.statusCode === 200){
                console.log("valid Login");
                // console.log("MONGO LENGTH IN NODE: "+roommongo.length);
                res.send({"statusCode":200,"roomsql":results.roomsql,"roommongo":results.roommongo});
            }
            else {

                console.log("Invalid Login");
                res.send({"statusCode":401,"login":"Fail"});
            }
        }
    });

};






exports.getDetails=function (req,res)
{
    var msg_payload={
        place: req.param('place'),
        start: req.param('start'),
        end: req.param('end'),
        guests: req.param('guests'),
        queue:"login"
    };
    console.log("IN NODE : "+msg_payload);
    mq_client.make_request('login_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.statusCode === 200){
                console.log("valid Login");
               // console.log("MONGO LENGTH IN NODE: "+roommongo.length);
                res.send({"statusCode":200,"roomsql":results.roomsql,"roommongo":results.roommongo});
            }
            else {

                console.log("Invalid Login");
                res.send({"login":"Fail"});
            }
        }
    });

};






var getRoomDetails=function (req,callback)           //changes in exports after redis
{
    //console.log("In room details"+req.title);
    console.log("in room details"+req);
    var msg_payload={
        proname: req, /////changes in exports after redis
        queue:"room_details"
    }

    mq_client.make_request('login_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.statusCode === 200){
                console.log("valid Login");
                //req.session.fname=results.fname;
                res={"room":results.room, "statusCode":200, "image":results.image};
                //res.send({"room":results.room, "statusCode":200, "image":results.image});
                callback(null,res);

                console.log("success");
            }
            else {

                console.log("Invalid Login");
                //res.send({"login":"Fail"});
                res={"login":"Fail"};
                callback(null,res);
            }
        }
    });

};



exports.getRoomDetailsCached=function (redis, title, callback) {
    console.log("In redis cachd"+title);
    redis.get(title, function (err, reply) {
        if (err) callback(null);
        else if (reply) //room exists in cache
            callback(JSON.parse(reply));
        else {
            console.log("In redis cachd"+title);
            getRoomDetails(title,function (err,room) {
                if (err || !room)
                {
                    callback(null);
                }

                else {

                           redis.set(title, JSON.stringify(room), function () {
                               console.log("in set redis"+redis.get(title));
                               callback(room);
                           });
                       }

            });

        }
    });

};

exports.checkout=function (req,res)
{

    var sdate=req.param('sdate');
    var edate=req.param('edate');
    var a = moment(sdate,'M/D/YYYY');
    var b = moment(edate,'M/D/YYYY');
    var diffDays = b.diff(a, 'days');
    var msg_payload={
        proid: req.param('proid')

    }

};


exports.bookRoom=function (req,res) {
var doc=new pdfgen();
    //var path=require('path');
    //var filename="harsh"; // this file name is get by form

    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 6; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

    console.log(result);
    //document.write(randomString(32, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'));





var date=new Date(req.param('checkin')).getDate()+""+new Date(req.param('checkin')).getMonth()+""+new Date(req.param('checkin')).getFullYear();
    doc.pipe(fs.createWriteStream("./public/bills/"+req.param('name')+""+date+""+result+".pdf"));

    doc.image('./public/images/logo-1.png', 50,30,{
        fit: [100, 50],
        align: 'center',
        valign: 'center'
    });


    doc.font('Times-Roman')
        .fontSize(18)
        .text('| Customer Receipt',165,50);

    doc.font('Times-Roman')
        .fontSize(9)
        .text('CONFIRMATION CODE # '+result,50,75);

    doc.font('Times-Roman')
        .fontSize(9)
        .text("Booking Date: "+new Date(),50,100);

    doc.font('Times-Roman')
        .fontSize(14)
        .text('TRAVEL DETAILS',{
            align:'center'
        });



    var content="Full Name:"+req.param('name')+"\n\nProperty Name:"+req.param('property')+"\n\nCheckin Date:"+req.param('checkin')
        +"\n\nCheckout Date:"+req.param('checkout')+"\n\nGuests:"+req.param('guest')+"\n";
    doc.font('Times-Roman')
        .fontSize(11)
        .text(content, 50, 130);
    //trial
    doc.font('Times-Roman')
        .fontSize(11)
        .text("Host Approval:"+req.param('approval'), 50, 245);


    // doc.font('Times-Roman')
    //     .fontSize(14)
    //     .text('Some text with an embedded font!', 100, 100);
    doc.save()
        .moveTo(50, 265)
        .lineTo(550, 265)

        .fill("#ff5a5f");




    doc.font('Times-Roman')
        .fill("#000000")
        .fontSize(14)
        .text('PAYMENT DETAILS',200,270);

    var pricepn=req.param('pricepn');
    var ndays=req.param('ndays');
    var scharge=50;
    var amt=req.param('amt');
    var tot=amt+50;

    var content1="Cost Per night: $"+pricepn+"\n\nNumber of nights:"+ndays+"\n\nAirbnb Service Charge: $"+scharge
        +"\n\nTotal Amount: $"+amt+"\n\nAmount Paid: $"+tot+"\n";
    doc.font('Times-Roman')
        .fontSize(11)
        .text(content1, 50, 300);

        // doc.addPage()
        //     .fillColor("blue")
        //     .text('Here is a link!', 100, 100)
        //     .underline(100, 100, 160, 27, color:"#0000FF").link(100, 100, 160, 27, 'http://google.com/');




    //trial ends











    doc.end(); // document end by the end method

    var msg_payload={
        name: req.param('data'),
         pro: req.param('property'),
        cin: req.param('checkin'),
            cout: req.param('checkout'),
        guest:req.param('guest'),
       price:pricepn,
       days:ndays,
        scharge:scharge,
            amt: amt,
            tot:tot,
        path: "./public/bills/"+req.param('name')+""+date+""+result+".pdf",
        queue:"book",
        hostid:req.param("hostid")
    }

    mq_client.make_request('login_queue',msg_payload, function(err,results){

        console.log(results);
        if(err){
            throw err;
        }
        else
        {
            if(results.statusCode === 200){
                console.log("valid Login");
                //req.session.fname=results.fname;
                res.send({"room":results.room, "statusCode":200, "image":results.image});
                console.log("success");
            }
            else {

                console.log("Invalid Login");
                res.send({"login":"Fail"});
            }
        }
    });


};