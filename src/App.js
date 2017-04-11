import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import looper from './ToneLooper';
import scribble from 'scribbletune';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: props.isPlaying,
      bpm: props.bpm,
      noteLength: props.noteLength
    };
  }
  
  updateBpm(event) {
    var value = this.restrict(event.target.value, this.props.bpmMin, this.props.bpmMax);
    this.recalibrate({ bpm: value });
  }

  updateNoteLength(event) {
    this.recalibrate({ noteLength: event.target.value });
  }

  recalibrate(options) {
    this.setState(options);
    if(this.state.isPlaying) {
      this.playOrPause();
    }
  }

  restrict(value, min, max) {
    return Math.max(
      min,
      Math.min(
        max,
        value
      )
    );
  }

  playOrPause() {
    if(this.state.isPlaying) {
      looper.stop();
      document.getElementById('spinner-image').style = 'display: none;';
    } else {
      var chordNames = [ 'CMaj7', 'Am7', 'Edom7'];
      var chords = chordNames
        .map(x => { return scribble.chord(x) })
        .reduce((chords, c) => { return chords.concat(c); }, []);
      //var scale = scribble.scale('c', 'major', 3);
      const minSpeed = .5, maxSpeed = 30;
      
      document.getElementById('spinner-image').style = 'animation: App-logo-spin infinite .5s linear';
      looper.start(
        {
          notes: chords,
          bpm: this.state.bpm,
          noteLength: this.state.noteLength
        }
      );
    }
    
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Music Practice App</h2>
        </div>
        <div>
          <label htmlFor="bpm">BPM:</label>
          <input type="number" id="bpm" value={this.state.bpm} onChange={this.updateBpm.bind(this)} min="0" max="300" />
        </div>
        <div>
          <label htmlFor="noteLength">Note Length:</label>
          <select value={this.state.noteLength} onChange={this.updateNoteLength.bind(this)}>
            <option value="1n">Whole Note</option>
            <option value="2n">Half Note</option>
            <option value="4n">Quarter Note</option>
            <option value="8n">Eighth Note</option>
            <option value="16n">Sixteenth Note</option>
          </select>
        </div>

        <div>
          <button onClick={this.playOrPause.bind(this)}>{this.state.isPlaying ? 'Stop' : 'Play'}</button>
        </div>
        <br/>
        <div>
          <img src={logo} className="App-logo" alt="logo" id="spinner-image" style={{display: 'none'}} />
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  bpm: 120,
  bpmMin: 1,
  bpmMax: 300,
  isPlaying: false,
  noteLength: '8n'
};

export default App;