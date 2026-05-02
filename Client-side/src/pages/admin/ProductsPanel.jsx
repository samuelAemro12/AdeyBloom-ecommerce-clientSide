import React, { useEffect, useMemo, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Toast from '../../components/Toast';
import adminService from '../../services/admin.service';

const emptyProduct = {
  name: '',
  description: '',
  brand: '',
  price: '',
  stock: '',
  image: '',
  currency: 'ETB',
  active: true
};

const ProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [form, setForm] = useState(emptyProduct);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await adminService.getProducts({ search: searchTerm, status: statusFilter });
      setProducts(response.products || []);
    } catch (error) {
      console.error('loadProducts error:', error);
      setToast({ show: true, message: 'Error loading products', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter]);

  const filteredProducts = useMemo(() => products, [products]);

  const openCreateModal = () => {
    setEditingProductId(null);
    setForm(emptyProduct);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProductId(product._id);
    setForm({
      name: product.name || '',
      description: product.description || '',
      brand: product.brand || '',
      price: product.price ?? '',
      stock: product.stock ?? '',
      image: product.images?.[0] || '',
      currency: product.currency || 'ETB',
      active: product.active !== false
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProductId(null);
    setForm(emptyProduct);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Archive this product from the storefront?')) {
      return;
    }

    try {
      await adminService.deleteProduct(productId);
      setToast({ show: true, message: 'Product archived successfully', type: 'success' });
      loadProducts();
    } catch (error) {
      console.error('deleteProduct error:', error);
      setToast({ show: true, message: 'Failed to archive product', type: 'error' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name,
      description: form.description,
      brand: form.brand,
      price: Number(form.price),
      stock: Number(form.stock),
      currency: form.currency,
      active: form.active
    };

    if (form.image) {
      payload.images = [form.image];
    }

    try {
      if (editingProductId) {
        await adminService.updateProduct(editingProductId, payload);
        setToast({ show: true, message: 'Product updated successfully', type: 'success' });
      } else {
        await adminService.createProduct(payload);
        setToast({ show: true, message: 'Product created successfully', type: 'success' });
      }

      closeModal();
      loadProducts();
    } catch (error) {
      console.error('save product error:', error);
      setToast({
        show: true,
        message: error?.response?.data?.message || 'Failed to save product',
        type: 'error'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((current) => ({ ...current, show: false }))}
      />

      <section className="rounded-[28px] bg-gradient-to-br from-amber-100 via-white to-rose-100 p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-600">Catalog control</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Products</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Review the full catalog, including archived items, and manage stock from the admin surface.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            Add Product
          </button>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            >
              <option value="all">All products</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="text-sm text-slate-500">{filteredProducts.length} products</div>
        </div>

        {loading ? <div className="mt-6"><LoadingSpinner /></div> : null}

        {!loading ? (
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const isLowStock = Number(product.stock) <= Number(product.lowStockThreshold || 5);
                  const isActive = product.active !== false;

                  return (
                    <tr key={product._id} className="text-sm text-slate-700">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0] || '/placeholder-image.jpg'}
                            alt={product.name}
                            className="h-14 w-14 rounded-2xl object-cover"
                          />
                          <div>
                            <div className="font-medium text-slate-900">{product.name}</div>
                            <div className="text-slate-500">{product.brand || 'Unbranded'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {product.currency || 'ETB'} {Number(product.price || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <span className={isLowStock ? 'font-semibold text-amber-600' : ''}>{product.stock ?? 0}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isActive ? 'Active' : 'Archived'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                          >
                            Edit
                          </button>
                          {isActive ? (
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600"
                            >
                              Archive
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingProductId ? 'Edit Product' : 'Add Product'}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Save catalog updates directly to the backend.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Product name"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                placeholder="Description"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={form.brand}
                  onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))}
                  placeholder="Brand"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  value={form.image}
                  onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
                  placeholder="Image URL"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                  placeholder="Price"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  required
                />
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
                  placeholder="Stock"
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                  required
                />
                <select
                  value={form.currency}
                  onChange={(event) => setForm((current) => ({ ...current, currency: event.target.value }))}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                >
                  <option value="ETB">ETB</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                Visible on storefront
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300"
                />
              </label>
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
                  disabled={saving}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingProductId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductsPanel;
