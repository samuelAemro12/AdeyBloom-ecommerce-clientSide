import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiMapPin, FiHeart, FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AddressManagement from '../components/AddressManagement';
import { useTranslation } from '../context/TranslationContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, orders, updateProfile } = useUser();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const renderProfile = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#2F2F2F]">{t('profileInformation')}</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 text-[#C585D7] hover:text-[#008080] transition-colors"
        >
          <FiEdit2 className="w-5 h-5" />
          <span>{isEditing ? t('cancel') : t('editProfile')}</span>
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#6A6A6A] mb-1">{t('fullName')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
          </div>
          <div>
            <label className="block text-[#6A6A6A] mb-1">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
          </div>
          <div>
            <label className="block text-[#6A6A6A] mb-1">{t('phone')}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#C585D7] text-white rounded-full hover:bg-[#008080] transition-colors"
            >
              {t('saveChanges')}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-[#6A6A6A] mb-1">{t('fullName')}</label>
            <p className="text-[#2F2F2F] font-semibold">{user?.name}</p>
          </div>
          <div>
            <label className="block text-[#6A6A6A] mb-1">{t('email')}</label>
            <p className="text-[#2F2F2F] font-semibold">{user?.email}</p>
          </div>
          <div>
            <label className="block text-[#6A6A6A] mb-1">{t('phone')}</label>
            <p className="text-[#2F2F2F] font-semibold">{user?.phone}</p>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderOrders = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#2F2F2F]">{t('orderHistory')}</h2>
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <FiPackage className="w-16 h-16 text-[#C585D7] mx-auto mb-4" />
          <p className="text-[#6A6A6A]">{t('noOrders')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#6A6A6A]">{t('order')} #{order.id}</p>
                  <p className="text-[#6A6A6A]">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {t('delivered')}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-[#2F2F2F]">{item.name}</p>
                        <p className="text-[#6A6A6A]">{t('quantity')}: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-[#C585D7]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#2F2F2F] font-semibold">{t('total')}</span>
                  <span className="text-[#C585D7] text-xl font-bold">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
      <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">{t('myAccount')}</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#C585D7] text-white'
                : 'bg-white text-[#6A6A6A] hover:bg-[#FAF3EC]'
            }`}
          >
            <FiUser className="w-5 h-5" />
            <span>{t('profile')}</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#C585D7] text-white'
                : 'bg-white text-[#6A6A6A] hover:bg-[#FAF3EC]'
            }`}
          >
            <FiPackage className="w-5 h-5" />
            <span>{t('orders')}</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === 'addresses'
                ? 'bg-[#C585D7] text-white'
                : 'bg-white text-[#6A6A6A] hover:bg-[#FAF3EC]'
            }`}
          >
            <FiMapPin className="w-5 h-5" />
            <span>{t('addresses')}</span>
          </button>
          <button
            onClick={() => navigate('/wishlist')}
            className="flex items-center space-x-2 px-6 py-3 rounded-full transition-colors bg-white text-[#6A6A6A] hover:bg-[#FAF3EC]"
          >
            <FiHeart className="w-5 h-5" />
            <span>{t('wishlist')}</span>
          </button>
        </div>

        <div className="mt-8">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'addresses' && <AddressManagement />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 