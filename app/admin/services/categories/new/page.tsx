'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  AlertTriangle,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface Category {
  id?: string;
  name: string;
  title: string;
  description: string;
  overview: {
    title: string;
    content: string;
  };
  published: boolean;
}

interface Alert {
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function NewCategoryPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<Alert | null>(null);

  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    title: '',
    description: '',
    overview: {
      title: '',
      content: ''
    },
    published: false
  });

  useEffect(() => {
    const fetchCategory = async () => {
      if (searchParams.id) {
        try {
          // API call would go here
          // For now, we'll use mock data
          const mockCategory = {
            id: 'bpo',
            name: 'Business Process Outsourcing',
            title: 'Business Outsourcing',
            description: 'IC&I HR outsourcing services is one of our core strengths.',
            overview: {
              title: 'Market Leading HR Solutions',
              content: 'We are the Syrian market leader with the largest market share in providing full recruitment services.'
            },
            published: true
          };
          setFormData(mockCategory);
        } catch (error) {
          setAlert({
            type: 'error',
            message: 'Failed to fetch category'
          });
        }
      }
    };

    fetchCategory();
  }, [searchParams.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('overview.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        overview: {
          title: prev.overview?.title ?? '',
          content: prev.overview?.content ?? '',
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setAlert({
        type: 'success',
        message: searchParams.id ? 'Category updated successfully' : 'Category created successfully'
      });

      setTimeout(() => {
        router.push('/admin/services/categories');
      }, 1000);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to save category'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f4b] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/services/categories"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2e3267] rounded-lg p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                {searchParams.id ? 'Edit Category' : 'New Category'}
              </h1>
              {loading && (
                <div className="flex items-center text-blue-400">
                  <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </div>
              )}
            </div>

            <AnimatePresence>
              {alert && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg flex items-center ${
                    alert.type === 'success'
                      ? 'bg-green-500/20 text-green-400'
                      : alert.type === 'error'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {alert.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-2" />
                  ) : alert.type === 'error' ? (
                    <XCircle className="w-5 h-5 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2" />
                  )}
                  {alert.message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Business Process Outsourcing"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Display Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Business Outsourcing"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the category..."
                />
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-lg font-medium mb-4">Overview Section</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="overview.title" className="block text-sm font-medium text-gray-300 mb-2">
                      Overview Title
                    </label>
                    <input
                      type="text"
                      id="overview.title"
                      name="overview.title"
                      value={formData.overview?.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Market Leading HR Solutions"
                    />
                  </div>

                  <div>
                    <label htmlFor="overview.content" className="block text-sm font-medium text-gray-300 mb-2">
                      Overview Content
                    </label>
                    <textarea
                      id="overview.content"
                      name="overview.content"
                      value={formData.overview?.content}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Detailed overview of the category..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#2e3267] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${formData.published ? 'bg-green-500' : 'bg-gray-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-white">Status</p>
                    <p className="text-xs text-gray-400">{formData.published ? 'Published' : 'Draft'}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    formData.published
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {formData.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-end gap-4">
            <Link
              href="/admin/services/categories"
              className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : searchParams.id ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
