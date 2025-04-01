"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, Plus, ArrowRight, Save, X, Check, Award } from "lucide-react";
import Image from "next/image";

interface Value {
  id?: number;
  icon: string;
  title: string;
  text: string;
}

interface Stat {
  id?: number;
  number: string;
  label: string;
}

interface AboutUs {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  img: string;
  values: Value[];
  stats: Stat[];
}

export default function AboutUsManagement() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [aboutUs, setAboutUs] = useState<AboutUs | null>(null);
  const [tempAboutUs, setTempAboutUs] = useState<AboutUs | null>(null);

  // Fetch About Us data
  const { data, isLoading, error } = useQuery({
    queryKey: ["aboutUs"],
    queryFn: async () => {
      const response = await apiClient.get("/api/aboutUs");
      return response.data.result as AboutUs;
    },
  });

  // Set aboutUs when data is loaded
  useEffect(() => {
    if (data) {
      setAboutUs(data);
    } else {
      // Default data for Secure Wave Advanced Technologies
      setAboutUs({
        id: 1,
        title: "Secure Wave Advanced Technologies",
        subtitle: "Your Trusted Security Solutions Partner",
        description: "Secure Wave Advanced Technologies is a leading value-added distributor specializing in cutting-edge physical security solutions. We partner with global technology leaders to provide scalable, future-proof security systems for businesses of all sizes.",
        mission: "Our mission is to transform the security landscape by making advanced physical security solutions accessible, integrated, and intelligent for all organizations.",
        vision: "We envision a world where every organization is empowered with intelligent security systems that not only protect assets but also provide actionable insights for better decision-making.",
        img: "/images/about/headquarters.jpg",
        values: [
          {
            id: 1,
            icon: "Shield",
            title: "Expertise",
            text: "Proven expertise in physical security solutions with deep industry knowledge"
          },
          {
            id: 2,
            icon: "Users",
            title: "Partnership",
            text: "Strategic partnerships with global technology leaders like Milestone, BriefCam, and O-Insights"
          },
          {
            id: 3,
            icon: "Scale",
            title: "Scalability",
            text: "Scalable solutions tailored for businesses of all sizes, from SMBs to enterprises"
          },
          {
            id: 4,
            icon: "Zap",
            title: "Innovation",
            text: "Future-proof security with AI-driven innovation and continuous improvement"
          }
        ],
        stats: [
          {
            id: 1,
            number: "10+",
            label: "Years of Experience"
          },
          {
            id: 2,
            number: "500+",
            label: "Successful Deployments"
          },
          {
            id: 3,
            number: "24/7",
            label: "Support & Monitoring"
          },
          {
            id: 4,
            number: "99.9%",
            label: "Uptime Guarantee"
          }
        ]
      });
    }
  }, [data]);

  // Update About Us
  const updateAboutUsMutation = useMutation({
    mutationFn: async (data: AboutUs) => {
      const response = await apiClient.put(`/api/aboutUs/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutUs"] });
      toast.success("About Us page updated successfully!");
      setEditing(false);
    },
    onError: (error) => {
      toast.error(`Failed to update About Us page: ${error.message}`);
    },
  });

  const handleEdit = () => {
    if (aboutUs) {
      setTempAboutUs({ ...aboutUs });
      setEditing(true);
    } else {
      toast.error("No About Us data available to edit");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setTempAboutUs(null);
  };

  const handleSave = () => {
    if (tempAboutUs) {
      updateAboutUsMutation.mutate(tempAboutUs);
    }
  };

  // Handle adding/removing values
  const addValue = () => {
    if (tempAboutUs) {
      setTempAboutUs({
        ...tempAboutUs,
        values: [
          ...tempAboutUs.values,
          { icon: "Award", title: "New Value", text: "Description of this value" },
        ],
      });
    }
  };

  const removeValue = (index: number) => {
    if (tempAboutUs) {
      const updatedValues = [...tempAboutUs.values];
      updatedValues.splice(index, 1);
      setTempAboutUs({
        ...tempAboutUs,
        values: updatedValues,
      });
    }
  };

  // Handle adding/removing stats
  const addStat = () => {
    if (tempAboutUs) {
      setTempAboutUs({
        ...tempAboutUs,
        stats: [
          ...tempAboutUs.stats,
          { number: "100+", label: "New Statistic" },
        ],
      });
    }
  };

  const removeStat = (index: number) => {
    if (tempAboutUs) {
      const updatedStats = [...tempAboutUs.stats];
      updatedStats.splice(index, 1);
      setTempAboutUs({
        ...tempAboutUs,
        stats: updatedStats,
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading About Us data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading About Us data: {error.message}</div>;
  }

  return (
    <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
      {!editing ? (
        // View Mode
        <div>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">About Us Information</h2>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              <Pencil size={16} />
              Edit Content
            </button>
          </div>

          {aboutUs && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">General Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Title</p>
                      <p className="text-white">{aboutUs.title}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Subtitle</p>
                      <p className="text-white">{aboutUs.subtitle}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Description</p>
                      <p className="text-white">{aboutUs.description}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-2">Mission & Vision</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Mission</p>
                      <p className="text-white">{aboutUs.mission}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Vision</p>
                      <p className="text-white">{aboutUs.vision}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Featured Image</h3>
                <div className="relative h-60 w-full rounded-lg overflow-hidden">
                  <Image
                    src={aboutUs.img || "/images/placeholder.jpg"}
                    alt="About Us Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Company Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aboutUs.values.map((value, index) => (
                    <div key={index} className="bg-dark/40 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-400">{value.icon}</span>
                        <h4 className="text-white font-medium">{value.title}</h4>
                      </div>
                      <p className="text-gray-300 text-sm">{value.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-blue-400 mb-2">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {aboutUs.stats.map((stat, index) => (
                    <div key={index} className="bg-dark/40 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-400">{stat.number}</p>
                      <p className="text-white">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Edit Mode
        <div>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Edit About Us Content</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>

          {tempAboutUs && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Title</label>
                    <input
                      type="text"
                      value={tempAboutUs.title}
                      onChange={(e) => setTempAboutUs({ ...tempAboutUs, title: e.target.value })}
                      className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={tempAboutUs.subtitle}
                      onChange={(e) => setTempAboutUs({ ...tempAboutUs, subtitle: e.target.value })}
                      className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Description</label>
                    <textarea
                      value={tempAboutUs.description}
                      onChange={(e) => setTempAboutUs({ ...tempAboutUs, description: e.target.value })}
                      rows={4}
                      className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Mission</label>
                    <textarea
                      value={tempAboutUs.mission}
                      onChange={(e) => setTempAboutUs({ ...tempAboutUs, mission: e.target.value })}
                      rows={3}
                      className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Vision</label>
                    <textarea
                      value={tempAboutUs.vision}
                      onChange={(e) => setTempAboutUs({ ...tempAboutUs, vision: e.target.value })}
                      rows={3}
                      className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Image URL</label>
                    <input
                      type="text"
                      value={tempAboutUs.img}
                      onChange={(e) => setTempAboutUs({ ...tempAboutUs, img: e.target.value })}
                      className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-blue-400">Company Values</h3>
                  <button
                    onClick={addValue}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <Plus size={14} />
                    Add Value
                  </button>
                </div>
                
                <div className="space-y-4">
                  {tempAboutUs.values.map((value, index) => (
                    <div key={index} className="bg-dark/40 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-white font-medium">Value #{index + 1}</h4>
                        <button
                          onClick={() => removeValue(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Icon</label>
                          <input
                            type="text"
                            value={value.icon}
                            onChange={(e) => {
                              const updatedValues = [...tempAboutUs.values];
                              updatedValues[index] = {
                                ...updatedValues[index],
                                icon: e.target.value,
                              };
                              setTempAboutUs({ ...tempAboutUs, values: updatedValues });
                            }}
                            className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Title</label>
                          <input
                            type="text"
                            value={value.title}
                            onChange={(e) => {
                              const updatedValues = [...tempAboutUs.values];
                              updatedValues[index] = {
                                ...updatedValues[index],
                                title: e.target.value,
                              };
                              setTempAboutUs({ ...tempAboutUs, values: updatedValues });
                            }}
                            className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2 text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="block text-gray-400 text-xs mb-1">Description</label>
                        <textarea
                          value={value.text}
                          onChange={(e) => {
                            const updatedValues = [...tempAboutUs.values];
                            updatedValues[index] = {
                              ...updatedValues[index],
                              text: e.target.value,
                            };
                            setTempAboutUs({ ...tempAboutUs, values: updatedValues });
                          }}
                          rows={2}
                          className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-blue-400">Statistics</h3>
                  <button
                    onClick={addStat}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                  >
                    <Plus size={14} />
                    Add Statistic
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tempAboutUs.stats.map((stat, index) => (
                    <div key={index} className="bg-dark/40 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-white font-medium">Stat #{index + 1}</h4>
                        <button
                          onClick={() => removeStat(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Number/Value</label>
                          <input
                            type="text"
                            value={stat.number}
                            onChange={(e) => {
                              const updatedStats = [...tempAboutUs.stats];
                              updatedStats[index] = {
                                ...updatedStats[index],
                                number: e.target.value,
                              };
                              setTempAboutUs({ ...tempAboutUs, stats: updatedStats });
                            }}
                            className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-xs mb-1">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updatedStats = [...tempAboutUs.stats];
                              updatedStats[index] = {
                                ...updatedStats[index],
                                label: e.target.value,
                              };
                              setTempAboutUs({ ...tempAboutUs, stats: updatedStats });
                            }}
                            className="w-full bg-dark/40 text-white border border-gray-700 rounded-md p-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
