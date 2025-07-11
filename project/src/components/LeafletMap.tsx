import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  countryData: Record<string, number>;
  onCountryClick: (country: string) => void;
  selectedCountry?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ countryData, onCountryClick, selectedCountry }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

  // Color gradient for family member counts
  const getColor = (count: number): string => {
    if (count === 0) return '#f1f5f9'; // slate-100 - no family members
    if (count === 1) return '#dbeafe'; // blue-100 - 1 member
    if (count === 2) return '#93c5fd'; // blue-300 - 2 members
    if (count <= 4) return '#3b82f6'; // blue-500 - 3-4 members
    return '#1e40af'; // blue-800 - 5+ members
  };

  // Country name mapping for better matching
  const normalizeCountryName = (name: string): string => {
    const nameMap: Record<string, string> = {
      'United States of America': 'United States',
      'USA': 'United States',
      'UK': 'United Kingdom',
      'Great Britain': 'United Kingdom',
      'UAE': 'United Arab Emirates',
      'Brasil': 'Brazil',
      'Palestinian Territory': 'Palestine',
      'West Bank': 'Palestine',
      'Gaza Strip': 'Palestine'
    };
    return nameMap[name] || name;
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true
    });

    mapInstanceRef.current = map;

    // Add base tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);

    // Load world countries GeoJSON
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(response => response.json())
      .then(data => {
        // Check if map instance is still valid before proceeding
        if (!mapInstanceRef.current) {
          return;
        }

        // Create GeoJSON layer with styling
        const geoJsonLayer = L.geoJSON(data, {
          style: (feature) => {
            if (!feature?.properties?.name) return { fillColor: '#f1f5f9', weight: 1, opacity: 1, color: '#64748b', fillOpacity: 0.7 };
            
            const countryName = normalizeCountryName(feature.properties.name);
            const memberCount = countryData[countryName] || 0;
            const isSelected = selectedCountry === countryName;
            
            return {
              fillColor: getColor(memberCount),
              weight: isSelected ? 3 : 1,
              opacity: 1,
              color: isSelected ? '#f59e0b' : '#64748b', // amber for selected, slate for default
              fillOpacity: 0.7
            };
          },
          onEachFeature: (feature, layer) => {
            if (!feature?.properties?.name) return;
            
            const countryName = normalizeCountryName(feature.properties.name);
            const memberCount = countryData[countryName] || 0;
            
            // Create popup content
            const popupContent = `
              <div class="p-2">
                <h3 class="font-bold text-lg text-hazboun-800">${feature.properties.name}</h3>
                <p class="text-sm text-gray-600">Family Members: <span class="font-semibold">${memberCount}</span></p>
                ${memberCount > 0 ? '<p class="text-xs text-hazboun-600 mt-1">Click to view details</p>' : ''}
              </div>
            `;
            
            layer.bindPopup(popupContent);
            
            // Add click handler for countries with family members
            if (memberCount > 0) {
              layer.on('click', () => {
                onCountryClick(countryName);
              });
              
              // Add hover effects
              layer.on('mouseover', () => {
                layer.setStyle({
                  weight: 2,
                  color: '#1d4ed8',
                  fillOpacity: 0.8
                });
              });
              
              layer.on('mouseout', () => {
                geoJsonLayer.resetStyle(layer);
              });
            }
          }
        });

        geoJsonLayerRef.current = geoJsonLayer;
        
        // Ensure map instance is still valid before adding layer
        if (mapInstanceRef.current) {
          geoJsonLayer.addTo(mapInstanceRef.current);
        }
      })
      .catch(error => {
        console.error('Error loading world map data:', error);
      });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map styling when data or selection changes
  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer: any) => {
        if (layer.feature?.properties?.name) {
          const countryName = normalizeCountryName(layer.feature.properties.name);
          const memberCount = countryData[countryName] || 0;
          const isSelected = selectedCountry === countryName;
          
          layer.setStyle({
            fillColor: getColor(memberCount),
            weight: isSelected ? 3 : 1,
            opacity: 1,
            color: isSelected ? '#f59e0b' : '#64748b',
            fillOpacity: 0.7
          });
        }
      });
    }
  }, [countryData, selectedCountry]);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-hazboun-800 mb-4">Family Distribution Worldwide</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-gray-600 font-medium">Family Members:</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-slate-100 border border-gray-400 rounded-sm"></div>
            <span>0</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border border-gray-400 rounded-sm"></div>
            <span>1</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-300 border border-gray-400 rounded-sm"></div>
            <span>2</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 border border-gray-400 rounded-sm"></div>
            <span>3-4</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-800 border border-gray-400 rounded-sm"></div>
            <span>5+</span>
          </div>
        </div>
      </div>
      
      <div 
        ref={mapRef} 
        className="w-full rounded-lg overflow-hidden border border-gray-200"
        style={{ height: '500px' }}
      />
      
      <div className="mt-4 text-center text-sm text-gray-600">
        Click on any highlighted country to view detailed family member information
      </div>
    </div>
  );
};

export default LeafletMap;