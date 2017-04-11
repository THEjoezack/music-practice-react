import Tone from 'tone';

const synth = new Tone.Synth({
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 0.9
    },
    "envelope" : {
        "attack" : 0.00,
        "decay" : 0.5,
        "sustain" : 0.2,
        "release" : 0.5,
    }
}).toMaster();

var createLoop = function(synth, notes, options) {
    var ranOnce = false;
    var i = 0;
    return new Tone.Loop(function(time){
        var note = notes[i % notes.length].note;
        synth.triggerAttackRelease(note, options.noteLength);
        if(!ranOnce && options.onStart) {
            options.onStart();
            ranOnce = true;
        }
        i++;
    }, options.noteLength);
}

export default {
    start: function(options) {
        var notes = [];
        for(var i = 0; i < options.notes.length; i++) {
            var note = options.notes[i].toUpperCase();
            var time = i === 0 ? '0' : (i + ' * ' + options.noteLength);
            notes.push({
                time : time,
                note : note,
                dur: options.noteLength
            });
        }
        
        var loop = createLoop(synth, notes, options);
        loop.start("1m"); // basically just play forever

        Tone.Transport.bpm.value = options.bpm;
        Tone.Transport.start();

    },
    stop: function() {
        Tone.Transport.stop();
    }
};