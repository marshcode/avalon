var avalon = avalon || {};

avalon.audio = (function(){

    var init = function(){
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            return new AudioContext();
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    };

    var context = init();
    var buffer_cache = {};

    var loadSoundFromURL = function(url, onLoad) {

        var cached_buffer = buffer_cache[url];
        if(cached_buffer){
            onLoad && onLoad(cached_buffer);
            return;
        }

        //TODO: maybe check this to see if there already is a ? in the url
        var screwy_url = url;// + "?blah=" + (new Date()).getTime();
        var request = new XMLHttpRequest();
        request.open('GET', screwy_url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) {
                buffer_cache[url] = buffer;
                onLoad && onLoad(buffer);
            });
        };
        request.send();
    };

    return {
        loadURL: function(url, onload){
            loadSoundFromURL(url, onload);
        },
        getContext: function(){
            return context;
        },
    };

}());

avalon.audio.SoundClip = (function(){

    var SoundClip = function(buffer){
        this.buffer = buffer;
        this.start = 0;
        this.duration = Number.MAX_VALUE;
    };

    SoundClip.prototype.play = function(){

        var context = avalon.audio.getContext();
        var source = context.createBufferSource(); // creates a sound source
        source.buffer = this.buffer;               // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0, this.start, this.duration);
    };

    return SoundClip;
})();


avalon.audio.PlayList = (function(){

    var PlayList = function(){
        this.sound_clips = [];
    };

    PlayList.prototype.add_sound_clip = function(sound_clip){
        this.sound_clips.push(sound_clip);
    };

});


