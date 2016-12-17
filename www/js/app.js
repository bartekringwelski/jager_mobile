angular.module('jobTracker', [
  'xeditable',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'navDirective',
  'jobTracker.login',
  'jobTracker.signup',
  'jobTracker.mainList',
  'jobTracker.profile',
  'jobTracker.profileDir',
  'jobTracker.authService',
  'jobTracker.jobService',
  'jobTracker.directives',
  'jobTracker.stats',
  'jobTracker.externalApiService',
  'jobTracker.demo',
  'jobTracker.getNews',
  'jobTracker.removeModal',
  'jobTracker.landing',
  'jobTracker.demoFactory',
  'jobTracker.deleteAccountModal',
  'jobTracker.statsFactory',
  'jobTracker.camera',
  'ionic', 
  'ngCordova'
])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/auth/login/login.html',
      controller: 'loginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'js/auth/signup/signup.html',
      controller: 'signupController'
    })
    .state('landing', {
      url: '/',
      templateUrl: 'js/demo/landing.html',
      controller: 'landingController'
    })
    .state('demo', {
      url: '/demo',
      templateUrl: 'js/mainList/mainList.html',
      controller: 'demoController'
    })
    .state('demo/profile', {
      url: '/demo/profile',
      templateUrl: 'js/profile/profile.html',
      controller: 'demoController'
    })
    .state('demo/stats', {
      url: '/demo/stats',
      templateUrl: 'js/stats/stats.html',
      controller: 'demoController'
    })
    .state('mainList', {
      url: '/mainList',
      templateUrl: 'js/mainList/mainList.html',
      authRequired : true,
      controller: 'mainListController'
    })
    .state('stats', {
      url: '/stats',
      templateUrl: 'js/stats/stats.html',
      controller: 'statsController',
      authRequired: true
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'js/profile/profile.html',
      controller: 'profileController',
      authRequired : true
    })
    .state('camera', {
      url: '/camera',
      templateUrl: 'js/camera/camera.html',
      controller: 'cameraController',
    });
  $urlRouterProvider.otherwise('/');
  //this being set to /login is causing the auto redirect to login on a bad singup request - NWF
  //something weird hjsens when you try to login if this is
  //anything other than /login. It renders that page first for a second. - VE
})
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
})
.run(function($rootScope, $location, AuthFactory) {
 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
   AuthFactory.isAuth()
   .then(function(authenticated) {
     if(toState.authRequired && !authenticated) {
       $location.path('/login');
     }
   });
 });
});
