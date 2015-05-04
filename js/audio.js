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

    //caching is done via the browser right now (if you request a URL more than once - smart browsers should cache the request)
    var loadSoundFromURL = function(url, onLoad) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) {
                onLoad && onLoad(buffer);
            });
        };
        request.send();
    };


    var playSoundBuffer = function(buffer){

        var source = context.createBufferSource(); // creates a sound source
        source.buffer = buffer;                    // tell the source which sound to play
        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
        source.start(0);

    };


    return {
        playURL:function(url){
            loadSoundFromURL(url, playSoundBuffer);
        },
        loadURL: function(url){
            loadSoundFromURL(url);
        }
    };

}());


