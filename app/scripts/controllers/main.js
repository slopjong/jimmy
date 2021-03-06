'use strict';

angular.module('jimmyApp')
    .controller('MainCtrl', [
        '$scope', '$interval', '$timeout', 'speechWords', 'sounds', 'WebSocket', 'config',
        function ($scope, $interval, $timeout, speechWords, sounds, WebSocket, config)
        {
            //******************************************************************
            // INITIALIZATION

            // reverse the speech words array so that we pop the words from 'left to right'
            speechWords = speechWords.reverse();


            //******************************************************************
            // VARIABLES

            // get the max countdown value from the constant instead
            $scope.maxCountdown = config.maxCountdown;
            $scope.countdown = $scope.maxCountdown;
            $scope.pushed = false;
            $scope.show_counter = false;
            $scope.show_button = true;
            $scope.speechText = '';
            $scope.speechText2 = '';
            $scope.jimmyDead = false;
            $scope.amountPlayer = 0;

            //******************************************************************
            // WEBSOCKET COMMUNICATION

            WebSocket.onmessage(function(event) {
                if (event.data === '/countdown/reset') {
                    $scope.resetCountdown();
                }

                if (/^\/helpers\/potential/.test(event.data)) {
                    $scope.amountPlayer = parseInt(event.data.replace('/helpers/potential/', ''));
                }
            });

            WebSocket.onopen(function() {
                WebSocket.send('/helpers/potential');
            });

            //******************************************************************
            // FUNCTIONS

            $scope.resetCountdown = function() {
                // do this as a fallback
                $scope.countdown = $scope.maxCountdown;
                console.log('reset countdown');
            };
            $scope.animateButton = function() {
                $scope.pushed = true;
                $timeout(function() {
                    $scope.pushed = false;
                }, 800);
            };

            $scope.push = function() {
                WebSocket.send('/countdown/reset');
                $scope.resetCountdown();
                $scope.animateButton();
                sounds.push.play();
            };

            $scope.$watch('countdown', function(newVal, oldVal) {
                if ($scope.countdown === 0) {
                    sounds.explosion.play();
                    $scope.show_button = false;
                    $scope.jimmyDead = true;
                    $interval.cancel($scope.timer);
                } else if ($scope.countdown === 295) {
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
            };
            processSpeechWords();
            ////////////////////////////////////////////////////////////////////
    }]);
