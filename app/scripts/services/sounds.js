'use strict';

angular
    .module('jimmyApp')
    .factory('sounds', function() {
        return {
            speech: new buzz.sound( "/sounds/audio_pitch", {
                formats: [ "ogg", "mp3", "aac" ]
            }),
            push: new buzz.sound( "/sounds/pound", {
                formats: [ "ogg", "mp3", "aac" ]
            })
        };
    })
;