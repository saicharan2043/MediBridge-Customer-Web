import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Calendar, Bell, Heart, User, LogOut, Pill, Home } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Reservations", url: "/dashboard/reservations", icon: Calendar },
  { title: "Reminders", url: "/dashboard/reminders", icon: Bell },
  { title: "Favorites", url: "/dashboard/favorites", icon: Heart },
  { title: "Profile", url: "/dashboard/profile", icon: User },
];

export function CustomerSidebar({
  collapsed,
  setCollapsed,
  onClose,
  isMobileOverlay,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  const getNavClasses = ({ isActive }) =>
    isActive
      ? "w-full flex flex-row items-center justify-start bg-primary text-primary-foreground font-medium gap-2 rounded-md p-3"
      : "w-full flex flex-row items-center justify-start hover:bg-muted/50 text-foreground gap-2 rounded-md p-3";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
    if (onClose) onClose();
  };

  // Sidebar container classes
  const sidebarContainerClass = isMobileOverlay
    ? "fixed top-0 left-0 h-full w-full max-w-xs bg-background z-50 shadow-lg border-r border-border flex flex-col"
    : "flex flex-col h-full px-3 py-2";

  return (
    <Sidebar
      collapsed={collapsed}
      className={isMobileOverlay ? "w-full max-w-xs" : ""}
    >
      <div className={sidebarContainerClass}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-primary">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  MediBridge
                </h2>
                <p className="text-xs text-muted-foreground">Customer Portal</p>
              </div>
            )}
          </div>
          {isMobileOverlay && (
            <button
              className="ml-2 p-2 rounded-md hover:bg-muted focus:outline-none"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Sidebar Trigger (hide on mobile overlay) */}
        {!isMobileOverlay && (
          <div className="p-2">
            <SidebarTrigger
              className="w-full"
              onClick={() => setCollapsed((prev) => !prev)}
            />
          </div>
        )}

        <SidebarContent className="flex-1 flex flex-col">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <div className="flex flex-col items-center justify-center gap-3 flex-1 mt-auto mb-auto w-full">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          collapsed={collapsed}
                          asChild
                          onClick={isMobileOverlay ? onClose : undefined}
                        >
                          <NavLink to={item.url} end className={getNavClasses}>
                            <Icon className="h-6 w-6" />
                            {!collapsed && (
                              <span className="text-center">{item.title}</span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="flex-1" />
          {/* Bottom Logout Tab Only */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  collapsed={collapsed}
                  onClick={handleLogout}
                  className="w-full flex flex-row items-center justify-start gap-2 p-3 rounded-md hover:text-red-600 text-foreground"
                >
                  <LogOut className="h-6 w-6" />
                  {!collapsed && <span className="text-center">Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
