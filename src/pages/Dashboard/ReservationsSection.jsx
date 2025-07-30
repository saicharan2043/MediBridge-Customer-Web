import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Pill, Store, Calendar, Clock, MapPin, Phone } from "lucide-react";

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

function ReservationsSection() {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-medicine-available text-white";
      case "completed":
        return "bg-primary text-primary-foreground";
      case "expired":
        return "bg-medicine-out text-white";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "expired":
        return "Expired";
      default:
        return "Unknown";
    }
  };

  const formatDateTime = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          Your Reservations
        </h2>
        <Button asChild className="gradient-primary text-primary-foreground">
          <Link to="/">
            <Pill className="h-4 w-4 mr-2" />
            New Reservation
          </Link>
        </Button>
      </div>

      {sampleReservations.map((reservation) => (
        <Card key={reservation.id} className="gradient-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {reservation.medicine.brand}{" "}
                      {reservation.medicine.strength}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generic: {reservation.medicine.generic}
                    </p>
                  </div>
                  <Badge className={getStatusColor(reservation.status)}>
                    {getStatusText(reservation.status)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Store className="h-4 w-4 text-primary mr-2" />
                    <span className="text-muted-foreground">
                      {reservation.pharmacy.name} -{" "}
                      {reservation.pharmacy.address}
                    </span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-primary mr-2" />
                    <span className="text-muted-foreground">
                      Reserved: {formatDateTime(reservation.reservedAt)}
                    </span>
                  </div>

                  {reservation.status === "active" && (
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-destructive mr-2" />
                      <span className="text-destructive font-medium">
                        Expires: {formatDateTime(reservation.expiresAt)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-primary">
                    {reservation.medicine.price}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Pharmacy
                    </Button>
                    {reservation.status === "active" && (
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ReservationsSection;
