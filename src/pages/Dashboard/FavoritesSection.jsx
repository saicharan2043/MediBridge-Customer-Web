import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Phone } from "lucide-react";

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

function FavoritesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sampleFavorites.map((favorite) => (
        <Card key={favorite.id} className="gradient-card border-border">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  {favorite.pharmacy.name}
                </h3>
                <Heart className="h-5 w-5 text-destructive" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <span className="text-muted-foreground">
                    {favorite.pharmacy.address}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-primary mr-2" />
                  <span className="text-muted-foreground">
                    {favorite.pharmacy.phone}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {favorite.visitCount} visits
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FavoritesSection;
