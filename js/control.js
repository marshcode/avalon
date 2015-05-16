/**
 * Created by david on 5/16/15.
 */
var avalon = avalon || {};

avalon.control = (function(){

    var sound_clips = {};

    var add_to_clips = function(buffer, name){
        sound_clips[name] = new avalon.audio.SoundClip(buffer);
    };

    var init = function(){
        avalon.audio.loadURL('mp3/ping.mp3', function(buffer){
            add_to_clips(buffer, "ping");
        });
    };

    return {
        init:init,
        sound_clips: sound_clips
    };

})();