// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function() {
   var config = {
    apiKey: "AIzaSyCrfoyQ8lY4wTUkI-HgJeWGaEgdaRPFxuc",
    authDomain: "fir-todo-ab6a9.firebaseapp.com",
    databaseURL: "https://fir-todo-ab6a9.firebaseio.com",
    storageBucket: "fir-todo-ab6a9.appspot.com",
    messagingSenderId: "98742215023"
  };
  firebase.initializeApp(config);
})

.controller("ExampleController", function($cordovaCalendar,$scope,$firebaseArray,$firebaseAuth, $firebase) {
 
    $scope.createEvent = function(title,start,end) {
       var ref = firebase.database().ref();
     var messagesRef = ref.child("messages");
    var data = $firebaseArray(messagesRef);
      data.$add({
        Task : title,
        Start : start,
        End : end
      }).then(function(ref){
       $scope.firedata=data;
       $scope.mydata(data);
     // alert(JSON.stringify(data))
      }
      ,function(err)
      {alert(err)}
      );
    }
     $scope.mydata=function(data){
      data.forEach(function(fire) {
        $scope.task=fire.Task;
        $scope.st=fire.Start;
        $scope.en=fire.End;
        });
      $cordovaCalendar.createEvent({
            title:  $scope.task,
            startDate: new Date(parseInt($scope.st)),
            endDate: new Date(parseInt ($scope.en))
        }).then(function (result) {
            alert("Event created successfully");
        }, function (err) {
            alert("There was an error: " + err);
        })
       
      }
    });