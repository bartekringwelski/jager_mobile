angular.module('jobTracker.authService', [])
.factory('AuthFactory', function($http, $location, $filter) {
  var errorMessage = "";
  var login = function(user){
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/login',
      contentType : "application/json",
      data: user
    });
  };

  var signup = function(user){
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/signup',
      contentType : "application/json",
      data: user
    });
  };

  var logout = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/logout'
    }).then((res) => {
      $location.path('/');
    }, (err) => {
      console.error("ERROR:", err);
    });
  };

  var isAuth = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/auth'
    }).then((res) => {
      return res.data;
    }, (err) => {
      console.error("ERROR:", err);
    });
  };
  var getProfile = function() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/users',
    }).then((res) => {
      return res.data;
      }, (err) => {
      console.error("ERROR:", err);
    });
  }

  var updateAccount = function(user) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:3000/users',
      data: user,
    }).then((res) => {
      return res.data;
    },(err) => {
      console.error("ERROR:", err);
    });
  };

  var updatePassword = function(user) {
    return $http({
      method: 'PUT',
      url: 'http://localhost:3000/users/password',
      data: user
      }).then((res) => {
      console.log(res);
      $location.path('/profile');

    });
  };
  var deleteAccount = function() {
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/users/delete',
    }).then((res) => {
      $location.path('/');
    });
  };
  var profileJobStatuses = [
    {value: 1, text: "Actively Job Seeking"},
    {value: 2, text: "Successfully Found a Job"},
    {value: 3, text: "No Longer Looking"}
  ];
  var showJobStatus = function(scope) {
    var selected = $filter('filter')(scope.jobStatuses, {value: scope.user.jobStatus});
    return selected[0].text;
  };
  return {
    login: login,
    logout: logout,
    signup: signup,
    isAuth: isAuth,
    updateAccount: updateAccount,
    updatePassword: updatePassword,
    deleteAccount: deleteAccount,
    getProfile: getProfile,
    profileJobStatuses: profileJobStatuses,
    showJobStatus: showJobStatus
  };

});
