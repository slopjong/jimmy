'use strict';

angular
    .module('jimmyApp')
    .filter('twodigit', function() {
        return function(input) {
            return (input < 10) ? '0'+input : input;
        };
    })
    .filter('time', function() {
        return function(input) {
            var min = Math.floor(input/60);
            var sec = input - (min * 60);

            if (min < 10) {
                min = '0' + min;
            }

            if (sec < 10) {
                sec = '0' + sec;
            }

            return min + ':' + sec;
        };
    })
;