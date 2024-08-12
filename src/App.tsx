import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Shared/pages/landingPage";
import SignUpPage from "./pages/signupPage";
import LoginPage from "./pages/Shared/pages/LoginPage";
// import QuoteDetails from './pages/QuoteDetails';
import TrailerOptionsPage from "./pages/TrailerOptionsPage";
import LoadBoard from "./pages/User/page/LoadBoard";
import NonBusinessPage from "./pages/NonBusinessEmail";
import BookingConfirmation from "./pages/bookingSuccessful";
import UserPayables from "./pages/userDashboard";
import BillOfLadingPage from "./pages/User/page/billOfLanding";
// import DispatchDetails from './pages/dispatchDetails';
import PaymentOptionPage from "./pages/paymentOptionPage";
import ReportDetails from "./pages/reportDetails";
import NotFound from "./pages/Shared/pages/NotFound";
import Invoice from "./components/Invoice";
import LegalPage from "./pages/User/page/legalPage";
import AdminDashboard from "./pages/User/page/AdminDashboard";
import DistanceCalculator from "./components/googleMap/GoogleMapsComponent";
import Profile from "./pages/profile";
import AccountingReports from "./pages/accountingReport";
import AccountingPayment from "./pages/User/page/accountingPayment";
import ShipperDashboard from "./pages/ShipperUser/components/shipperDashboard";
import PerformanceOverview from "./pages/performanceGrade";
import ShipmentDetailsConfirmation from "./pages/shipmentDetailsConfirmation";

import PrivateRoute from "./components/PrivateRoute";
import ShipmentDetails from "./pages/ShipmentDetails";

import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Stripe from "./components/stripe/Stripe";
import EditLoad from "./pages/User/page/editLoad";
import Bol from "./pages/Shared/pages/bol";
const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 5,
  breakpoints: {
    xs: "20em", // Approximately 320px
    sm: "30em", // Approximately 480px
    md: "48em", // Approximately 768px
    lg: "75em", // Approximately 1200px
    xl: "80em", // Approximately 1280px
  },
  colors: {
    brand: [
      "#f0f5ff",
      "#d9e2ff",
      "#b2c4ff",
      "#8ca7ff",
      "#657aff",
      "#252F70",
      "#324bcc",
      "#253899",
      "#192666",
      "#0c1333",
    ],
  },
});

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/quote-details" element={<QuoteDetails />} /> */}
          <Route
            path="/trailer-options"
            element={<PrivateRoute element={<TrailerOptionsPage />} />}
          />
          <Route
            path="/nonbusiness"
            element={<PrivateRoute element={<NonBusinessPage />} />}
          />
          <Route
            path="/booking-successful"
            element={<PrivateRoute element={<BookingConfirmation />} />}
          />
          {/* <Route path="/dispatch-details" element={<PrivateRoute element={<DispatchDetails />} />} /> */}
          <Route
            path="/payment-option"
            element={<PrivateRoute element={<PaymentOptionPage />} />}
          />
          <Route
            path="/report-details"
            element={
              <PrivateRoute element={<ReportDetails />} roles={["admin"]} />
            }
          />
          <Route
            path="/invoice"
            element={<PrivateRoute element={<Invoice />} />}
          />
          <Route
            path="/legal-page"
            element={<PrivateRoute element={<LegalPage />} roles={["admin"]} />}
          />
          <Route
            path="/user-payables"
            element={
              <PrivateRoute element={<UserPayables />} roles={["user"]} />
            }
          />
          <Route
            path="/load-board"
            element={<PrivateRoute element={<LoadBoard />} roles={["admin"]} />}
          />
          <Route
            path="/bill-lading"
            element={
              <PrivateRoute element={<BillOfLadingPage />} roles={["admin"]} />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute element={<AdminDashboard />} roles={["admin"]} />
            }
          />
          <Route path="/distance-calculator" element={<DistanceCalculator />} />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/accounting-report"
            element={
              <PrivateRoute element={<AccountingReports />} roles={["admin"]} />
            }
          />
          <Route
            path="/accounting-payment"
            element={
              <PrivateRoute element={<AccountingPayment />} roles={["admin"]} />
            }
          />
          <Route
            path="/bol"
            element={
              <PrivateRoute element={<Bol />}  />
            }
          />
          <Route
            path="/shipper-dashboard"
            element={
              <PrivateRoute element={<ShipperDashboard />} roles={["user"]} />
            }
          />
          <Route
            path="/performance-grade"
            element={
              <PrivateRoute
                element={<PerformanceOverview />}
                roles={["user"]}
              />
            }
          />
          <Route
            path="/shipmentDetails/:id"
            element={
              <PrivateRoute element={<ShipmentDetails />} roles={["user"]} />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/shipment-report"
            element={
              <PrivateRoute
                element={<ShipmentDetailsConfirmation />}
                roles={["user"]}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute
                element={<Stripe />}
                roles={["user"]}
              />
            }
          />
          <Route
            path="/editBooking/:id"
            element={
              <PrivateRoute element={<EditLoad />} roles={["admin"]} />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        
      </Router>
    </MantineProvider>
  );
};

export default App;
