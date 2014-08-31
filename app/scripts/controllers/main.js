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
            //******************************************************************
            // VARIABLES

            $scope.countdown = 15;
            $scope.pushed = false;
            $scope.show_counter = false;


            //******************************************************************
            // SOUNDS

            var sounds = {
                speech: new buzz.sound( "/sounds/audio_pitch", {
                    formats: [ "ogg", "mp3", "aac" ]
                }),
                push: new buzz.sound( "/sounds/pound", {
                    formats: [ "ogg", "mp3", "aac" ]
                })
            };


            //******************************************************************
            // FUNCTIONS

            $scope.push = function() {
                $scope.countdown = 15;
                $scope.pushed = true;
                $timeout(function() {
                    $scope.pushed = false;
                }, 800);

                sounds.push.play();
            }

            $scope.$watch('countdown', function(newVal, oldVal) {
                if ($scope.countdown === 0) {
                    $interval.cancel($scope.timer);
                }
            });

            sounds.speech.play().bind("ended", function(e) {
                $scope.show_counter = true;
                $timeout(function() {
                    $scope.timer = $interval(function() {
                        $scope.countdown--;
                    }, 1000);
                }, 1000);
            });
    }]);
