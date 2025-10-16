import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import Toast from '../components/Toast';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
        const loggedInUser = result.user;
        const storedReturn = (() => { try { return sessionStorage.getItem('RETURN_TO'); } catch { return null; } })();
        let redirectTo = '/';
        if (loggedInUser?.role === 'admin') {
          redirectTo = '/admin/dashboard';
        } else {
          redirectTo = location.state?.from || storedReturn || '/';
        }
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-secondary-accent opacity-10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl z-10 relative border border-gray-100">
        <div className="text-center">
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">{t('signInHeader')}</h2>
          <p className="mt-2 text-base text-gray-600">
            {t('welcome')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {error && <Toast type="error" message={error} />}
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
              {t('email')}
            </label>
            <div className="relative">
              <FiMail className="absolute top-2.5 left-3 text-gray-400" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all sm:text-sm bg-gray-50"
                placeholder={t('example@gmail.com')}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('password')}
            </label>
            <div className="relative">
              <FiLock className="absolute top-2.5 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="block w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all sm:text-sm bg-gray-50"
                placeholder={t('enter Your Password')}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-gray-400 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('hidePassword') : t('showPassword')}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {/* Role Selector */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sign in as
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 shadow-sm text-gray-900 sm:text-sm"
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50`}
            >
              {isLoading ? t('signingIn') : t('signInHeader')}
            </button>
          </div>
        </form>
        <div className="text-sm text-center pt-3">
          <p className="text-gray-600">
            {t('dontHaveAccount')}{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 underline">
              {t('signUpHeader')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
