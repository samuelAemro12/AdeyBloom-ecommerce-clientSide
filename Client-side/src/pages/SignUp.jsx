import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'customer', adminSecret: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' });
  const [showAdminSecret, setShowAdminSecret] = useState(false);

  const validatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;
    const messages = ['', t('passwordStrengthVeryWeak'), t('passwordStrengthWeak'), t('passwordStrengthMedium'), t('passwordStrengthStrong'), t('passwordStrengthVeryStrong')];
    return { score, message: messages[score] || '' };
  };

  useEffect(() => {
    if (formData.password) setPasswordStrength(validatePasswordStrength(formData.password));
  }, [formData.password, t]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFormData((prev) => ({ ...prev, role, adminSecret: role === 'admin' ? prev.adminSecret : '' }));
    setShowAdminSecret(role === 'admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.role === 'admin') {
      if (!formData.adminSecret) { setError('Admin secret key is required'); setIsLoading(false); return; }
    } else {
      if (formData.password !== formData.confirmPassword) { setError(t('errorPasswordsDoNotMatch')); setIsLoading(false); return; }
      if (passwordStrength.score < 3) { setError(t('errorChooseStrongerPassword')); setIsLoading(false); return; }
    }

    try {
      const result = await register(formData);
      if (!result.success) setError(result.message || t('errorFailedToCreateAccount'));
      else navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || t('errorFailedToCreateAccount'));
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = ['', 'bg-coral-rose', 'bg-yellow-400', 'bg-blue-400', 'bg-sage-green', 'bg-sage-green'];
  const strengthColor = strengthColors[passwordStrength.score] || 'bg-cloud-gray';

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left – Brand Panel */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-primary-text">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-highlight/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <Link to="/" className="text-3xl font-serif font-bold text-primary-accent mb-12">
            AdeyBloom
          </Link>
          <h2 className="text-3xl font-serif font-bold mb-5 leading-tight">
            Join our growing<br />beauty community
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Create your account and start exploring premium Ethiopian beauty products.
          </p>

          <div className="mt-12 space-y-4">
            {['Free account creation', 'Exclusive member discounts', 'Order tracking & history'].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-sm text-white/70">
                <span className="w-5 h-5 rounded-full bg-primary-accent/30 border border-primary-accent/50 flex items-center justify-center text-primary-accent text-xs">✓</span>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right – Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-6"
        >
          <Link to="/" className="lg:hidden block text-2xl font-serif font-bold text-primary-accent mb-8 text-center">
            AdeyBloom
          </Link>

          <h1 className="text-2xl font-serif font-bold text-primary-text mb-1">{t('createAccount')}</h1>
          <p className="text-sm text-secondary-text mb-7">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary-accent font-medium hover:underline">
              {t('signInHeader')}
            </Link>
          </p>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1.5">{t('fullName')}</label>
              <div className="relative">
                <FiUser className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary-text w-4 h-4" />
                <input
                  type="text" name="name" required autoFocus
                  className="input-field pl-10"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1.5">{t('email')}</label>
              <div className="relative">
                <FiMail className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary-text w-4 h-4" />
                <input
                  type="email" name="email" required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password fields – only for customers */}
            {formData.role === 'customer' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1.5">{t('password')}</label>
                  <div className="relative">
                    <FiLock className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary-text w-4 h-4" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password" required
                      className="input-field pl-10 pr-10"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 -translate-y-1/2 right-3.5 text-secondary-text hover:text-primary-text transition-colors"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-cloud-gray rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-secondary-text whitespace-nowrap">{passwordStrength.message}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-text mb-1.5">{t('confirmPassword')}</label>
                  <div className="relative">
                    <FiLock className="absolute top-1/2 -translate-y-1/2 left-3.5 text-secondary-text w-4 h-4" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword" required
                      className="input-field pl-10 pr-10"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 -translate-y-1/2 right-3.5 text-secondary-text hover:text-primary-text transition-colors"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-primary-text mb-1.5">Register as</label>
              <select
                name="role" value={formData.role} onChange={handleRoleChange}
                className="input-field" required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Admin Secret */}
            {formData.role === 'admin' && (
              <div>
                <label className="block text-sm font-medium text-primary-text mb-1.5">Admin Secret Key</label>
                <input
                  type="password" name="adminSecret"
                  value={formData.adminSecret}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter admin secret key"
                  required
                />
                <p className="text-xs text-secondary-text mt-1">Contact system administrator for the admin secret key</p>
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-primary-accent hover:bg-brand-highlight text-white rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('creatingAccount')}
                </>
              ) : (
                <>
                  {t('createAccount')}
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

export default SignUp;
