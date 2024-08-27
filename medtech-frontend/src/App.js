import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import ApplicationComponent from './components/Application';
import CommunicationLogComponent from './components/Communication';
import Coordinator from './components/Coordinator';
import MatchingLogManager from './components/MatchingLog';
import NotificationManager from './components/Notification';
import OutreachManager from './components/Outreach';
import ParticipantManager from './components/Participant';
import Research from './components/Research';
import Trial from './components/Trail';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ApplicationComponent />} />
          <Route path="/communication" element={<CommunicationLogComponent />} />
          <Route path="/coordinator" element={<Coordinator />} />
          <Route path="/matching-log" element={<MatchingLogManager />} />
          <Route path="/notification" element={<NotificationManager />} />
          <Route path="/outreach" element={<OutreachManager />} />
          <Route path="/participant" element={<ParticipantManager />} />
          <Route path="/research" element={<Research />} />
          <Route path="/trial" element={<Trial />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
