import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Clock,
  Phone,
  ArrowLeft,
  Store,
  Info,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleResults = [
  {
    id: 1,
    brand: "Crocin",
    generic: "Paracetamol",
    strength: "500mg",
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
    id: 2,
    brand: "Dolo 650",
    generic: "Paracetamol",
    strength: "650mg",
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
      quantity: 3,
      price: 18,
    },
  },
  {
    id: 3,
    brand: "Panadol",
    generic: "Paracetamol",
    strength: "500mg",
    pharmacy: {
      name: "Wellness Pharmacy",
      address: "Commercial Street, Bangalore",
      distance: "2.1 km",
      phone: "+91 98765 43212",
      isOpen: false,
      openUntil: "9:00 AM tomorrow",
    },
    stock: {
      status: "out",
      quantity: 0,
      price: 12,
    },
  },
];

const alternatives = ["Dolo 650", "Panadol", "Metacin", "Pyrigesic", "Fever X"];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const originalQuery = searchParams.get("query") || "";
  const pin = searchParams.get("pin") || "";

  useEffect(() => {
    setSearchQuery(originalQuery);
  }, [originalQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&pin=${pin}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-medicine-available text-white";
      case "low":
        return "bg-medicine-low text-black";
      case "out":
        return "bg-medicine-out text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "In Stock";
      case "low":
        return "Low Stock";
      case "out":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        {/* Search Bar */}
        <Card className="mb-6 gradient-card border-border">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Search for medicine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-background border-border"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                className="gradient-primary text-primary-foreground"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>PIN: {pin}</span>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Results for "{originalQuery}"
            </h1>
            <p className="text-muted-foreground">
              Found {sampleResults.length} options in nearby pharmacies
            </p>
          </div>
          <Badge variant="outline" className="text-primary border-primary">
            {sampleResults.length} Results
          </Badge>
        </div>

        {/* Medicine Info Card */}
        <Card className="mb-6 gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-primary" />
              <span>Medicine Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Generic Name
                </h3>
                <p className="text-muted-foreground">Paracetamol</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Common Strengths
                </h3>
                <p className="text-muted-foreground">500mg, 650mg</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Uses</h3>
                <p className="text-muted-foreground">
                  Fever, Headache, Pain relief
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Results List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Available at Pharmacies
            </h2>

            {sampleResults.map((result) => (
              <Card
                key={result.id}
                className="gradient-card border-border hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex-1">
                      {/* Medicine Info */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {result.brand} {result.strength}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Generic: {result.generic}
                          </p>
                        </div>
                        <Badge
                          className={cn(
                            "text-xs font-medium",
                            getStatusColor(result.stock.status)
                          )}
                        >
                          {getStatusText(result.stock.status)}
                        </Badge>
                      </div>

                      {/* Pharmacy Info */}
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Store className="h-4 w-4 text-primary mr-2" />
                          <div>
                            <p className="font-medium text-foreground">
                              {result.pharmacy.name}
                            </p>
                            <p className="text-muted-foreground">
                              {result.pharmacy.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-primary mr-1" />
                            <span className="text-muted-foreground">
                              {result.pharmacy.distance}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-primary mr-1" />
                            <span
                              className={cn(
                                "font-medium",
                                result.pharmacy.isOpen
                                  ? "text-status-open"
                                  : "text-status-closed"
                              )}
                            >
                              {result.pharmacy.isOpen ? "Open" : "Closed"}
                              {result.pharmacy.openUntil &&
                                ` until ${result.pharmacy.openUntil}`}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-primary mr-1" />
                            <span className="text-muted-foreground text-xs">
                              {result.pharmacy.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stock & Price */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div>
                          {result.stock.quantity > 0 && (
                            <p className="text-sm text-muted-foreground">
                              Qty: {result.stock.quantity} available
                            </p>
                          )}
                          <p className="text-lg font-semibold text-primary">
                            {result.stock.price}
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/medicine/${result.id}`}>Details</Link>
                          </Button>
                          <Button
                            size="sm"
                            disabled={
                              result.stock.status === "out" ||
                              !result.pharmacy.isOpen
                            }
                            className="gradient-primary text-primary-foreground"
                            asChild={
                              result.stock.status !== "out" &&
                              result.pharmacy.isOpen
                            }
                          >
                            {result.stock.status === "out" ? (
                              "Out of Stock"
                            ) : !result.pharmacy.isOpen ? (
                              "Closed"
                            ) : (
                              <Link to={`/reserve/${result.id}`}>
                                Reserve Now
                              </Link>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Alternatives Sidebar */}
          <div className="space-y-6">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Alternative Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Other brands with the same generic (Paracetamol):
                </p>
                <div className="space-y-2">
                  {alternatives.map((alt) => (
                    <Button
                      key={alt}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => {
                        setSearchQuery(alt);
                        navigate(
                          `/search?query=${encodeURIComponent(alt)}&pin=${pin}`
                        );
                      }}
                    >
                      {alt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Can't Find Your Brand?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Let us know what you're looking for and we'll add it to our
                  database.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/suggest-brand">Suggest a Brand</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
