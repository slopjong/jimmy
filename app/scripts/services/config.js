'use strict';

// currently not used
angular
    .module('jimmyApp')
    .factory('config', function() {
        return {
            config: function(settings) {
                for(var setting in settings) {
                    this[setting] = settings[setting];
                }
            }
        };
    })
;