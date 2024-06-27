import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signupPage';
import QuoteDetails from './pages/QuoteDetails';
import LoginPage from './pages/LoginPage';
import TrailerOptionsPage from './pages/TrailerOptionsPage';
import LoadBoard from './pages/LoadBoard';
import NonBusinessPage from './pages/NonBusinessEmail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quote-details" element={<QuoteDetails />} />
        <Route path="/trailer-options" element={<TrailerOptionsPage />} />
        <Route path="/load-board" element={<LoadBoard />} />
        <Route path="/nonbusiness" element={<NonBusinessPage />} />

      </Routes>
    </Router>
  );
};

export default App;
