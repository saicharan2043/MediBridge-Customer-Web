import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SearchResults from "./pages/SearchResults";
import MedicineDetails from "./pages/MedicineDetails";
import ReserveMedicine from "./pages/ReserveMedicine";
import ReservationConfirmation from "./pages/ReservationConfirmation";
import SuggestBrand from "./pages/SuggestBrand";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
// import PharmacyLogin from "./pages/pharmacy/Login";
// import PharmacyDashboard from "./pages/pharmacy/Dashboard";
// import PharmacyProfile from "./pages/pharmacy/Profile";
// import AddStock from "./pages/pharmacy/AddStock";
// import ManageInventory from "./pages/pharmacy/ManageInventory";
// import ReservationRequests from "./pages/pharmacy/ReservationRequests";
// import Analytics from "./pages/pharmacy/Analytics";
// import AdminLogin from "./pages/admin/Login";
// import AdminDashboard from "./pages/admin/Dashboard";
// import ManagePharmacies from "./pages/admin/ManagePharmacies";
// import ManageReservations from "./pages/admin/ManageReservations";
// import MedicineMaster from "./pages/admin/MedicineMaster";
// import Reports from "./pages/admin/Reports";
import NotFound from "./pages/NotFound";
import { router } from "./routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
