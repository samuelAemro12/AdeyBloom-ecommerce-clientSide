import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import { useToast } from '../context/ToastContext';
import { useTranslation } from '../context/TranslationContext';

const AddressManagement = () => {
  const { addresses, addAddress, updateAddress, removeAddress } = useUser();
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAddress(editingId, formData);
      setEditingId(null);
    } else {
      addAddress(formData);
    }
    setIsAdding(false);
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      isDefault: false
    });
    showSuccess(t('addressUpdatedSuccess'));
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setIsAdding(true);
  };

  const handleDelete = (addressId) => {
    if (window.confirm(t('confirmDeleteAddress'))) {
      removeAddress(addressId);
      showSuccess(t('addressDeletedSuccess'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-[#2F2F2F]">{t('shippingAddresses')}</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 bg-[#C585D7] text-white px-4 py-2 rounded-full hover:bg-[#008080] transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>{t('addNewAddress')}</span>
        </button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-[#2F2F2F] mb-4">
            {editingId ? t('editAddress') : t('addNewAddress')}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder={t('fullName')}
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
            <input
              type="text"
              name="street"
              placeholder={t('streetAddress')}
              value={formData.street}
              onChange={handleInputChange}
              className="w-full p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder={t('city')}
                value={formData.city}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
              <input
                type="text"
                name="state"
                placeholder={t('stateProvince')}
                value={formData.state}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipCode"
                placeholder={t('zipPostalCode')}
                value={formData.zipCode}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
              <input
                type="text"
                name="country"
                placeholder={t('country')}
                value={formData.country}
                onChange={handleInputChange}
                className="p-3 border-2 border-[#C585D7] rounded-lg focus:outline-none focus:border-[#008080]"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 text-[#C585D7] border-[#C585D7] rounded focus:ring-[#C585D7]"
              />
              <label className="text-[#6A6A6A]">{t('setAsDefault')}</label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  setFormData({
                    name: '',
                    street: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                    isDefault: false
                  });
                }}
                className="px-6 py-2 text-[#C585D7] hover:text-[#008080] transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#C585D7] text-white rounded-full hover:bg-[#008080] transition-colors"
              >
                {editingId ? t('updateAddress') : t('saveAddress')}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {isLoading && <LoadingSpinner />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg relative"
          >
            {address.isDefault && (
              <span className="absolute top-4 right-4 bg-[#C585D7] text-white px-3 py-1 rounded-full text-sm">
                {t('default')}
              </span>
            )}
            <div className="flex items-start space-x-4">
              <FiMapPin className="w-6 h-6 text-[#C585D7] mt-1" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-[#2F2F2F] mb-2">{address.name}</h3>
                <p className="text-[#6A6A6A]">{address.street}</p>
                <p className="text-[#6A6A6A]">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-[#6A6A6A]">{address.country}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => handleEdit(address)}
                className="p-2 text-[#C585D7] hover:text-[#008080] transition-colors"
              >
                <FiEdit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="p-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AddressManagement; 