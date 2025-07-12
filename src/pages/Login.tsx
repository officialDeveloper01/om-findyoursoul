
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Mail, Lock, Sparkles, Star } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    setResetError('');
    setResetSuccess(false);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess(true);
      setResetEmail('');
    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      }
      
      setResetError(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  const handleResetModalClose = () => {
    setIsResetModalOpen(false);
    setResetEmail('');
    setResetError('');
    setResetSuccess(false);
  };

  return (
    <div className="min-h-screen celestial-bg flex items-center justify-center px-4">
      {/* Sacred geometry background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-amber-400/20 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-400/20 rounded-full"></div>
        <div className="absolute top-3/4 left-3/4 w-32 h-32 border border-amber-400/30 rotate-12"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-amber-400 floating" />
              <div className="absolute inset-0 w-12 h-12 bg-amber-400/20 rounded-full blur-lg"></div>
            </div>
            <div>
              <h1 className="text-6xl font-bold mystic-text tracking-wider">
                <img 
                src="/lovable-uploads/app-icon.png" 
                alt="Ganesh Om Logo" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain justify-center mx-auto"
              />
              </h1>
              <p className="text-amber-300 font-light tracking-widest text-lg">HEAL YOUR SOUL</p>
            </div>
            <div className="relative">
              <Star className="w-12 h-12 text-purple-400 floating" />
              <div className="absolute inset-0 w-12 h-12 bg-purple-400/20 rounded-full blur-lg"></div>
            </div>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        <Card className="sacred-card slide-up">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-light text-slate-700">Welcome Back</CardTitle>
            <p className="text-slate-500 mt-2">Continue your spiritual journey</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-200">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-700">
                  <Mail size={16} />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-slate-700">
                  <Lock size={16} />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full sacred-button text-white py-3 text-lg font-light tracking-wide"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Enter Sacred Space'}
              </Button>

              <div className="text-center space-y-2">
                <Dialog open={isResetModalOpen} onOpenChange={setIsResetModalOpen}>
                  <DialogTrigger asChild>
                    <button 
                      type="button"
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sacred-card max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-light text-slate-700 text-center">
                        Reset Password
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {resetSuccess ? (
                        <div className="text-center space-y-4">
                          <div className="text-green-600 text-sm p-3 bg-green-50 rounded-lg border border-green-200">
                            A reset link has been sent to your email address. Please check your inbox.
                          </div>
                          <Button 
                            onClick={handleResetModalClose}
                            className="w-full sacred-button text-white"
                          >
                            Close
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handlePasswordReset} className="space-y-4">
                          {resetError && (
                            <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-lg border border-red-200">
                              {resetError}
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <Label htmlFor="resetEmail" className="flex items-center gap-2 text-slate-700">
                              <Mail size={16} />
                              Email Address
                            </Label>
                            <Input
                              id="resetEmail"
                              type="email"
                              value={resetEmail}
                              onChange={(e) => setResetEmail(e.target.value)}
                              placeholder="Enter your email"
                              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400/20"
                              required
                            />
                          </div>

                          <Button 
                            type="submit" 
                            className="w-full sacred-button text-white"
                            disabled={resetLoading}
                          >
                            {resetLoading ? 'Sending...' : 'Send Reset Link'}
                          </Button>
                        </form>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <p className="text-slate-600">
                  New seeker?{' '}
                  <Link to="/signup" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                    Begin Journey
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Floating spiritual elements */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-1000"></div>
      </div>
    </div>
  );
};

export default Login;
