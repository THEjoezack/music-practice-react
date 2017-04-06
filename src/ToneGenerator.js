import Tone from 'tone';

export default {
    start: function(options) {
        var synth = new Tone.Synth({
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

        var notes = [];
        for(var i = 0; i < options.notes.length; i++) {
            var note = options.notes[i].toUpperCase();
            var time = i === 0 ? '0' : (i + ' * ' + options.noteLength);
            notes.push(
                {
                    time : time,
                    note : note,
                    dur: options.noteLength
                });
        }

        // var part = new Tone.Part(
        //     function(time, event){
        //         //the events will be given to the callback with the time they occur
        //         synth.triggerAttackRelease(event.note, event.dur, time)
        //     }, 
        //     notes
        // );

        // //start the part at the beginning of the Transport's timeline
        // part.start(0)

        // //loop the part 3 times
        // part.loop = 4
        var measures = Math.ceil(notes.length / parseInt(options.noteLength)); // would rather set the signature!
        // part.loopEnd = measures.toString() + 'm'

        var i = 0;
        var loop = new Tone.Loop(function(time){
            var note = notes[i % notes.length].note;
            synth.triggerAttackRelease(note, options.noteLength);
            i++;
        }, options.noteLength);

        loop.start("1m").stop("100m");

        Tone.Transport.bpm.value = options.bpm;
        Tone.Transport.start();
    },
    stop: function() {
        Tone.Transport.stop();
    }
}