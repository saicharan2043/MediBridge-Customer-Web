import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MedicineCard({ medicine, pharmacy, stock, onReserve }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-medicine-available text-white';
      case 'low': return 'bg-medicine-low text-black';
      case 'out': return 'bg-medicine-out text-white';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'In Stock';
      case 'low': return 'Low Stock';
      case 'out': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-muted/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-foreground">{medicine.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {medicine.strength} • {medicine.type}
            </p>
            <p className="text-xs text-muted-foreground">
              Brands: {medicine.brands.join(', ')}
            </p>
          </div>
          <Badge className={cn("text-xs font-medium", getStatusColor(stock.status))}>
            {getStatusText(stock.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Pharmacy Info */}
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-primary mr-2" />
            <div>
              <p className="font-medium text-foreground">{pharmacy.name}</p>
              <p className="text-muted-foreground">{pharmacy.address}</p>
              <p className="text-xs text-muted-foreground">{pharmacy.distance} away</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-primary mr-2" />
              <span className={cn(
                "font-medium",
                pharmacy.isOpen ? "text-status-open" : "text-status-closed"
              )}>
                {pharmacy.isOpen ? 'Open' : 'Closed'}
                {pharmacy.isOpen && pharmacy.openUntil && ` until ${pharmacy.openUntil}`}
              </span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-xs">{pharmacy.phone}</span>
            </div>
          </div>
        </div>

        {/* Stock & Price Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="space-y-1">
            {stock.quantity && (
              <p className="text-sm text-muted-foreground">
                Qty: {stock.quantity} available
              </p>
            )}
            {stock.price && (
              <p className="text-lg font-semibold text-primary">
                ₹{stock.price}
              </p>
            )}
          </div>
          
          <Button 
            onClick={onReserve}
            disabled={stock.status === 'out' || !pharmacy.isOpen}
            className="bg-primary hover:bg-primary/90"
          >
            {stock.status === 'out' ? 'Out of Stock' : 
             !pharmacy.isOpen ? 'Closed' : 'Reserve Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}