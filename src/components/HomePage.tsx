import React from 'react';
import { Users, Globe, TreePine, BookOpen, ArrowRight } from 'lucide-react';
import { FamilyMember } from '../types/family';
import { locations } from '../data/familyData';

interface HomePageProps {
  setActiveSection: (section: string) => void;
  familyMembers: FamilyMember[];
}

const HomePage: React.FC<HomePageProps> = ({ setActiveSection, familyMembers }) => {
  const totalMembers = familyMembers.length;
  const totalCountries = new Set(locations.map(l => l.country)).size;
  const generations = Math.max(...familyMembers.map(m => m.generation));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hazboun-800 via-hazboun-700 to-hazboun-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to the Hazboun Family Website
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-hazboun-100 max-w-4xl mx-auto">
              Connecting generations across continents, preserving our Palestinian heritage, 
              and building bridges between family members worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveSection('members')}
                className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                Explore Family Members
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveSection('history')}
                className="border-2 border-white hover:bg-white hover:text-hazboun-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Our Heritage Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-hazboun-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-hazboun-600" />
              </div>
              <h3 className="text-3xl font-bold text-hazboun-800 mb-2">{totalMembers}+</h3>
              <p className="text-gray-600">Family Members</p>
            </div>
            <div className="text-center">
              <div className="bg-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-3xl font-bold text-hazboun-800 mb-2">{totalCountries}</h3>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="bg-earth-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="h-8 w-8 text-earth-600" />
              </div>
              <h3 className="text-3xl font-bold text-hazboun-800 mb-2">{generations}</h3>
              <p className="text-gray-600">Generations</p>
            </div>
            <div className="text-center">
              <div className="bg-hazboun-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-hazboun-600" />
              </div>
              <h3 className="text-3xl font-bold text-hazboun-800 mb-2">400+</h3>
              <p className="text-gray-600">Years of History</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-hazboun-800 mb-4">
              Our Family Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From the historical city of Bethlehem to cities around the world, 
              the Hazboun family carries forward a legacy of resilience, unity, and tradition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-hazboun-800 mb-6">Project Inspiration</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
The Hazboun family traces its roots to Palestine, more specifically Bethlehem. Like many other families from Palestine and the Arab World, wars have split our family apart, creating a global diaspora. 
                </p>
                <p>
Today, the Hazboun family spans multiple continents, with family members contributing to their communities while honoring our Palestinian heritage. This website serves as our digital gathering place, connecting relatives and preserving our story for future generations.

                </p>
                <h3 className="text-2xl font-bold text-hazboun-800 mb-6">Etymology</h3>
                <p>
The name Hazboun derives from the biblical word Heshbon (חֶשְׁבּוֹן) which derives from the Hebrew root ח־ש־ב (H-Sh-B), meaning "to calculate", or "to plan". Thus, the surname can symbolize qualities such as intelligence, contemplation, and practical wisdom. Heshbon is believed to be the modern day city of Hisban, in Jordan. Many believe that our family migrated from Hisban to Bethlehem in the 1600s and our name was adopted from there.
                </p>
                <p>
The HAZBOUN name has evolved into different spelling variations due to the universal dispersal & relocation of families. The main variations found today are: HAZBOUN, HAZBOON, HAZBUN, HAZBON, HASBUN, HASBOUN, HASBON, ASBUN, and JASBON.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-hazboun-800 mb-6">Quick Navigation</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setActiveSection('members')}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-hazboun-300 hover:bg-hazboun-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Users className="h-6 w-6 text-hazboun-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-hazboun-800">Family Directory</h4>
                      <p className="text-sm text-gray-600">Browse and connect with family members</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveSection('tree')}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-hazboun-300 hover:bg-hazboun-50 transition-colors"
                >
                  <div className="flex items-center">
                    <TreePine className="h-6 w-6 text-hazboun-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-hazboun-800">Family Tree</h4>
                      <p className="text-sm text-gray-600">Explore relationships and connections</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveSection('history')}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-hazboun-300 hover:bg-hazboun-50 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-hazboun-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-hazboun-800">Family History</h4>
                      <p className="text-sm text-gray-600">Learn about our heritage and migrations</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;