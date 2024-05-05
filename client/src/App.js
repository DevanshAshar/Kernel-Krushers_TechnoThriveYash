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
import QuestionnaireForm from "./Components/QuestionnaireForm";
import RescueSessions from "./Components/RescueSessions";
import Room from "./Components/Room";
import DoctorPg from "./Components/DoctorPg";
import DrawingSection from "./Components/DrawingSection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="" element={<Private/>} exact>
        <Route path="/chatPg" element={<ChatPg />} />
        <Route path="/regionalBot" element={<RegionalBot/>}/>
        <Route path="/room/:id" element={<Room/>}/>
        <Route path='/form' element={<QuestionnaireForm/>}/>
      </Route>
      <Route path="/breathingGame" element={<BreathingCircle />} />
      <Route path="/doctorPg" element={<DoctorPg/>}/>
      <Route path='/peerchat' element={<PeerChat/>}/>
      <Route path='/speech' element={<SpeechToText/>}/>
      <Route path='/srd' element={<SpeechRecognitionDemo/>}/>
      <Route path='/speak' element={<RescueSessions/>}/>      
      <Route path='/drw' element={<DrawingSection/>}/>
    </Routes>
  );
}

export default App;

