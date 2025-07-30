import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pill } from "lucide-react";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login state from localStorage
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary">
              <Pill className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              MediBridge
            </span>
          </Link>

          {/* Middle: (empty, no tabs) */}
          <div className="flex-1 flex justify-center"></div>

          {/* Right: Login or Dashboard button */}
          <div className="flex items-center space-x-2">
            {(!isLoggedIn && location.pathname !== '/login') && (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )} 
            {isLoggedIn && (
              <>
                {!isDashboardPage && (
                  <Button size="sm" onClick={handleDashboard}>
                    Dashboard
                  </Button>
                )}
                
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
