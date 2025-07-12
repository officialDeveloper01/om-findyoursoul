
import { useState, useEffect, createContext, useContext } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  sessionExpired: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    // Check for session expiry flag
    const wasSessionExpired = sessionStorage.getItem('sessionExpired');
    if (wasSessionExpired) {
      setSessionExpired(true);
      sessionStorage.removeItem('sessionExpired');
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      // Store auth state in sessionStorage
      if (user) {
        sessionStorage.setItem('authUser', JSON.stringify({
          uid: user.uid,
          email: user.email,
          timestamp: Date.now()
        }));
        setSessionExpired(false);
      } else {
        sessionStorage.removeItem('authUser');
      }
    });

    // Set flag before page unloads (reload, navigation, or close)
    const handleBeforeUnload = () => {
      // Set a flag to indicate the page is being unloaded
      sessionStorage.setItem('pageUnloading', 'true');
    };

    // Handle actual unload - check if it's a real tab close
    const handleUnload = () => {
      // Small delay to check if this is a reload or actual close
      setTimeout(() => {
        // If the flag is still there after a brief delay, it means the page wasn't reloaded
        // and this is likely a tab close
        const isUnloading = sessionStorage.getItem('pageUnloading');
        if (isUnloading && user) {
          sessionStorage.removeItem('authUser');
          signOut(auth).catch(console.error);
        }
      }, 100);
    };

    // Clear the unloading flag when page loads/reloads
    const handleLoad = () => {
      sessionStorage.removeItem('pageUnloading');
    };

    // Handle visibility change (when tab becomes hidden)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page is being hidden, set flag
        sessionStorage.setItem('pageUnloading', 'true');
      } else {
        // Page is visible again, clear flag (user came back)
        sessionStorage.removeItem('pageUnloading');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('load', handleLoad);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clear flag on component mount (page load/reload)
    sessionStorage.removeItem('pageUnloading');

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    sessionStorage.removeItem('authUser');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, sessionExpired }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
