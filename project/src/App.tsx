import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import FamilyMembers from './components/FamilyMembers';
import FamilyTree from './components/FamilyTree';
import FamilyHistory from './components/FamilyHistory';
import GlobalPresence from './components/GlobalPresence';
import AboutPage from './components/AboutPage';
import OldWebsitePage from './components/OldWebsitePage';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { familyService, testConnection } from './lib/supabase';
import { FamilyMember } from './types/family';
import { Loader } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load family members from Supabase on component mount
  useEffect(() => {
    loadFamilyMembers();
  }, []);

  const loadFamilyMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Test connection first
      const connectionOk = await testConnection();
      if (!connectionOk) {
        throw new Error('Unable to connect to database. Please check your Supabase configuration.');
      }
      
      const members = await familyService.getAllMembers();
      console.log('Loaded family members:', members);
      setFamilyMembers(members);
    } catch (err) {
      console.error('Error loading family members:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load family members. Please check your connection and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMember = async (newMember: Omit<FamilyMember, 'id'>) => {
    try {
      console.log('App: Adding new member:', newMember);
      const addedMember = await familyService.addMember(newMember);
      console.log('App: Successfully added member:', addedMember);
      setFamilyMembers(prev => [...prev, addedMember]);
    } catch (err) {
      console.error('App: Error adding family member:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add family member. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const handleUpdateMembers = (updatedMembers: FamilyMember[]) => {
    setFamilyMembers(updatedMembers);
  };

  const renderActiveSection = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader className="h-12 w-12 text-hazboun-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-hazboun-800 mb-2">Loading Family Data</h2>
            <p className="text-gray-600">Please wait while we fetch the latest family information...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Connection Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadFamilyMembers}
              className="bg-hazboun-600 hover:bg-hazboun-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'home':
        return <HomePage setActiveSection={setActiveSection} familyMembers={familyMembers} />;
      case 'members':
        return <FamilyMembers familyMembers={familyMembers} />;
      case 'tree':
        return <FamilyTree familyMembers={familyMembers} />;
      case 'history':
        return <FamilyHistory familyMembers={familyMembers} />;
      case 'locations':
        return <GlobalPresence familyMembers={familyMembers} />;
      case 'archive':
        return <OldWebsitePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setActiveSection={setActiveSection} familyMembers={familyMembers} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1">
        {renderActiveSection()}
      </main>
      <Footer />
      {!isLoading && !error && (
        <AdminPanel 
          familyMembers={familyMembers}
          onAddMember={handleAddMember}
          onUpdateMembers={handleUpdateMembers}
        />
      )}
    </div>
  );
}

export default App;