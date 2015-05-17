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

    var load_from_rules = function(rules){

        for(rule_name in rules){
            var rule = rules[rule_name];

            avalon.audio.loadURL(rule.url, function(buffer){
                var clip = add_to_clips(buffer, rule_name);
                clip.start = rule.start;
                clip.duration = rule.duration;
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
        sound_clips: sound_clips
    };

})();