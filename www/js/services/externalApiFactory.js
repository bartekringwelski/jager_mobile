angular.module('jobTracker.externalApiService', [])
.factory('externalApiFactory', function($http) {

  var searchGoogle = function(company) {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/getNews',
      params: {
        company: company
      }
    });
  };

  return {
    searchGoogle: searchGoogle
  };
});
