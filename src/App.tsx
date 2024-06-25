import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signupPage';
import QuoteDetails from './pages/QuoteDetails';
// import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/quote-details" element={<QuoteDetails />} />

      </Routes>
    </Router>
  );
};

export default App;
