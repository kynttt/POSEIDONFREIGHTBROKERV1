import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Shared/pages/landingPage";
import SignUpPage from "./pages/signupPage";
import LoginPage from "./pages/Shared/pages/LoginPage";
// import QuoteDetails from './pages/QuoteDetails';
import TrailerOptionsPage from "./pages/TrailerOptionsPage";
import LoadBoard from "./pages/Admin/page/LoadBoard";
import NonBusinessPage from "./pages/NonBusinessEmail";
import BookingConfirmation from "./pages/bookingSuccessful";
// import DispatchDetails from './pages/dispatchDetails';
import PaymentOptionPage from "./pages/ShipperUser/page/paymentOptionPage";
import ReportDetails from "./pages/reportDetails";
import NotFound from "./pages/Shared/pages/NotFound";
import Invoice from "./components/Invoice";
import AdminDashboard from "./pages/Admin/page/AdminDashboard";

import AccountingReports from "./pages/accountingReport";
import AccountingPayment from "./pages/Admin/page/accountingPayment";
import PerformanceOverview from "./pages/performanceGrade";
import ShipmentDetailsConfirmation from "./pages/shipmentDetailsConfirmation";

import PrivateRoute from "./components/PrivateRoute";
import ShipmentDetails from "./pages/ShipperUser/page/shipmentDetailsPage";

import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Stripe from "./components/stripe/Stripe";
import LegalPage from "./pages/Admin/page/LegalPage";
import BillOfLandingPage from "./pages/Admin/page/BillOfLanding";
import EditLoad from "./pages/Admin/page/EditLoad";
import ShipperUserPayablesPage from "./pages/ShipperUser/page/shipperUserPayablesPage";

import ShipperShellPage from "./pages/ShipperUser/page/shipperShellPage";
import ShipperDashboardPage from "./pages/ShipperUser/page/shipperDashboardPage";
import ShipperProfilePage from "./pages/ShipperUser/page/shipperProfilePage";
import ShipmentRequestShellPage from "./pages/ShipmentRequest/shipmentRequestShellPage";
import DistanceCalculatorPage from "./pages/ShipmentRequest/distanceCalculatorPage";
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
          {/* Shipper User Routes */}
          <Route
            path="/s"
            element={
              <PrivateRoute element={<ShipperShellPage />} roles={["user"]} />
            }
          >
            <Route
              index
              element={
                <PrivateRoute
                  element={<ShipperDashboardPage />}
                  roles={["user"]}
                />
              }
            />
            <Route
              path="shipper-dashboard"
              element={
                <PrivateRoute
                  element={<ShipperDashboardPage />}
                  roles={["user"]}
                />
              }
            />
            <Route
              path="user-payables"
              element={
                <PrivateRoute
                  element={<ShipperUserPayablesPage />}
                  roles={["user"]}
                />
              }
            />
            <Route
              path="performance-grade"
              element={
                <PrivateRoute
                  element={<PerformanceOverview />}
                  roles={["user"]}
                />
              }
            />
            <Route
              path="shipmentDetails/:id"
              element={
                <PrivateRoute element={<ShipmentDetails />} roles={["user"]} />
              }
            />

            <Route
              path="profile"
              element={
                <PrivateRoute
                  element={<ShipperProfilePage />}
                  roles={["user"]}
                />
              }
            />
            <Route
              path="trailer-options"
              element={<PrivateRoute element={<TrailerOptionsPage />} />}
            />

            <Route
              path="payment-option"
              element={<PrivateRoute element={<PaymentOptionPage />} />}
            />
          </Route>

          {/* ==== END Shipper User Route=== */}
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
            path="/invoice"
            element={<PrivateRoute element={<Invoice />} />}
          />

          <Route path="/requests" element={<ShipmentRequestShellPage />}>
            <Route index element={<DistanceCalculatorPage />} />
            <Route
              path="confirmation"
              element={
                <PrivateRoute
                  element={<ShipmentDetailsConfirmation />}
                  roles={["user"]}
                />
              }
            />
            <Route
              path="payment"
              element={<PrivateRoute element={<Stripe />} roles={["user"]} />}
            />
          </Route>

          {/* TODO the Profile page will now be under with ShipperProfilePage and AdminProfilePage but it still returning Profile Card */}
          {/* <Route
            path="/profile"
            element={<PrivateRoute element={<ProfileCard />} />}
          /> */}

          {/* !Admin */}
          <Route
            path="/legal-page"
            element={<PrivateRoute element={<LegalPage />} roles={["admin"]} />}
          />

          <Route
            path="/bill-lading"
            element={
              <PrivateRoute element={<BillOfLandingPage />} roles={["admin"]} />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute element={<AdminDashboard />} roles={["admin"]} />
            }
          />
          <Route
            path="/accounting-payment"
            element={
              <PrivateRoute element={<AccountingPayment />} roles={["admin"]} />
            }
          />
          <Route
            path="/editBooking/:id"
            element={<PrivateRoute element={<EditLoad />} roles={["admin"]} />}
          />
          <Route
            path="/load-board"
            element={<PrivateRoute element={<LoadBoard />} roles={["admin"]} />}
          />

          <Route
            path="/report-details"
            element={
              <PrivateRoute element={<ReportDetails />} roles={["admin"]} />
            }
          />

          <Route
            path="/accounting-report"
            element={
              <PrivateRoute element={<AccountingReports />} roles={["admin"]} />
            }
          />
          {/* ==END ADMIN=== */}

          <Route path="*" element={<NotFound />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
