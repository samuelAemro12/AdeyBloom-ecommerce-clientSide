import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await googleSignIn();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-4">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-secondary-accent opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-accent to-secondary-accent p-6 text-white text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-white/80 mt-1 text-sm">Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-error-light border-l-4 border-error text-error-dark text-sm px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="relative">
              <FiMail className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                required
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-cloud-gray focus:ring-2 focus:ring-primary-accent focus:outline-none transition"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="password"
                required
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-cloud-gray focus:ring-2 focus:ring-primary-accent focus:outline-none transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="space-y-4 mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group flex justify-center items-center bg-primary-accent hover:bg-opacity-90 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <Link 
                to="/signup" 
                className="w-full flex justify-center items-center bg-secondary-accent hover:bg-opacity-90 text-white font-medium py-2.5 rounded-lg transition"
              >
                Create Account
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </form>

          <p className="mt-6 text-sm text-center text-ash-gray">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-accent hover:text-opacity-80 font-medium transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 