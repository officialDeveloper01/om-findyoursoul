
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Sun, Plus } from 'lucide-react';

interface CelestialHeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  onBackToSearch?: () => void;
  showBackToSearch?: boolean;
}

export const CelestialHeader = ({ currentView, setCurrentView, onBackToSearch, showBackToSearch }: CelestialHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 10);
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearchClick = () => {
    setCurrentView('search');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section - Navigation Buttons */}
          <div className="flex items-center gap-3">
            {showBackToSearch && onBackToSearch && (
              <Button 
                onClick={onBackToSearch}
                className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-4 py-2 rounded-lg transition-colors"
              >
                ← Back to Search Results
              </Button>
            )}
            <Button 
              onClick={() => setCurrentView('form')}
              className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>

          {/* Center Section - Ganesh Logo and HEAL YOUR SOUL */}
          <div className="text-center fade-in flex-1 flex flex-col items-center">
            <div className="mb-1">
              <img 
                src="/lovable-uploads/e1415cba-51c5-4a61-b523-642f2de6934b.png" 
                alt="Ganesh Om Logo" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain floating"
              />
            </div>
            <p className="text-lg md:text-2xl text-amber-600 font-serif font-bold tracking-widest mystic-text">
              HEAL YOUR SOUL
            </p>
          </div>

          {/* Right Section - Search and User Info */}
          <nav className="flex items-center gap-3">
            <Button 
              onClick={handleSearchClick}
              className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <Sun className="w-4 h-4 mr-2" />
              Search Records
            </Button>

            {/* User Info */}
            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-300">
              <span className="text-gray-700 text-sm font-medium hidden md:block">
                {user?.email?.split('@')[0]}
              </span>
              <Button 
                onClick={logout} 
                className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
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
