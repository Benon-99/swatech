"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";

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

  return (
    <motion.div variants={itemVariants} className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3785CC]/5 to-[#5B8AF0]/5 rounded-2xl transform -rotate-2 scale-[1.02] opacity-50 group-hover:-rotate-1 transition-transform duration-300"></div>

      <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
        <p className="text-white/70 mb-6">{service.description}</p>

        <Link
          href={service.link}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}
