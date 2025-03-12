"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Server,
  Network,
  Users,
  Database,
  Code,
  Briefcase,
} from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceCardAdmin from "@/components/services/ServicesCardAdmin";
import { apiClient } from "@/lib/api";

interface Category {
  id: string;
  category: string;
  title: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  link: string;
  category: Category;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Alert {
  type: "success" | "error" | "info";
  message: string;
}

const iconMap: Record<string, any> = {
  Server: Server,
  Network: Network,
  Users: Users,
  Database: Database,
  Code: Code,
  Briefcase: Briefcase,
};
interface Servicedb {
  categoryId: number;
  description: string;
  id: number;
  overviewcontent: string;
  overviewtitle: string;
  servicelink: string;
  title: string;
}
export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get(`/categories`);
      if (response.statusText.toLowerCase() !== "ok")
        throw new Error("Failed to fetch categories");
      return response.data.categories;
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await apiClient.get("/services");
      return response.data.services;
    },
  });
  console.log(data);

  // const [services, setServices] = useState<Service[]>([
  //   {
  //     id: "1",
  //     title: "Data Center Infrastructure",
  //     description:
  //       "Advanced data center solutions optimized for your growing business needs.",
  //     icon: "Server",
  //     gradient: "from-[#3785CC] to-[#4A9BE4]",
  //     link: "/services/ict-solutions/data-center",
  //     category: { id: "ict", name: "ICT Solutions" },
  //     published: true,
  //     created_at: "2024-01-20T10:00:00Z",
  //     updated_at: "2024-01-20T10:00:00Z",
  //   },
  //   {
  //     id: "2",
  //     title: "Solutions Integration",
  //     description:
  //       "Strategic technology solutions to enhance operations and drive business growth.",
  //     icon: "Network",
  //     gradient: "from-[#4A9BE4] to-[#5B8AF0]",
  //     link: "/services/ict-solutions/solutions-integration",
  //     category: { id: "ict", name: "ICT Solutions" },
  //     published: true,
  //     created_at: "2024-01-20T10:00:00Z",
  //     updated_at: "2024-01-20T10:00:00Z",
  //   },
  //   {
  //     id: "3",
  //     title: "Jobs.ici – Recruiting",
  //     description: "Connect with top talents across various industries.",
  //     icon: "Users",
  //     gradient: "from-[#3785CC] to-[#5B8AF0]",
  //     link: "/services/business-outsourcing/recruiting",
  //     category: { id: "bpo", name: "Business Process Outsourcing" },
  //     published: false,
  //     created_at: "2024-01-20T10:00:00Z",
  //     updated_at: "2024-01-20T10:00:00Z",
  //   },
  // ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [alert, setAlert] = useState<Alert | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    serviceId: string | null;
  }>({
    show: false,
    serviceId: null,
  });

  const showAlert = (type: Alert["type"], message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const initiateDelete = (id: string) => {
    setDeleteConfirm({ show: true, serviceId: id });
  };

  const handleDelete = () => {
    if (deleteConfirm.serviceId) {
      setServices(
        services.filter((service) => service.id !== deleteConfirm.serviceId)
      );
      setDeleteConfirm({ show: false, serviceId: null });
      showAlert("success", "Service deleted successfully");
    }
  };

  const filteredServices =
    data &&
    data.filter((service: Service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filter === "all"
          ? true
          : filter === "published"
          ? service.published
          : !service.published;
      const matchesCategory =
        categoryFilter === "all"
          ? true
          : service.category.title === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Alert Component */}
        <AnimatePresence mode="wait">
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${
                alert.type === "success"
                  ? "bg-green-500"
                  : alert.type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
            >
              {alert.type === "success" && (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
              {alert.type === "error" && (
                <XCircle className="w-5 h-5 text-white" />
              )}
              {alert.type === "info" && (
                <AlertCircle className="w-5 h-5 text-white" />
              )}
              <p className="text-white font-medium">{alert.message}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/services/categories"
              className="inline-flex items-center px-4 py-2 bg-[#2e3267] rounded-lg hover:bg-[#2e3267]/80 transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Categories
            </Link>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Service
            </Link>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-[#1a1f4b] rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-[#2e3267] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories &&
                  categories.map((category: any) => (
                    <option key={category.id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
              </select>
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2e3267] text-gray-400 hover:bg-[#363b7e]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("published")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "published"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2e3267] text-gray-400 hover:bg-[#363b7e]"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setFilter("draft")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === "draft"
                    ? "bg-blue-600 text-white"
                    : "bg-[#2e3267] text-gray-400 hover:bg-[#363b7e]"
                }`}
              >
                Drafts
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1  gap-6">
          <div className="flex flex-wrap  gap-10 w-full">
            {filteredServices?.map((service: Servicedb) => (
              <ServiceCardAdmin
                key={service.id}
                service={{
                  id: service.id,
                  title: service.title,
                  description: service.description,
                  link: `/services/${service.servicelink}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {(data && data.length === 0) ||
          (filteredServices && filteredServices.lenght === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">No services found</div>
              <Link
                href="/admin/services/new"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <Plus className="w-4 h-4" />
                Create your first service
              </Link>
            </motion.div>
          ))}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1f4b] rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <h3 className="text-xl font-semibold text-white">
                  Delete Service?
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                This action cannot be undone. The service will be permanently
                removed from the system.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setDeleteConfirm({ show: false, serviceId: null })
                  }
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Delete Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
