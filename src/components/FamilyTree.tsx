import React, { useState } from 'react';
import { TreePine, Users, ArrowDown, ArrowRight, User, MapPin, BookOpen, UserPlus, Download, ExternalLink } from 'lucide-react';
import { FamilyMember } from '../types/family';

interface FamilyTreeProps {
  familyMembers: FamilyMember[];
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ familyMembers }) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [expandedGenerations, setExpandedGenerations] = useState<Set<number>>(new Set([1, 2]));

  const membersByGeneration = familyMembers.reduce((acc, member) => {
    if (!acc[member.generation]) {
      acc[member.generation] = [];
    }
    acc[member.generation].push(member);
    return acc;
  }, {} as Record<number, FamilyMember[]>);

  const generations = Object.keys(membersByGeneration).map(g => parseInt(g)).sort();

  const toggleGeneration = (generation: number) => {
    const newExpanded = new Set(expandedGenerations);
    if (newExpanded.has(generation)) {
      newExpanded.delete(generation);
    } else {
      newExpanded.add(generation);
    }
    setExpandedGenerations(newExpanded);
  };

  const getChildrenOf = (parentId: string): FamilyMember[] => {
    return familyMembers.filter(member => 
      member.parents && member.parents.includes(parentId)
    );
  };

  const getParentsOf = (member: FamilyMember): FamilyMember[] => {
    if (!member.parents) return [];
    return familyMembers.filter(m => member.parents!.includes(m.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hazboun-800 mb-4">Family Tree</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the connections and relationships across generations of the Hazboun family.
            Click on any family member to see their details and connections.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="https://drive.google.com/file/d/1PZ6NYlxplL01l8zxHjLmdnZiAcxRtiN2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-hazboun-600 hover:bg-hazboun-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Download Official Genealogy Book
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
            
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tree Visualization */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-hazboun-800 mb-6 flex items-center">
                <TreePine className="h-6 w-6 mr-2" />
                Generational View
              </h2>
              
              <div className="space-y-8">
                {generations.map((generation) => (
                  <div key={generation} className="border-l-4 border-hazboun-200 pl-6">
                    <button
                      onClick={() => toggleGeneration(generation)}
                      className="flex items-center mb-4 text-lg font-semibold text-hazboun-800 hover:text-hazboun-600 transition-colors"
                    >
                      {expandedGenerations.has(generation) ? (
                        <ArrowDown className="h-5 w-5 mr-2" />
                      ) : (
                        <ArrowRight className="h-5 w-5 mr-2" />
                      )}
                      Generation {generation} ({membersByGeneration[generation].length} members)
                    </button>
                    
                    {expandedGenerations.has(generation) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
                        {membersByGeneration[generation].map((member) => (
                          <div
                            key={member.id}
                            onClick={() => setSelectedMember(member)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedMember?.id === member.id
                                ? 'border-hazboun-500 bg-hazboun-50'
                                : 'border-gray-200 hover:border-hazboun-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 bg-hazboun-100 rounded-full flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-hazboun-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-hazboun-800">{member.name}</h4>
                                {member.birthYear && (
                                  <p className="text-xs text-gray-500">b. {member.birthYear}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {member.location}
                            </div>
                            
                            <div className="mt-2">
                              <span className="text-xs bg-hazboun-100 text-hazboun-700 px-2 py-1 rounded">
                                {member.branch}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Member Details Panel */}
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              {selectedMember ? (
                <div>
                  <h3 className="text-xl font-bold text-hazboun-800 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {selectedMember.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        {selectedMember.birthYear && (
                          <p><span className="font-medium">Born:</span> {selectedMember.birthYear}</p>
                        )}
                        <p><span className="font-medium">Location:</span> {selectedMember.location}, {selectedMember.country}</p>
                        {selectedMember.profession && (
                          <p><span className="font-medium">Profession:</span> {selectedMember.profession}</p>
                        )}
                        <p><span className="font-medium">Branch:</span> {selectedMember.branch}</p>
                        <p><span className="font-medium">Generation:</span> {selectedMember.generation}</p>
                      </div>
                    </div>
                    
                    {getParentsOf(selectedMember).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Parents</h4>
                        <div className="space-y-2">
                          {getParentsOf(selectedMember).map((parent) => (
                            <button
                              key={parent.id}
                              onClick={() => setSelectedMember(parent)}
                              className="block w-full text-left p-2 rounded bg-gray-50 hover:bg-hazboun-50 text-sm transition-colors"
                            >
                              {parent.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {getChildrenOf(selectedMember.id).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Children</h4>
                        <div className="space-y-2">
                          {getChildrenOf(selectedMember.id).map((child) => (
                            <button
                              key={child.id}
                              onClick={() => setSelectedMember(child)}
                              className="block w-full text-left p-2 rounded bg-gray-50 hover:bg-hazboun-50 text-sm transition-colors"
                            >
                              {child.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedMember.bio && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Biography</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {selectedMember.bio}
                        </p>
                      </div>
                    )}
                    
                    {selectedMember.email && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Contact</h4>
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="inline-flex items-center px-3 py-2 bg-hazboun-600 hover:bg-hazboun-700 text-white text-sm rounded-lg transition-colors"
                        >
                          Send Email
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Family Member</h3>
                  <p className="text-gray-500">
                    Click on any family member in the tree to view their details and relationships.
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

export default FamilyTree;