"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pencil, Trash2, Plus, Search, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

export default function BlogsAdminPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Fetch blogs data
  const { data: blogs, isLoading, isError, refetch } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await apiClient.get("/blogs");
      return response.data.blogs || [];
    }
  });

  // Delete blog mutation
  const deleteBlog = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/blogs/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setAlert({ message: "Blog deleted successfully", type: "success" });
      setTimeout(() => setAlert(null), 3000);
    },
    onError: (error) => {
      console.error("Error deleting blog:", error);
      setAlert({ message: "Failed to delete blog", type: "error" });
      setTimeout(() => setAlert(null), 3000);
    },
    onSettled: () => {
      setIsDeleting(null);
    }
  });

  // Handle delete confirmation
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setIsDeleting(id);
      deleteBlog.mutate(id);
    }
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs?.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blog Management</h1>
            <p className="text-gray-300">Create, edit, and manage your blog posts</p>
          </div>

          <Link href="/admin/blogs/new" className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md flex items-center transition-colors duration-200">
            <Plus className="mr-2 h-4 w-4" />
            New Blog Post
          </Link>
        </div>

        {/* Alert */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 p-4 rounded-md ${
              alert.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-500" : 
              "bg-red-500/10 border border-red-500/20 text-red-500"
            }`}
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{alert.message}</p>
            </div>
          </motion.div>
        )}

        {/* Search and filter */}
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blogs..."
                className="block w-full bg-white/10 border border-gray-600 rounded-md py-2 pl-10 pr-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => refetch()} 
              className="p-2 bg-white/10 hover:bg-white/20 rounded-md text-gray-300"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Blogs List */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-400 rounded-full mb-4"></div>
              <p className="text-gray-300">Loading blogs...</p>
            </div>
          ) : isError ? (
            <div className="p-8 text-center text-red-400">
              <AlertCircle className="h-10 w-10 mx-auto mb-2" />
              <p>Failed to load blogs. Please try again.</p>
              <button 
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md"
              >
                Retry
              </button>
            </div>
          ) : filteredBlogs?.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              {searchTerm ? (
                <p>No blogs found matching &quot;{searchTerm}&quot;</p>
              ) : (
                <>
                  <p className="mb-4">No blogs have been created yet</p>
                  <Link href="/admin/blogs/new" className="text-blue-400 hover:text-blue-300">
                    Create your first blog post
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Published Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredBlogs?.map((blog) => (
                    <tr key={blog.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{blog.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">{blog.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          blog.status === 'published' ? 'bg-green-500/20 text-green-400' : 
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {blog.status || 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link 
                            href={`/admin/blogs/edit/${blog.id}`}
                            className="text-blue-400 hover:text-blue-300 p-1"
                          >
                            <Pencil className="h-5 w-5" />
                          </Link>
                          <button
                            className="text-red-400 hover:text-red-300 p-1"
                            onClick={() => handleDelete(blog.id)}
                            disabled={isDeleting === blog.id}
                          >
                            {isDeleting === blog.id ? (
                              <div className="h-5 w-5 border-2 border-current border-t-transparent animate-spin rounded-full"></div>
                            ) : (
                              <Trash2 className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
