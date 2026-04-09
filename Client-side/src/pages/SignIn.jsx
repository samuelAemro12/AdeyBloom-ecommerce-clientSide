import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const result = await login(formData);
      if (!result.success) {
        setError(result.message || t('errorFailedToSignIn'));
      } else {
        const storedReturn = (() => { try { return sessionStorage.getItem('RETURN_TO'); } catch { return null; } })();
        let redirectTo = result.user?.role === 'admin' ? '/admin/dashboard' : (location.state?.from || storedReturn || '/');
        try {
          sessionStorage.removeItem('RETURN_TO');
          sessionStorage.removeItem('PENDING_INTENT');
          sessionStorage.removeItem('TEMP_AUTH_ROLE');
        } catch { /* noop */ }
        navigate(redirectTo, { replace: true });
      }
    } catch {
      setError(t('errorFailedToSignIn'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left – Brand Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-primary-text">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-highlight/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <Link to="/" className="text-3xl font-serif font-bold text-primary-accent mb-12">
            AdeyBloom
          </Link>
          <h2 className="text-3xl font-serif font-bold mb-5 leading-tight">
            Welcome back to<br />your beauty world
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Sign in to continue shopping premium Ethiopian beauty products crafted for you.
          </p>

          <div className="mt-12 space-y-4">
            {['Premium quality products', 'Bilingual support (EN / አማ)', 'Secure Ethiopian payment'].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-sm text-white/70">
                <span className="w-5 h-5 rounded-full bg-primary-accent/30 border border-primary-accent/50 flex items-center justify-center text-primary-accent text-xs">✓</span>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block text-2xl font-serif font-bold text-primary-accent mb-8 text-center">
            AdeyBloom
          </Link>

          <h1 className="text-2xl font-serif font-bold text-primary-text mb-1">{t('signInHeader')}</h1>
          <p className="text-sm text-secondary-text mb-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-accent font-medium hover:underline">
              {t('signUpHeader')}
            </Link>
          </p>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-1.5">
                {t('email')}
              </label>
              <div className="relative">
                <FiMail className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary-text w-4 h-4" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-text mb-1.5">
                {t('password')}
              </label>
              <div className="relative">
                <FiLock className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary-text w-4 h-4" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 right-3.5 text-secondary-text hover:text-primary-text transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-primary-text mb-1.5">
                Sign in as
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary-accent hover:bg-brand-highlight text-white rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  {t('signInHeader')}
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
