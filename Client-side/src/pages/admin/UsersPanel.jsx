import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiUserPlus, FiLock, FiUnlock } from 'react-icons/fi';
import { useTranslation } from '../../context/TranslationContext';
import adminService from '../../services/admin.service';
import authService from '../../services/auth.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';

const UsersPanel = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [savingUser, setSavingUser] = useState(false);
    const { getUsers, deleteUser, updateUserRole } = adminService;

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data.users || data);
        } catch (error) {
            console.error('loadUsers error:', error);
            setToast({ show: true, message: t('admin.usersPanel.fetchError'), type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm(t('admin.usersPanel.deleteConfirm'))) {
            return;
        }

        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user._id !== userId));
            setToast({ show: true, message: t('admin.usersPanel.deleteSuccess'), type: 'success' });
        } catch (error) {
            console.error('deleteUser error:', error);
            setToast({ show: true, message: t('admin.usersPanel.deleteError'), type: 'error' });
        }
    };

    const handleToggleUserStatus = async (userId, currentStatus) => {
        try {
            await adminService.toggleUserActive(userId, !currentStatus);
            setUsers(users.map(user =>
                user._id === userId ? { ...user, isActive: !currentStatus } : user
            ));
            setToast({ show: true, message: t('admin.usersPanel.statusUpdateSuccess'), type: 'success' });
        } catch (error) {
            console.error('toggleUserActive error:', error);
            setToast({ show: true, message: t('admin.usersPanel.statusUpdateError'), type: 'error' });
        }
    };

    const handleUpdateUserRole = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
            setToast({ show: true, message: t('admin.usersPanel.roleUpdateSuccess'), type: 'success' });
        } catch (error) {
            console.error('updateUserRole error:', error);
            setToast({ show: true, message: t('admin.usersPanel.roleUpdateError'), type: 'error' });
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6">
            <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Users</h1>
                <div className="flex gap-4">
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="border rounded-lg px-4 py-2"
                    >
                        <option value="all">All roles</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-64"
                    />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FiUserPlus className="w-5 h-5" />
                        Add User
                    </button>
                </div>
            </div>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Add New User</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                onClick={() => { setIsModalOpen(false); setNewUser({ name: '', email: '', password: '' }); }}
                                className="px-4 py-2 rounded border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    setSavingUser(true);
                                    try {
                                        await authService.register(newUser);
                                        setToast({ show: true, message: 'User created', type: 'success' });
                                        setIsModalOpen(false);
                                        setNewUser({ name: '', email: '', password: '' });
                                        await loadUsers();
                                    } catch (error) {
                                        console.error('create user error:', error);
                                        setToast({ show: true, message: 'Failed to create user', type: 'error' });
                                    } finally {
                                        setSavingUser(false);
                                    }
                                }}
                                disabled={savingUser}
                                className="bg-primary text-white px-4 py-2 rounded"
                            >
                                {savingUser ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joined
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <div
                                                className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700"
                                                aria-hidden="true"
                                            >
                                                {(user && user.name && user.name.length > 0) ? user.name.charAt(0).toUpperCase() : '?'}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { /* Implement edit user modal */ }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            title={'Edit user'}
                                        >
                                            <FiEdit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                                            className={user.isActive ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                                            title={user.isActive ? 'Deactivate user' : 'Activate user'}
                                        >
                                            {user.isActive ? (
                                                <FiLock className="w-5 h-5" />
                                            ) : (
                                                <FiUnlock className="w-5 h-5" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="text-red-600 hover:text-red-900"
                                            title={'Delete user'}
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Note: keep internal toast/error translation keys as-is; UI labels above are user-facing.
export default UsersPanel;