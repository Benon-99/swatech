"use client";

import { motion } from 'framer-motion';

interface ServiceHeroProps {
  title: string;
  description: string;
}

export default function ServiceHero({ title, description }: ServiceHeroProps) {
  return (
    <div className="relative overflow-hidden bg-[#111240]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center opacity-0 animate-fade-in"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-6 inline-block"
          >
            What We Offer
          </motion.span>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#3785CC] via-[#4A9BE4] to-[#5B8AF0] bg-clip-text text-transparent mb-6 leading-normal">
            {title}
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed pt-4">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}