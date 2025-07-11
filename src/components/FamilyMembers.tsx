import React, { useState } from 'react';
import { Search, MapPin, Mail, Phone, User, Filter, UserPlus, ExternalLink } from 'lucide-react';
import { FamilyMember } from '../types/family';

interface FamilyMembersProps {
  familyMembers: FamilyMember[];
}

const FamilyMembers: React.FC<FamilyMembersProps> = ({ familyMembers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const branches = [...new Set(familyMembers.map(m => m.branch))];
  const countries = [...new Set(familyMembers.map(m => m.country))];

  const filteredMembers = familyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (member.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCountry = !selectedCountry || member.country === selectedCountry;
    const matchesBranch = !selectedBranch || member.branch === selectedBranch;
    
    return matchesSearch && matchesCountry && matchesBranch;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedBranch('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hazboun-800 mb-4">Family Members</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with Hazboun family members around the world. Use the filters below to find relatives by location, branch, or profession.
          </p>
          
          {/* Request to Add Family Member Button */}
          <div className="flex justify-center mt-8">
            <a
              href="https://forms.gle/NJfNP8suWgHHgwea8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Request to Add Family Member
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, location, or profession..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hazboun-500 focus:border-transparent"
            >
              <option value="">All Branches</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            
            <button
              onClick={clearFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMembers.length} of {familyMembers.length} family members
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-hazboun-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-hazboun-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-hazboun-800">{member.name}</h3>
                    {member.birthYear && (
                      <p className="text-sm text-gray-500">Born {member.birthYear}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-hazboun-500" />
                    <span className="text-sm">{member.location}, {member.country}</span>
                  </div>
                  
                  {member.profession && (
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2 text-hazboun-500" />
                      <span className="text-sm">{member.profession}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm font-medium">Branch:</span>
                    <span className="text-sm ml-2 bg-hazboun-100 text-hazboun-700 px-2 py-1 rounded">
                      {member.branch}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <span className="text-sm font-medium">Generation:</span>
                    <span className="text-sm ml-2">{member.generation}</span>
                  </div>
                </div>
                
                {member.bio && (
                  <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                    {member.bio}
                  </p>
                )}
                
                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center p-2 text-hazboun-600 hover:bg-hazboun-50 rounded-lg transition-colors"
                      title="Send Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center p-2 text-hazboun-600 hover:bg-hazboun-50 rounded-lg transition-colors"
                      title="Call"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No family members found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or clearing the filters.</p>
            <button
              onClick={clearFilters}
              className="bg-hazboun-600 hover:bg-hazboun-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMembers;