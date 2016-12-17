angular.module('navDirective', [])
.directive('navBar', function(){
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'js/navbar/navbar.html',
  }
});
