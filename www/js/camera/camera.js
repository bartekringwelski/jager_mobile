


angular.module('jobTracker.camera', [])
 
.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
          StatusBar.styleDefault();
      }
  });
})


.controller('cameraController', function($scope, $cordovaCamera, DemoFactory, StatsFactory, AuthFactory, $location) {


  $scope.takePicture = function(){
    console.log("hellow from inside take picture")

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
  

  $cordovaCamera.getPicture(options).then(function(imageData) {
    $scope.imgURI = "data:image/jpeg;base64," + imageData;
  }, function(err) {
    // error
  });
  }
});
