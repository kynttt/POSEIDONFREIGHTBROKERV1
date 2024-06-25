import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
// import SignUp from './components/SignUp';
// import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
