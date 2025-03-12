'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react';
import React from 'react';

interface Category {
  id: string;
  name: string;
  title: string;
  description: string;
  overview: {
    title: string;
    content: string;
  };
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Alert {
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'bpo',
      name: 'Business Process Outsourcing',
      title: 'Business Outsourcing',
      description: 'IC&I HR outsourcing services is one of our core strengths. Our scalable services are crafted to deliver optimal efficiency and support your business\'s evolving needs.',
      overview: {
        title: 'Market Leading HR Solutions',
        content: 'We are the Syrian market leader with the largest market share in providing full recruitment services in UN agencies, NPO\'s and NGO\'s. Our comprehensive HR outsourcing solutions are designed to streamline your operations and drive organizational success through effective talent management.'
      },
      published: true,
      created_at: '2024-01-20T10:00:00Z',
      updated_at: '2024-01-20T10:00:00Z'
    },
    {
      id: 'ict',
      name: 'ICT Solutions',
      title: 'ICT Solutions',
      description: 'Comprehensive ICT solutions designed to transform and optimize your business operations.',
      overview: {
        title: 'Advanced Technology Solutions',
        content: 'We provide cutting-edge ICT solutions that help businesses stay ahead in the digital age. Our services cover everything from infrastructure setup to advanced system integration.'
      },
      published: true,
      created_at: '2024-01-20T10:00:00Z',
      updated_at: '2024-01-20T10:00:00Z'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState<Alert | null>(null);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        // API call would go here
        setCategories(categories.filter(category => category.id !== id));
        setAlert({
          type: 'success',
          message: 'Category deleted successfully'
        });
      } catch (error) {
        setAlert({
          type: 'error',
          message: 'Failed to delete category'
        });
      }
    }
  };

  const togglePublish = async (id: string) => {
    try {
      // API call would go here
      setCategories(categories.map(category =>
        category.id === id
          ? { ...category, published: !category.published }
          : category
      ));
      setAlert({
        type: 'success',
        message: 'Category status updated successfully'
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to update category status'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f4b] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link
            href="/admin/services/categories/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Category
          </Link>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 p-4 rounded-lg flex items-center ${
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

        <div className="grid gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#2e3267] p-6 rounded-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-400 mb-4">{category.description}</p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(category.updated_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/services/categories/${category.id}`}
                    className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      category.published
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {category.published ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 mr-1" />
                    )}
                    {category.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <button
                  onClick={() => togglePublish(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    category.published
                      ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                      : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                  }`}
                >
                  {category.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
