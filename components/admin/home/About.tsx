"use client";

import { useState, useRef, useEffect } from "react";
import {
  Save,
  X,
  Image as ImageIcon,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import { apiClient } from "@/lib/api";
import axios from "axios";

interface Feature {
  title: string;
  text: string;
}
interface Stat {
  number: string;
  label: string;
}
interface AboutContent {
  title: string;
  subtitle: string;
  content: string[];
  img?: string;
  features: Feature[];
  stats: Stat[];
}

interface AlertState {
  type: "success" | "error";
  message: string;
}

export default function About() {
  const [formData, setFormData] = useState<AboutContent>({
    title: "",
    subtitle: "",
    content: [""],
    img: "",
    features: [{ title: "", text: "" }],
    stats: [{ number: "", label: "" }],
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [alert, setAlert] = useState<AlertState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    data: aboutData,
    isLoading,
    isError,
    error,
  } = useQuery<{ home: { aboutUs: AboutContent }[] }>({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await apiClient.get("/home");
      return response.data;
    },
  });

  useEffect(() => {
    if (aboutData?.home?.[0]) {
      const { aboutUs } = aboutData.home[0];
      setFormData({
        title: aboutUs.title || "",
        subtitle: aboutUs.subtitle || "",
        content: Array.isArray(aboutUs.content)
          ? aboutUs.content
          : aboutUs.content
          ? [aboutUs.content]
          : [""],
        img: aboutUs.img || "",
        features: Array.isArray(aboutUs.features)
          ? aboutUs.features
          : typeof aboutUs.features === "string"
          ? JSON.parse(aboutUs.features)
          : [{ title: "", text: "" }],
        stats: Array.isArray(aboutUs.stats)
          ? aboutUs.stats
          : typeof aboutUs.stats === "string"
          ? JSON.parse(aboutUs.stats)
          : [{ number: "", label: "" }],
      });
      if (aboutUs.img) {
        setImagePreview(aboutUs.img);
      }
    }
  }, [aboutData]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("content[")) {
      const index = parseInt(name.match(/\[(\d+)\]/)?.[1] || "0");
      setFormData((prev) => ({
        ...prev,
        content: prev.content.map((item, i) => (i === index ? value : item)),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addContentField = () => {
    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, ""],
    }));
  };

  const removeContentField = (index: number) => {
    if (formData.content.length > 1) {
      setFormData((prev) => ({
        ...prev,
        content: prev.content.filter((_, i) => i !== index),
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: "", text: "" }],
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }));
    }
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { number: "", label: "" }],
    }));
  };

  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    setFormData((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formDataToSend = new FormData();

      // Prepare the about section data
      const aboutUsData = {
        title: formData.title,
        subtitle: formData.subtitle,
        content: formData.content.length ? formData.content : [""], // Ensure at least one item
        features: formData.features.length
          ? formData.features
          : [{ title: "", text: "" }],
        stats: formData.stats.length
          ? formData.stats
          : [{ number: "", label: "" }],
        img: imagePreview || formData.img || "",
      };

      // Append JSON as a string
      formDataToSend.append("aboutUs", JSON.stringify(aboutUsData));

      // Handle image file if present
      if (fileInputRef.current?.files?.[0]) {
        formDataToSend.append("photo", fileInputRef.current.files[0]);
      }

      console.log("AboutUs data being sent:", aboutUsData);
      console.log(
        "FormData being sent:",
        Object.fromEntries(formDataToSend.entries())
      );

      // Send the request using axios instance
      const response = await apiClient.post(
        "/home/about/update?id=1",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Ensure proper handling of FormData
        }
      );

      console.log("Content updated successfully:", response.data);

      setAlert({
        type: "success",
        message: "About section updated successfully!",
      });
    } catch (error) {
      // Handle Axios errors properly
      let errorMessage = "Unknown error occurred while updating content.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      }

      console.error("Error updating content:", errorMessage);
      setAlert({
        type: "error",
        message: `Error updating about section: ${errorMessage}`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const showAlert = (type: AlertState["type"], message: string) => {
    setAlert({ type, message });
  };

  if (isLoading) {
    return <LoadingComponent message="Loading About Section..." />;
  }

  if (isError) {
    return (
      <ErrorComponent
        message="Failed to load About Section"
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        {alert && (
          <div className="fixed top-4 right-4 left-4 md:left-auto z-50 md:w-96">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 rounded-lg shadow-lg ${
                alert.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                {alert.type === "success" ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{alert.message}</p>
              </div>
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Update About Section
              </h1>
              <p className="text-gray-400">
                Manage your about page content and features
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={isSaving}
                className={`inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg transition-all transform hover:scale-105 ${
                  isSaving
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSaving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Main Content
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter main title..."
                  />
                </div>
                <div>
                  <label
                    htmlFor="subtitle"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Subtitle
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter subtitle..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-bold mb-2">
                    Content Blocks
                  </label>
                  <div className="space-y-4">
                    {formData.content.map((content, index) => (
                      <div key={index} className="flex gap-2">
                        <textarea
                          name={`content[${index}]`}
                          value={content}
                          onChange={handleChange}
                          rows={4}
                          className="flex-1 px-4 py-3 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter content block..."
                        />
                        {formData.content.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeContentField(index)}
                            className="self-start p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addContentField}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg px-4 py-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Content Block
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Features
              </h2>
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#2e3267] rounded-lg border border-gray-700"
                  >
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          placeholder="Feature Title"
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...formData.features];
                            newFeatures[index].title = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              features: newFeatures,
                            }));
                          }}
                          className="w-full px-4 py-3 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                          placeholder="Feature Description"
                          value={feature.text}
                          onChange={(e) => {
                            const newFeatures = [...formData.features];
                            newFeatures[index].text = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              features: newFeatures,
                            }));
                          }}
                          rows={3}
                          className="w-full px-4 py-3 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="self-start p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg px-4 py-2 transition-colors w-full justify-center"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Statistics
              </h2>
              <div className="space-y-4">
                {formData.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#2e3267] rounded-lg border border-gray-700"
                  >
                    <div className="flex gap-4">
                      <div className="flex-1 space-y-3">
                        <div>
                          <label
                            htmlFor={`stat-number-${index}`}
                            className="block text-gray-300 text-sm font-medium mb-1"
                          >
                            Number
                          </label>
                          <input
                            id={`stat-number-${index}`}
                            type="text"
                            placeholder="Enter statistic number"
                            value={stat.number}
                            onChange={(e) =>
                              updateStat(index, "number", e.target.value)
                            }
                            className="w-full px-4 py-2.5 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`stat-label-${index}`}
                            className="block text-gray-300 text-sm font-medium mb-1"
                          >
                            Label
                          </label>
                          <input
                            id={`stat-label-${index}`}
                            type="text"
                            placeholder="Enter statistic label"
                            value={stat.label}
                            onChange={(e) =>
                              updateStat(index, "label", e.target.value)
                            }
                            className="w-full px-4 py-2.5 bg-[#1a1f4b] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      {formData.stats.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStat(index)}
                          className="self-start p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                          aria-label="Remove stat"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStat}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors w-full"
                >
                  <Plus className="w-4 h-4" />
                  Add Statistic
                </button>
              </div>
            </div>

            <div className="bg-[#1a1f4b] rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Featured Image
              </h2>
              <div
                onClick={() => !showUrlInput && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                  imagePreview || formData.img
                    ? "border-blue-500 hover:border-blue-400"
                    : "border-gray-600 hover:border-gray-500"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                {imagePreview || formData.img ? (
                  <div className="relative aspect-video">
                    <img
                      src={imagePreview || formData.img}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview("");
                        setImageUrl("");
                        setShowUrlInput(false);
                        setFormData((prev) => ({ ...prev, img: undefined }));
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    {showUrlInput ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="space-y-2"
                      >
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="Enter image URL"
                          className="w-full px-4 py-2 bg-[#2e3267] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setShowUrlInput(false)}
                            className="px-3 py-1 text-sm text-gray-300 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (imageUrl) {
                                setImagePreview(imageUrl);
                                setFormData((prev) => ({
                                  ...prev,
                                  img: imageUrl,
                                }));
                                setShowUrlInput(false);
                              }
                            }}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Add URL
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm text-gray-300">
                            Drop your featured image here or{" "}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUrlInput(true);
                              }}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              paste a URL
                            </button>
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
