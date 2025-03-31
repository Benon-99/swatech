"use client";

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Shield, Lock, Eye, BarChart3 } from 'lucide-react';

interface WhyChooseUsItem {
  text: string;
}

interface SolutionItem {
  title: string;
}

interface IndustryItem {
  name: string;
}

interface HeroContent {
  headline: string;
  subheading: string;
  ctaText: string;
  whyChooseUs: WhyChooseUsItem[];
  solutions: SolutionItem[];
  industries: IndustryItem[];
  finalCta: string;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    headline: "Elevating Security with Cutting-Edge Solutions",
    subheading: "At Secure Wave Advanced Technologies, we specialize in delivering advanced physical security solutions that empower businesses, governments, and enterprises to protect their assets, optimize operations, and make data-driven decisions. As a trusted value-added distributor, we provide industry-leading video management, analytics, and intelligence solutions through our strategic partnerships with Milestone Systems, BriefCam, and Conexao Technology Solutions.",
    ctaText: "Explore Our Solutions",
    whyChooseUs: [
      { text: "Proven expertise in physical security solutions" },
      { text: "Partnerships with global technology leaders" },
      { text: "Scalable solutions tailored for businesses of all sizes" },
      { text: "Future-proof security with AI-driven innovation" },
    ],
    solutions: [
      { title: "Milestone XProtect® VMS" },
      { title: "BriefCam Video Analytics" },
      { title: "O-Insights for Milestone" },
    ],
    industries: [
      { name: "Corporate Security" },
      { name: "Critical Infrastructure" },
      { name: "Retail & Public Spaces" },
      { name: "Government & Law Enforcement" },
      { name: "Smart Cities" },
    ],
    finalCta: "Get in Touch Today to transform your security operations!"
  });

  // Fetch hero content
  const { data: heroData } = useQuery<{ home: { hero: HeroContent }[] }>({
    queryKey: ["hero"],
    queryFn: async () => {
      try {
        const response = await apiClient.get("/home");
        return response.data;
      } catch (error) {
        console.error("Error fetching hero content:", error);
        return null;
      }
    }
  });

  // Update heroContent when data is fetched successfully
  useEffect(() => {
    if (heroData?.home?.[0]?.hero) {
      setHeroContent(heroData.home[0].hero);
    }
  }, [heroData]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  // Animated dots for the cyber effect
  const CyberDots = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="cyber-grid w-full h-full opacity-20"></div>
      </div>
    );
  };

  // Animated data flow for the cyber effect
  const DataFlows = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="data-flow absolute" 
            style={{
              left: `${Math.random() * 100}%`,
              height: `${100 + Math.random() * 200}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-screen overflow-hidden bg-dark cyber-scanline -mt-20">
      {/* Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-dark" />
        
        {/* Video Background with reduced opacity */}
        <div className="absolute inset-0 opacity-550">
          <video 
            ref={videoRef}
            className="object-cover w-full h-full"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/UntitledDesign(2).webm" type="video/webm" />
          </video>
        </div>
        
        {/* Cyber-themed overlay elements */}
        <CyberDots />
        <DataFlows />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050C24]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050C24]/90" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30 mix-blend-soft-light" />
        
        {/* Glow effect */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full filter blur-[100px]" />
      </div>

      {/* Split Layout Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Content - Text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1 bg-secondary/10 backdrop-blur-md border-l-4 border-secondary text-secondary font-medium rounded-r-lg">
                  SECURE WAVE ADVANCED TECHNOLOGIES
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl font-bold leading-tight text-white"
              >
                <span className="text-gradient">{heroContent.headline}</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-gray-300/90 mt-6 max-w-3xl"
              >
                {heroContent.subheading}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                <Link 
                  href="/solutions" 
                  className="cyber-pulse px-6 py-3 bg-secondary hover:opacity-90 text-primary font-medium rounded-lg transition-colors duration-300 inline-flex items-center"
                >
                  {heroContent.ctaText}
                  <span className="ml-2">→</span>
                </Link>
                <Link 
                  href="/contact" 
                  className="px-6 py-3 bg-dark cyber-border text-secondary font-medium rounded-lg transition-all duration-300 hover:bg-secondary/5"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Why Choose Us list */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="lg:col-span-5 cyber-card rounded-2xl p-6 cyber-border"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-secondary mr-2" />
              <h3 className="text-xl font-semibold text-white">Why Choose Us?</h3>
            </div>
            <ul className="space-y-4">
              {heroContent.whyChooseUs.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-gray-300">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 pt-5 border-t border-secondary/10"
            >
              <p className="text-secondary/80 text-sm italic">
                {heroContent.finalCta}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Security icons floating in the background */}
      <div className="absolute bottom-10 left-10 text-secondary/20 hidden lg:block">
        <Lock className="w-16 h-16" />
      </div>
      <div className="absolute top-20 right-20 text-secondary/20 hidden lg:block">
        <Eye className="w-12 h-12" />
      </div>
      <div className="absolute bottom-20 right-40 text-secondary/20 hidden lg:block">
        <BarChart3 className="w-20 h-20" />
      </div>
    </div>
  );
}