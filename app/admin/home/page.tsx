"use client";

import { useState } from "react";
import About from "@/components/admin/home/About";
import Services from "@/components/admin/home/Services";
import Features from "@/components/admin/home/Features";
import { motion } from "framer-motion";
import { Info, Settings, BookOpen, Layout } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    {
      id: "about",
      label: "About Section",
      component: <About />,
      icon: <Info className="w-5 h-5" />,
    },
    {
      id: "services",
      label: "Services",
      component: <Services />,
      icon: <Settings className="w-5 h-5" />,
    },
    {
      id: "features",
      label: "Features",
      component: <Features />,
      icon: <Layout className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1035] to-[#2e3267] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="border-b border-gray-700">
            <div className="flex -mb-px space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-center text-sm font-medium hover:bg-white/5 focus:z-10 focus:outline-none transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-gray-300 border-transparent"
                    }
                  `}
                >
                  <div className="flex items-center justify-center gap-2">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          {tabs.find((tab) => tab.id === activeTab)?.component}
        </motion.div>
      </div>
    </div>
  );
}
