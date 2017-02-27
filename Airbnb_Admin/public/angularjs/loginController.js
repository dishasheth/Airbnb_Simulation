admin.controller('loginController', function ($scope, $http, $window) {
	$scope.invalid_login = true;
	$scope.login = function (username, password) {
		$http({
			method: "POST",
			url: "/login",
			data: {
				"username": username,
				"password": password
			}
		}).success(function (data) {
			if(data.statusCode == 401)
			{
				$scope.invalid_login = false;
			}
			else if(data.statusCode == 200)
			{
				$scope.invalid_login = true;
				window.location = "/home";
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
});