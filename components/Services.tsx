"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ServiceCard from "./services/ServiceCard";
import { apiClient } from "@/lib/api";
import { useState } from "react";
import { ArrowRight, Shield, Lock, DatabaseIcon } from "lucide-react";

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

// Default services if API fails
const defaultServices = [
  {
    id: 1,
    title: "Milestone XProtect® VMS",
    description: "Enterprise-grade video management solution that provides scalable, reliable surveillance for businesses of all sizes.",
    servicelink: "milestone-xprotect"
  },
  {
    id: 2,
    title: "BriefCam Video Analytics",
    description: "Advanced video content analytics platform that transforms video into actionable intelligence with facial recognition and behavioral analysis.",
    servicelink: "briefcam-analytics"
  },
  {
    id: 3,
    title: "O-Insights for Milestone",
    description: "A complete operational intelligence solution that leverages video data to provide business insights and improve efficiency.",
    servicelink: "o-insights"
  },
  {
    id: 4,
    title: "Security Consultation",
    description: "Expert guidance on designing and implementing comprehensive security systems tailored to your organization's specific needs.",
    servicelink: "security-consultation"
  }
];

export default function Services() {
  const { data: services, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/services");
        console.log(response);
        return response.data.services;
      } catch (error) {
        console.error("Error fetching services:", error);
        return null;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] bg-dark">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 text-lg font-medium">
            Loading solutions...
          </p>
        </div>
      </div>
    );
  }

  // Use API data if available, otherwise use default services
  const displayServices = services || defaultServices;

  return (
    <section className="py-24 bg-dark relative overflow-hidden cyber-scanline">
      {/* Cyber-themed backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        
        {/* Glow effects */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]"></div>
        
        {/* Data flow lines */}
        <div className="absolute left-20 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '0.2s'}}></div>
        </div>
        <div className="absolute right-1/4 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute right-10 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>

      {/* Security icons in background */}
      <div className="absolute bottom-10 left-10 text-secondary/10 hidden lg:block">
        <Shield className="w-24 h-24" />
      </div>
      <div className="absolute top-20 right-20 text-secondary/10 hidden lg:block">
        <Lock className="w-20 h-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            variants={variants.item}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary backdrop-blur-sm mb-4 inline-block"
          >
            Our Solutions
          </motion.span>
          <motion.h2
            variants={variants.item}
            className="text-4xl font-bold mb-6 text-white"
          >
            <span className="text-gradient">Advanced Security Solutions</span>
          </motion.h2>
          <motion.p
            variants={variants.item}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Secure Wave Advanced Technologies provides cutting-edge physical security
            solutions through strategic partnerships with industry leaders.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants.container}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {displayServices &&
            displayServices.map((service: Service) => (
              <ServiceCard
                key={service.id}
                service={{
                  title: service.title,
                  description: service.description,
                  link: `/solutions/${service.servicelink}`,
                }}
              />
            ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-secondary text-primary hover:opacity-90 font-medium rounded-lg transition-colors duration-300 cyber-pulse"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Terminal-like section */}
        <div className="mt-24 cyber-card rounded-lg overflow-hidden p-1">
          <div className="bg-dark p-6 rounded-lg border border-secondary/20">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <div className="flex-1 text-center">
                <span className="text-xs text-secondary/60 font-mono">secure_solutions.exe</span>
              </div>
            </div>
            
            <div className="font-mono text-gray-300 text-sm space-y-2">
              <div className="flex">
                <span className="text-secondary mr-2">$</span>
                <span>init security_protocol --level=enterprise</span>
              </div>
              <div className="text-gray-500">Initializing security protocols...</div>
              <div className="text-gray-500">Loading modules: authentication, monitoring, analytics</div>
              <div className="text-gray-500">All systems operational</div>
              <div className="flex">
                <span className="text-secondary mr-2">$</span>
                <span className="relative">
                  request_consultation
                  <span className="absolute right-0 top-0 h-full w-2 bg-secondary animate-pulse"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
