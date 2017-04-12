angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
    .state('menu.myProfile', {
    url: '/myprofile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myProfile.html',
        controller: 'myProfileCtrl'
      }
    }
   })

  .state('menu.bookingRequests', {
    url: '/bookingrequests',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bookingRequests.html',
        controller: 'bookingRequestsCtrl'
      }
    }
  })

  .state('menu.bookingRequestDetails', {
      url: '/bookingrequestdetails/:cust_ID/:book_ID/:book_date/:book_time/:book_address/:book_details',
      views: {
          'side-menu21': {
              templateUrl: 'templates/bookingRequestDetails.html',
              controller: 'bookingRequestDetailsCtrl'
          }
      }
  })

  .state('menu.broadcastRequests', {
    url: '/broadcastrequests',
    views: {
      'side-menu21': {
        templateUrl: 'templates/broadcastRequests.html',
        controller: 'broadcastRequestsCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.editProfile', {
    url: '/editor',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })

  .state('menu.broadcastRequestDetails', {
    url: '/broadcastrequestdetails/:customer_id/:booking_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/broadcastRequestDetails.html',
        controller: 'broadcastRequestDetailsCtrl'
      }
    }
  })

   .state('menu.jobDeclineForm', {
       url: '/jobdecline',
       views: {
           'side-menu21': {
               templateUrl: 'templates/jobDeclineForm.html',
               controller: 'jobDeclineFormCtrl'
           }
       }
   })

$urlRouterProvider.otherwise('/login')

  

});