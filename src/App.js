import React, { Component } from 'react';
import './index.css';
import logo from './logo.svg';
import './App.css';
import looper from './ToneLooper';
import scribble from 'scribbletune';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: props.isPlaying,
      bpm: props.bpm,
      noteLength: props.noteLength,
      chords: props.chords
    };
  }
  
  updateBpm(event) {
    var value = this.restrict(event.target.value, this.props.bpmMin, this.props.bpmMax);
    this.recalibrate({ bpm: value });
  }

  updateNoteLength(event) {
    this.recalibrate({ noteLength: event.target.value });
  }

  updateChords(event) {
    // validation etc
    this.recalibrate({ chords: event.target.value.split(',') });
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
    } else {
      var chordNames = this.state.chords;
      var chords = chordNames
        .map(x => { return scribble.chord(x) })
        .reduce((chords, c) => { return chords.concat(c); }, []);
      
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
    // TODO Better UI for selecting chords
    // TODO Actually show arpeggio shapes
    return (
      <form>
        <div className="form-group">
          <label htmlFor="chords">Chord List: (comma)</label>
          <input id="chords" className="form-control" value={this.state.chords} onChange={this.updateChords.bind(this)} />
        </div>
        <div className="form-group">
          <label htmlFor="bpm">BPM:</label>
          <input type="number" className="form-control" id="bpm" value={this.state.bpm} onChange={this.updateBpm.bind(this)} min="0" max="300" />
        </div>
        
        <div className="form-group">
          <label htmlFor="noteLength">Note Length:</label>
          <select className="form-control" value={this.state.noteLength} onChange={this.updateNoteLength.bind(this)}>
            <option value="1n">Whole Note</option>
            <option value="2n">Half Note</option>
            <option value="4n">Quarter Note</option>
            <option value="8n">Eighth Note</option>
            <option value="16n">Sixteenth Note</option>
          </select>
        </div>

        <div>
          <button className="btn btn-primary" onClick={this.playOrPause.bind(this)}>{this.state.isPlaying ? 'Stop' : 'Play'}</button>
        </div>
      </form>
    );
  }
}

App.defaultProps = {
  bpm: 120,
  bpmMin: 1,
  bpmMax: 300,
  isPlaying: false,
  noteLength: '8n',
  chords: ['CMaj7', 'Am7', 'Edom7']
};

export default App;