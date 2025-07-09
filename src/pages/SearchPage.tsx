import { SearchTables } from '@/components/SearchTables';
import { CelestialHeader } from '@/components/CelestialHeader';


const SearchPage = () => {
  return (
    <div className="min-h-screen celestial-bg">
      <CelestialHeader />

      <main className="relative">
        <div className="bg-gradient-to-b from-transparent via-white/95 to-white min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="pt-24">
              <SearchTables />
            </div>
          </div>
        </div>
      </main>

      {/* Rashi and Planet Relationships Footer */}
      <footer className="w-full mt-8 pt-6 border-t border-gray-200">
        <img 
          src="/lovable-uploads/04d81580-67df-432a-b65b-5ff4f1b07658.png" 
          alt="Rashi and Planet Relationships Chart"
          className="w-full h-auto object-contain"
        />
      </footer>
    </div>
  );
};

export default SearchPage;