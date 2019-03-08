import React, { Component } from 'react';
import GradientHeader from './GradientHeader';

class SoundProject extends Component {

  constructor(props) {
    super(props)

    this.state = {
      sound: false,
      node: null,
      waveForm: "sine",
      frequency: 442,
    };

    // This binding is necessary to make `this` work in the callback
    this.play = this.play.bind(this);
    this.handleTune = this.handleTune.bind(this);
    this.handleWave = this.handleWave.bind(this);

  }

  play() {

    if (!this.state.sound) {

      // create web audio api context
      AudioContext = window.AudioContext || window.webkitAudioContext;

      const audioCtx = new AudioContext();

      // create Oscillator node
      const oscillator = audioCtx.createOscillator();

      // we need to store this node to stop it
      this.setState({node: oscillator});

      // create gain node to modify the volume
      const gainNode = audioCtx.createGain();

      // connect the oscillator to the gain node
      oscillator.connect(gainNode);

      // connect gain node to speakers
      gainNode.connect(audioCtx.destination);

      // Make some noise
      oscillator.type = this.state.waveForm;
      oscillator.frequency.value = this.state.frequency; // value in hertz
      gainNode.gain.value = 1;

      console.log(oscillator)

      // start the node
      oscillator.start(0);

    }

    else {
      // stop this node
      this.state.node.stop();
    }

    // let us know that there is sound or not
    this.setState({ sound: !this.state.sound });

  };

  handleTune(event) {
    this.setState({ frequency: event.target.value });

    // modify the sound frequency if that is possible
    if (this.state.node == null) return
    this.state.node.frequency.value = event.target.value;
  };

  handleWave(event) {
    this.setState({ waveForm: event.target.value });

    // modify the sound waveForm if possible
    if (this.state.node == null) return
    this.state.node.type = event.target.value;
  }

  render() {

    const heading = {
      title: this.state.frequency + ' hertz to tune your instrument',
      subTitle: 'Or modify this sound with the slider beneath',
      huge: true,
      button: {
        text: this.state.sound ? 'stop' : 'play',
        toggle: this.play,
      },
    };

    return(
      <main>
        <GradientHeader heading={heading} />
        <form className="content-container">
          <label htmlFor="tune">Pic another frequency:</label>
          <input
            type="range"
            name="tune"
            min="20"
            max="1000"
            value={this.state.frequency}
            onChange={this.handleTune}
            step="1"/>
            <label htmlFor="waveForm">Select another wave form:</label>
            <select
              name="waveForm"
              onChange={this.handleWave}
              value={this.state.waveForm}
              >
              <option value="sine">sine</option>
              <option value="square">square</option>
              <option value="sawtooth">sawtooth</option>
              <option value="triangle">triangle</option>
            </select>
        </form>
      </main>
    );

  };
};

export default SoundProject;
