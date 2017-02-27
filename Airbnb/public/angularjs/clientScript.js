/**
 * Created by harshmehta6711 on 17-11-2016.
 */

var clientModule=angular.module("clientModule",['ui.router','ngAutocomplete']).run(function ($rootScope,$http) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
    $rootScope.roomdetails=[];
    $rootScope.email='';
    $rootScope.user_id='';
    $rootScope.property_id='';

    $rootScope.signout = function(){
        $http.get('/logout');
        $rootScope.authenticated = false;
        $rootScope.current_user = '';
        $rootScope.user_id='';
        $rootScope.email='';
        $rootScope.property_id='';
     };

});

clientModule.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
    console.log("inside angular");
    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('home',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/indexpartial.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }




        })
        .state('host_dashboard',{
                url:'/host_dashboard/:user_id',
                //templateUrl:"../templates/index.html"
                views:{
                    'index': {
                        templateUrl: '../templates/hostdashboard.html'

                    },
                    'header':{
                        templateUrl:'../templates/NavigationBar.html'
                    }

                }
            }
        )

        .state('room_listing',{
                url:'/room_listing/:place/:start/:end/:guests',
                //templateUrl:"../templates/index.html"
                views:{
                    'index': {
                        templateUrl: '../templates/product_listing.html'

                    },
                    'header':{
                        templateUrl:'../templates/NavigationBar.html'
                    }

                }
            }
        )
        .state('room_details',{
                url:'/room_details/:id/:startdate/:enddate/:guests',
                //templateUrl:"../templates/index.html"
                views:{
                    'index': {
                        templateUrl: '../templates/RoomDetails.html'

                    },
                    'header':{
                        templateUrl:'../templates/NavigationBar.html'
                    }

                }
            }
        ).state('checkout',{
            url:'/checkout/:id/:startdate/:enddate/:guests/:costpn/:hostid',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/Checkout.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }
        }
    )
        .state('host_profile', {
            url: '/host_profile/:id',
            //templateUrl:"../templates/index.html"
            views: {
                'index': {
                    templateUrl: '../templates/host_profile.html'

                },
                'header': {
                    templateUrl: '../templates/NavigationBar.html'
                }

            }
        })
        .state('becomehost',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/BecomeHost.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }

        })
        .state('becomehost1',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/titlepage.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }

        })
        .state('becomehost2',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/pricepage.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }

        })
        .state('becomehost3',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/imagepage.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }

        })
        .state('becomehost4',{
            url:'/',
            //templateUrl:"../templates/index.html"
            views:{
                'index': {
                    templateUrl: '../templates/calendarpage.html'

                },
                'header':{
                    templateUrl:'../templates/NavigationBar.html'
                }

            }

        })


    .state('user_profile',{
        url:'/user_profile/:id',
        //templateUrl:"../templates/index.html"
        views:{
            'index': {
                templateUrl: '../templates/user_dashboard.html'

            },
            'header':{
                templateUrl:'../templates/NavigationBar.html'
            }

        }

    })
    ;
    $urlRouterProvider.otherwise('/');

});






clientModule.controller('ctrlNavigation',function ($scope,$http,$rootScope,$state) {
    console.log("inside controller");
    $scope.register=function () {
        console.log($scope.user.lname);
        $http({
            method : 'POST',
            url : '/register',
            data : $scope.user
        }).success(function(data) {
            //checking the response data for statusCode
            if (data.statusCode == 401) {
                console.log('inside register 401');
                $rootScope.authenticated = true;
                // $scope.validlogin = true;
            }
            else
            {
                console.log('inside register else');
                $scope.validlogin = false;
                $scope.invalid_login = true;
            }
            //Making a get call to the '/redirectToHomepage' API
            //window.location.assign("/homepage");
        }).error(function(error) {
            $scope.validlogin = true;
            $scope.invalid_login = true;
        });
    }

});



clientModule.controller('TestCtrl',function ($scope,$http,$state,$stateParams) {

    $scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';
    $scope.errmsg=true;
    $scope.errmsg1=true;
    $scope.checksdate=function(sdate)
    {

        var curDate=new Date();
        if(new Date(sdate)<curDate)
        {
            $scope.errmsg=false;
        }
        else
        {
            $scope.errmsg=true;
        }


    };

    $scope.checkedate=function (sdate,edate) {

        if(new Date(edate)<=new Date(sdate))
        {
            $scope.errmsg1=false;
        }
        else
        {
            $scope.errmsg1=true;
        }
    };





    $scope.searchOptions=function () {

        console.log($scope.journey.place+"....."+$scope.journey.sdate+"..."+$scope.journey.edate+"......."+$scope.journey.guest.selectedIndex);
        $state.go('room_listing',{
            //results:data.results.room
            place:$scope.journey.place,
            start:$scope.journey.sdate,
            end:$scope.journey.edate,
            guests:$scope.journey.guest
        });



        /*        $http({
         method : 'POST',
         url : '/getRoom',
         data : {"journey":$scope.journey }
         }).success(function(data) {
         //checking the response data for statusCode
         console.log("DATA IN ANGULAR : "+data );
         if (data.statusCode == 200) {
         console.log("Successfully back to angular");
         console.log($scope.journey.place+"....."+$scope.journey.sdate+"..."+$scope.journey.edate+"......."+$scope.journey.guest);
         console.log(data.results.room);
         $state.go('room_listing',{
         //results:data.results.room
         place:$scope.journey.place,
         start:$scope.journey.sdate,
         end:$scope.journey.edate,
         guests:$scope.journey.guest
         });

         }
         else
         {
         //  $rootScope.authenticated = true;

         }
         //Making a get call to the '/redirectToHomepage' API
         //window.location.assign("/homepage");
         }).error(function(error) {
         $scope.validlogin = true;
         $scope.invalid_login = true;
         });*/
    }


});

clientModule.controller('ProdCtrl',function ($scope,$http,$state,$stateParams,$rootScope) {

    $scope.params = $stateParams;
    $scope.status=500;
    console.log("PRODUCT DETAILS : " + $stateParams.place + "  START: " + $stateParams.start + "   END: " + $stateParams.end + "  GUESTS: " + $stateParams.guests);
    var start = new Date($stateParams.start);
    var end = new Date($stateParams.end);
    var entire = '';
    var count = 0;

    $scope.value1 = function (value) {
        if (count % 2 == 0)
            entire = value;
        else
            entire = 'all';
        count++;
        console.log(entire);
    };
    $scope.filter = function () {
        console.log($scope.price1);
        $http({
            method: 'POST',
            url: '/getRoomFil',
            data: {
                "place": $stateParams.place,
                "start": $scope.start,
                "end": $scope.end,
                "guests": $scope.guest,
                "type": entire,
                "price1": $scope.range1,
                "price2": $scope.range2
            }

        })
            .success(function (data) {
                //checking the response data for statusCode

                if (data.statusCode == 200) {
                    console.log("Successfully back to angular");
                    $scope.status=200;
                    $rootScope.roomdetails = [];
                    for (var i = 0; i < data.roomsql.length; i++) {

                        $rootScope.roomdetails.push({
                            'price': data.roomsql[i].price,
                            'path': data.roommongo[i].images[0].img1,
                            'id': data.roomsql[i].id
                        })
                    }

                }
                else {
                    //  $rootScope.authenticated = true;
                    console.log("401");
                    $scope.status=401;
                    $rootScope.roomdetails = [];
                }

            })
            .error(function (error) {
                console.log("ERROR");
            });


    };


    $scope.start = start;
    $scope.end = end;
    $scope.guest = $stateParams.guests;

if($scope.status==401||$scope.status==500)
    $http({
        method: 'POST',
        url: '/getRoom',
        data: {
            "place": $stateParams.place,
            "start": $stateParams.start,
            "end": $stateParams.end,
            "guests": $stateParams.guests
        }
    })
        .success(function (data) {
            //checking the response data for statusCode

            if (data.statusCode == 200) {
                console.log("Successfully back to angular");
                if($rootScope.roomdetails!=[]) {
                    $rootScope.roomdetails = [];
                    for (i = 0; i < data.roomsql.length; i++) {

                        $rootScope.roomdetails.push({
                            'price': data.roomsql[i].price,
                            'path': data.roommongo[i].images[0].img1,
                            'id': data.roomsql[i].id
                        })
                    }
                }
            }
            else {
                //  $rootScope.authenticated = true;
                console.log("401");
            }

        })
        .error(function (error) {
            console.log("ERROR");
        });

});

clientModule.controller('ctrlRoomDetails',function ($scope,$http,$rootScope,$stateParams,$state) {
    console.log("inside controller");
    // $scope.register=function () {
    // console.log($scope.user.lname);
    $scope.roomdet=function () {
        if($rootScope.current_user==''){
            $state.go('home',{});
        }
        else
            $state.go('checkout',{"id": $scope.roomid,"startdate":$scope.startdate,"enddate":$scope.enddate,"guests":$scope.guests,"costpn":$scope.costpn,"hostid":$stateParams.hostid});
    }
    $http({
        method : 'POST',
        url : '/getRoomd',
        data : {
            "data": $stateParams.id
        }
    }).success(function(data) {
        //checking the response data for statusCode
        if (data.statusCode == 401) {
            $rootScope.authenticated = true;
            // $scope.validlogin = true;
        }
        else
        {
            var start=new Date($stateParams.startdate);
            var end=new Date($stateParams.enddate);
            $scope.startdate=start;
            $scope.enddate=end;
            $scope.guests=$stateParams.guests;
            $scope.validlogin = false;
            $scope.invalid_login = true;
            $scope.proname=data.room[0].ptitle;
            $scope.description=data.room[0].description;
            $scope.costpn=data.room[0].price;
            $scope.loc=data.room[0].city;
            $scope.locstate=data.room[0].state;
            $scope.mainImg=data.image[0].img1;
            $scope.hostid=data.room[0].host_id;
            console.log(data.room[0].ptitle);
            console.log(data.room[0].address);
            $scope.roomid=$stateParams.id;
        }
        //Making a get call to the '/redirectToHomepage' API
        //window.location.assign("/homepage");
    }).error(function(error) {
        $scope.validlogin = true;
        $scope.invalid_login = true;
    });


});

clientModule.controller('checkoutCtrl',function ($scope,$http,$rootScope,$stateParams,$state,$window) {

    console.log("inside checkout ctrl");
    var startdate=new Date($stateParams.startdate);
    var enddate=new Date($stateParams.enddate);
    var num_days=(enddate.getTime()-startdate.getTime())/(1000 * 60 * 60 * 24);
    console.log(num_days);
    $scope.datein=startdate;
    $scope.dateout=enddate;
    $scope.num_guests=$stateParams.guests;
    $scope.costpn=$stateParams.costpn;
    $scope.num_days=num_days;
    $scope.totalcost=num_days*$stateParams.costpn;
    console.log($stateParams.hostid);
    $scope.book=function () {

        $http({
            method : 'POST',
            url : '/bookproperty',
            data : {
                "name":"Harsh Mehta",
                "property":"WaterFord Place",
                "checkin":$stateParams.startdate,
                "checkout":$stateParams.enddate,
                "guest":$stateParams.guests,
                "amt": $scope.totalcost,
                "approval":"Pending",
                "ndays":num_days,
                "pricepn":$stateParams.costpn,
                "hostid":$stateParams.hostid
            }
        }).success(function(data) {
            //checking the response data for statusCode

            if (data.statusCode == 200) {
               /* console.log("Successfully back to angular for host profile "+data.details);
                $scope.fname=data.details[0].fname;
                $scope.city=data.details[0].city;
                $scope.state=data.details[0].state;
                $scope.description=data.details[0].description;
                $scope.path=data.details[0].profile_image;
                $scope.avg_rating=data.details[0].avg_rating/data.details[0].num_rating;
                $scope.num_rating=data.details[0].num_rating;
                $scope.reviewslist=data.hostmongo;
                console.log("LIST: "+$scope.reviewslist);*/
                $window.alert("PROPERTY BOOKED SUCCESSFULLY! CHECK DASHBOARD FOR MORE DETAILS");
               $state.go('home',{});

            }
            else
            {
                //  $rootScope.authenticated = true;
                console.log("401");
            }

        }).error(function(error) {
            console.log("ERROR");
        });

    };
});

clientModule.controller('HostProfileCtrl',function ($scope,$http,$rootScope,$state,$stateParams) {
    console.log("inside controller");

    $http({
        method : 'POST',
        url : '/gethostprofile',
        data : {"id":$stateParams.id}
    }).success(function(data) {
        //checking the response data for statusCode

        if (data.statusCode == 200) {
            console.log("Successfully back to angular for host profile "+data.details);
            $scope.fname=data.details[0].fname;
            $scope.city=data.details[0].city;
            $scope.state=data.details[0].state;
            $scope.description=data.details[0].description;
            $scope.path=data.details[0].profile_image;
            $scope.avg_rating=data.details[0].avg_rating/data.details[0].num_rating;
            $scope.num_rating=data.details[0].num_rating;
            $scope.reviewslist=data.hostmongo;
            console.log("LIST: "+$scope.reviewslist);

        }
        else
        {
            //  $rootScope.authenticated = true;
            console.log("401");
        }

    }).error(function(error) {
        console.log("ERROR");
    });


});


clientModule.controller('loginController', function ($scope, $http, $window,$rootScope) {
    $scope.invalid_login = true;
    $scope.error=true;
    $scope.user_id=$rootScope.user_id;
    //Changes in working copy Start
if($rootScope.current_user=="") {
    $http({
        method: "POST",
        url: "/getLoginSession"
    }).success(function (data) {
        if (data.statusCode == 401) {
            //window.location = '/';
        }
        else if (data.statusCode == 200) {
            $rootScope.authenticated = true;
            $rootScope.current_user = "Hi," + data.data.fname;
            $rootScope.user_id = data.data.id;

            $rootScope.email =  data.data.email;

            //console.log($rootScope.current_user);
        }
        else {
            $window.alert('Something went wrong. Please try again');
        }
    }).error(function (error) {
        $window.alert('Something went wrong. Please try again');
    });

}
    //Changes in working copy END






    $scope.register = function ()
    {
        $http({
            method: "POST",
            url: "/registerUser",
            data: {
                "email": $scope.user.email,
                "password": $scope.user.password,
                "fname":$scope.user.fname,
                "lname":$scope.user.lname
            }
        }).success(function (data) {
            if(data.statusCode == 401)
            {
                $scope.error=false;
            }
            else if(data.statusCode == 200)
            {
                $scope.invalid_login = true;
                $window.alert('Registration Successful '+data.data);
                window.location = "#home";
                $rootScope.authenticated = true;
                $rootScope.current_user = "Hi, "+data.fname;
                $rootScope.email=data.email;
                $('#signup-modal').modal('hide');
                $('#emailsignup-modal').modal('hide');
            }
            else
            {
                $scope.error=false;
            }
        }).error(function (error) {
            $window.alert('Something went wrong. Please try again');
        });
    };



    $scope.showlogin = function() {
        $('#signup-modal').modal('hide');
        $('#emailsignup-modal').modal('hide');
        $('#login-modal').modal('show');
    };

    $scope.login = function () {
        $http({
            method: "POST",
            url: "/loginUser",
            data: {
                "username": $scope.login.email,
                "password": $scope.login.password
            }
        }).success(function (data) {
            if(data.statusCode == 401)
            {
                $scope.invalid_login = false;
            }
            else if(data.statusCode == 200)
            {
                $scope.invalid_login = true;
                $rootScope.authenticated = true;
                $rootScope.current_user="Hi, "+data.data.fname;
                $rootScope.email=data.data.email;
                $rootScope.user_id=data.data.id;
                window.location = "#home";
                $('#login-modal').modal('hide');
            }
            else
            {
                $scope.invalid_login = false;
            }
        }).error(function (error) {
            $scope.invalid_login = false;
        });
    };

    $scope.forgotPassword = function (emailId) {
        $window.alert('If you are registered customer, you should receive email shortly.');
    };

    $scope.logData = function(file,place)
    {
        $http({
            method: "POST",
            url: "/logData",
            data:{
                "file":file,
                "place":place
            }
        }).success(function (data) {

        }).error(function (error) {

        });
    };
});

clientModule.controller('dashboard', function($scope, $http,$state,$rootScope,$stateParams) {


    $scope.hidelisting=true;
    $scope.hideapprovebills=true;
    $scope.hidedashboard=false;
    $scope.user_id=$stateParams.user_id;
    if($rootScope.current_user=="") {
        $http({
            method: "POST",
            url: "/getLoginSession"
        }).success(function (data) {
            if (data.statusCode == 401) {
                //window.location = '/';
            }
            else if (data.statusCode == 200) {
                $rootScope.authenticated = true;
                $rootScope.current_user = "Hi," + data.data.fname;
                $rootScope.user_id = data.data.id;
                $scope.user_id=data.data.id;
                $rootScope.email = data.data.email;

                //console.log($rootScope.current_user);
            }
            else {
                $window.alert('Something went wrong. Please try again');
            }
        }).error(function (error) {
            $window.alert('Something went wrong. Please try again');
        });
    }
    $http({
        method: 'POST',
        url: '/getPropertyListing',
        data: {
            "host_id": $rootScope.user_id
        }

    }).success(function (response) {


        if (response.statusCode == "200") {
            $scope.properties = response.listing;

        }
        else
            $scope.properties={};
    }).error(function (error) {
        alert("error");
    });
    $http({
        method: 'POST',
        url: '/getBilling',
        data: {
            "host_id":$rootScope.user_id
        }

    }).success(function (response) {


        if (response.statusCode == "200") {
            $scope.billing = response.billing;

        }
        else
            $scope.billing={};
    }).error(function (error) {
        alert("error");
    });
    $scope.hideuploads=true;
    $scope.showDashboard=function()
    {
        $scope.hidedashboard=false;
        $scope.hidelisting=true;
        $scope.hideapprovebills=true;
        $scope.hideuploads=true;
        // $scope.hidedasboard=true;
    }
    $scope.showListing=function()
    {
        $scope.hideuploads=true;
        $scope.hidelisting=false;
        //$scope.hidelisting=true;
        $scope.hideapprovebills=true;
        $scope.hidedashboard=true;
    }

    $scope.showBills=function()
    {
        $scope.hideuploads=true;
        $scope.hidelisting=true;
        //$scope.hidelisting=true;
        $scope.hideapprovebills=false;
        $scope.hidedashboard=true;
    }
    $scope.showMedia=function()
    {
        $scope.hideuploads=false;
        $scope.hidelisting=true;
        //$scope.hidelisting=true;
        $scope.hideapprovebills=true;
        $scope.hidedashboard=true;
    }
    $scope.approvebills = function (id) {

        $http({
            method: 'POST',
            url: '/approvebill',
            data: {
                "approve": "true",
                "billid":this.b.id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
                $scope.message="This bill has been approved"
            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });
    };

    $scope.uploadimage=function()
    {
        var fileReader = new FileReader();

        var file=document.getElementById("upload").files[0];
        var output = document.getElementById('output');

        output.src = URL.createObjectURL(file);
        // var file = new File([file], "abc.jpg");
        saveAs(file, file.name);
        // file.copy("images/")
        $http({
            method: 'POST',
            url: '/uploadimage',
            data: {
                "image": file.name,
                "propertyid":this.x.details.id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
                $scope.message="This bill has been approved"
            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });
    }

    $scope.uploadvideo=function()
    {


        var file=document.getElementById("uploadvideo").files[0];
        var output = document.getElementById('videoupload');


        output.src = URL.createObjectURL(file);
        // var file = new File([file], "abc.jpg");
        saveAs(file, file.name);
        // file.copy("images/")
        $http({
            method: 'POST',
            url: '/uploadvideo',
            data: {
                "image": file.name,
                "propertyid":this.x.details.id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
                $scope.message="This bill has been approved"
            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });
    }


});

clientModule.controller('becomehost', function($scope, $http,$state,$rootScope) {

    $scope.name=$rootScope.user_id;
    $scope.continue = function (id) {

        $http({
            method: 'POST',
            url: '/becomehost',
            data: {
                "placetype": $scope.placetype,
                "guests":$scope.guests,
                "address":$scope.address,
                "city":$scope.city,
                "state":$scope.state,
                "zipcode":$scope.zipcode,
                "host_id":$rootScope.user_id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
            {
                $state.go('becomehost1',{"state":$scope.state});
                $rootScope.property_id=response.property_id;
            }

            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });
    };


});

clientModule.controller('calendarcontroller', function($scope, $http,$rootScope,$state) {


    $scope.updateCalendar = function () {
        $http({
            method: 'POST',
            url: '/updateCalendar',
            data: {
                "fromdate":$scope.fromdate,
                "todate":$scope.todate,
                "property_id":$rootScope.property_id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
            {
                $state.go('host_dashboard',{'user_id':$rootScope.user_id});

            }

            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });

    };


});


clientModule.controller('imagecontroller', function($scope, $http,$state,$rootScope) {


    $scope.uploadimage=function()
    {
        var fileReader = new FileReader();

        var file=document.getElementById("upload").files[0];
        var output = document.getElementById('output');

        output.src = URL.createObjectURL(file);
        // var file = new File([file], "abc.jpg");
        saveAs(file, file.name);
        // file.copy("images/")
        $http({
            method: 'POST',
            url: '/uploadimage',
            data: {
                "image": file.name,
                "property_id":$rootScope.property_id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
                $scope.message="This bill has been approved"
            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });
    }
    $scope.next=function()
    {

        $state.go('becomehost4',{});
    }
});


clientModule.controller('pricecontroller', function($scope, $http,$state,$rootScope) {

    $scope.name="Manu";

    $scope.updatePrice = function () {
        $http({
            method: 'POST',
            url: '/updatePrice',
            data: {
                "price":$scope.price,
                "property_id":$rootScope.property_id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
                $state.go('becomehost3',{});
            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });

    };


});



clientModule.controller('titlecontroller', function($scope, $http,$state,$stateParams,$rootScope) {

    $scope.name="Manu";
    $http({
        method: 'POST',
        url: '/getPropertyDetails',
        data: {
            "state":$stateParams.state
        }

    }).success(function (response) {

        if (response.statusCode == "200")
            $scope.properties=response.properties;
        else
            $scope.message="This bill could not be removed"
    }).error(function (error) {
        alert("error");
    });

    $scope.updateTitle = function () {
        $http({
            method: 'POST',
            url: '/updateTitle',
            data: {
                "title":$scope.title,
                "property_id":$rootScope.property_id
            }

        }).success(function (response) {

            if (response.statusCode == "200")
                $state.go('becomehost2',{});
            else
                $scope.message="This bill could not be removed"
        }).error(function (error) {
            alert("error");
        });

    };


});
clientModule.controller('reviewuser', function($scope, $http,$rootScope) {
    $scope.hidereview=true;
    $scope.showReview=function()
    {
        $scope.hidereview=false;
    }

    $http({
        method: 'POST',
        url: '/getcurrentratingforuser',
        data: {
            userid: $rootScope.user_id
        }

    }).success(function (response) {


        if (response.statusCode == "200") {
            $scope.ratings = response.reviews;

        }
        else
            $scope.ratings = {};
    }).error(function (error) {
        alert("error");
    });



    $scope.postReview=function()
    {
        $http({
            method: 'POST',
            url: '/review_user',
            data: {
                userid: id,
                review:$scope.review,
                rating:$scope.rating
            }

        }).success(function (response) {


            if (response.statusCode == "200") {
                alert("review added");

            }
            else
                alert("some error ocurred");
        }).error(function (error) {
            alert("error");
        });


    }



});