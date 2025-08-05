import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';

const AdminSignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(formData);
            if (!result.success) {
                setError(result.message || 'Failed to sign in');
            }
            // AuthContext will handle redirect to admin dashboard
        } catch (err) {
            setError('Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
            {/* Decorative Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-6rem] left-[-6rem] w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl" />
                <div className="absolute bottom-[-6rem] right-[-6rem] w-96 h-96 bg-blue-200 opacity-20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl z-10">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                        <FiShield className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Admin Sign In</h2>
                    <p className="text-gray-600 mt-2">Access your admin dashboard</p>
                </div>
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="relative">
                        <FiMail className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Admin Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <FiLock className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3.5 right-3 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Signing In...
                            </div>
                        ) : (
                            'Sign In to Admin Panel'
                        )}
                    </button>
                </form>

                {/* Registration Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don't have an admin account?{' '}
                        <Link 
                            to="/admin-register" 
                            className="text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                            Register as Admin
                        </Link>
                    </p>
                </div>

                {/* Customer Login Link */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Not an admin?{' '}
                        <Link 
                            to="/signin" 
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            Customer Sign In
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-4">
                    <Link 
                        to="/" 
                        className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminSignIn;