import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Store,
  MapPin,
  Phone,
  Clock,
  Pill,
  Calendar,
  Copy,
  Home,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ReservationConfirmation() {
  const { reservationId } = useParams();
  const { toast } = useToast();

  const reservation = {
    id: reservationId,
    medicine: {
      brand: "Crocin",
      generic: "Paracetamol",
      strength: "500mg",
      price: 15,
    },
    pharmacy: {
      name: "Apollo Pharmacy",
      address: "MG Road, Bangalore - 560001",
      phone: "+91 98765 43210",
      distance: "0.5 km",
    },
    customer: {
      name: "John Doe",
      phone: "+91 98765 43213",
    },
    reservedAt: new Date(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: "confirmed",
  };

  const copyReservationId = () => {
    navigator.clipboard.writeText(reservationId || "");
    toast({
      title: "Copied!",
      description: "Reservation ID copied to clipboard",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-medicine-available/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-medicine-available" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Reservation Successful!
          </h1>
          <p className="text-muted-foreground">
            Your medicine has been reserved and will be held for 2 hours
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Details */}
          <div className="space-y-6">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Reservation Details</span>
                  </span>
                  <Badge className="bg-medicine-available text-white">
                    Confirmed
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reservation ID
                    </p>
                    <p className="font-mono font-semibold text-foreground">
                      {reservationId}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={copyReservationId}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Reserved At</p>
                    <p className="font-semibold text-foreground">
                      {formatTime(reservation.reservedAt)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(reservation.reservedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expires At</p>
                    <p className="font-semibold text-destructive">
                      {formatTime(reservation.expiresAt)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(reservation.expiresAt)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-semibold text-foreground">
                    {reservation.customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reservation.customer.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <span>Medicine Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {reservation.medicine.brand}{" "}
                      {reservation.medicine.strength}
                    </h3>
                    <p className="text-muted-foreground">
                      Generic: {reservation.medicine.generic}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">
                    {reservation.medicine.price}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pharmacy Details & Instructions */}
          <div className="space-y-6">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Store className="h-5 w-5 text-primary" />
                  <span>Pickup Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {reservation.pharmacy.name}
                  </h3>
                  <div className="space-y-2 mt-3">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <div>
                        <p className="text-muted-foreground">
                          {reservation.pharmacy.address}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reservation.pharmacy.distance} away
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-primary mr-2" />
                      <span className="text-muted-foreground">
                        {reservation.pharmacy.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full gradient-primary text-primary-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Important Instructions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">
                        Pickup within 2 hours:
                      </strong>{" "}
                      Your reservation expires at{" "}
                      {formatTime(reservation.expiresAt)}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">
                        Bring your ID:
                      </strong>{" "}
                      Valid government ID required for pickup
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">
                        Payment at pharmacy:
                      </strong>{" "}
                      Pay {reservation.medicine.price} at the time of pickup
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">
                        Reservation ID:
                      </strong>{" "}
                      Show this confirmation to the pharmacist
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard">
                  <Calendar className="h-4 w-4 mr-2" />
                  View All Reservations
                </Link>
              </Button>

              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Pharmacy
              </Button>

              <Button variant="ghost" className="w-full" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
