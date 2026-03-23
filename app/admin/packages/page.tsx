'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, DollarSign, X, Save } from 'lucide-react';
import { AdminCard, Table, TableRow, TableCell, Badge } from '../../components/admin';
import { getServices, createService, updateService, deleteService } from '@/app/actions';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon?: string | null;
  features: unknown;
  gradient?: string | null;
  popular: boolean;
}

export default function AdminPackages() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    icon: 'Monitor',
    features: [] as string[],
    gradient: 'from-teal-500 to-cyan-500',
    popular: false,
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    const result = await getServices();
    if (result.success && result.data) {
      setServices(result.data);
    }
    setIsLoading(false);
  };

  const openModal = (item?: Service) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        price: item.price,
        icon: item.icon || 'Monitor',
        features: Array.isArray(item.features) ? item.features : [],
        gradient: item.gradient || 'from-teal-500 to-cyan-500',
        popular: item.popular,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        icon: 'Monitor',
        features: [],
        gradient: 'from-teal-500 to-cyan-500',
        popular: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      const result = await updateService(editingItem.id, formData);
      if (result.success) {
        loadServices();
        closeModal();
      } else {
        alert('Failed to update service');
      }
    } else {
      const result = await createService(formData);
      if (result.success) {
        loadServices();
        closeModal();
      } else {
        alert('Failed to create service');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const result = await deleteService(id);
      if (result.success) {
        loadServices();
      } else {
        alert('Failed to delete service');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Packages Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your service packages and pricing
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Package
        </button>
      </div>

      {/* Packages Table */}
      <AdminCard>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <Table headers={['Package', 'Description', 'Price', 'Features', 'Status', 'Actions']}>
            {services.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500/20 to-purple-500/20">
                      <DollarSign className="w-5 h-5 text-teal-400" />
                    </div>
                    <span className="font-medium text-white">{pkg.title}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="text-gray-400 text-sm truncate">{pkg.description}</p>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-white">{pkg.price}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(pkg.features) ? pkg.features : []).slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="default" size="sm">{feature}</Badge>
                    ))}
                    {(Array.isArray(pkg.features) ? pkg.features : []).length > 2 && (
                      <Badge variant="default" size="sm">
                        +{(pkg.features as string[]).length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {pkg.popular && <Badge variant="info">Popular</Badge>}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal(pkg)}
                      className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        )}

        {services.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No services found. Add your first package!</p>
          </div>
        )}
      </AdminCard>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-800 rounded-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 sticky top-0 bg-gray-900">
                <h2 className="text-xl font-semibold text-white">
                  {editingItem ? 'Edit Package' : 'Add New Package'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Package Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g., E-Commerce Package"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                    placeholder="Brief description of the package"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Display
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g., From Rp 5jt"
                    required
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    <option value="Monitor">Monitor (Landing Page)</option>
                    <option value="ShoppingCart">Shopping Cart (E-Commerce)</option>
                    <option value="Code">Code (Custom Web)</option>
                  </select>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Features List
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Add a feature (e.g., SEO Optimized)"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm border border-teal-500/30"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Color Gradient
                  </label>
                  <select
                    value={formData.gradient}
                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    <option value="from-teal-500 to-cyan-500">Teal/Cyan</option>
                    <option value="from-purple-500 to-pink-500">Purple/Pink</option>
                    <option value="from-blue-500 to-indigo-500">Blue/Indigo</option>
                    <option value="from-red-500 to-orange-500">Red/Orange</option>
                  </select>
                </div>

                {/* Popular Toggle */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-800 border border-gray-700">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500/20"
                  />
                  <label htmlFor="popular" className="text-white font-medium">
                    Mark as Most Popular
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    {editingItem ? 'Update Package' : 'Create Package'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
