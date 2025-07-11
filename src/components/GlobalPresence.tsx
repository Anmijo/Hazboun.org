import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Users, Filter, Search, Loader } from 'lucide-react';
import { FamilyMember } from '../types/family';
import LeafletMap from './LeafletMap';

interface GlobalPresenceProps {
  familyMembers: FamilyMember[];
}

const GlobalPresence: React.FC<GlobalPresenceProps> = ({ familyMembers }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Create country statistics from family members data
  const countryStats = familyMembers.reduce((acc, member) => {
    if (!acc[member.country]) {
      acc[member.country] = { 
        cities: new Set<string>(), 
        totalMembers: 0,
        cityDetails: {} as Record<string, number>
      };
    }
    acc[member.country].cities.add(member.location);
    acc[member.country].totalMembers++;
    
    // Track city details
    if (!acc[member.country].cityDetails[member.location]) {
      acc[member.country].cityDetails[member.location] = 0;
    }
    acc[member.country].cityDetails[member.location]++;
    
    return acc;
  }, {} as Record<string, { cities: Set<string>; totalMembers: number; cityDetails: Record<string, number> }>);

  // Create country data for the map (just country name -> member count)
  const countryData = Object.entries(countryStats).reduce((acc, [country, stats]) => {
    acc[country] = stats.totalMembers;
    return acc;
  }, {} as Record<string, number>);

  // Convert cities Set to Array for display
  const countryStatsForDisplay = Object.entries(countryStats).reduce((acc, [country, stats]) => {
    acc[country] = {
      cities: Array.from(stats.cities).map(city => ({
        name: city,
        memberCount: stats.cityDetails[city]
      })),
      totalMembers: stats.totalMembers
    };
    return acc;
  }, {} as Record<string, { cities: { name: string; memberCount: number }[]; totalMembers: number }>);

  const filteredCountries = Object.entries(countryStatsForDisplay).filter(([country]) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMembersInCountry = (country: string) => {
    return familyMembers.filter(member => member.country === country);
  };

  const handleCountryClick = (country: string) => {
    setIsLoading(true);
    setSelectedCountry(country === selectedCountry ? '' : country);
    // Simulate loading for smooth UX
    setTimeout(() => setIsLoading(false), 300);
  };

  // Calculate total cities across all countries
  const totalCities = Object.values(countryStatsForDisplay).reduce((total, country) => total + country.cities.length, 0);

  // Debug logging
  useEffect(() => {
    console.log('Family Members:', familyMembers);
    console.log('Country Data for Map:', countryData);
    console.log('Country Stats:', countryStatsForDisplay);
  }, [familyMembers, countryData, countryStatsForDisplay]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hazboun-800 mb-4">Global Presence</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Hazboun family spans across continents, creating a global network of 
            connections while maintaining our shared heritage and values.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-hazboun-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-hazboun-600" />
            </div>
            <h3 className="text-2xl font-bold text-hazboun-800 mb-2">
              {Object.keys(countryStatsForDisplay).length}
            </h3>
            <p className="text-gray-600">Countries</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-gold-600" />
            </div>
            <h3 className="text-2xl font-bold text-hazboun-800 mb-2">
              {totalCities}
            </h3>
            <p className="text-gray-600">Cities</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-earth-600" />
            </div>
            <h3 className="text-2xl font-bold text-hazboun-800 mb-2">
              {familyMembers.length}
            </h3>
            <p className="text-gray-600">Family Members</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-hazboun-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-hazboun-600" />
            </div>
            <h3 className="text-2xl font-bold text-hazboun-800 mb-2">4</h3>
            <p className="text-gray-600">Continents</p>
          </div>
        </div>

        {/* Interactive Leaflet Map */}
        <div className="mb-8">
          <LeafletMap 
            countryData={countryData}
            onCountryClick={handleCountryClick}
            selectedCountry={selectedCountry}
          />
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCountry('');
              }}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Countries List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-hazboun-800 mb-4">Countries</h2>
              <div className="space-y-2">
                {filteredCountries.map(([country, stats]) => (
                  <button
                    key={country}
                    onClick={() => handleCountryClick(country)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCountry === country
                        ? 'bg-hazboun-600 text-white'
                        : 'hover:bg-hazboun-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{country}</h3>
                        <p className={`text-sm ${
                          selectedCountry === country ? 'text-hazboun-100' : 'text-gray-500'
                        }`}>
                          {stats.cities.length} {stats.cities.length === 1 ? 'city' : 'cities'}
                        </p>
                      </div>
                      <div className={`text-right ${
                        selectedCountry === country ? 'text-hazboun-100' : 'text-hazboun-600'
                      }`}>
                        <p className="font-bold">{stats.totalMembers}</p>
                        <p className="text-xs">members</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Country Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="h-8 w-8 text-hazboun-600 animate-spin" />
                  <span className="ml-2 text-gray-600">Loading...</span>
                </div>
              ) : selectedCountry ? (
                <div>
                  <h2 className="text-2xl font-bold text-hazboun-800 mb-6">
                    {selectedCountry}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-hazboun-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-hazboun-800 mb-2">Total Family Members</h3>
                      <p className="text-2xl font-bold text-hazboun-600">
                        {countryStatsForDisplay[selectedCountry].totalMembers}
                      </p>
                    </div>
                    <div className="bg-gold-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-hazboun-800 mb-2">Cities</h3>
                      <p className="text-2xl font-bold text-gold-600">
                        {countryStatsForDisplay[selectedCountry].cities.length}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-hazboun-800 mb-4">Cities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {countryStatsForDisplay[selectedCountry].cities.map((city) => (
                        <div key={city.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-hazboun-500 mr-2" />
                            <span className="font-medium text-gray-800">{city.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">{city.memberCount} members</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-hazboun-800 mb-4">Family Members</h3>
                    <div className="space-y-3">
                      {getMembersInCountry(selectedCountry).map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-hazboun-800">{member.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {member.location}
                              {member.profession && (
                                <>
                                  <span className="mx-2">•</span>
                                  {member.profession}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs bg-hazboun-100 text-hazboun-700 px-2 py-1 rounded">
                              {member.branch}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Gen {member.generation}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Country</h3>
                  <p className="text-gray-500">
                    Choose a country from the list or click on the map to see detailed information about family members and cities.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPresence;