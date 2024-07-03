import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signupPage';
import LoginPage from './pages/LoginPage';
import QuoteDetails from './pages/QuoteDetails';
import TrailerOptionsPage from './pages/TrailerOptionsPage';
import LoadBoard from './pages/LoadBoard';
import NonBusinessPage from './pages/NonBusinessEmail';
import BookingConfirmation from './pages/bookingSuccessful';
import UserDashboard from './pages/userDashboard';
import BillOfLandingPage from './pages/billOfLanding';
import DispatchDetails from './pages/dispatchDetails';
import { AuthProvider } from './components/AuthContext';
import PaymentOptionPage from './pages/paymentOptionPage';


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider> {/* Wrap entire app with AuthProvider */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quote-details" element={<QuoteDetails />} />
          <Route path="/trailer-options" element={<TrailerOptionsPage />} />
          <Route path="/load-board" element={<LoadBoard />} />
          <Route path="/nonbusiness" element={<NonBusinessPage />} />
          <Route path="/booking-successful" element={<BookingConfirmation />} />
          <Route path="/bill-landing" element={< BillOfLandingPage/>} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/dispatch-details" element={<DispatchDetails />} />
          <Route path="/payment-option" element={<PaymentOptionPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
