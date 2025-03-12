"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  ClipboardList,
  ArrowRight,
  Search,
  Upload,
  Bell,
  Activity,
  BookOpen,
  Building,
  LineChart,
  Target,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ServiceHero from "@/components/services/ServiceHero";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";

// Map string icon names to actual components
const iconMap: Record<string, any> = {
  Users: Users,
  UserPlus: UserPlus,
  ClipboardList: ClipboardList,
  Search: Search,
  Upload: Upload,
  Bell: Bell,
  Activity: Activity,
  BookOpen: BookOpen,
  Building: Building,
  LineChart: LineChart,
  Target: Target,
  Lightbulb: Lightbulb,
  // Add a default icon
  default: Users,
};

export default function CategoryPage() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { category } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await apiClient.get(
          `/categories/category/${category}`
        );

        if (response.statusText.toLowerCase() !== "ok") {
          throw new Error(
            `Failed to fetch category data: ${response.statusText.toLowerCase()}`
          );
        }

        if (!response.data?.category) {
          throw new Error("Invalid data format received from server");
        }
        console.log("Received category data:", response.data.category);
        setData(response.data.category);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching category data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 text-xl">No category found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ServiceHero title={data.title} description={data.mainDescription} />

      <div className="w-full lg:w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-24 flex flex-col items-center text-justify"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-6 inline-block"
          >
            Overview
          </motion.span>

          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] bg-clip-text text-transparent mb-8">
            {data.overviewTitle}
          </h2>

          <p className="text-lg text-[#111240]/70 leading-relaxed text-justify">
            {data.overviewContent}
          </p>
        </motion.div>

        <div className="w-full h-[1px] bg-gradient-to-r from-[#3785CC] to-[#4A9BE4] my-8 opacity-50" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="text-center mb-16">
            <motion.span
              variants={itemVariants}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-4 inline-block"
            >
              What We Offer
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#4A9BE4] to-[#8590EA] bg-clip-text text-transparent"
            >
              {data.offeringsTitle}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
            >
              {data.offeringsContent}
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {data.services.map((service: any) => {
              // Get the icon component from our map, defaulting to Users if not found
              const IconComponent = iconMap[service.icon] || iconMap.default;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transform rotate-1 scale-[1.02] opacity-50 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative p-4 sm:p-6 lg:p-8 rounded-2xl bg-white backdrop-blur-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300 shadow-sm">
                    <div
                      className={`p-4 rounded-xl ${
                        service.gradient || "bg-[#3785CC]"
                      } transform group-hover:scale-110 transition-transform duration-300 mb-6 w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center`}
                      style={{
                        background:
                          service.gradient ||
                          "linear-gradient(to right, #3785CC, #4A9BE4)",
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#111240] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-[#111240]/60 mb-6">
                      {service.description}
                    </p>
                    <Link
                      href={service.link}
                      className="inline-flex items-center text-[#111240]/80 hover:text-[#111240] group/link"
                    >
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
