"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, Plus, ArrowRight, Save, X } from "lucide-react";
import Image from "next/image";

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  href: string;
  content: {
    overview: string;
    features: string[];
    industries: string[];
  };
}

export default function SolutionsManagement() {
  const queryClient = useQueryClient();
  const [editingSolutionId, setEditingSolutionId] = useState<string | null>(null);
  const [newSolution, setNewSolution] = useState<Partial<Solution>>({
    title: "",
    description: "",
    icon: "Camera",
    image: "/images/solutions/default.jpg",
    href: "",
    content: {
      overview: "",
      features: [""],
      industries: [""],
    },
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch all solutions
  const { data: solutions, isLoading, error } = useQuery({
    queryKey: ["solutions"],
    queryFn: async () => {
      const response = await apiClient.get("/solutions");
      return response.data.solutions as Solution[];
    },
  });

  // Create new solution
  const createSolutionMutation = useMutation({
    mutationFn: async (solutionData: Partial<Solution>) => {
      const response = await apiClient.post("/solutions", solutionData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      toast.success("Solution created successfully!");
      setShowAddForm(false);
      setNewSolution({
        title: "",
        description: "",
        icon: "Camera",
        image: "/images/solutions/default.jpg",
        href: "",
        content: {
          overview: "",
          features: [""],
          industries: [""],
        },
      });
    },
    onError: (error) => {
      toast.error(`Failed to create solution: ${error.message}`);
    },
  });

  // Update solution
  const updateSolutionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Solution> }) => {
      const response = await apiClient.put(`/solutions/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      toast.success("Solution updated successfully!");
      setEditingSolutionId(null);
    },
    onError: (error) => {
      toast.error(`Failed to update solution: ${error.message}`);
    },
  });

  // Delete solution
  const deleteSolutionMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/solutions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solutions"] });
      toast.success("Solution deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete solution: ${error.message}`);
    },
  });

  const handleAddFeature = () => {
    setNewSolution({
      ...newSolution,
      content: {
        ...newSolution.content!,
        features: [...newSolution.content!.features!, ""],
      },
    });
  };

  const handleAddIndustry = () => {
    setNewSolution({
      ...newSolution,
      content: {
        ...newSolution.content!,
        industries: [...newSolution.content!.industries!, ""],
      },
    });
  };

  const handleDeleteFeature = (index: number) => {
    const updatedFeatures = [...newSolution.content!.features!];
    updatedFeatures.splice(index, 1);
    setNewSolution({
      ...newSolution,
      content: {
        ...newSolution.content!,
        features: updatedFeatures,
      },
    });
  };

  const handleDeleteIndustry = (index: number) => {
    const updatedIndustries = [...newSolution.content!.industries!];
    updatedIndustries.splice(index, 1);
    setNewSolution({
      ...newSolution,
      content: {
        ...newSolution.content!,
        industries: updatedIndustries,
      },
    });
  };

  const handleUpdateFeature = (index: number, value: string) => {
    const updatedFeatures = [...newSolution.content!.features!];
    updatedFeatures[index] = value;
    setNewSolution({
      ...newSolution,
      content: {
        ...newSolution.content!,
        features: updatedFeatures,
      },
    });
  };

  const handleUpdateIndustry = (index: number, value: string) => {
    const updatedIndustries = [...newSolution.content!.industries!];
    updatedIndustries[index] = value;
    setNewSolution({
      ...newSolution,
      content: {
        ...newSolution.content!,
        industries: updatedIndustries,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSolutionMutation.mutate(newSolution);
  };

  if (isLoading) return <div className="py-10 text-center">Loading solutions...</div>;
  if (error) return <div className="py-10 text-center text-red-500">Error loading solutions</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Solutions Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-[#3785CC] text-white px-4 py-2 rounded-md hover:bg-[#2a6da9] transition-colors"
        >
          {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showAddForm ? "Cancel" : "Add Solution"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Add New Solution</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newSolution.title}
                  onChange={(e) => setNewSolution({ ...newSolution, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Path</label>
                <input
                  type="text"
                  value={newSolution.href}
                  onChange={(e) => setNewSolution({ ...newSolution, href: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="/solutions/example-path"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newSolution.description}
                onChange={(e) => setNewSolution({ ...newSolution, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                <input
                  type="text"
                  value={newSolution.icon}
                  onChange={(e) => setNewSolution({ ...newSolution, icon: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Camera, Shield, etc."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
                <input
                  type="text"
                  value={newSolution.image}
                  onChange={(e) => setNewSolution({ ...newSolution, image: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="/images/solutions/example.jpg"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
              <textarea
                value={newSolution.content?.overview}
                onChange={(e) =>
                  setNewSolution({
                    ...newSolution,
                    content: { ...newSolution.content!, overview: e.target.value },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Key Features</label>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-[#3785CC] hover:text-[#2a6da9] flex items-center gap-1 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Feature
                </button>
              </div>
              {newSolution.content?.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleUpdateFeature(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Feature description"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Industries Served</label>
                <button
                  type="button"
                  onClick={handleAddIndustry}
                  className="text-[#3785CC] hover:text-[#2a6da9] flex items-center gap-1 text-sm"
                >
                  <Plus className="w-4 h-4" /> Add Industry
                </button>
              </div>
              {newSolution.content?.industries?.map((industry, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => handleUpdateIndustry(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Industry name"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteIndustry(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3785CC] text-white px-6 py-2 rounded-md hover:bg-[#2a6da9] transition-colors flex items-center gap-2"
                disabled={createSolutionMutation.isPending}
              >
                {createSolutionMutation.isPending ? "Saving..." : "Save Solution"}
                <Save className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solution</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {solutions?.map((solution) => (
              <tr key={solution.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-[#3785CC]/10 rounded-md flex items-center justify-center">
                      {/* This would ideally use dynamic icons based on the solution.icon value */}
                      <span className="text-[#3785CC]">{solution.icon}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{solution.title}</div>
                      <div className="text-sm text-gray-500">{solution.href}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-md truncate">{solution.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setEditingSolutionId(solution.id)}
                      className="text-[#3785CC] hover:text-[#2a6da9]"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this solution?")) {
                          deleteSolutionMutation.mutate(solution.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}