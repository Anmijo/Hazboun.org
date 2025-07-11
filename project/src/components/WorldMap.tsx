import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

interface WorldMapProps {
  countryData: Record<string, number>;
  onCountryClick: (country: string) => void;
  selectedCountry?: string;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap: React.FC<WorldMapProps> = ({ countryData, onCountryClick, selectedCountry }) => {
  // Comprehensive mapping from geographic country names to our data country names
  const getOurCountryName = (geoCountryName: string): string => {
    const nameMap: Record<string, string> = {
      'United States of America': 'United States',
      'United Kingdom': 'United Kingdom',
      'Brazil': 'Brazil',
      'Canada': 'Canada',
      'Australia': 'Australia',
      'Palestine': 'Palestine',
      'United Arab Emirates': 'United Arab Emirates',
      'UAE': 'United Arab Emirates',
      'Jordan': 'Jordan',
      'Lebanon': 'Lebanon',
      'Germany': 'Germany',
      'France': 'France',
      'Sweden': 'Sweden',
      'Chile': 'Chile',
      'Argentina': 'Argentina'
    };
    return nameMap[geoCountryName] || geoCountryName;
  };

  const getCountryColor = (geoCountryName: string) => {
    const ourCountryName = getOurCountryName(geoCountryName);
    const count = countryData[ourCountryName] || 0;
    
    // Debug logging
    if (count > 0) {
      console.log(`Country: ${geoCountryName} -> ${ourCountryName}, Count: ${count}`);
    }
    
    if (count === 0) return '#f1f5f9'; // slate-100 - no family members
    if (count === 1) return '#dbeafe'; // blue-100 - 1 member
    if (count === 2) return '#93c5fd'; // blue-300 - 2 members
    if (count <= 4) return '#3b82f6'; // blue-500 - 3-4 members
    return '#1e40af'; // blue-800 - 5+ members
  };

  const getCountryStroke = (geoCountryName: string) => {
    const ourCountryName = getOurCountryName(geoCountryName);
    return selectedCountry === ourCountryName ? '#f59e0b' : '#64748b'; // amber-500 for selected, slate-500 for default
  };

  const getCountryStrokeWidth = (geoCountryName: string) => {
    const ourCountryName = getOurCountryName(geoCountryName);
    return selectedCountry === ourCountryName ? 2 : 0.5;
  };

  // Debug: Log all country data
  console.log('All Country Data:', countryData);

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
      
      <div className="w-full" style={{ height: '500px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 20]
          }}
          width={800}
          height={500}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const geoCountryName = geo.properties.NAME;
                  const ourCountryName = getOurCountryName(geoCountryName);
                  const memberCount = countryData[ourCountryName] || 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        if (memberCount > 0) {
                          onCountryClick(ourCountryName);
                        }
                      }}
                      style={{
                        default: {
                          fill: getCountryColor(geoCountryName),
                          stroke: getCountryStroke(geoCountryName),
                          strokeWidth: getCountryStrokeWidth(geoCountryName),
                          outline: 'none',
                        },
                        hover: {
                          fill: memberCount > 0 ? '#1d4ed8' : '#e2e8f0', // blue-700 for hover on countries with members
                          stroke: getCountryStroke(geoCountryName),
                          strokeWidth: getCountryStrokeWidth(geoCountryName),
                          outline: 'none',
                          cursor: memberCount > 0 ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: '#1e3a8a', // blue-900 for pressed state
                          stroke: getCountryStroke(geoCountryName),
                          strokeWidth: getCountryStrokeWidth(geoCountryName),
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        Click on any highlighted country to view detailed family member information
      </div>
    </div>
  );
};

export default WorldMap;