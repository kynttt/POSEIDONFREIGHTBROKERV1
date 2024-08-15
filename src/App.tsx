import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Shared/pages/landingPage";
import SignUpPage from "./pages/signupPage";
import LoginPage from "./pages/Shared/pages/LoginPage";
// import QuoteDetails from './pages/QuoteDetails';
import TrailerOptionsPage from "./pages/TrailerOptionsPage";
import LoadBoard from "./pages/Admin/page/loadBoardPage";
import NonBusinessPage from "./pages/NonBusinessEmail";
import BookingConfirmation from "./pages/bookingSuccessful";
// import DispatchDetails from './pages/dispatchDetails';
import PaymentOptionPage from "./pages/ShipperUser/page/paymentOptionPage";
import ReportDetails from "./pages/ShipperUser/page/reportDetailsPage";
import NotFound from "./pages/Shared/pages/NotFound";
import Invoice from "./components/Invoice";
import AdminDashboard from "./pages/Admin/page/adminDashboardPage";

import AccountingReports from "./pages/accountingReport";
import AccountingPayment from "./pages/Admin/page/accountingPaymentPage";
import PerformanceOverview from "./pages/performanceGrade";
import ShipmentDetailsConfirmation from "./pages/ShipmentRequest/shipmentDetailsConfirmation";

import PrivateRoute from "./components/PrivateRoute";
import ShipmentDetails from "./pages/ShipperUser/page/shipmentDetailsPage";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Stripe from "./components/stripe/Stripe";
import BillOfLadingPage from "./pages/Admin/page/billOfLadingPage";
import EditLoad from "./pages/Admin/page/editLoadPage";

import ShipmentRequestShellPage from "./pages/ShipmentRequest/shipmentRequestShellPage";
import DistanceCalculatorPage from "./pages/ShipmentRequest/distanceCalculatorPage";
import ShipperShellPage from "./pages/ShipperUser/page/ShipperShellPage";
import ShipperDashboardPage from "./pages/ShipperUser/page/ShipperDashboardPage";
import ShipperUserPayablesPage from "./pages/ShipperUser/page/ShipperUserPayablesPage";
import ShipperProfilePage from "./pages/ShipperUser/page/ShipperProfilePage";
import AdminShellPage from "./pages/Admin/page/AdminShellPage";
import LegalPage from "./pages/Admin/page/LegalPage";
import BillOfLading from "./pages/billOfLading";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient";
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
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />
        <ModalsProvider>
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
                  <PrivateRoute
                    element={<ShipperShellPage />}
                    roles={["user"]}
                  />
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
                    <PrivateRoute
                      element={<ShipmentDetails />}
                      roles={["user"]}
                    />
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
                path="/bill-of-lading/:id"
                element={<PrivateRoute element={<BillOfLading />} />}
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
                  element={
                    <PrivateRoute element={<Stripe />} roles={["user"]} />
                  }
                />
              </Route>

              {/* TODO the Profile page will now be under with ShipperProfilePage and AdminProfilePage but it still returning Profile Card */}
              {/* <Route
            path="/profile"
            element={<PrivateRoute element={<ProfileCard />} />}
          /> */}

              {/* !Admin */}
              <Route
                path="/a"
                element={
                  <PrivateRoute
                    element={<AdminShellPage />}
                    roles={["admin"]}
                  />
                }
              >
                <Route
                  index
                  element={
                    <PrivateRoute
                      element={<AdminDashboard />}
                      roles={["admin"]}
                    />
                  }
                />
                <Route
                  path="admin-dashboard"
                  element={
                    <PrivateRoute
                      element={<AdminDashboard />}
                      roles={["admin"]}
                    />
                  }
                />
                <Route
                  path="legal-page"
                  element={
                    <PrivateRoute element={<LegalPage />} roles={["admin"]} />
                  }
                />
                <Route
                  path="trailer-options"
                  element={<PrivateRoute element={<TrailerOptionsPage />} />}
                />
                <Route
                  path="bill-lading"
                  element={
                    <PrivateRoute
                      element={<BillOfLadingPage />}
                      roles={["admin"]}
                    />
                  }
                />
                <Route
                  path="accounting-payment"
                  element={
                    <PrivateRoute
                      element={<AccountingPayment />}
                      roles={["admin"]}
                    />
                  }
                />
                <Route
                  path="editBooking/:id"
                  element={
                    <PrivateRoute element={<EditLoad />} roles={["admin"]} />
                  }
                />
                <Route
                  path="load-board"
                  element={
                    <PrivateRoute element={<LoadBoard />} roles={["admin"]} />
                  }
                />
                <Route
                  path="report-details"
                  element={
                    <PrivateRoute
                      element={<ReportDetails />}
                      roles={["admin"]}
                    />
                  }
                />
                <Route
                  path="accounting-report"
                  element={
                    <PrivateRoute
                      element={<AccountingReports />}
                      roles={["admin"]}
                    />
                  }
                />
              </Route>
              {/* ==END ADMIN=== */}

              <Route path="*" element={<NotFound />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
//
