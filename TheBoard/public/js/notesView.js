// notesView.js
(function (angular) {
    
    var theModule = angular.module("notesView", []);
    
    theModule.controller("notesViewController", 
        ["$scope", "$window", "$http",
        function ($scope, $window, $http) {
            $scope.notes = [];

            // Get the categore name
            var urlParts = $window.location.pathname.split("/");
            var categoryName = urlParts[urlParts.length - 1];

            var notesUrl = "/api/notes/" + categoryName;
            $http.get(notesUrl)
                .then(function(result) {
                    // success
                    $scope.notes = result.data;
                }, function(err) {
                    // error
                    console.log(err);
                });

        }]);

})(window.angular);