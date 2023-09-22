import React, { useState, useEffect } from 'react';

const SpeechRecognitionDemo = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('gu'); 

  let recognition = null;

  useEffect(() => {
    // Check browser support for the SpeechRecognition API
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.lang = selectedLanguage; 

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscript(transcript);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onerror = (error) => {
        console.error('Speech recognition error:', error);
        setListening(false);
      };
    } else {
      console.error('Speech recognition not supported in this browser.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <div>
      <h1>Speech Recognition Demo</h1>
      <div>
        <p>Selected Language: {selectedLanguage}</p>
      </div>
      <button onClick={startListening} disabled={listening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!listening}>
        Stop Listening
      </button>
      <p>Transcript:</p>
      <textarea
        rows="4"
        cols="50"
        readOnly
        value={transcript}
      ></textarea>
    </div>
  );
};

export default SpeechRecognitionDemo;
