import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import player from './ToneGenerator';
import scribble from 'scribbletune';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }

  playOrPause() {
    if(this.state.isPlaying) {
      player.stop();
    } else {
      var chord = scribble.chord('CMaj7').concat(scribble.chord('Am7')).concat(scribble.chord('Edom7'));
      var scale = scribble.scale('c', 'major', 3);
      player.start(
        {
          notes: chord,
          bpm: 120,
          noteLength: '8n',
          measures: 16
        }
      );
    }
    
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.playOrPause.bind(this)}>{this.state.isPlaying ? 'Stop' : 'Play'}</button>
      </div>
    );
  }
}
export default App;
