var app = angular.module('Coder Friends', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'Template/index.html'
		}).
		when('/home', {
			templateUrl: 'Template/home.html'
		}).
		when('/friend/:github_username', {
			templateUrl: 'friend.html'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);