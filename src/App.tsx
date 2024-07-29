import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signupPage';
import LoginPage from './pages/LoginPage';
// import QuoteDetails from './pages/QuoteDetails';
import TrailerOptionsPage from './pages/TrailerOptionsPage';
import LoadBoard from './pages/LoadBoard';
import NonBusinessPage from './pages/NonBusinessEmail';
import BookingConfirmation from './pages/bookingSuccessful';
import UserPayables from './pages/userDashboard';
import BillOfLadingPage from './pages/billOfLanding';
// import DispatchDetails from './pages/dispatchDetails';
import PaymentOptionPage from './pages/paymentOptionPage';
import ReportDetails from './pages/reportDetails';
import NotFound from './pages/NotFound';
import Invoice from './components/Invoice';
import LegalPage from './pages/legalPage';
import AdminDashboard from './pages/User/page/AdminDashboard';
import DistanceCalculator from './components/googleMap/GoogleMapsComponent';
import Profile from './pages/profile';
import AccountingReports from './pages/accountingReport';
import AccountingPayment from './pages/accountingPayment';
import ShipperDashboard from './pages/ShipperUser/components/shipperDashboard';
import PerformanceOverview from './pages/performanceGrade';

import PrivateRoute from './components/PrivateRoute';
import ShipmentDetails from './pages/ShipmentDetails';
import AboutAgentPage from './pages/aboutAgent';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/quote-details" element={<QuoteDetails />} /> */}
        <Route path="/trailer-options" element={<PrivateRoute element={<TrailerOptionsPage />} />} />
        <Route path="/nonbusiness" element={<PrivateRoute element={<NonBusinessPage />} />} />
        <Route path="/booking-successful" element={<PrivateRoute element={<BookingConfirmation />} />} />
        {/* <Route path="/dispatch-details" element={<PrivateRoute element={<DispatchDetails />} />} /> */}
        <Route path="/payment-option" element={<PrivateRoute element={<PaymentOptionPage />} />} />
        <Route path="/report-details" element={<PrivateRoute element={<ReportDetails />} roles={['admin']} />} />
        <Route path="/invoice" element={<PrivateRoute element={<Invoice />} />} />
        <Route path="/legal-page" element={<PrivateRoute element={<LegalPage />} roles={['admin']} />} />
        <Route path="/user-payables" element={<PrivateRoute element={<UserPayables />} roles={['user']} />} />
        <Route path="/load-board" element={<PrivateRoute element={<LoadBoard />} roles={['admin']} />} />
        <Route path="/bill-lading" element={<PrivateRoute element={<BillOfLadingPage />} roles={['admin']} />} />
        <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} roles={['admin']} />} />
        <Route path="/distance-calculator" element={<DistanceCalculator />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/accounting-report" element={<PrivateRoute element={<AccountingReports />} roles={['admin']} />} />
        <Route path="/accounting-payment" element={<PrivateRoute element={<AccountingPayment />} roles={['admin']} />} />
        <Route path="/shipper-dashboard" element={<PrivateRoute element={<ShipperDashboard />} roles={['user']} />} />
        <Route path="/performance-grade" element={<PrivateRoute element={<PerformanceOverview />} roles={['user']} />} />
        <Route path="/shipmentDetails/:id" element={<PrivateRoute element={<ShipmentDetails />} roles={['user']} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/aboutAgent" element={<AboutAgentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
