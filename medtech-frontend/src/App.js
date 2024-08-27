import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginComponent from './components/Authentication/Login';
import SignUpComponent from './components/Authentication/SignUp';
import ResearchManager from './components/ResearchManager';
import ResearchParticipant from './components/ResearchParticipant';
import LandingPage from './components/LandingPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/sign" element={<SignUpComponent />} />
          <Route path='/research'element={<ResearchManager/>}/>
          <Route path='/participant'element={<ResearchParticipant/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
