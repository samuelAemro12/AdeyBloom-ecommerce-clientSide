import React, { useEffect, useMemo, useState } from 'react';
import { FiEdit2, FiLock, FiPlus, FiTrash2, FiUnlock } from 'react-icons/fi';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import { useTranslation } from '../../context/TranslationContext';
import adminService from '../../services/admin.service';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  role: 'customer',
  isActive: true
};

const UsersPanel = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [savingUser, setSavingUser] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data.users || []);
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

  const filteredUsers = useMemo(() => (
    users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    })
  ), [users, searchTerm, selectedRole]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUserId(null);
    setForm(emptyForm);
  };

  const openCreateModal = () => {
    setEditingUserId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUserId(user._id);
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'customer',
      isActive: user.isActive !== false
    });
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(t('admin.usersPanel.deleteConfirm'))) {
      return;
    }

    try {
      await adminService.deleteUser(userId);
      setUsers((current) => current.filter((user) => user._id !== userId));
      setToast({ show: true, message: t('admin.usersPanel.deleteSuccess'), type: 'success' });
    } catch (error) {
      console.error('deleteUser error:', error);
      setToast({ show: true, message: t('admin.usersPanel.deleteError'), type: 'error' });
    }
  };

  const handleToggleUserStatus = async (user) => {
    try {
      const nextStatus = user.isActive === false;
      await adminService.toggleUserActive(user._id, nextStatus);
      setUsers((current) =>
        current.map((entry) => (entry._id === user._id ? { ...entry, isActive: nextStatus } : entry))
      );
      setToast({ show: true, message: t('admin.usersPanel.statusUpdateSuccess'), type: 'success' });
    } catch (error) {
      console.error('toggleUserActive error:', error);
      setToast({ show: true, message: t('admin.usersPanel.statusUpdateError'), type: 'error' });
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsers((current) =>
        current.map((user) => (user._id === userId ? { ...user, role: newRole } : user))
      );
      setToast({ show: true, message: t('admin.usersPanel.roleUpdateSuccess'), type: 'success' });
    } catch (error) {
      console.error('updateUserRole error:', error);
      setToast({ show: true, message: t('admin.usersPanel.roleUpdateError'), type: 'error' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSavingUser(true);

    try {
      if (editingUserId) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;
        const response = await adminService.updateUser(editingUserId, payload);
        const updatedUser = response.user || response;
        setUsers((current) =>
          current.map((user) => (user._id === editingUserId ? updatedUser : user))
        );
        setToast({ show: true, message: 'User updated successfully', type: 'success' });
      } else {
        const response = await adminService.createUser(form);
        const createdUser = response.user || response;
        setUsers((current) => [createdUser, ...current]);
        setToast({ show: true, message: 'User created successfully', type: 'success' });
      }

      closeModal();
    } catch (error) {
      console.error('save user error:', error);
      setToast({
        show: true,
        message: error?.response?.data?.message || 'Failed to save user',
        type: 'error'
      });
    } finally {
      setSavingUser(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((current) => ({ ...current, show: false }))}
      />

      <section className="rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-rose-700 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-rose-200">Access control</p>
            <h1 className="mt-2 text-3xl font-semibold">Users</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-200">
              Manage customer and admin accounts, roles, and activation state from one place.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-rose-50"
          >
            <FiPlus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option value="all">All roles</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
          </div>
          <div className="text-sm text-slate-500">{filteredUsers.length} matching users</div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => {
                const isActive = user.isActive !== false;

                return (
                  <tr key={user._id} className="text-sm text-slate-700">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 font-semibold text-rose-700">
                          {user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        onChange={(event) => handleUpdateUserRole(user._id, event.target.value)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                          title="Edit user"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user)}
                          className={`rounded-xl border p-2 transition ${
                            isActive
                              ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={isActive ? 'Deactivate user' : 'Activate user'}
                        >
                          {isActive ? <FiLock className="h-4 w-4" /> : <FiUnlock className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="rounded-xl border border-rose-200 p-2 text-rose-600 transition hover:bg-rose-50"
                          title="Delete user"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingUserId ? 'Edit User' : 'Add New User'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {editingUserId
                  ? 'Update account details, role, and activation status.'
                  : 'Create a new account directly from the admin panel.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Full name"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email address"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder={editingUserId ? 'Leave blank to keep password' : 'Password'}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required={!editingUserId}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={form.role}
                  onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  Active account
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingUser}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {savingUser ? 'Saving...' : editingUserId ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UsersPanel;
