import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import Toast from '../../components/Toast';
import { useTranslation } from '../../context/TranslationContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductsPanel = () => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        description: '',
        richDescription: '',
        image: '',
        brand: '',
        price: 0,
        category: '',
        countInStock: 0,
        isFeatured: false,
    });
    // categories removed from ProductsPanel UI
    const [toast, setToast] = useState({ show: false, message: '', type: '' });
    const [saving, setSaving] = useState(false);
    const { getProducts, deleteProduct, createProduct, updateProduct } = productService;

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await productService.getProducts();
                setProducts(fetchedProducts);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Error loading products');
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(t('admin.productsPanel.errorLoadingProducts'));
        }
    };

    const handleEdit = (product) => {
        // Keep category id in currentProduct if present, but do not show categories in this panel
        setCurrentProduct({ ...product });
        setIsModalOpen(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm(t('admin.productsPanel.deleteConfirmation'))) {
            try {
                await deleteProduct(productId);
                setToast({ show: true, message: t('admin.productsPanel.productDeletedSuccess'), type: 'success' });
                fetchProducts();
            } catch (error) {
                console.error(error);
                setToast({ show: true, message: t('admin.productsPanel.productDeletedError'), type: 'error' });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
    setSaving(true);
        try {
            // Normalize payload to match backend product model
            const payload = { ...currentProduct };
            // backend expects 'stock' not 'countInStock'
            if (payload.countInStock !== undefined) {
                payload.stock = Number(payload.countInStock);
                delete payload.countInStock;
            }
            // backend uses images: [String]
            if (payload.image) {
                payload.images = [payload.image];
                delete payload.image;
            }

            if (payload._id) {
                await updateProduct(payload._id, payload);
            } else {
                await createProduct(payload);
            }
            setToast({ show: true, message: t('admin.productsPanel.productSavedSuccess'), type: 'success' });
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error(error);
            setToast({ show: true, message: t('admin.productsPanel.productSavedError'), type: 'error' });
        }
    setSaving(false);
    };

    const openNewProductModal = () => {
        setCurrentProduct({
            name: '',
            description: '',
            richDescription: '',
            image: '',
            brand: '',
            price: 0,
            category: '',
            countInStock: 0,
            isFeatured: false,
        });
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <Toast show={toast.show} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />
            <h1 className="text-2xl font-bold mb-4">{t('Admin products Panel')}</h1>
            <button
                onClick={openNewProductModal}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
            >
                {t('Add new product')}
            </button>

            {loading && <LoadingSpinner />}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && products.length === 0 && <p>{t('admin.productsPanel.noProducts')}</p>}

            {!loading && !error && products.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Image</th>
                                <th className="py-2 px-4 border-b text-left">Product Name</th>
                                <th className="py-2 px-4 border-b text-right">Price</th>
                                <th className="py-2 px-4 border-b text-right">Stock</th>
                                <th className="py-2 px-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td className="py-2 px-4 border-b">
                                        <img
                                            src={product.images && product.images[0] ? product.images[0] : product.image || '/placeholder-image.jpg'}
                                            alt={product.name}
                                            className="h-16 w-16 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <div className="font-medium text-gray-900 truncate max-w-[220px]" title={product.name}>{product.name}</div>
                                        <div className="text-xs text-gray-500">{product.brand || ''}</div>
                                    </td>
                                    <td className="py-2 px-4 border-b text-right">{product.currency ? `${product.currency} ${product.price}` : `$${product.price}`}</td>
                                    <td className="py-2 px-4 border-b text-right">{product.stock ?? product.countInStock ?? 0}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="inline-flex items-center px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="inline-flex items-center px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-screen overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{currentProduct._id ? t('admin.productsPanel.editProduct') : t('admin.productsPanel.addProduct')}</h2>
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={currentProduct.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={currentProduct.description}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Detailed description</label>
                                <textarea
                                    name="richDescription"
                                    value={currentProduct.richDescription}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={currentProduct.image}
                                    onChange={handleInputChange}
                                    placeholder="https://..."
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={currentProduct.brand}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={currentProduct.price}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Stock</label>
                                    <input
                                        type="number"
                                        name="countInStock"
                                        value={currentProduct.countInStock}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPanel; 