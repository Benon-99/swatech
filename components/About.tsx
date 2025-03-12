"use client";

import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Globe,
  Target,
  Compass,
  Shield,
  Users,
  Heart,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

const ICONS: Record<string, LucideIcon> = {
  Globe: Globe,
  Target: Target,
  Compass: Compass,
  Shield: Shield,
  Users: Users,
  Heart: Heart,
  ArrowRight: ArrowRight,
};
interface AboutContent {
  features: {
    icon: string;
    title: string;
    text: string;
    color: string;
  }[];
  stats: {
    number: string;
    label: string;
  }[];
  title: string;
  subtitle: string;
  content: string[];
  img?: string;
}

export default function About() {
  const {
    data: aboutUsContent,
    isError,
    isLoading,
    error,
  } = useQuery<AboutContent>({
    queryKey: ["about"],
    queryFn: async () => {
      const connect = await apiClient.get("/home");
      console.log(connect.data.home[0].aboutUs);
      return connect.data.home[0].aboutUs;
    },
  });

  if (isLoading) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg font-medium">
              Loading content, please wait...
            </p>
          </div>
        </div>
      );
    }
  }

  if (isError || !aboutUsContent) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-300">
            We were unable to load the content. Please try again later or
            contact support.
          </p>
          <button
            onClick={() => location.reload()}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F7F9FE] to-[#F7F9FE] animate-gradient"></div>
      </div>

      <div className="w-full lg:w-[1280px] mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-200 text-[#111240] backdrop-blur-sm mb-4 inline-block">
              About Us
            </span>
            <h2 className="text-5xl font-bold mb-6 text-[#011240]">
              {aboutUsContent.title}
            </h2>
            <p className="text-xl text-[#111240] max-w-2xl mx-auto leading-relaxed">
              {aboutUsContent.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Image and Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75"></div>
              <img
                src={aboutUsContent.img}
                alt="IC&I Office"
                className="relative rounded-2xl w-full aspect-[4/3] object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {
                // @ts-ignore
                aboutUsContent &&
                  aboutUsContent.stats &&
                  aboutUsContent.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-transparent backdrop-blur-sm border border-[#B5C6F4] transition-colors duration-300"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text mb-2 text-[#111240]">
                        {stat.number}
                      </div>
                      <div className="text-[#111240] text-sm">{stat.label}</div>
                    </motion.div>
                  ))
              }
            </div>
          </motion.div>

          {/* Right Column - Content and Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-6 text-lg text-[#111240] leading-relaxed">
              {aboutUsContent.content &&
                aboutUsContent.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>

            <div className="space-y-6">
              {
                // @ts-ignore
                aboutUsContent &&
                  aboutUsContent.features &&
                  aboutUsContent.features.map((feature, index) => {
                    const IconComponent = ICONS[feature.icon] || null;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-[#B5C6F4] hover:bg-[#B5C6F4] transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                          >
                            {IconComponent && (
                              <IconComponent className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-[#111240] mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-[#111240]">{feature.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
              }
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#111240]
                backdrop-blur-sm border border-white/10 transition-all duration-300 group"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
