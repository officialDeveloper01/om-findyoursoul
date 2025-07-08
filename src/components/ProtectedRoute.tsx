
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, sessionExpired } = useAuth();
  const [showSessionMessage, setShowSessionMessage] = useState(false);

  useEffect(() => {
    // Check for direct URL access without valid session
    if (!loading && !user) {
      const authUser = sessionStorage.getItem('authUser');
      if (!authUser) {
        sessionStorage.setItem('sessionExpired', 'true');
      }
    }

    if (sessionExpired) {
      setShowSessionMessage(true);
      const timer = setTimeout(() => setShowSessionMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, user, sessionExpired]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-amber-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        {showSessionMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg">
            Your session has expired. Please log in again.
          </div>
        )}
        <Navigate to="/login" replace />
      </>
    );
  }

  return <>{children}</>;
};
