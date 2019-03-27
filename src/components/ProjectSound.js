import React, { Component } from 'react';
import GradientHeader from './GradientHeader';

class ProjectSound extends Component {

  constructor(props) {
    super(props)

    this.canvas = React.createRef();

    this.state = {
      sound: false,
      node: null,
      waveForm: 'sine',
      frequency: 442,
    };

    // This binding is necessary to make `this` work in the callback
    this.play = this.play.bind(this);
    this.handleTune = this.handleTune.bind(this);
    this.handleWave = this.handleWave.bind(this);

    this.tick = this.tick.bind(this);


  }

  play() {

    // is the Web Audio API supported?
    if (!window.AudioContext && !window.webkitAudioContext) {
      alert("Sorry, but the Web Audio API is not supported by your browser. The latest version of Google Chrome and Mozilla Firefox support the AudioContext API");

      return;
    };

    // is there a sound
    if (!this.state.sound) {

      let audioCtx;

      // create web audio api context
      if (window.webkitAudioContext) {
        webkitAudioContext = window.webkitAudioContext;
        audioCtx = new webkitAudioContext();
      } else {

        // AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }

      // safari bug
      if(audioCtx === null) {
        alert("Do not click like a maniac, reload to fix this bug.");
        return;
      }

      // create Oscillator node
      const oscillator = audioCtx.createOscillator();

      // we need to store this node to stop it
      this.setState({node: oscillator});

      // create gain node to modify the volume
      const gainNode = audioCtx.createGain();

      // connect the oscillator to the gain node
      oscillator.connect(gainNode);

      // analyse the sound to paint a sine wave
      this.analyser = audioCtx.createAnalyser();
      oscillator.connect(this.analyser);
      this.analyser.fftSize = 1024;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      this.analyser.getByteFrequencyData(this.dataArray);
      this.raf = requestAnimationFrame(this.tick);

      // connect gain node to speakers
      gainNode.connect(audioCtx.destination);

      // Make some noise
      oscillator.type = this.state.waveForm;
      oscillator.frequency.value = this.state.frequency; // value in hertz
      gainNode.gain.value = 1;

      // start the node
      oscillator.start(0);

      // draw sinewave
      this.draw();

    }

    else {
      // stop this node
      this.state.node.stop();
    }

    // let us know that there is sound or not
    this.setState({ sound: !this.state.sound });

  };

  tick() {
    // super bad for performance
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.raf = requestAnimationFrame(this.tick);

    // draw the animation
    this.draw();
  };

  draw() {
    const audioData = this.dataArray;
    const canvas = this.canvas.current;

    // set the canvas width to 100vw
    canvas.width = window.innerWidth;
    const amplitude = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    const sliceWidth = (width * 1) / audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "hsla(240, 90%, 50%, 1)";
    context.clearRect(0, 0, width, amplitude);

    context.beginPath();
    context.moveTo(0, amplitude / 2);

    let x = 0;

    for (const item of audioData) {
      const y = (item / 256) * amplitude;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, amplitude / 2);
    context.stroke();
  }

  handleTune(event) {
    this.setState({ frequency: event.target.value });

    // modify the sound frequency if there is any
    if (this.state.node === null) return;
    this.state.node.frequency.value = event.target.value;
  };

  handleWave(event) {
    this.setState({ waveForm: event.target.value });

    // modify the sound waveForm if there is any
    if (this.state.node === null) return;
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

        <canvas ref={this.canvas}></canvas>
      </main>
    );

  };
};

export default ProjectSound;
