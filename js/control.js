/**
 * Created by david on 5/16/15.
 */
var avalon = avalon || {};

avalon.control = (function(){

    var sound_clips = {};

    var add_to_clips = function(buffer, name){
        var clip = new avalon.audio.SoundClip(buffer);
        sound_clips[name] = clip;
        return clip;
    };

    var get_sound_clip = function(name){
        return sound_clips[name];
    };

    var load_from_rules = function(rules){
        for(var idx=0;idx<rules.length;idx++){
            var audio_file = rules[idx];
            avalon.audio.loadURL(audio_file.url, function(buffer){
                alert(audio_file.url + " loaded");
                var clips = audio_file.clips;
                for(var jdx=0;jdx<clips.length;jdx++){
                    var clip = clips[jdx];
                    var sound_clip = add_to_clips(buffer, clip.name);
                    sound_clip.start = clip.start;
                    sound_clip.duration = clip.duration;
                }
            });
        }
    };

    var init = function(){

        var request = new XMLHttpRequest();
        request.open('GET', "rules.json", true);

        request.onload = function() {
            rules = JSON.parse(request.response);
            load_from_rules(rules);
        };
        request.send();

    };

    return {
        init:init,
        get_sound_clip: get_sound_clip
    };

})();


window.onerror = function(message, url, lineNumber) {
    alert(message);
    return true;
};