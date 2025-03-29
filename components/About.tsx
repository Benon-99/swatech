"use client";

import { apiClient } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Globe,
  Target,
  Compass,
  Shield,
  Users,
  Heart,
  ArrowRight,
  LucideIcon,
  Lock,
  Fingerprint,
  Server,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ICONS: Record<string, LucideIcon> = {
  Globe: Globe,
  Target: Target,
  Compass: Compass,
  Shield: Shield,
  Users: Users,
  Heart: Heart,
  ArrowRight: ArrowRight,
  Lock: Lock,
  Fingerprint: Fingerprint,
  Server: Server,
  Eye: Eye,
};
interface AboutContent {
  features: {
    icon: string;
    title: string;
    text: string;
    color: string;
  }[];
  stats: {
    number: string;
    label: string;
  }[];
  title: string;
  subtitle: string;
  content: string[];
  img?: string;
}

export default function About() {
  const {
    data: aboutUsContent,
    isError,
    isLoading,
    error,
  } = useQuery<AboutContent>({
    queryKey: ["about"],
    queryFn: async () => {
      const connect = await apiClient.get("/home");
      console.log(connect.data.home[0].aboutUs);
      return connect.data.home[0].aboutUs;
    },
  });

  // Default content if API fails
  const defaultContent: AboutContent = {
    title: "A Trusted Partner in Physical Security",
    subtitle: "At Secure Wave Advanced Technologies, our mission is to provide cutting-edge security solutions that enhance safety, streamline operations, and drive efficiency across various industries.",
    content: [
      "At Secure Wave Advanced Technologies, our mission is to provide cutting-edge security solutions that enhance safety, streamline operations, and drive efficiency across various industries. As a value-added distributor, we go beyond product distribution by offering consultation, implementation support, and expertise to ensure seamless integration and optimal performance.",
      "Our vision is to be the leading distributor of intelligent security solutions, empowering organizations with state-of-the-art video management, analytics, and surveillance tools."
    ],
    features: [
      {
        icon: "Shield",
        title: "Comprehensive Security",
        text: "We provide end-to-end security solutions for businesses of all sizes.",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: "Target",
        title: "Expert Consultation",
        text: "Our team offers specialized guidance for your unique security needs.",
        color: "from-indigo-500 to-indigo-600",
      },
      {
        icon: "Globe",
        title: "Global Partnerships",
        text: "We partner with leading technology providers like Milestone and BriefCam.",
        color: "from-purple-500 to-purple-600",
      },
    ],
    stats: [
      {
        number: "10+",
        label: "Years Experience",
      },
      {
        number: "500+",
        label: "Clients Secured",
      },
      {
        number: "3",
        label: "Strategic Partners",
      },
      {
        number: "24/7",
        label: "Support & Monitoring",
      },
    ],
    img: "/home1.webp",
  };

  if (isLoading) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-dark">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-300 text-lg font-medium">
              Loading content, please wait...
            </p>
          </div>
        </div>
      );
    }
  }

  // Use default content if API fails
  const content = aboutUsContent || defaultContent;

  return (
    <section className="py-24 bg-dark relative overflow-hidden cyber-scanline">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-secondary/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-accent/5 rounded-full filter blur-[80px]"></div>
        
        {/* Data flow lines */}
        <div className="absolute left-20 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '0.5s'}}></div>
        </div>
        <div className="absolute right-40 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1.2s'}}></div>
        </div>
      </div>

      <div className="w-full lg:w-[1280px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary backdrop-blur-sm mb-4 inline-block">
              About Us
            </span>
            <h2 className="text-5xl font-bold mb-6 text-white">
              <span className="text-gradient">{content.title}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {content.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden h-[450px] cyber-border">
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent z-10"></div>
              <Image
                src={content.img || "/about1.webp"}
                alt="About Secure Wave Advanced Technologies"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <div className="text-xs text-secondary font-mono opacity-70 mb-2">// secure_operations.sys</div>
                <div className="h-1 w-24 bg-secondary/30"></div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-secondary/20 rounded-md -z-10 hidden lg:block"></div>
            <div className="absolute -top-8 -right-8 w-20 h-20 border border-secondary/10 rounded-md -z-10 hidden lg:block"></div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {content.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-300 leading-relaxed cyber-border p-4 bg-dark/40 backdrop-blur-sm rounded-lg"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-4 bg-secondary text-primary px-6 py-3 rounded-lg hover:opacity-90 transition-colors duration-300 cyber-pulse"
            >
              Get in Touch
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">
            <span className="text-gradient">Our Capabilities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, index) => {
              const Icon = ICONS[feature.icon] || Shield;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="cyber-card rounded-xl p-6 hover-card"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-secondary/10 text-secondary`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300">{feature.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-2xl cyber-card p-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 * index }}
                className="text-center cyber-border p-6 rounded-lg relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-secondary/5 rounded-full filter blur-xl"></div>
                <div className="relative z-10">
                  <h5 className="text-4xl font-bold mb-2 text-gradient">
                    {stat.number}
                  </h5>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
