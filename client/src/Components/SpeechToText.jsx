import React, { Component } from 'react';

class SpeechToText extends Component {
  constructor() {
    super();
    this.state = {
      listening: false,
      transcript: '',
    };
  }

  startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      this.setState({ listening: true });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.setState({ transcript });
    };

    recognition.onend = () => {
      this.setState({ listening: false });
    };

    recognition.start();
  };

  render() {
    return (
      <div>
        <h2>Speech-to-Text</h2>
        <button onClick={this.startListening} disabled={this.state.listening}>
          Start Speaking
        </button>
        <p>Listening: {this.state.listening ? 'Yes' : 'No'}</p>
        <p>Transcript: {this.state.transcript}</p>
      </div>
    );
  }
}

export default SpeechToText;
