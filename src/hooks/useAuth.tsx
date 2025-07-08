
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

    // Handle tab close - clear auth data
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('authUser');
      if (user) {
        signOut(auth).catch(console.error);
      }
    };

    // Handle browser/tab close
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
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
