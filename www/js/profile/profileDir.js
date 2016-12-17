angular.module('jobTracker.profileDir', [])
.directive('changePassword', function(){
  return {
    transclude: true,
    restrict: 'E',
    templateUrl: 'js/profile/changePassword.html'
  }
})
