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
import UserPayables from './pages/userDashboard';
import BillOfLadingPage from './pages/billOfLanding';
import DispatchDetails from './pages/dispatchDetails';
import { AuthProvider } from './components/AuthContext';
import PaymentOptionPage from './pages/paymentOptionPage';
import ReportDetails from './pages/reportDetails';
import NotFound from './pages/NotFound'
import Invoice from './components/Invoice';
<<<<<<< HEAD
import LegalPage from './pages/legalPage';
=======
import AdminDashboard from './pages/User/page/AdminDashboard';
// import PrivateRoute from './components/PrivateRoute';
>>>>>>> 8079d461f1f7f0890df7f7f7acbe49d80dc5f41e

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
          <Route path="/nonbusiness" element={<NonBusinessPage />} />
          <Route path="/booking-successful" element={<BookingConfirmation />} />
          <Route path="/dispatch-details" element={<DispatchDetails />} />
          <Route path="/payment-option" element={<PaymentOptionPage />} />
          <Route path="/report-details" element={<ReportDetails />} />
          <Route path="/invoice" element={<Invoice />} />
<<<<<<< HEAD
          <Route path="/legal-page" element={<LegalPage />} />
=======
          <Route path="/user-payables" element={<UserPayables />} />
          <Route path="/load-board" element={<LoadBoard />} />
          <Route path="/bill-lading" element={<BillOfLadingPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

 {/* Revise here if for private route implimentation */}
          {/* <Route
            path="/load-board"
            element={
              <PrivateRoute element={<LoadBoard />} roles={['admin']} />
            }
          />
          <Route
            path="/bill-lading"
            element={
              <PrivateRoute element={<BillOfLadingPage />} roles={['admin']} />
            }
          /> */}
>>>>>>> 8079d461f1f7f0890df7f7f7acbe49d80dc5f41e
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
