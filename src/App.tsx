import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signupPage';
import QuoteDetails from './pages/QuoteDetails';
import LoginPage from './pages/LoginPage';
import TrailerOptionsPage from './pages/TrailerOptionsPage';
import LoadBoard from './pages/LoadBoard';
import NonBusinessPage from './pages/NonBusinessEmail';
import BookingConfirmation from './pages/bookingSuccessful';
import UserDashboard from './pages/userDashboard';
<<<<<<< HEAD
import BillOfLandingPage from './pages/billOfLanding';
=======
import DispatchDetails from './pages/dispatchDetails';
>>>>>>> d82b8ad1d23d6c2c022ccf2ef4c217e345765dab

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
        <Route path="/booking-successful" element={<BookingConfirmation />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
<<<<<<< HEAD
        <Route path="/bill-landing" element={< BillOfLandingPage/>} />
=======
        <Route path="/dispatch-details" element={<DispatchDetails />} />

>>>>>>> d82b8ad1d23d6c2c022ccf2ef4c217e345765dab

      </Routes>
    </Router>
  );
};

export default App;
