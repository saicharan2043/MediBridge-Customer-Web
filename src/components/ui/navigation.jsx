import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Home, 
  Plus, 
  BarChart3, 
  UserCheck, 
  ShoppingBag, 
  Menu, 
  X,
  Pill,
  Store,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation({ userRole = 'customer' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const customerLinks = [
    { to: '/', label: 'Search Medicine', icon: Search },
    { to: '/medicine-details', label: 'Medicine Details', icon: Pill },
  ];

  const pharmacyLinks = [
    { to: '/pharmacy/dashboard', label: 'Dashboard', icon: Home },
    { to: '/pharmacy/add-stock', label: 'Add Stock', icon: Plus },
    { to: '/pharmacy/inventory', label: 'Manage Inventory', icon: ShoppingBag },
    { to: '/pharmacy/reservations', label: 'Reservations', icon: UserCheck },
    { to: '/pharmacy/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { to: '/admin/pharmacies', label: 'Manage Pharmacies', icon: Store },
    { to: '/admin/reservations', label: 'All Reservations', icon: UserCheck },
    { to: '/admin/medicines', label: 'Medicine Master', icon: Pill },
    { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  ];

  const getLinksForRole = () => {
    switch (userRole) {
      case 'pharmacy': return pharmacyLinks;
      case 'admin': return adminLinks;
      default: return customerLinks;
    }
  };

  const getRoleColor = () => {
    switch (userRole) {
      case 'pharmacy': return 'bg-accent';
      case 'admin': return 'bg-destructive';
      default: return 'bg-primary';
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
      case 'pharmacy': return Store;
      case 'admin': return Shield;
      default: return Pill;
    }
  };

  const links = getLinksForRole();
  const RoleIcon = getRoleIcon();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className={cn("p-2 rounded-lg", getRoleColor())}>
              <RoleIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MediBridge</h1>
              <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Role Switcher */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <Button variant={userRole === 'customer' ? 'default' : 'outline'} size="sm">
                Customer
              </Button>
            </Link>
            <Link to="/pharmacy/dashboard">
              <Button variant={userRole === 'pharmacy' ? 'default' : 'outline'} size="sm">
                Pharmacy
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant={userRole === 'admin' ? 'default' : 'outline'} size="sm">
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link key={link.to} to={link.to} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      variant={isActive ? "default" : "ghost"} 
                      className="w-full justify-start space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Button>
                  </Link>
                );
              })}
              
              {/* Mobile Role Switcher */}
              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-sm text-muted-foreground px-3">Switch Role:</p>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant={userRole === 'customer' ? 'default' : 'outline'} className="w-full">
                    Customer Portal
                  </Button>
                </Link>
                <Link to="/pharmacy/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant={userRole === 'pharmacy' ? 'default' : 'outline'} className="w-full">
                    Pharmacy Portal
                  </Button>
                </Link>
                <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant={userRole === 'admin' ? 'default' : 'outline'} className="w-full">
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}