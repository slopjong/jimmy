'use strict';

angular
    .module('jimmyApp')
    .filter('twodigit', function() {
        return function(input) {
            return (input < 10) ? '0'+input : input;
        };
    })
;