"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Feature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  link: string;
}

interface AlertState {
  type: "success" | "error";
  message: string;
}

export default function Features() {
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: homeData,
    isError,
    isLoading,
    refetch: refreshHome,
  } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await apiClient.get("/home");
      // console.log('Features Data:', data.about[0]?.features);
      return response.data.home[0].advantages.features;
    },
  });

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const updateFeature = (
    index: number,
    field: keyof Feature,
    value: string
  ) => {
    if (!homeData) return;
    const newFeatures = [...homeData];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    return newFeatures;
  };

  const addNewFeature = () => {
    if (!homeData) return;
    const newFeatures = [...homeData];
    newFeatures.push({
      title: "",
      description: "",
      icon: "",
      gradient: "from-blue-500 to-teal-500",
      link: "",
    });
    return newFeatures;
  };

  const removeFeature = async (index: number) => {
    if (!homeData) return;

    try {
      const newFeatures = [...homeData];
      newFeatures.splice(index, 1);

      const response = await apiClient.post("/home/features/update?id=1", {
        features: newFeatures,
      });

      if (response.statusText.toLowerCase() !== "ok")
        throw new Error("Failed to update features");
      setAlert({ type: "success", message: "Feature removed successfully!" });
      refreshHome();
    } catch (error: unknown) {
      setAlert({
        type: "error",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await apiClient.post("/home/features/update?id=1", {
        features: homeData,
      });

      if (response.statusText.toLowerCase() !== "ok")
        throw new Error("Failed to update features");
      setAlert({ type: "success", message: "Features updated successfully!" });
      refreshHome();
    } catch (error: unknown) {
      setAlert({
        type: "error",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#13123A]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-200 text-lg font-medium">
            Loading features, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !homeData) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#13123A]">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-300">
            We were unable to load the features. Please try again later or
            contact support.
          </p>
          <button
            onClick={() => location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 left-4 md:left-auto z-50 md:w-96 p-4 rounded-lg ${
              alert.type === "success"
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            } backdrop-blur-sm border ${
              alert.type === "success"
                ? "border-emerald-500/20"
                : "border-red-500/20"
            } flex items-center space-x-2`}
          >
            {alert.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{alert.message}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(homeData) &&
            homeData.map((feature: Feature, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-lg bg-[#1E1D4C]/50 shadow-lg backdrop-blur-sm border border-[#2E2D5C] relative group"
              >
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                  title="Remove Feature"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="space-y-4">
                  <input
                    type="text"
                    defaultValue={feature.title}
                    onChange={(e) =>
                      updateFeature(index, "title", e.target.value)
                    }
                    className="w-full text-xl font-semibold bg-transparent border-b border-[#2E2D5C] focus:border-blue-400 outline-none px-2 py-1 text-white placeholder-gray-400"
                    placeholder="Feature Title"
                  />
                  <textarea
                    defaultValue={feature.description}
                    onChange={(e) =>
                      updateFeature(index, "description", e.target.value)
                    }
                    className="w-full h-32 text-white bg-transparent border border-[#2E2D5C] rounded-lg focus:border-blue-400 outline-none p-2 placeholder-gray-400 resize-none"
                    placeholder="Feature Description"
                  />
                </div>
              </motion.div>
            ))}

          <motion.button
            type="button"
            onClick={addNewFeature}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-full min-h-[200px] p-6 rounded-lg border-2 border-dashed border-[#2E2D5C] flex items-center justify-center text-gray-400 hover:text-gray-200 hover:border-[#3E3D6C] transition-colors"
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Add New Feature</span>
            </div>
          </motion.button>
        </div>

        <motion.button
          type="submit"
          disabled={isSaving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 text-white font-medium rounded-lg ${
            isSaving
              ? "bg-blue-600/50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-all duration-200 backdrop-blur-sm`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </motion.button>
      </form>
    </div>
  );
}
