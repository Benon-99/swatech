"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ServiceCard from "./services/ServiceCard";
import { apiClient } from "@/lib/api";
import axios from "axios";
import { useEffect } from "react";

interface Service {
  categoryId: number;
  description: string;
  id: number;
  overviewcontent: string;
  overviewtitle: string;
  servicelink: string;
  title: string;
}

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  },
};

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await apiClient.get("/services");
      console.log(response);

      return response.data.services;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-24 bg-[#111240] relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            variants={variants.item}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-4 inline-block"
          >
            What We Offer
          </motion.span>
          <motion.h2
            variants={variants.item}
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"
          >
            Our Services
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants.container}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services &&
            services.map((service: Service) => (
              <ServiceCard
                key={service.id}
                service={{
                  title: service.title,
                  description: service.description,
                  link: `/services/${service.servicelink}`,
                }}
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
}
