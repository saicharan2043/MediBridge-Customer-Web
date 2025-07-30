import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Pill,
  Store,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Bangalore, Karnataka");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&pin=500081`);
    }
  };

  const popularMedicines = [
    "Paracetamol",
    "Crocin",
    "Dolo 650",
    "Amoxicillin",
    "Omeprazole",
    "Cetirizine",
    "Aspirin",
    "Ibuprofen",
  ];

  const features = [
    {
      icon: Search,
      title: "Real-time Search",
      description: "Find medicines instantly across nearby pharmacies",
    },
    {
      icon: MapPin,
      title: "Location-based",
      description:
        "Discover the closest pharmacies with your medicine in stock",
    },
    {
      icon: Clock,
      title: "Reserve & Hold",
      description: "Reserve medicines for up to 2 hours for easy pickup",
    },
    {
      icon: Shield,
      title: "Verified Pharmacies",
      description: "All partner pharmacies are verified and licensed",
    },
  ];

  const stats = [
    { icon: Store, value: "1,200+", label: "Partner Pharmacies" },
    { icon: Pill, value: "50,000+", label: "Medicines Available" },
    { icon: Users, value: "10,000+", label: "Happy Customers" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Pill className="h-8 w-8 text-primary" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Find Medicine Availability in{" "}
              
                Nearby Stores
              
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search for medicines, check real-time availability, and reserve
              instantly from verified pharmacies near you.
            </p>

            {/* Search Section */}
            <Card className="mt-8 p-6 gradient-card border-border">
              <CardContent className="p-0">
                <div className="space-y-4">
                  {/* Location Display */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Searching in: {location}</span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-primary"
                    >
                      Change
                    </Button>
                  </div>

                  {/* Search Bar */}
                  <div className="flex space-x-2 max-w-2xl mx-auto">
                    <Input
                      placeholder="Search for Crocin, Paracetamol, or any medicine..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 h-12 text-lg bg-background border-border"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <Button
                      onClick={handleSearch}
                      className="h-12 px-6 gradient-primary text-primary-foreground font-medium"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                  </div>

                  {/* Popular Medicines */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground text-center">
                      Popular searches:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {popularMedicines.map((medicine) => (
                        <Badge
                          key={medicine}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => {
                            setSearchQuery(medicine);
                            navigate(
                              `/search?query=${encodeURIComponent(
                                medicine
                              )}&pin=500081`
                            );
                          }}
                        >
                          {medicine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground"
              >
                Explore Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                How it Works
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose MediBridge?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Fast, reliable, and convenient medicine discovery at your
                fingertips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center p-6 gradient-card border-border hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Get your medicines in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Search Medicine",
                  description:
                    "Enter the medicine name or brand you're looking for",
                },
                {
                  step: "2",
                  title: "Find & Reserve",
                  description:
                    "Choose from nearby pharmacies and reserve instantly",
                },
                {
                  step: "3",
                  title: "Pickup",
                  description:
                    "Visit the pharmacy within 2 hours to collect your medicine",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <Card className="p-8 gradient-card border-border max-w-2xl mx-auto">
              <CardContent className="p-0">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ready to Find Your Medicine?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of users who trust MediBridge for their
                  medicine needs
                </p>
                <Button
                  size="lg"
                  className="gradient-primary text-primary-foreground"
                >
                  Start Searching Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
