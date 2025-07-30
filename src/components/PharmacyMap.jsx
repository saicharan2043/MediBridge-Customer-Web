import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Map } from 'lucide-react';
import { useState } from 'react';

const PharmacyMap = ({ pharmacies }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.6413, 12.9716], // Bangalore coordinates
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Sample pharmacy locations (simulated coordinates around Bangalore)
    const pharmacyLocations = [
      { name: 'Apollo Pharmacy', lng: 77.6413, lat: 12.9716, status: 'available' },
      { name: 'MedPlus', lng: 77.6556, lat: 12.9611, status: 'low' },
      { name: 'Wellness Pharmacy', lng: 77.6245, lat: 12.9785, status: 'out' },
    ];

    map.current.on('load', () => {
      // Add markers for each pharmacy
      pharmacyLocations.forEach((pharmacy, index) => {
        if (!map.current) return;

        const statusColors = {
          available: '#10b981', // green
          low: '#f59e0b', // amber
          out: '#ef4444' // red
        };

        // Create marker
        const marker = new mapboxgl.Marker({
          color: statusColors[pharmacy.status]
        })
          .setLngLat([pharmacy.lng, pharmacy.lat])
          .addTo(map.current);

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${pharmacy.name}</h3>
              <p class="text-sm text-gray-600">${pharmacies[index]?.address || 'Address not available'}</p>
              <p class="text-sm">Status: <span class="font-medium">${pharmacy.status === 'available' ? 'In Stock' : pharmacy.status === 'low' ? 'Low Stock' : 'Out of Stock'}</span></p>
            </div>
          `);

        marker.getElement().addEventListener('click', () => {
          popup.addTo(map.current);
        });
      });
    });
  };

  useEffect(() => {
    if (mapboxToken && !map.current) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Show static map placeholder for now
  if (showTokenInput) {
    return (
      <Card className="gradient-card border-border">
        <CardContent className="p-0">
          <div className="relative h-96 w-full">
            {/* Static map placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Map className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-lg font-semibold text-foreground">Pharmacy Locations Map</h3>
                <p className="text-sm text-muted-foreground">Interactive map will be loaded here</p>
              </div>
            </div>
            
            {/* Static pharmacy markers */}
            <div className="absolute top-20 left-32">
              <div className="w-4 h-4 bg-medicine-available rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            </div>
            <div className="absolute top-32 right-40">
              <div className="w-4 h-4 bg-medicine-low rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            </div>
            <div className="absolute bottom-24 left-20">
              <div className="w-4 h-4 bg-medicine-out rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            </div>
            
            {/* Legend */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
              <h4 className="font-semibold text-foreground mb-2">Pharmacy Locations</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-medicine-available rounded-full"></div>
                  <span className="text-muted-foreground">In Stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-medicine-low rounded-full"></div>
                  <span className="text-muted-foreground">Low Stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-medicine-out rounded-full"></div>
                  <span className="text-muted-foreground">Out of Stock</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-border">
      <CardContent className="p-0">
        <div className="relative h-96 w-full">
          <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
            <h4 className="font-semibold text-foreground mb-2">Pharmacy Locations</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-medicine-available rounded-full"></div>
                <span className="text-muted-foreground">In Stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-medicine-low rounded-full"></div>
                <span className="text-muted-foreground">Low Stock</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-medicine-out rounded-full"></div>
                <span className="text-muted-foreground">Out of Stock</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmacyMap;