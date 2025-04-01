"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";
import AboutUsManagement from "../../../components/admin/aboutUs/AboutUsManagement";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">About Us Management</h1>
          </div>
          <p className="text-gray-400 mt-1">
            Manage your company's About Us page content and team information
          </p>
        </motion.div>
        
        <AboutUsManagement />
      </div>
    </div>
  );
}