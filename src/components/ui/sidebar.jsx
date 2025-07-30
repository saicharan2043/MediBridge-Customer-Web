import React from "react";

export function useSidebar() {
  // No-op for compatibility; returns an object with collapsed always false and a dummy setter
  return { collapsed: false, setCollapsed: () => {} };
}

export function Sidebar({
  children,
  collapsed = false,
  className = "",
  collapsible,
  ...props
}) {
  return (
    <aside
      className={`bg-background border-r border-border h-full flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-60"
      } ${className}`}
      {...props}
    >
      {children}
    </aside>
  );
}

export function SidebarContent({ children, className = "", ...props }) {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({
  children,
  open = true,
  onOpenChange,
  ...props
}) {
  // open/close logic can be expanded as needed
  return open ? <div {...props}>{children}</div> : null;
}

export function SidebarGroupContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SidebarGroupLabel({ children, className = "", ...props }) {
  return (
    <div
      className={`px-4 py-2 text-xs font-semibold text-muted-foreground uppercase ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarMenu({ children, ...props }) {
  return <nav {...props}>{children}</nav>;
}

export function SidebarMenuItem({ children, ...props }) {
  return (
    <div className="w-full" {...props}>
      {children}
    </div>
  );
}

export function SidebarMenuButton({ children, collapsed, asChild, ...props }) {
  // asChild allows passing a NavLink or button as child
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ...props });
  }
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

export function SidebarTrigger({ className = "", ...props }) {
  // Simple trigger icon (hamburger)
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-md border p-2 ${className}`}
      {...props}
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
}

export function SidebarFooter({ children, className = "", ...props }) {
  return (
    <div className={`p-2 border-t border-border ${className}`} {...props}>
      {children}
    </div>
  );
}
