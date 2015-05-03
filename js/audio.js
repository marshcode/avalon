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

    var playURL = function(url){

    };


    return {playURL:playURL};

}());

