import { SearchTables } from '@/components/SearchTables';
import { CelestialHeader } from '@/components/CelestialHeader';
import PlanetGridFooter from '@/components/PlanetGridFooter';

const SearchPage = () => {
  return (
    <div className="min-h-screen celestial-bg">
      <CelestialHeader 
        currentView="search" 
        setCurrentView={() => {}} // Not used in search page
      />

      <main className="relative">
        <div className="bg-gradient-to-b from-transparent via-white/95 to-white min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="pt-24">
              <SearchTables />
            </div>
          </div>
        </div>
      </main>

      <PlanetGridFooter />
    </div>
  );
};

export default SearchPage;