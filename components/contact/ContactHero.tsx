"use client";

import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden py-32 bg-[#111240]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-6 inline-block"
          >
            Contact Us
          </motion.span>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Let&apos;s Connect and Create Something Amazing Together
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We&apos;re here to help you achieve your business goals. Get in touch with us today.
          </p>
        </motion.div>
      </div>
    </div>
  );
}