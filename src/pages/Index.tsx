
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserDataForm } from '@/components/UserDataForm';
import { LoshoGrid } from '@/components/LoshoGrid';
import { calculateLoshoGrid } from '@/utils/gridCalculator';
import { PlanetLetterAssociations } from '@/components/PlanetLetterAssociations';

const Index = () => {
  const [userData, setUserData] = useState(null);
  const [gridData, setGridData] = useState(null);
  const [currentView, setCurrentView] = useState('form');

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    setUserData(data);
    const calculatedGrid = calculateLoshoGrid(data.dateOfBirth);
    setGridData(calculatedGrid);
    setCurrentView('grid');
  };

  const handleNewEntry = () => {
    setUserData(null);
    setGridData(null);
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {currentView === 'form' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light text-gray-700 mb-4">
                Discover Your Sacred Numbers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enter your birth details to calculate your personal Losho Grid based on ancient Indian numerology traditions.
              </p>
            </div>
            <UserDataForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {currentView === 'grid' && userData && gridData && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-700 mb-2">
                Your Sacred Losho Grid
              </h2>
              <p className="text-gray-600 mb-6">
                For {userData.fullName}
              </p>
              <Button 
                onClick={handleNewEntry}
                variant="outline"
                className="mb-8"
              >
                Create New Grid
              </Button>
            </div>
            <LoshoGrid gridData={gridData} userData={userData} />
          </div>
        )}
      </main>

      {/* Rashi and Planet Relationships Footer */}
      <footer className="w-full mt-8 pt-6 border-t border-gray-200">
        <img 
          src="/lovable-uploads/04d81580-67df-432a-b65b-5ff4f1b07658.png" 
          alt="Rashi and Planet Relationships Chart"
          className="w-full h-auto object-contain"
        />
        
        {/* Planet & Letter Associations */}
        <PlanetLetterAssociations />
        
        <div className="text-center py-4 text-gray-500 text-sm">
          <p>© 2024 OM - Sacred Numerology Application</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
