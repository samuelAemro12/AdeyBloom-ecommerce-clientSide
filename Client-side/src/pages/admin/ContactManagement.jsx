import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../context/TranslationContext';
import { contactService } from '../../services/contactService';
import { FiMail, FiPhone, FiMapPin, FiClock, FiEye, FiTrash2, FiCheck } from 'react-icons/fi';
import Toast from '../../components/Toast';

const ContactManagement = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAllContacts();
      if (response.success) {
        setContacts(response.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setMessage('Failed to fetch contacts');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (contactId, status) => {
    try {
      const response = await contactService.updateContactStatus(contactId, status);
      if (response.success) {
        setContacts(contacts.map(contact => 
          contact._id === contactId ? { ...contact, status } : contact
        ));
        setMessage('Contact status updated successfully');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error updating contact status:', error);
      setMessage('Failed to update contact status');
      setMessageType('error');
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      const response = await contactService.deleteContact(contactId);
      if (response.success) {
        setContacts(contacts.filter(contact => contact._id !== contactId));
        setMessage('Contact deleted successfully');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setMessage('Failed to delete contact');
      setMessageType('error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Management</h1>
          <p className="text-gray-600">Manage contact form submissions</p>
        </div>

        {/* Toast Message */}
        {message && (
          <Toast 
            message={message} 
            type={messageType} 
            onClose={() => setMessage('')}
          />
        )}

        {/* Contact List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Contact Submissions ({contacts.length})
            </h2>
          </div>

          {contacts.length === 0 ? (
            <div className="p-8 text-center">
              <FiMail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No contact submissions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {contact.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {contact.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {contact.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(contact.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="View Details"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(contact._id, 'read')}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Mark as Read"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteContact(contact._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact Details</h3>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.subject}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={selectedContact.status}
                      onChange={(e) => updateStatus(selectedContact._id, e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                  
                  {selectedContact.ipAddress && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">IP Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContact.ipAddress}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => deleteContact(selectedContact._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManagement; 