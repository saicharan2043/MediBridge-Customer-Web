import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  ShoppingBag,
  UserCheck,
  BarChart3,
  Store,
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/pharmacy/dashboard", icon: Home },
  { title: "Add Stock", url: "/pharmacy/add-stock", icon: Plus },
  { title: "Manage Inventory", url: "/pharmacy/inventory", icon: ShoppingBag },
  { title: "Reservations", url: "/pharmacy/reservations", icon: UserCheck },
  { title: "Analytics", url: "/pharmacy/analytics", icon: BarChart3 },
];

export function PharmacySidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;
  const isExpanded = navigationItems.some((item) => isActive(item.url));

  const getNavClasses = ({ isActive }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "hover:bg-muted/50 text-foreground";

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-60"}
      collapsed={collapsed}
      collapsible
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-accent">
            <Store className="h-6 w-6 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">
                ABC Pharmacy
              </h2>
              <p className="text-xs text-muted-foreground">Pharmacy Portal</p>
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

      <SidebarContent>
        <SidebarGroup open={isExpanded} onOpenChange={() => {}}>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
