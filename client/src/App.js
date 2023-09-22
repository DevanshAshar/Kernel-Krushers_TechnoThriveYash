import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPg from "./Components/ChatPg";
import BreathingCircle from "./breathing/BreathingCircle";
import PeerChat from "./Components/PeerChat";
import SpeechToText from "./Components/SpeechToText";
import Landing from "./Layout/Landing";
import Private from "./Components/Private";
import SpeechRecognitionDemo from "./Components/SpeechRecognitionDemo";
import TextToSpeech from "./Components/TextToSpeech";
import RegionalBot from "./Components/RegionalBot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="" element={<Private/>} exact>
        <Route path="/chatPg" element={<ChatPg />} />
        <Route path="/regionalBot" element={<RegionalBot/>}/>
      </Route>
      <Route path="/breathingGame" element={<BreathingCircle />} />
      <Route path='/peerchat' element={<PeerChat/>}/>
      <Route path='/speech' element={<SpeechToText/>}/>
      <Route path='/srd' element={<SpeechRecognitionDemo/>}/>
      <Route path='/speak' element={<TextToSpeech/>}/>
    </Routes>
  );
}

export default App;

