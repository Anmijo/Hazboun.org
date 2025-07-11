import React, { useState } from 'react';
import { BookOpen, MapPin, Calendar, Users, ArrowRight, Clock } from 'lucide-react';
import { FamilyMember, FamilyBranch } from '../types/family';

interface FamilyHistoryProps {
  familyMembers: FamilyMember[];
}

const FamilyHistory: React.FC<FamilyHistoryProps> = ({ familyMembers }) => {
  const [selectedBranch, setSelectedBranch] = useState<FamilyBranch | null>(null);

  // Create family branches from the current family members
  const createFamilyBranches = (): FamilyBranch[] => {
    const branchNames = [...new Set(familyMembers.map(m => m.branch))];
    
    return branchNames.map((branchName, index) => {
      const branchMembers = familyMembers.filter(m => m.branch === branchName);
      const countries = [...new Set(branchMembers.map(m => m.country))];
      
      // Define branch information based on branch name
      const getBranchInfo = (name: string) => {
        switch (name) {
           case 'Palestine Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'Palestine',
              migrationYear: "N/A",
              story: 'This branch resisted the Israeli occupation and has not left their homeland. They maintain our culture and traditions in our homeland. Some have moved to new cities such as Ramallah and Jerusalem for educational and work opportunities.',
              historicalNotes: 'The Hazboun family is now the largest family in Bethlehem with many family members being business owners, politicians and prominents figures in the city.'
            };
          case 'Jordan Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'Amman, Balqaa, Madaba and Irbid in Jordan',
              migrationYear: "1948 and 1967",
              story: 'The Jordan branch maintained strong ties to their homeland with members dispersing globally from there for education and opportunities.',
              historicalNotes: 'This branch preserved many historical documents, family artifacts, and try to maintain family ties through the Bethlehem society of Jordan and the Hazboun Society of Jordan.'
            };
          case 'North America Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'United States and Canada',
              migrationYear: "1950s to Present",
              story: 'Initial Members of this branch immigrated to America during the 1960s, establishing roots in major cities and contributing to various industries. Many of them initially resided in Michigan and Toronto. Current members of this branch immigrate in search for better education and job opportunities.',
              historicalNotes: 'Strong academic tradition with several university professors.'
            };
          case 'European Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'United Kingdom & Europe',
              migrationYear: "1960s to 1990s",
              story: 'This branch settled across Europe, with many pursuing higher education and establishing successful careers in medicine and academia. Current members of this branch immigrate in search for better education and job opportunities.',
              historicalNotes: 'Strong academic tradition with several university professors.'
            };
          case 'Arabian Gulf Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'Gulf Countries',
              migrationYear: "1980 to Present",
              story: 'Members moved to the Gulf states during the oil and economic boom, contributing to business development and regional growth.',
              historicalNotes: 'Played significant roles in regional business and trade.'
            };
          case 'South America Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'El Salvador, Chile, Bolivia, Ecuador, Honduras and Brazil',
              migrationYear: "1880s to 1948",
              story: 'Early immigrants to South America,  where integrated into local communities while maintaining cultural traditions.',
              historicalNotes: 'Established successful businesses and strong Palestinian communities in their new countries.'
            };
          case 'Australia Branch':
            return {
              origin: 'Bethlehem, Palestine',
              destination: 'Australia and New Zealand',
              migrationYear: "1980s to Present",
              story: 'Immigrants to Australia and New Zealand immigrated initially in search for better education and job opportunities.',
              historicalNotes: 'They are now an integrated part of their communities'
            };

          default:
            return {
              origin: 'Bethlehem, Palestine',
              destination: countries.join(', '),
              migrationYear: 1948,
              story: `The ${name} established roots in ${countries.join(' and ')}, contributing to their local communities while maintaining family traditions.`,
              historicalNotes: 'A growing branch of the family with diverse professional backgrounds.'
            };
        }
      };

      const branchInfo = getBranchInfo(branchName);

      return {
        id: `branch-${index}`,
        name: branchName,
        ...branchInfo,
        members: branchMembers
      };
    });
  };

  const familyBranches = createFamilyBranches();

const timelineEvents = [
  { year: 1610, event: 'Sulaiman Hazboun is recorded as the earliest known member of the Hazboun family in Bethlehem' },
  { year: "1700s-1800s", event: 'Hazboun family grows as part of the Christian merchant class in Bethlehem under Ottoman rule' },
  { year: "Late 1800s", event: 'Early Hazboun family members begin migrating to South America (Chile, Argentina, Brazil), joining the first major wave of Christian Palestinian emigration due to economic hardship under Ottoman taxation' },
  { year: 1915, event: 'Seferberlik during WWI forces conscription and famine, triggering family migrations abroad, mainly to South America' },
  { year: 1917, event: 'British take control of Palestine (end of Ottoman rule). Economic and political shifts trigger the first wave of Hazboun migration to the US and Europe.' },
  { year: 1948, event: 'Palestinian Nakba – Hundreds of thousands of Palestinians are displaced during the Israeli occupation of Palestine. Hazboun families migrate from Bethlehem to Jordan, Lebanon, the US, and Latin America.' },
  { year: "1950s - 1960s", event: 'Second major wave of Hazboun migration to the US, particularly to Michigan, California, and New York. Many also immigrate to Amman, Jordan.' },
  { year: 1967, event: 'Naksa (Six-Day War) – Israel occupies the West Bank. Travel restrictions and instability push more Hazboun families to seek security abroad.' },
  { year: "1980 - 1990s", event: 'New generations of Hazboun family members begin attending universities abroad and settling in diaspora communities permanently' },
  { year: 1994, event: 'Hazboun Family Genealogy Book is compiled to preserve family history and roots' },
  { year: 1996, event: 'Hazboun.org website is launched, connecting the global family online' },
  { year: 2025, event: 'New version of Hazboun.org website is developed to preserve the family history and connect family members worldwide' },
];


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hazboun-800 mb-4">Our Family History</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the rich heritage of the Hazboun family, from our Palestinian roots 
            to our global presence today. Each branch tells a unique story of resilience and success.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-hazboun-800 mb-8 text-center">Family Timeline</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-hazboun-300"></div>
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-0 w-8 h-8 bg-hazboun-600 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div className="ml-12">
                      <div className="flex items-center mb-2">
                        <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-semibold mr-4">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Family Branches */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-hazboun-800 mb-8 text-center">Family Branches</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {familyBranches.map((branch) => (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    selectedBranch?.id === branch.id
                      ? 'bg-hazboun-600 text-white shadow-lg'
                      : 'bg-white hover:bg-hazboun-50 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-bold ${
                      selectedBranch?.id === branch.id ? 'text-white' : 'text-hazboun-800'
                    }`}>
                      {branch.name}
                    </h3>
                    <ArrowRight className={`h-5 w-5 ${
                      selectedBranch?.id === branch.id ? 'text-white' : 'text-hazboun-600'
                    }`} />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className={`h-4 w-4 mr-2 ${
                        selectedBranch?.id === branch.id ? 'text-white' : 'text-hazboun-500'
                      }`} />
                      <span>{branch.origin} → {branch.destination}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className={`h-4 w-4 mr-2 ${
                        selectedBranch?.id === branch.id ? 'text-white' : 'text-hazboun-500'
                      }`} />
                      <span>Migration: {branch.migrationYear}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className={`h-4 w-4 mr-2 ${
                        selectedBranch?.id === branch.id ? 'text-white' : 'text-hazboun-500'
                      }`} />
                      <span>{branch.members.length} family members</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              {selectedBranch ? (
                <div>
                  <h3 className="text-2xl font-bold text-hazboun-800 mb-4">
                    {selectedBranch.name}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Migration Story</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedBranch.story}
                      </p>
                    </div>
                    
                    {selectedBranch.historicalNotes && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Historical Notes</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedBranch.historicalNotes}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Branch Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium text-gray-700">Origin:</span>
                          <p className="text-gray-600">{selectedBranch.origin}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium text-gray-700">Destination:</span>
                          <p className="text-gray-600">{selectedBranch.destination}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium text-gray-700">Migration Year:</span>
                          <p className="text-gray-600">{selectedBranch.migrationYear}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium text-gray-700">Family Members:</span>
                          <p className="text-gray-600">{selectedBranch.members.length}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Current Members</h4>
                      <div className="space-y-2">
                        {selectedBranch.members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="font-medium text-gray-800">{member.name}</span>
                            <span className="text-sm text-gray-600">{member.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Family Branch</h3>
                  <p className="text-gray-500">
                    Click on any branch from the list to learn about its history and current members.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Heritage Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-hazboun-800 mb-6 text-center">Our Palestinian Heritage</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-hazboun-800 mb-4">Roots in the Holy Land</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
           The Hazboun family, a prominent Christian lineage with deep roots in Bethlehem, boasts a rich history that stretches back to the Ottoman period and is interwoven with the cultural and religious fabric of the Holy Land. The earliest documented ancestor, Sulaiman Hazboun, was born in Ottoman Palestine in 1610, marking the beginning of a long and continuous presence in the region.
                                 </p>
               <p>

                  The family is part of the Najajreh clan in Bethlehem and is considered among the indigenous Christian population of the area. The Najajreh clan is one of the largest and most influential Christian clans in Bethlehem. The clan is believed to descend from the Ghassanids, an ancient Arab Christian tribal confederation that ruled over parts of the Levant. The An-Najajreh are believed to have migrated from Najran in modern-day Yemen.
               </p>
                <p>
                  The name "Hazboun" is believed to be of biblical origin, deriving from "Heshbon," a name associated with a town mentioned in the Old Testament. Variations of the surname include Asbun and Hasbún, which are found in various parts of the world, reflecting the family's global diaspora.
                </p>
                                <p>
                 A notable aspect of the family's heritage is a compelling, though legendary, oral tradition that traces their ancestry to the Portuguese royal family. According to this tradition, members of the royal lineage migrated to the Holy Land during the Crusades. This narrative is most like a myth and not factual.
                </p>
                <p>
                 Across the globe, individuals bearing the Hazboun surname and its variations have                     achieved prominence in various fields. These include politicians, athletes,                           scientists and artists. The story of the Hazboun family is a testament to a lineage                   that has maintained its identity and connection to its ancestral home while                           establishing a global presence over centuries. 
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-hazboun-50 to-gold-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-hazboun-800 mb-4">Family Values</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-hazboun-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Unity & Connection</h4>
                    <p className="text-sm text-gray-600">Maintaining bonds across continents and generations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gold-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Education & Growth</h4>
                    <p className="text-sm text-gray-600">Valuing knowledge and continuous learning</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-earth-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Cultural Pride</h4>
                    <p className="text-sm text-gray-600">Honoring Palestinian heritage and traditions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-hazboun-600 rounded-full mt-2 mr-3"></div>
                  <div>
                    <h4 className="font-semibold text-hazboun-700">Community Service</h4>
                    <p className="text-sm text-gray-600">Contributing positively to our adopted communities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyHistory;