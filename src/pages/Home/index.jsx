import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MedicineCard } from "@/components/medicine-card";
import {
  Search,
  MapPin,
  Filter,
  RotateCcw,
  Heart,
  Clock,
  Pill,
  Navigation as NavigationIcon,
} from "lucide-react";

const sampleMedicines = [
  {
    medicine: {
      name: "Paracetamol",
      strength: "500mg",
      type: "Tablet",
      brands: ["Crocin", "Dolo", "Panadol"],
    },
    pharmacy: {
      name: "Apollo Pharmacy",
      address: "MG Road, Bangalore",
      distance: "0.5 km",
      phone: "+91 98765 43210",
      isOpen: true,
      openUntil: "11:00 PM",
    },
    stock: {
      status: "available",
      quantity: 50,
      price: 15,
    },
  },
  {
    medicine: {
      name: "Paracetamol",
      strength: "500mg",
      type: "Tablet",
      brands: ["Crocin", "Dolo"],
    },
    pharmacy: {
      name: "MedPlus",
      address: "Brigade Road, Bangalore",
      distance: "1.2 km",
      phone: "+91 98765 43211",
      isOpen: true,
      openUntil: "10:30 PM",
    },
    stock: {
      status: "low",
      quantity: 5,
      price: 12,
    },
  },
  {
    medicine: {
      name: "Paracetamol",
      strength: "500mg",
      type: "Tablet",
      brands: ["Panadol"],
    },
    pharmacy: {
      name: "Wellness Pharmacy",
      address: "Commercial Street, Bangalore",
      distance: "2.1 km",
      phone: "+91 98765 43212",
      isOpen: false,
      openUntil: "9:00 AM",
    },
    stock: {
      status: "out",
      quantity: 0,
      price: 18,
    },
  },
];

const recentSearches = [
  "Paracetamol",
  "Amoxicillin",
  "Omeprazole",
  "Cetirizine",
];
const popularMedicines = [
  "Crocin",
  "Dolo 650",
  "Panadol",
  "Aspirin",
  "Combiflam",
];

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState(
    "Bangalore, Karnataka"
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => setIsSearching(false), 1000);
  };

  const handleReserve = () => {
    // Navigate to reservation page
    console.log("Reserve medicine");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole="customer" />

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Pill className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Find Your Medicine
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Search for medicines at nearby pharmacies in real-time. Reserve
            instantly and pick up when convenient.
          </p>
        </div>

        {/* Search Section */}
        <Card className="bg-gradient-to-r from-card to-card/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Search Medicine</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Location */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Current location: {currentLocation}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <NavigationIcon className="h-3 w-3" />
              </Button>
            </div>

            {/* Search Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Search for medicine name, brand, or generic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <RotateCcw className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                Recent:
              </span>
              {recentSearches.map((term) => (
                <Badge
                  key={term}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Results or Popular Medicines */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-foreground">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : "Popular Medicines"}
            </h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {searchQuery
                  ? `${sampleMedicines.length} found`
                  : `${popularMedicines.length} available`}
              </Badge>
            </div>
          </div>

          {searchQuery ? (
            /* Search Results */
            <div className="grid gap-4">
              {sampleMedicines.map((item, index) => (
                <MedicineCard
                  key={index}
                  medicine={item.medicine}
                  pharmacy={item.pharmacy}
                  stock={item.stock}
                  onReserve={handleReserve}
                />
              ))}
            </div>
          ) : (
            /* Popular Medicines Grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {popularMedicines.map((medicine) => (
                <Card
                  key={medicine}
                  className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-muted/20"
                  onClick={() => setSearchQuery(medicine)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground">{medicine}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Search now
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-sm text-muted-foreground">
                Partner Pharmacies
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-medicine-available/5 to-medicine-available/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-medicine-available mb-2">
                50,000+
              </div>
              <p className="text-sm text-muted-foreground">
                Medicines Available
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Emergency Support</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
