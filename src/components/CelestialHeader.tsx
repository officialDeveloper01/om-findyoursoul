
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Plus } from 'lucide-react';

interface CelestialHeaderProps {
  // No props needed - header handles its own navigation
}

export const CelestialHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 10);
      
      // Hide header when scrolling away from top, show only when at top
      if (currentScrollY > 50) {
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
    // If already on search page, force refresh to restart search
    if (location.pathname === '/search') {
      navigate(0); // Force refresh the current route
    } else {
      navigate('/search');
    }
  };

  const handleNewAnalysisClick = () => {
    navigate('/dashboard');
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
          {/* Left Section - Navigation Button */}
          <div className="flex items-center">
            <Button 
              onClick={handleNewAnalysisClick}
              className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-2 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">New Analysis</span>
              <span className="xs:hidden">New</span>
            </Button>
          </div>

          {/* Center Section - Ganesh Logo and HEAL YOUR SOUL */}
          <div className="text-center fade-in flex-1 flex flex-col items-center px-2">
            <div className="mb-1">
              <img 
                src="/assets/app-icon.png" 
                alt="Ganesh Om Logo" 
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <p className="text-sm sm:text-lg md:text-2xl text-amber-600 font-serif font-bold tracking-widest mystic-text">
              HEAL YOUR SOUL
            </p>
          </div>

          {/* Right Section - Search and User Info */}
          <nav className="flex items-center gap-1 sm:gap-3">
            <Button 
              onClick={handleSearchClick}
              className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-2 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm"
            >
              <Sun className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Search Records</span>
              <span className="xs:hidden">Search</span>
            </Button>

            {/* User Info */}
            <div className="flex items-center gap-1 sm:gap-3 ml-1 sm:ml-3 pl-1 sm:pl-3 border-l border-gray-300">
              <span className="text-amber-300 text-xs sm:text-sm font-medium hidden md:block">
                {user?.email?.split('@')[0]}
              </span>
              <Button 
                onClick={logout} 
                className="bg-gray-200 text-black hover:bg-gray-300 font-medium px-2 sm:px-4 py-2 rounded-lg transition-colors text-xs sm:text-sm"
              >
                <span className="hidden xs:inline">Sign Out</span>
                <span className="xs:hidden">Sign Out</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
