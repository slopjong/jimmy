'use strict';

angular.module('jimmyApp')
    .filter('twodigit', function() {
        return function(input) {
            return (input < 10) ? '0'+input : input;
        };
    })
    .controller('MainCtrl', [
        '$scope', '$interval', '$timeout',
        function ($scope, $interval, $timeout)
        {
            $scope.countdown = 15;
            $scope.pushed = false;

            $scope.push = function() {
                $scope.countdown = 15;
                $scope.pushed = true;
                $timeout(function() {
                    $scope.pushed = false;
                }, 800);
            }

            $scope.$watch('countdown', function(newVal, oldVal) {
                if ($scope.countdown === 0) {
                    $interval.cancel($scope.timer);
                }
            });

            $scope.timer = $interval(function() {
                $scope.countdown--;
            }, 1000);
    }]);
