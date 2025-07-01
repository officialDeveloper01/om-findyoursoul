
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Sun, Plus } from 'lucide-react';

interface CelestialHeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const CelestialHeader = ({ currentView, setCurrentView }: CelestialHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchClick = () => {
    setCurrentView('search');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section - New Analysis Button */}
          <div className="flex items-center">
            <Button 
              onClick={() => setCurrentView('form')}
              variant={currentView === 'form' ? 'default' : 'ghost'}
              className={`sacred-button text-white font-medium ${
                currentView === 'form' ? '' : 'bg-transparent text-slate-700 hover:text-amber-600'
              }`}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Center Section - Ganesh Logo and HEAL YOUR SOUL */}
          <div className="text-center fade-in flex-1 flex flex-col items-center">
            <div className="mb-2">
              <img 
                src="/lovable-uploads/e1415cba-51c5-4a61-b523-642f2de6934b.png" 
                alt="Ganesh Om Logo" 
                className="w-16 h-16 object-contain floating"
              />
            </div>
            <p className="text-2xl text-amber-600 font-serif font-bold tracking-widest mystic-text">
              HEAL YOUR SOUL
            </p>
          </div>

          {/* Right Section - Search and User Info */}
          <nav className="flex items-center gap-6">
            <Button 
              onClick={handleSearchClick}
              variant={currentView === 'search' ? 'default' : 'ghost'}
              className={`sacred-button text-white font-medium ${
                currentView === 'search' ? '' : 'bg-transparent text-slate-700 hover:text-amber-600'
              }`}
            >
              <Sun className="w-4 h-4 mr-2" />
              Search Records
            </Button>

            {/* User Info */}
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-amber-200">
              <span className="text-amber-900 text-sm font-medium">
                {user?.email?.split('@')[0]}
              </span>
              <Button 
                onClick={logout} 
                variant="outline" 
                size="sm"
                className="border-amber-200 text-slate-600 hover:bg-amber-50 hover:border-amber-300"
              >
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
