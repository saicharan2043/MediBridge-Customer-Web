import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Store,
  MapPin,
  Phone,
  Clock,
  Pill,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sampleMedicine = {
  id: 1,
  brand: "Crocin",
  generic: "Paracetamol",
  strength: "500mg",
  price: 15,
  pharmacy: {
    name: "Apollo Pharmacy",
    address: "MG Road, Bangalore - 560001",
    phone: "+91 98765 43210",
    distance: "0.5 km",
    isOpen: true,
    openUntil: "11:00 PM",
  },
};

export default function ReserveMedicine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    otp: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = () => {
    if (formData.phone.length === 10) {
      setShowOtp(true);
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const reservationId = Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase();
      navigate(`/reserved/${reservationId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Navigation */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medicine & Pharmacy Info */}
          <div className="space-y-6">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <span>Medicine Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {sampleMedicine.brand} {sampleMedicine.strength}
                  </h3>
                  <p className="text-muted-foreground">
                    Generic: {sampleMedicine.generic}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge className="bg-medicine-available text-white">
                    In Stock
                  </Badge>
                  <span className="text-2xl font-bold text-primary">
                    {sampleMedicine.price}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="h-5 w-5 text-primary" />
                  <span>Pharmacy Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {sampleMedicine.pharmacy.name}
                  </h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">
                        {sampleMedicine.pharmacy.address}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">
                        {sampleMedicine.pharmacy.phone}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">
                        {sampleMedicine.pharmacy.distance} away
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <span className="text-status-open font-medium">
                        Open until {sampleMedicine.pharmacy.openUntil}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms Card */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Reservation Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li> Medicine will be reserved for 2 hours</li>
                  <li> Please bring a valid ID for pickup</li>
                  <li> Payment to be made at the pharmacy</li>
                  <li> Prescription required for prescription medicines</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Form */}
          <div>
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle>Reserve Medicine</CardTitle>
                <p className="text-muted-foreground">
                  Fill in your details to reserve this medicine
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="bg-background border-border"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="flex-1 bg-background border-border"
                        maxLength={10}
                        required
                      />
                      {!showOtp && formData.phone.length === 10 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendOtp}
                        >
                          Send OTP
                        </Button>
                      )}
                    </div>
                  </div>

                  {showOtp && (
                    <div>
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={formData.otp}
                        onChange={(e) =>
                          handleInputChange("otp", e.target.value)
                        }
                        className="bg-background border-border"
                        maxLength={6}
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        OTP sent to {formData.phone}
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full gradient-primary text-primary-foreground"
                      disabled={
                        isLoading ||
                        !formData.name ||
                        !formData.phone ||
                        (showOtp && !formData.otp)
                      }
                    >
                      {isLoading ? "Reserving..." : "Reserve Medicine"}
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      By reserving, you agree to pickup within 2 hours
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
