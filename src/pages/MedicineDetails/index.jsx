import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Pill,
  Store,
  MapPin,
  Phone,
  Clock,
  Info,
  AlertTriangle,
  Heart,
  Share2,
  Map,
} from "lucide-react";
import PharmacyMap from "@/components/PharmacyMap";
import { cn } from "@/lib/utils";

const sampleMedicine = {
  id: 1,
  generic: "Paracetamol",
  description:
    "Paracetamol is a widely used over-the-counter pain reliever and fever reducer. It belongs to a group of medicines called analgesics (painkillers) and is used to treat headaches, muscle aches, arthritis, backaches, toothaches, colds, and fevers.",
  uses: [
    "Fever reduction",
    "Headache relief",
    "Muscle pain",
    "Dental pain",
    "Menstrual cramps",
    "Arthritis pain",
  ],
  sideEffects: [
    "Nausea (rare)",
    "Stomach upset (rare)",
    "Allergic reactions (very rare)",
    "Liver damage (with overdose)",
  ],
  dosage: "Adults: 500mg-1000mg every 4-6 hours. Maximum 4000mg per day.",
  brands: [
    {
      name: "Crocin",
      strength: "500mg",
      form: "Tablet",
      manufacturer: "GSK",
      price: 15,
      pharmacies: [
        {
          name: "Apollo Pharmacy",
          address: "MG Road, Bangalore",
          distance: "0.5 km",
          phone: "+91 98765 43210",
          isOpen: true,
          openUntil: "11:00 PM",
          stock: { status: "available", quantity: 50 },
        },
      ],
    },
    {
      name: "Dolo 650",
      strength: "650mg",
      form: "Tablet",
      manufacturer: "Micro Labs",
      price: 18,
      pharmacies: [
        {
          name: "MedPlus",
          address: "Brigade Road, Bangalore",
          distance: "1.2 km",
          phone: "+91 98765 43211",
          isOpen: true,
          openUntil: "10:30 PM",
          stock: { status: "low", quantity: 3 },
        },
      ],
    },
    {
      name: "Panadol",
      strength: "500mg",
      form: "Tablet",
      manufacturer: "GSK",
      price: 12,
      pharmacies: [
        {
          name: "Wellness Pharmacy",
          address: "Commercial Street, Bangalore",
          distance: "2.1 km",
          phone: "+91 98765 43212",
          isOpen: false,
          openUntil: "9:00 AM tomorrow",
          stock: { status: "out", quantity: 0 },
        },
      ],
    },
  ],
};

export default function MedicineDetails() {
  const { id } = useParams();

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
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link to="/search?query=paracetamol&pin=500081">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Link>
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Medicine Info Header */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                      <Pill className="h-6 w-6 text-primary" />
                      <span>{sampleMedicine.generic}</span>
                    </CardTitle>
                    <p className="text-muted-foreground mt-2">
                      {sampleMedicine.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Map Section */}
            <PharmacyMap
              pharmacies={sampleMedicine.brands.flatMap(
                (brand) => brand.pharmacies
              )}
            />

            {/* Tabs for detailed info */}
            <Tabs defaultValue="brands" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="brands">Brands</TabsTrigger>
                <TabsTrigger value="uses">Uses</TabsTrigger>
                <TabsTrigger value="dosage">Dosage</TabsTrigger>
                <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
              </TabsList>

              {/* Brands Tab */}
              <TabsContent value="brands" className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Available Brands
                </h3>

                {sampleMedicine.brands.map((brand, index) => (
                  <Card key={index} className="gradient-card border-border">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">
                              {brand.name} {brand.strength}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {brand.form} {brand.manufacturer}
                            </p>
                          </div>
                          <span className="text-xl font-bold text-primary">
                            {brand.price}
                          </span>
                        </div>

                        {/* Pharmacy availability for this brand */}
                        <div className="space-y-3">
                          <h5 className="font-medium text-foreground">
                            Available at:
                          </h5>
                          {brand.pharmacies.map((pharmacy, pharmIndex) => (
                            <div
                              key={pharmIndex}
                              className="p-4 bg-muted/20 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Store className="h-4 w-4 text-primary" />
                                  <span className="font-medium text-foreground">
                                    {pharmacy.name}
                                  </span>
                                </div>
                                <Badge
                                  className={cn(
                                    "text-xs",
                                    getStatusColor(pharmacy.stock.status)
                                  )}
                                >
                                  {getStatusText(pharmacy.stock.status)}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {pharmacy.address}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {pharmacy.phone}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {pharmacy.distance} away
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span
                                    className={cn(
                                      pharmacy.isOpen
                                        ? "text-status-open"
                                        : "text-status-closed"
                                    )}
                                  >
                                    {pharmacy.isOpen ? "Open" : "Closed"}
                                    {pharmacy.openUntil &&
                                      ` until ${pharmacy.openUntil}`}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                {pharmacy.stock.quantity > 0 && (
                                  <span className="text-xs text-muted-foreground">
                                    {pharmacy.stock.quantity} units available
                                  </span>
                                )}
                                <Button
                                  size="sm"
                                  disabled={
                                    pharmacy.stock.status === "out" ||
                                    !pharmacy.isOpen
                                  }
                                  className="gradient-primary text-primary-foreground ml-auto"
                                  asChild={
                                    pharmacy.stock.status !== "out" &&
                                    pharmacy.isOpen
                                  }
                                >
                                  {pharmacy.stock.status === "out" ? (
                                    "Out of Stock"
                                  ) : !pharmacy.isOpen ? (
                                    "Closed"
                                  ) : (
                                    <Link to={`/reserve/${id}`}>
                                      Reserve Now
                                    </Link>
                                  )}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Uses Tab */}
              <TabsContent value="uses">
                <Card className="gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Info className="h-5 w-5 text-primary" />
                      <span>Medical Uses</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sampleMedicine.uses.map((use, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{use}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Dosage Tab */}
              <TabsContent value="dosage">
                <Card className="gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Pill className="h-5 w-5 text-primary" />
                      <span>Dosage Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="text-foreground font-medium">
                          {sampleMedicine.dosage}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground mb-2">
                          Important Notes:
                        </p>
                        <ul className="space-y-1">
                          <li> Do not exceed the recommended dose</li>
                          <li> Take with or without food</li>
                          <li> Consult doctor if symptoms persist</li>
                          <li> Not recommended for children under 2 years</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Side Effects Tab */}
              <TabsContent value="side-effects">
                <Card className="gradient-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <span>Side Effects</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        {sampleMedicine.sideEffects.map((effect, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-destructive rounded-full"></div>
                            <span className="text-muted-foreground">
                              {effect}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-destructive/10 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">Warning:</strong>{" "}
                          If you experience any unusual symptoms or allergic
                          reactions, stop taking the medicine and consult your
                          doctor immediately.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full gradient-primary text-primary-foreground"
                  asChild
                >
                  <Link to={`/reserve/${id}`}>Reserve Medicine</Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Set Refill Reminder
                </Button>
                <Button variant="outline" className="w-full">
                  Find Alternatives
                </Button>
              </CardContent>
            </Card>

            {/* Related Information */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Medicine Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-foreground">Category</h4>
                  <p className="text-sm text-muted-foreground">
                    Analgesic & Antipyretic
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Prescription</h4>
                  <p className="text-sm text-muted-foreground">
                    Over-the-counter
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">
                    Generic Available
                  </h4>
                  <p className="text-sm text-muted-foreground">Yes</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    Store below 25 C
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about this medicine?
                </p>
                <Button variant="outline" className="w-full">
                  Contact Pharmacist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
