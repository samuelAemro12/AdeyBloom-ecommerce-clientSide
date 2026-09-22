import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({ email: '', password: '', role: 'admin' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!loading && user && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const result = await login({ ...formData, role: 'admin' });
      if (!result.success) {
        setError(result.message || t('errorFailedToSignIn'));
      } else {
        navigate('/admin/dashboard', { replace: true });
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
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-slate-950">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-highlight/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="flex items-center gap-3 text-3xl font-serif font-bold text-primary-accent mb-12">
            <FiShield className="w-8 h-8" />
            AdeyBloom Admin
          </div>
          <h2 className="text-3xl font-serif font-bold mb-5 leading-tight">
            Operations hub
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Sign in to manage products, orders, customers, and store settings.
          </p>

          <div className="mt-12 space-y-4">
            {['Product catalog control', 'Order fulfillment', 'User & role management'].map((feat) => (
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
          <div className="lg:hidden block text-2xl font-serif font-bold text-primary-accent mb-8 text-center">
            AdeyBloom Admin
          </div>

          <h1 className="text-2xl font-serif font-bold text-primary-text mb-1">Admin Sign In</h1>
          <p className="text-sm text-secondary-text mb-8">
            Authorized personnel only.
          </p>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
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
                  placeholder="admin@adeybloom.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

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

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-slate-900 hover:bg-primary-accent text-white rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
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
                  Sign In to Admin
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

export default AdminLogin;