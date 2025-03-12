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

export default function EditCategoryPage({
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
      if (!searchParams.id) {
        router.push('/admin/services/categories');
        return;
      }

      try {
        // API call would go here
        // For now, we'll use mock data
        const mockCategory = {
          id: searchParams.id,
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
    };

    fetchCategory();
  }, [searchParams.id, router]);

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
        message: 'Category updated successfully'
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
              <h1 className="text-2xl font-bold">Edit Category</h1>
              {loading && (
                <div className="flex items-center text-gray-400">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
                  />
                  Saving...
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#1a1f4b] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#1a1f4b] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[#1a1f4b] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h2 className="text-lg font-medium mb-4">Overview</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      name="overview.title"
                      value={formData.overview?.title}
                      onChange={handleChange}
                      className="w-full bg-[#1a1f4b] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                      name="overview.content"
                      value={formData.overview?.content}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-[#1a1f4b] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={e => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="rounded bg-[#1a1f4b] border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">Published</span>
                </label>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {alert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-lg flex items-start ${
                  alert.type === 'success'
                    ? 'bg-green-900/50'
                    : alert.type === 'error'
                    ? 'bg-red-900/50'
                    : 'bg-blue-900/50'
                }`}
              >
                {alert.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                ) : alert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                )}
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${
                    alert.type === 'success'
                      ? 'text-green-400'
                      : alert.type === 'error'
                      ? 'text-red-400'
                      : 'text-blue-400'
                  }`}>
                    {alert.message}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAlert(null)}
                  className="ml-4 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/services/categories"
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
