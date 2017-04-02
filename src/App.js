import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
  }

  playOrPause() {
    if(this.state.isPlaying) {
      window.MIDIjs.stop();
    } else {
      window.MIDIjs.play('random-music.mid');
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
