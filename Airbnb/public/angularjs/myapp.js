/**
 * Created by harshmehta6711 on 15-11-2016.
 */
var myapp=angular.module("myapp",['ui.router']);

myapp.config(function ($stateProvider,$urlRouterProvider,$locationProvider) {
    console.log("inside angular");

  //  $urlRouterProvider.otherwise('/');
    $stateProvider
        .state("home",{
            url:"/home",
            templateUrl:"../templates/index.html"

        })
        .state('login',{
            url:'/login',
            templateUrl:"../templates/login.html"
        })
        .state('contact',{
            url:'/contacts',
            views:{
                '':{
                    templateUrl:'../templates/contact.html'
                }
            }
        })
        .state('search',{
            url:'/search',
            templateUrl:'../templates/dishapart'  //Enter the template created by disha for room search
        })
    ;

});

myapp.controller('myapp',function ($scope,$http) {
    console.log("inside controller");
   $http({
        method:'GET',
       url:'/'
   });

});

myapp.controller('ctrlFB',function ($scope,$http,$window) {


    console.log("inside fb ctrl");
$scope.submit=function () {
    $window.location = $window.location.protocol + "//" + $window.location.host + $window.location.pathname + "auth/facebook";
   /* // $http({
    //     method:'GET',
    //
    //     url:'/auth/google',
    //     headers: {
    //         'Access-Control-Allow-Origin': true
    //         //'Content-Type': 'application/json'
    //     }
    //
    // });*/

};
});