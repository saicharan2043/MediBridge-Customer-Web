import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  Plus,
  Pill,
  ShoppingBag,
  UserCheck,
  BarChart3,
  Store,
  User,
  LogOut,
  Shield,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";


const navigationItems = [
  { title: "Dashboard", url: "/customer", icon: Home },
  { title: "Reminders", url: "/customer/reminders", icon: Store },
  { title: "Favorites", url: "/admin/favorites", icon: UserCheck },
  { title: "Profile", url: "/admin/profile", icon: Pill },
];

export function CustomerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;
  const isExpanded = navigationItems.some((item) => isActive(item.url));

  const getNavClasses = ({ isActive }) =>
    isActive
      ? "w-full justify-start bg-primary text-primary-foreground font-medium flex items-center gap-2 rounded-md p-2"
      : "w-full justify-start hover:bg-muted/50 text-foreground flex items-center gap-2 rounded-md p-2";

  // Handler for logout
  const handleLogout = () => {
    navigate("/login");
  };

  // Sidebar content
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-accent">
            <Shield className="h-5 w-5 text-destructive-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Admin Portal
              </h2>
              <p className="text-xs text-muted-foreground">
                MediBridge Management
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Trigger - Always visible */}
      <div className="p-2">
        <SidebarTrigger
          className="w-full"
          onClick={() => setCollapsed((prev) => !prev)}
        />
      </div>

      <SidebarContent className="flex-1 flex flex-col">
        <SidebarGroup open={isExpanded} onOpenChange={() => {}}>
          {/* <SidebarGroupLabel>Navigation</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton collapsed={collapsed}>
                      <NavLink to={item.url} end className={getNavClasses}>
                        <Icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Spacer to push bottom tabs to the bottom */}
        <div className="flex-1" />
        {/* Bottom Profile and Logout Tabs */}
        <div className="flex flex-col gap-1 mb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton collapsed={collapsed}>
                <NavLink
                  to="/pharmacy/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "w-full justify-start bg-primary text-primary-foreground font-medium flex items-center gap-2 rounded-md p-2"
                      : "w-full justify-start hover:bg-muted/50 text-foreground flex items-center gap-2 rounded-md p-2"
                  }
                >
                  <User className="h-4 w-4" />
                  {!collapsed && <span>Profile</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton collapsed={collapsed}>
                <div
                  onClick={handleLogout}
                  className="w-full justify-start flex items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-red-100 hover:text-red-600 text-foreground cursor-pointer"
                  style={{
                    outline: "none",
                    border: "none",
                    background: "none",
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </div>
  );

  // Mobile overlay logic
  if (isMobile) {
    return (
      <>
        {/* Hamburger button at the top of the page, above all content */}
        <div className="w-full flex justify-start items-center p-2 md:hidden">
          <button
            className="p-2 rounded-md bg-primary text-primary-foreground shadow-lg"
            onClick={() => setMobileOpen(true)}
            aria-label="Open sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Sidebar Drawer Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            {/* Sidebar Drawer */}
            <div className="relative z-50 h-full w-64 bg-sidebar shadow-xl animate-slide-in-left overflow-y-auto">
              {/* Close button */}
              <button
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted"
                onClick={() => setMobileOpen(false)}
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
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return <Sidebar collapsed={collapsed}>{sidebarContent}</Sidebar>;
}
