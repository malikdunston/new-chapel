// Wrap in anon function just in case you have other modules.
(function () {

	let wpService = angular.module(
	'wpdata', []);

	wpService.service('$wp', function ($rootScope, $window, $http) {
		var wp = this;
		const api = 'https://hendrickswp.cecildunston.com/wp-json/wp/v2/';

		wp.getPage = function (param, callback) {
			$http({
				url: api + "pages",
				method: 'GET',
				params: param,
				// dataType: 'json',
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
				// console.log(response.data[0].content.rendered);
			}, function (response) {				
				console.log('$wp getPages failed.');
				console.log(response);
			});
		};
		wp.getHomePage = function (param, callback) {
			$http({
				url: api + "homepage",
				method: 'GET',
				params: param,
				// dataType: 'json',
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
				// console.log(response.data[0].content.rendered);
			}, function (response) {				
				console.log('$wp getHomepage failed.');
			});
		};
		wp.getPeople = function (param, callback) {
			$http({
				url: api + "people",
				method: 'GET',
				params: param,
				// dataType: 'json',
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
				// console.log(response.data[0].content.rendered);
			}, function (response) {				
				console.log('$wp getPeople failed.');
			});
		};
		wp.getConnect = function(param, callback){
			$http({
				url: api + "connect",
				method: 'GET',
				params: param,
				// dataType: 'json',
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
				// console.log(response.data[0].content.rendered);
			}, function (response) {				
				console.log('$wp getConnect failed.');
			});
		}
		wp.getStrategic = function(param, callback){
			$http({
				url: api + "strategy",
				method: 'GET',
				params: param,
				// dataType: 'json',
			}).then(function (response) {
			// success!
				if (typeof callback === "function") {
					callback(response.data);
				};
				// console.log(response.data[0].content.rendered);
			}, function (response) {				
				console.log('$wp getStrategic failed.');
			});
		}
	});

})();