"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Zap,
  Clock,
  BarChart4,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  Shield,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { apiClient } from "../../lib/api";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Fetch about data from API
const fetchAboutData = async () => {
  try {
    const response = await apiClient.get("/about/");
    return response.data.about;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
};

// Interface for dynamic API response
interface AboutResponse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  img: string;
  mission: string;
  vision: string;
  commitments: Commitment[];
  stats: Stat[];
}

interface Commitment {
  id: number;
  icon: string;
  title: string;
  text: string;
}

interface Stat {
  id: number;
  number: string;
  label: string;
}

// Default values if API data is not available
const defaultAboutData = {
  title: "Who We Are",
  subtitle: "SwaTech is a leading provider of AI-driven security solutions.",
  mission: "To revolutionize security with AI-powered analytics and real-time threat detection.",
  vision: "A future where security is predictive, proactive, and seamlessly integrated into daily life.",
  img: "/about1.webp",
  commitments: [
    {
      id: 1,
      icon: "Zap",
      title: "Innovation",
      text: "Pioneering AI-driven security solutions.",
    },
    {
      id: 2,
      icon: "Clock",
      title: "Reliability",
      text: "High-performance, 24/7 operational efficiency.",
    },
    {
      id: 3,
      icon: "BarChart4",
      title: "Scalability",
      text: "Solutions tailored for enterprises and government entities.",
    },
    {
      id: 4,
      icon: "HeadphonesIcon",
      title: "Customer Success",
      text: "End-to-end support and integration services.",
    },
  ],
  stats: [
    { id: 1, number: "15+", label: "Years Experience" },
    { id: 2, number: "200+", label: "Projects Completed" },
    { id: 3, number: "50+", label: "Expert Team Members" },
    { id: 4, number: "98%", label: "Client Satisfaction" },
  ],
};

// Dynamic icon component
const DynamicIcon = ({ iconName }: { iconName: string }) => {
  if (!iconName) return null;
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
  return Icon ? <Icon className="w-6 h-6" /> : null;
};

// Optimized loading skeleton
const LoadingSkeleton = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3785CC]"></div>
  </div>
);

// Dynamically import components with Next.js dynamic
const MissionVisionSection = dynamic(() => import('../../components/about/MissionVisionSection'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const CommitmentsSection = dynamic(() => import('../../components/about/CommitmentsSection'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const AchievementsSection = dynamic(() => import('../../components/about/AchievementsSection'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const FeaturesSection = dynamic(() => import('../../components/about/FeaturesSection'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

const CTASection = dynamic(() => import('../../components/about/CTASection'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
});

export default function AboutPage() {
  // Progressive loading state
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch data using TanStack Query with better caching
  const { data, isLoading } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    retry: 1, // Only retry once on failure
  });

  // Use API data if available, otherwise use default data
  const aboutData = data || defaultAboutData;

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section - Cybersecurity Theme */}
      <div className="relative h-[80vh] overflow-hidden bg-dark cyber-scanline">
        {isClient && (
          <>
            {/* Cybersecurity-themed background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-10"></div>
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
              
              {/* Glow effects */}
              <motion.div 
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-secondary/10 filter blur-[100px]"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              <motion.div 
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 filter blur-[100px]"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />

              {/* Data flow lines */}
              <div className="absolute left-20 top-0 bottom-0">
                <div className="data-flow h-full"></div>
              </div>
              <div className="absolute right-1/3 top-0 bottom-0">
                <div className="data-flow h-full" style={{animationDelay: '1.2s'}}></div>
              </div>
            </div>

            {/* Floating security icons */}
            <div className="absolute top-20 right-20 opacity-10">
              <LucideIcons.Shield className="w-32 h-32 text-secondary" />
            </div>
            <div className="absolute bottom-20 left-20 opacity-10">
              <LucideIcons.Lock className="w-24 h-24 text-secondary" />
            </div>
          </>
        )}
        
        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <div>
              <div className="inline-block relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                  about_sys.segment
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                <span className="text-gradient">{aboutData.title}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
                {aboutData.subtitle}
              </p>
              
              <div className="mt-10">
                <Link 
                  href="/solutions"
                  className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg font-medium cyber-pulse"
                >
                  Discover Our Solutions
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Binary code pattern */}
        <div className="absolute bottom-10 right-10 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
          01000111<br />
          10100101<br />
          00101101
        </div>
        
        {/* Terminal-like section */}
        <div className="absolute top-10 left-10 cyber-card p-3 rounded opacity-20 hidden md:block">
          <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span>security_profile_active</span>
          </div>
        </div>
      </div>

      {/* Progressive loading sections */}
      {isClient && (
        <>
          <MissionVisionSection aboutData={aboutData} />
          <CommitmentsSection commitments={aboutData.commitments} />
          <AchievementsSection stats={aboutData.stats} />
          <FeaturesSection />
          <CTASection />
        </>
      )}
    </div>
  );
}
