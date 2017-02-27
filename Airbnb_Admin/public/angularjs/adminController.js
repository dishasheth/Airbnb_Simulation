admin.controller('adminController', function ($scope, $http, $window) 
{
	$scope.search_host_bill = "Host";
	//get Session Values
	$http({
		method: "POST",
		url: "/getLoginSession"
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			window.location = '/';
		}
		else if(data.statusCode == 200)
		{
			$scope.adminValues = data.data;
		}
		else
		{
			$window.alert('Something went wrong. Please try again');
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try again');
	});
	
	//get Header Values
	$http({
		method: "POST",
		url: "/getHeaderValues"
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			window.location = '/';
		}
		else if(data.statusCode == 200)
		{
			$scope.headerValues = data.data;
		}
		else
		{
			$window.alert('Something went wrong. Please try again');
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try again');
	});
	
	
	//get hosts to be approved
	$http({
		method: "POST",
		url: "/getHostToApprove"
	}).success(function (data) {
		if(data.statusCode == 403)
		{
			$scope.hosts = {"fname":"No host to be approved"};
		}
		else if(data.statusCode == 200)
		{
			$scope.hosts = data.data;
			$window.alert($scope.hosts[0].fname);
		}
		else
		{
			$window.alert('Something went wrong. Please try again');
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try again');
	});
	
	//get Top 10 hosts
	$http({
		method: "POST",
		url: "/getTopHosts"
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			window.location = '/';
		}
		else if(data.statusCode == 200)
		{
			$scope.topHosts = data.data;
			$(document).ready(
					function() {
						var options = {
							legend : false,
							responsive : false
						};
						new Chart(document.getElementById("canvas1"), {
							type : 'doughnut',
							tooltipFillColor : "rgba(51, 51, 51, 0.55)",
							data : {
								labels : $scope.topHosts.fname,
								datasets : [ {
									data : $scope.topHosts.totalprice,
									backgroundColor : [ "#BDC3C7", "#9B59B6",
											"#E74C3C", "#26B99A", "#3498DB", "#BDC3C7", "#9B59B6",
											"#E74C3C", "#26B99A", "#3498DB" ],
									hoverBackgroundColor : [ "#CFD4D8", "#B370CF",
											"#E95E4F", "#36CAAB", "#49A9EA","#CFD4D8", "#B370CF",
											"#E95E4F", "#36CAAB", "#49A9EA" ]
								} ]
							},
							options : options
						});
				});
		}
		else
		{
			$window.alert('Something went wrong. Please try again');
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try again');
	});
	
	// Top 10 properties
	$http({
		method: "POST",
		url: "/getTopProperties"
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			window.location = '/';
		}
		else if(data.statusCode == 200)
		{
			$scope.topProperties = data.data;
			$(document).ready(
					function() {
						var options = {
							legend : false,
							responsive : false
						};
						new Chart(document.getElementById("canvas2"), {
							type : 'doughnut',
							tooltipFillColor : "rgba(51, 51, 51, 0.55)",
							data : {
								labels : $scope.topProperties.fname,
								datasets : [ {
									data : $scope.topProperties.totalprice,
									backgroundColor : [ "#BDC3C7", "#9B59B6",
											"#E74C3C", "#26B99A", "#3498DB", "#BDC3C7", "#9B59B6",
											"#E74C3C", "#26B99A", "#3498DB" ],
									hoverBackgroundColor : [ "#CFD4D8", "#B370CF",
											"#E95E4F", "#36CAAB", "#49A9EA","#CFD4D8", "#B370CF",
											"#E95E4F", "#36CAAB", "#49A9EA" ]
								} ]
							},
							options : options
						});
				});
		}
		else
		{
			$window.alert('Something went wrong. Please try again');
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try again');
	});
	
	//get clicks from log
	$http({
		method: "POST",
		url: "/getClicks"
	}).success(function (data) {
		if(data.statusCode == 401)
		{
			$window.alert('There was an error while traversing log. Please try again.');
		}
		else if(data.statusCode == 200)
		{
			$scope.clicks = data.data;
		}
		else
		{
			$window.alert('Something went wrong. Please try again');
		}
	}).error(function (error) {
		$window.alert('Something went wrong. Please try again');
	});
	

	$scope.registerAdmin = function () 
	{
		$http({
			method: "POST",
			url: "/registerAdmin",
			data: {
				"admin": $scope.admin
			}
		}).success(function (data) {
			if(data.statusCode == 403)
			{
				$window.alert('Email already registered.');
			}
			else if(data.statusCode == 200)
			{
				$window.alert('Registration Successful');
				window.location = "/home";
			}
			else
			{
				$window.alert('Something went wrong. Please try again');
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try again');
		});
	};
	
	$scope.updateAdmin = function()
	{
		$http({
			method: "POST",
			url: "/updateAdmin",
			data: {
				"admin": $scope.adminValues
			}
		}).success(function (data) {
			if(data.statusCode == 403)
			{
				$window.alert('Something went wrong. Please try again.');
			}
			else if(data.statusCode == 200)
			{
				$window.alert('Updation Successful');
				window.location = "/home";
			}
			else
			{
				$window.alert('Something went wrong. Please try again');
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try again');
		});
	};
	
	$scope.logout = function () {
		$http({
	        method: "POST",
	        url: "/logout"
	    }).success(function (data) {
        	if(data.statusCode == 200)
    		{
        		$scope.logout_lbl = true;
        		window.location = '/';
    		}
	    }).error(function (error) {
	    	$window.alert('Something went wrong. Please try again.');
	    });
	};
	
	$scope.approveHosts = function()
	{
		$http({
			method: "POST",
			url: "/approveHosts",
			data: {
				"hosts": $scope.hosts
			}
		}).success(function (data) {
			if(data.statusCode == 403)
			{
				$window.alert('Something went wrong. Please try again');
			}
			else if(data.statusCode == 200)
			{
				$window.alert('Hosts approved');
				window.location = "/home";
			}
			else
			{
				$window.alert('Something went wrong. Please try again');
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try again');
		});
	};
	
	$scope.search = function()
	{
		$http({
			method: "POST",
			url: "/search",
			data: {
				"search_txt": $scope.search_txt,
				"search_host_bill":$scope.search_host_bill
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$window.alert('Something went wrong. Please try again');
			}
			else if(data.statusCode == 200)
			{
				$scope.searchData = data.data;
			}
			else
			{
				$window.alert('Something went wrong. Please try again');
			}
		}).error(function (error) {
			$window.alert('Something went wrong. Please try again');
		});
	}
});