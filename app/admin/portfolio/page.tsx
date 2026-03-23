'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { AdminCard, Badge } from '../../components/admin';
import { getProjects, createProject, updateProject, deleteProject } from '@/app/actions';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: unknown;
  link?: string | null;
  github?: string | null;
  featured: boolean;
}

const categoryOptions = ['E-Commerce', 'Landing Page', 'Web App', 'Mobile App', 'Other'];

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Landing Page',
    tags: [] as string[],
    link: '',
    github: '',
    featured: false,
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const result = await getProjects();
    if (result.success && result.data) {
      setProjects(result.data);
    }
    setIsLoading(false);
  };

  const openModal = (item?: Project) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category,
        tags: Array.isArray(item.tags) ? item.tags : [],
        link: item.link || '',
        github: item.github || '',
        featured: item.featured,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: 'Landing Page',
        tags: [],
        link: '',
        github: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      const result = await updateProject(editingItem.id, formData);
      if (result.success) {
        loadProjects();
        closeModal();
      } else {
        alert('Failed to update project');
      }
    } else {
      const result = await createProject(formData);
      if (result.success) {
        loadProjects();
        closeModal();
      } else {
        alert('Failed to create project');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const result = await deleteProject(id);
      if (result.success) {
        loadProjects();
      } else {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your project showcase and case studies
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-purple-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Portfolio Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <AdminCard className="hover:border-gray-700 transition-colors">
                  {/* Image Preview */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 mb-4">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                    {item.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="info" size="sm">Featured</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

                  {/* Category & Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="default" size="sm">{item.category}</Badge>
                    {(Array.isArray(item.tags) ? item.tags : []).slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="info" size="sm">{tag}</Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => openModal(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </AdminCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {projects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-400">No projects yet. Add your first project!</p>
        </div>
      )}

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
                  {editingItem ? 'Edit Project' : 'Add New Project'}
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
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="e.g., E-Commerce Platform"
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
                    placeholder="Brief description of the project"
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    placeholder="/portfolio/project-1.svg"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tech Stack Tags
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Add a tag (e.g., Next.js)"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm border border-teal-500/30"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-800 border border-gray-700">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500/20"
                  />
                  <label htmlFor="featured" className="text-white font-medium">
                    Mark as Featured Project
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
                    {editingItem ? 'Update Project' : 'Create Project'}
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
