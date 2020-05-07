'use strict';

const sounds = {
    'blockHit' : {
      url : 'sounds/block_hit.mp3'
    },
    'bubblePop' : {
      url : "sounds/bubble_pop.ogg",
    },
    'bubbleShot' : {
      url : 'sounds/bubble_shot.mp3'
    },
    'changeProduct' : {
      url : 'sounds/change_product.mp3'
    },
    'maleGrunt' : {
      url : 'sounds/male_grunt.mp3'
    },
    'tada' : {
      url : 'sounds/tada.mp3'
    },
    'gameOver' : {
      url: 'sounds/game_over.mp3'
    },
    'bomb' : {
      url: 'sounds/bomb.mp3'
    }
};
const soundContext = new AudioContext();
for (var key in sounds) {
    loadSound(key);
}
function loadSound(name){
    var sound = sounds[name];
    var url = sound.url;
    var buffer = sound.buffer;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      soundContext.decodeAudioData(request.response, function(newBuffer) {
        sound.buffer = newBuffer;
      });
    }
    request.send();
}
function playSound(name, options){
    var sound = sounds[name];
    var soundVolume = sounds[name].volume || 1;
    var buffer = sound.buffer;
    if(buffer){
      var source = soundContext.createBufferSource();
      source.buffer = buffer;
      var volume = soundContext.createGain();
      if(options) {
        if(options.volume) {
          volume.gain.value = soundVolume * options.volume;
        }
      } else {
        volume.gain.value = soundVolume;
      }
      volume.connect(soundContext.destination);
      source.connect(volume);
      source.start(0);
    }
}