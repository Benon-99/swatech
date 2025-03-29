"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Pencil, Trash2, Shield, Lock, FileCode } from "lucide-react";

interface ServiceCardProps {
  service: {
    title: string;
    description: string;
    link: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Function to get a different icon for each card based on title
  const getIcon = () => {
    const title = service.title.toLowerCase();
    if (title.includes("xprotect") || title.includes("monitoring") || title.includes("vms")) {
      return <Shield className="w-5 h-5 text-secondary" />;
    } else if (title.includes("briefcam") || title.includes("analytics")) {
      return <FileCode className="w-5 h-5 text-secondary" />;
    } else {
      return <Lock className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <motion.div variants={itemVariants} className="group relative">
      <div className="absolute inset-0 bg-secondary/5 rounded-lg transform -rotate-1 scale-[1.02] group-hover:rotate-0 transition-transform duration-300"></div>

      <div className="relative cyber-card rounded-lg p-8 hover-card">
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          {getIcon()}
        </div>
        
        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/10 text-secondary">
          {getIcon()}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-gray-300 mb-6">{service.description}</p>

        <div className="pt-4 border-t border-secondary/10">
          <Link
            href={service.link}
            className="inline-flex items-center text-secondary hover:text-white transition-colors duration-300"
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        {/* Code-like decoration */}
        <div className="absolute bottom-4 right-6 opacity-10 font-mono text-xs text-secondary">
          {service.title.split(' ')[0].toLowerCase()}_security.sys
        </div>
      </div>
    </motion.div>
  );
}
