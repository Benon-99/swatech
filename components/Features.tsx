"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const iconMap = {
  Shield: Shield,
  Clock: Clock,
  Users: Users,
  TrendingUp: TrendingUp,
};

export default function Features() {
  const {
    data: homeData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const response = await apiClient.get("/home");
      return response.data.home[0].advantages || {};
    },
  });

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
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !homeData?.features || homeData.features.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-500 mb-2">
          No Advantages Available
        </h3>
      </div>
    );
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3785CC]/5 via-[#5B8AF0]/5 to-[#8590EA]/5 animate-gradient"></div>
      </div>

      <div className="w-full lg:w-[1280px] mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% of the element is in view
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#111240]/5 text-[#111240] backdrop-blur-sm mb-4 inline-block"
          >
            Our Advantages
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#111240] to-[#111240]/80 bg-clip-text text-transparent"
          >
            {homeData.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-[#111240]/70 max-w-2xl mx-auto"
          >
            {homeData.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {homeData.features.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#3785CC]/5 to-[#5B8AF0]/5 rounded-2xl transform rotate-2 scale-[1.02] opacity-50 group-hover:rotate-1 transition-transform duration-300"></div>
                <Link href={feature.link || "#"}>
                  <div className="relative p-8 rounded-2xl bg-white backdrop-blur-sm border border-gray-100 hover:bg-gray-50 transition-all duration-300 text-center group-hover:transform group-hover:scale-[1.02] shadow-sm">
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mx-auto w-16 h-16 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-[#111240]">
                      {feature.title}
                    </h3>
                    <p className="text-[#111240]/60 mb-6">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
