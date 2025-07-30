import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Calendar,
  Clock,
  Heart,
  Bell,
} from "lucide-react";

const sampleUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43213",
  location: "Bangalore, Karnataka",
};

const sampleReservations = [
  {
    id: "RES123456",
    medicine: {
      brand: "Crocin",
      generic: "Paracetamol",
      strength: "500mg",
      price: 15,
    },
    pharmacy: {
      name: "Apollo Pharmacy",
      address: "MG Road, Bangalore",
      phone: "+91 98765 43210",
    },
    status: "active",
    reservedAt: new Date(Date.now() - 30 * 60 * 1000),
    expiresAt: new Date(Date.now() + 90 * 60 * 1000),
  },
  {
    id: "RES123455",
    medicine: {
      brand: "Dolo 650",
      generic: "Paracetamol",
      strength: "650mg",
      price: 18,
    },
    pharmacy: {
      name: "MedPlus",
      address: "Brigade Road, Bangalore",
      phone: "+91 98765 43211",
    },
    status: "completed",
    reservedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ),
  },
  {
    id: "RES123454",
    medicine: {
      brand: "Panadol",
      generic: "Paracetamol",
      strength: "500mg",
      price: 12,
    },
    pharmacy: {
      name: "Wellness Pharmacy",
      address: "Commercial Street, Bangalore",
      phone: "+91 98765 43212",
    },
    status: "expired",
    reservedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    ),
  },
];

const sampleReminders = [
  {
    id: 1,
    medicine: "Crocin 500mg",
    frequency: "Twice daily",
    nextDue: new Date(Date.now() + 4 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    id: 2,
    medicine: "Vitamin D3",
    frequency: "Once weekly",
    nextDue: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

const sampleFavorites = [
  {
    id: 1,
    pharmacy: {
      name: "Apollo Pharmacy",
      address: "MG Road, Bangalore",
      distance: "0.5 km",
      phone: "+91 98765 43210",
    },
    visitCount: 12,
  },
  {
    id: 2,
    pharmacy: {
      name: "MedPlus",
      address: "Brigade Road, Bangalore",
      distance: "1.2 km",
      phone: "+91 98765 43211",
    },
    visitCount: 8,
  },
];

export default function Dashboard() {
 

  return (
    <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {sampleUser.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your medicine reservations and track your health needs
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-border">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sampleReservations.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Reservations</p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-border">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-medicine-available mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sampleReservations.filter(r => r.status === 'active').length}
              </div>
              <p className="text-sm text-muted-foreground">Active Reservations</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6 text-center">
              <Bell className="h-8 w-8 text-medicine-low mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sampleReminders.filter(r => r.isActive).length}
              </div>
              <p className="text-sm text-muted-foreground">Active Reminders</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sampleFavorites.length}
              </div>
              <p className="text-sm text-muted-foreground">Favorite Pharmacies</p>
            </CardContent>
          </Card>
        </div>
    </main>
  );
}
