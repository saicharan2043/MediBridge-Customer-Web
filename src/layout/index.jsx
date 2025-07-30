import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { CustomerSidebar } from "@/components/customer-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

function AppLayout() {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full">
      {isMobile ? (
        <>
          {/* Mobile Top Bar */}
          <div className="flex items-center h-14 px-4 border-b border-border bg-background sticky top-0 z-40">
            <button
              className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
            <span className="ml-4 text-lg font-bold text-foreground">
              MediBridge
            </span>
          </div>

          {/* Sidebar Overlay */}
          {mobileSidebarOpen && (
            <>
              {/* Overlay background */}
              <div
                className="fixed inset-0 bg-black/40 z-50"
                onClick={() => setMobileSidebarOpen(false)}
              />
              {/* Sidebar as overlay */}
              <div className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs">
                <CustomerSidebar
                  collapsed={false}
                  setCollapsed={() => {}}
                  onClose={() => setMobileSidebarOpen(false)}
                  isMobileOverlay
                />
              </div>
            </>
          )}

          <main className="p-6 overflow-auto h-[calc(100vh-56px)]">
            <Outlet />
          </main>
        </>
      ) : (
        <div className="flex w-full h-full">
          <CustomerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <main className="flex-1 p-6 overflow-auto h-full">
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
}

export default AppLayout;
