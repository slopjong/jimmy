'use strict';

angular.module('jimmyApp')
    .filter('twodigit', function() {
        return function(input) {
            return (input < 10) ? '0' + input : input;
        };
    })
    .controller('MainCtrl', [
        '$scope', '$interval', '$timeout', 'speechWords', 'sounds',
        function ($scope, $interval, $timeout, speechWords, sounds)
        {
            // reverse the speech words array so that we pop the words from 'left to right'
            speechWords = speechWords.reverse();

            //******************************************************************
            // VARIABLES

            $scope.maxCountdown = 15
            $scope.countdown = $scope.maxCountdown;
            $scope.pushed = false;
            $scope.show_counter = false;
            $scope.show_button = true;
            $scope.speechText = '';
            $scope.speechText2 = '';
            $scope.jimmyDead = false;

            // we are moving the whole document so that the header gets out of the
            // viewport and the share box into it
//            $scope.htmlTopMargin = '0px';

            //******************************************************************
            // FUNCTIONS

            $scope.push = function() {
                $scope.countdown = $scope.maxCountdown;
                $scope.pushed = true;
                $timeout(function() {
                    $scope.pushed = false;
                }, 800);

                sounds.push.play();
            }

            $scope.$watch('countdown', function(newVal, oldVal) {
                if ($scope.countdown === 0) {
                    sounds.explosion.play();
                    $scope.show_button = false;
                    $scope.jimmyDead = true;
                    $interval.cancel($scope.timer);
                } else if ($scope.countdown === 10) {
                    $('html').addClass('moveUp');
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

            ////////////////////////////////////////////////////////////////////
            // this should be a promise
            var currentSpeechWords = speechWords.pop();
            var processSpeechWords = function() {
                if (angular.isUndefined(currentSpeechWords)) {
                    return;
                }
                $scope.speechText += currentSpeechWords.word;
                $timeout(processSpeechWords, currentSpeechWords.length);
                currentSpeechWords = speechWords.pop();
            }
            processSpeechWords();
            ////////////////////////////////////////////////////////////////////
    }]);
