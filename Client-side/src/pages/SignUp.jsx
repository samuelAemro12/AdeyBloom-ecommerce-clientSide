import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ''
  });

  const validatePasswordStrength = (password) => {
    let score = 0;
    let message = '';

    if (password.length >= 8) score += 1;
    if (password.match(/[A-Z]/)) score += 1;
    if (password.match(/[a-z]/)) score += 1;
    if (password.match(/[0-9]/)) score += 1;
    if (password.match(/[^A-Za-z0-9]/)) score += 1;

    switch (score) {
      case 0:
      case 1:
        message = 'Very weak';
        break;
      case 2:
        message = 'Weak';
        break;
      case 3:
        message = 'Medium';
        break;
      case 4:
        message = 'Strong';
        break;
      case 5:
        message = 'Very strong';
        break;
      default:
        message = '';
    }

    return { score, message };
  };

  useEffect(() => {
    if (form.password) {
      setPasswordStrength(validatePasswordStrength(form.password));
    }
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Please choose a stronger password');
      setIsLoading(false);
      return;
    }

    try {
      await signup(form);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
      case 5:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-4">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-primary-accent opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-secondary-accent opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-cloud-gray">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-accent to-secondary-accent p-6 text-white text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="text-white/80 mt-1 text-sm">Join our beauty community</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-4 bg-error-light border-l-4 border-error text-error-dark text-sm px-4 py-3 rounded animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                autoFocus
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-cloud-gray focus:ring-2 focus:ring-primary-accent focus:outline-none transition"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-cloud-gray focus:ring-2 focus:ring-primary-accent focus:outline-none transition"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="relative">
                <FiLock className="absolute top-3.5 left-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-cloud-gray focus:ring-2 focus:ring-primary-accent focus:outline-none transition"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute top-3.5 right-3 text-gray-400 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {form.password && (
                <div className="space-y-1">
                  <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-ash-gray">
                    Password strength: <span className="font-medium">{passwordStrength.message}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FiLock className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-cloud-gray focus:ring-2 focus:ring-primary-accent focus:outline-none transition"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute top-3.5 right-3 text-gray-400 focus:outline-none"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Buttons */}
            <div className="space-y-4 mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group flex justify-center items-center bg-primary-accent hover:bg-opacity-90 text-gray-800 font-medium py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? (
                  <span className="inline-flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Sign Up
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <Link 
                to="/signin" 
                className="w-full flex justify-center items-center bg-secondary-accent hover:bg-opacity-90 text-gray-800 font-medium py-2.5 rounded-lg transition shadow-md"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 