// notesView.js
(function (angular) {
    
    var theModule = angular.module("notesView", []);
    
    theModule.controller("notesViewController", 
        ["$scope",
        function ($scope) {
            $scope.notes = [
                {
                    note: "Hello World",
                    color: "yellow",
                    author: "AngularClass"
                },
                {
                    note: "Hello World 2",
                    color: "blue",
                    author: "AngularClass"
                },
                {
                    note: "Hello World 3",
                    color: "green",
                    author: "AngularClass"
                },
                {
                    note: "This is from JS code",
                    color: "orange",
                    author: "AngularClass"
                }
            ];
        }]);

})(window.angular);