"use client";

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SolutionDetailProps {
  title: string;
  description: string;
  overview: string;
  features: string[];
  industries: string[];
  image?: string;
}

export default function SolutionDetail({ 
  title, 
  description, 
  overview, 
  features, 
  industries,
  image = "/images/solutions/default-solution.jpg" 
}: SolutionDetailProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#111240]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-6">{title}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="text-lg text-gray-700 mb-6">{overview}</p>
            <Link href="/contact" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
              Request a Consultation <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our comprehensive approach ensures your business receives the highest level of protection and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start"
              >
                <CheckCircle className="text-green-500 w-6 h-6 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <p className="text-lg text-gray-800">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Industries Benefiting</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our solutions are tailored to meet the specific needs of various industries, providing specialized protection and optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <Shield className="text-blue-600 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Secure Your Business?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Contact our team today to discuss how our {title} can help protect your organization.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
