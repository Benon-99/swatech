"use client";

import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  Database,
  Layout,
  LucideIcon,
  Network,
  Plus,
  Save,
  Server,
  Tag,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface Feature {
  title: string;
  description: string;
}

interface Service {
  id?: number;
  title: string;
  description: string;
  servicelink: string;
  categoryId: number | null;
  status: boolean;
  features?: Feature[];
  overviewcontent?: string;
  overviewtitle?: string;
}

const iconOptions: { value: string; icon: LucideIcon }[] = [
  { value: "Server", icon: Server },
  { value: "Network", icon: Network },
  { value: "Users", icon: Users },
  { value: "Database", icon: Database },
  { value: "Code", icon: Code },
  { value: "Briefcase", icon: Briefcase },
];
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

export default function NewServicePage({
  searchParams,
}: {
  searchParams: { params: { id: string } };
}) {
  console.log(searchParams.params.id);

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get(`/categories`);
      if (response.statusText.toLowerCase() !== "ok")
        throw new Error("Failed to fetch categories");
      return response.data.categories;
    },
  });

  const { data: service, error } = useQuery({
    queryKey: ["service", searchParams.params.id],
    queryFn: async () => {
      const response = await apiClient.get(
        `/services/id/${searchParams.params.id}`
      );
      if (!response.status) throw new Error("Failed to fetch service");
      console.log("serviceById :", response.data);
      return response.data;
    },
    enabled: !!searchParams.params.id, // Only fetch if there's an ID
  });
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    description: "",
    servicelink: "",
    categoryId: null,
    status: false,
    features: [],
    overviewcontent: "",
    overviewtitle: "",
  });

  useEffect(() => {
    if (categories && categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        categoryId: categories[0].id, // Set the first category ID once categories are loaded
      }));
    }
  }, [categories]);

  useEffect(() => {
    if (service) {
      // Log the service details to the console
      console.log("Fetched Service Details:", service);

      // Update the form data with the fetched service details
      setFormData({
        ...service,
        categoryId: service.categoryId || categories?.[0]?.id || null,
      });
    }
  }, [service, categories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = searchParams.params.id
        ? `/services/${searchParams.params.id}`
        : `/services`;
      const method = searchParams.params.id ? "put" : "post";

      const response = await apiClient[method](
        url,

        {
          ...formData,
          features: formData.features?.map((feature) => ({
            title: feature.title,
            description: feature.description,
          })),
        }
      );

      if (response.statusText.toLowerCase() !== "ok")
        throw new Error("Failed to save service");

      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error("Error saving service:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCategoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {searchParams.params.id ? "Edit Service" : "Create New Service"}
              </h1>
              <p className="text-gray-400">
                Configure your service details and appearance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/services"
                className="inline-flex items-center px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-[#2e3267] transition-colors"
              >
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg transition-all transform hover:scale-105 ${
                  isSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    {searchParams.params.id
                      ? "Update Service"
                      : "Create Service"}
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              {/* Form Fields */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Service Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter service title..."
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your service..."
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="servicelink"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Service Link
                </label>
                <input
                  type="text"
                  id="servicelink"
                  name="servicelink"
                  value={formData.servicelink}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/services/your-service"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="overviewtitle"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Overview Title
                </label>
                <input
                  type="text"
                  id="overviewtitle"
                  name="overviewtitle"
                  value={formData.overviewtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter overview title..."
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="overviewcontent"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Overview Content
                </label>
                <textarea
                  id="overviewcontent"
                  name="overviewcontent"
                  value={formData.overviewcontent}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide a detailed overview of your service..."
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Features/Sub-services
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        features: [
                          ...(prev.features || []),
                          { title: "", description: "" },
                        ],
                      }));
                    }}
                    className="inline-flex items-center px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="bg-[#2e3267] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-white font-medium">
                          Feature {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              features: prev.features?.filter(
                                (_, i) => i !== index
                              ),
                            }));
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                features: prev.features?.map((f, i) =>
                                  i === index
                                    ? { ...f, title: e.target.value }
                                    : f
                                ),
                              }));
                            }}
                            className="w-full px-3 py-2 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Feature title..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">
                            Description
                          </label>
                          <textarea
                            value={feature.description}
                            onChange={(e) => {
                              setFormData((prev) => ({
                                ...prev,
                                features: prev.features?.map((f, i) =>
                                  i === index
                                    ? { ...f, description: e.target.value }
                                    : f
                                ),
                              }));
                            }}
                            rows={2}
                            className="w-full px-3 py-2 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Feature description..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Service Settings
              </h2>

              {/* Category Selection */}
              <div className="space-y-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Category</p>
                      <p className="text-xs text-gray-400">
                        Select a category for your service
                      </p>
                    </div>
                  </div>
                  <select
                    name="categoryId"
                    value={formData.categoryId || ""}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        categoryId: parseInt(e.target.value),
                      }));
                    }}
                    className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories?.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Published Status */}
                <div className="flex items-center justify-between p-4 bg-[#2e3267] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        formData.status ? "bg-green-500" : "bg-gray-500"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Status</p>
                      <p className="text-xs text-gray-400">
                        {formData.status ? "Published" : "Draft"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        status: !prev.status,
                      }))
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      formData.status
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {formData.status ? "Published" : "Draft"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
