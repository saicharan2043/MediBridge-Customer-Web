import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SearchResults from "../pages/SearchResults";
import MedicineDetails from "../pages/MedicineDetails";
import ReserveMedicine from "../pages/ReserveMedicine";
import ReservationConfirmation from "../pages/ReservationConfirmation";
import SuggestBrand from "../pages/SuggestBrand";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import AppLayout from "../layout";
import ReservationsSection from "../pages/Dashboard/ReservationsSection";
import RemindersSection from "../pages/Dashboard/RemindersSection";
import FavoritesSection from "../pages/Dashboard/FavoritesSection";
import ProfileSection from "../pages/Dashboard/ProfileSection";
import Dashboard from "../pages/Dashboard";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
  {
    path: "/medicine/:id",
    element: <MedicineDetails />,
  },
  {
    path: "/reserve/:id",
    element: <ReserveMedicine />,
  },
  {
    path: "/reserved/:reservationId",
    element: <ReservationConfirmation />,
  },
  {
    path: "/suggest-brand",
    element: <SuggestBrand />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard/> },
      { path: "reservations", element: <ReservationsSection /> },
      { path: "reminders", element: <RemindersSection /> },
      { path: "favorites", element: <FavoritesSection /> },
      { path: "profile", element: <ProfileSection /> },
    ],
  },
]);
