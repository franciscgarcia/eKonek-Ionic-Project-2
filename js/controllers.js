angular.module('app.controllers', [])

.controller('loginCtrl', ['$scope', '$q', '$http', '$state', '$ionicPopup', 'API_ENDPOINT', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $state, $ionicPopup, API_ENDPOINT, $rootScope) {

    $scope.data = {
        username: '',
        password: ''
    }

    $scope.login = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/worker/login',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                $rootScope.worker_ID = response
                $state.go('menu.bookingRequests')

            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: data
                })
            })
        })
    };
}])

.controller('myProfileCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$ionicHistory',
    '$http', 'API_ENDPOINT', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state, $ionicHistory, $http, API_ENDPOINT, $ionicPopup) {
    var ID = $rootScope.worker_ID

    $http.get(API_ENDPOINT.url + '/user/' + ID)
    .success(function (response) {
        console.log(response)
        $scope.workerDetails = response;
    })  

}])

.controller('editProfileCtrl', ['$scope', '$q', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope', '$state', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $stateParams, API_ENDPOINT, $rootScope, $state, $ionicPopup) {
    $scope.data = {
        username: '',
        password: ''
    }

    var worker_ID = $rootScope.worker_ID

    $scope.update = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/user/' + worker_ID,
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Updated successfully.',
                    template: 'Please login again.'
                })
                $state.go('login')

            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Update failed!',
                    template: 'Username already used.'
                })
            })
        })
    }
}])

.controller('bookingRequestsCtrl', ['$scope', '$http', '$stateParams', 'API_ENDPOINT', '$rootScope',
    '$ionicPush',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $http, $stateParams, API_ENDPOINT, $rootScope, $ionicPush) {
    var ID = $rootScope.worker_ID

    $ionicPush.register().then(function (t) {
        return $ionicPush.saveToken(t);
    }).then(function (t) {
        console.log('Token saved:', t.token);
    });

    $scope.$on('cloud:push:notification', function (event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text);
    });


    $http.get(API_ENDPOINT.url + '/worker/' + ID + '/booking?is_taken=0')
    .success(function (response) {
        console.log(response)
        $scope.bookingDetails = response      
    })

    
    $scope.doRefresh = function () {
        $http.get(API_ENDPOINT.url + '/worker/' + ID + '/booking')
            .success(function (response) {
                $scope.bookingDetails = response;
            })
        $scope.$broadcast('scroll.refreshComplete');
    }

}])

 .controller('bookingRequestDetailsCtrl', ['$scope', '$q', '$http', '$stateParams', 'API_ENDPOINT',
     '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $http, $stateParams, API_ENDPOINT, $ionicPopup, $state) {
    var cust_ID = $stateParams.cust_ID
    var book_ID = $stateParams.book_ID
    console.log(book_ID)
   
    $scope.book_date = $stateParams.book_date
    $scope.book_time = $stateParams.book_time
    $scope.book_address = $stateParams.book_address
    $scope.book_details = $stateParams.book_details

    $http.get(API_ENDPOINT.url + '/user/' + cust_ID)
    .success(function (response) {
        console.log(response)
        $scope.cust_infos = response
    })

    $http.get(API_ENDPOINT.url + '/booking/' + book_ID)
    .success(function (response) {
        console.log(response)
        $scope.booking_details = response
    })

    $scope.data = {
        is_taken: true
    }

    $scope.accept = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/booking/' + book_ID,
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Job Accepted',
                    template: 'The Customer will be notified. Thank you.'
                })
                $state.go('menu.bookingRequests')

            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: data
                })
            })
        })
    }

    $scope.reject = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/booking/request/' + book_ID + '/reject',
                method: 'PUT',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: ''

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Job Declined',
                    template: 'Customer will be informed'
                })

            }).error(function (data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: data
                })
            })
        })
    }

}])

   
.controller('broadcastRequestsCtrl', ['$scope', '$stateParams', '$rootScope', '$state', 
    '$http', 'API_ENDPOINT', '$ionicPopup',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $state, $http, API_ENDPOINT, $ionicPopup) {

    $http.get(API_ENDPOINT.url + '/booking/available?worker_id=' + $rootScope.worker_ID)
    .success(function (response) {
        console.log(response)
        $scope.broadcastRequests = response
    })

}])
  
.controller('broadcastRequestDetailsCtrl', ['$scope', '$q', '$stateParams', '$rootScope', '$state',
    '$http', 'API_ENDPOINT', '$ionicPopup', '$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $q, $stateParams, $rootScope, $state, $http, API_ENDPOINT, $ionicPopup, $filter) {
    var customer_id = $stateParams.customer_id
    var booking_id = $stateParams.booking_id
    var time

    function toTime(timeString) {
        var timeTokens = timeString.split(':');
        return new Date(1970, 0, 1, timeTokens[0], timeTokens[1], timeTokens[2]);
    }
    
    $http.get(API_ENDPOINT.url + '/user/' + customer_id)
    .success(function (response) {
        console.log(response)
        $scope.customerinfo = response
    })

    $http.get(API_ENDPOINT.url + '/booking/' + booking_id)
    .success(function (response) {
        console.log(response)
        $scope.booking_info = response
        $scope.data.booking_date = $filter('date')(response.booking_date, 'MM/dd/yyyy')
        time = toTime(response.booking_time)
        time = $filter('date')(time, 'hh:mm a')
        $scope.data.booking_time = time
        $scope.data.details = response.details
    })
       
    
    $scope.data = {
        booking_date: '',
        booking_time: '',
        details: '',
        worker_id: $rootScope.worker_ID
    }

    $scope.apply = function () {
        return $q(function (resolve, reject) {
            $http({
                url: API_ENDPOINT.url + '/booking/' + booking_id + '/request',
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: $scope.data

            }).success(function (response) {
                console.log(response)
                var alertPopup = $ionicPopup.alert({
                    title: 'Application Sent',
                    template: 'The customer will review your application. Thank You.'
                })
                $state.go('menu.broadcastRequests')

            }).error(function (response) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Application failed!',
                    template: response
                })
            })
        })
    }


}])
 
.controller('menuCtrl', ['$scope', '$state', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $ionicHistory) {

    $scope.clear = function () {
        $ionicHistory.clearCache()
        $state.go('login')
    }

}])

.controller('jobDeclineFormCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 