import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatPg from "./Components/ChatPg";
import BreathingCircle from "./breathing/BreathingCircle";
import PeerChat from "./Components/PeerChat";
import SpeechToText from "./Components/SpeechToText";
import Landing from "./Layout/Landing";
import Private from "./Components/Private";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="" element={<Private/>} exact>
        <Route path="/chatPg" element={<ChatPg />} />
      </Route>
      <Route path="/breathingGame" element={<BreathingCircle />} />
      <Route path='/peerchat' element={<PeerChat/>}/>
      <Route path='/speech' element={<SpeechToText/>}/>
    </Routes>
  );
}

export default App;

