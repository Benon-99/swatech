"use client";

import { motion } from 'framer-motion';
import { ChevronRight, Lock, Shield, Eye, BarChart2, Server } from 'lucide-react';
import Link from 'next/link';

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden bg-dark cyber-scanline">
      {/* Cybersecurity-themed background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cyber grid pattern */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        
        {/* Glow effects */}
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-secondary/10 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/10 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Data flow lines */}
        <div className="absolute left-10 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        <div className="absolute right-1/3 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1.5s'}}></div>
        </div>
        <div className="absolute right-20 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '0.7s'}}></div>
        </div>

        {/* Floating security icons */}
        <div className="absolute top-20 right-20">
          <Lock className="w-16 h-16 text-secondary/10" />
        </div>
        <div className="absolute bottom-20 left-40">
          <Shield className="w-24 h-24 text-secondary/10" />
        </div>
        <div className="absolute top-1/3 left-1/4">
          <Server className="w-12 h-12 text-secondary/10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary backdrop-blur-sm mb-6 inline-block"
            >
              Get in Touch With Us
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
            >
              Let&apos;s Connect and Secure <span className="text-gradient">Your Vision</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto md:mx-0"
            >
              Have questions about our advanced security solutions? Our expert team is here to help you transform your security operations with cutting-edge video management and analytics technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link 
                href="#contact-form" 
                className="bg-secondary text-primary font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center shadow-lg cyber-pulse"
              >
                Contact Us Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link 
                href="/solutions" 
                className="cyber-border bg-dark backdrop-blur-sm text-secondary font-medium px-6 py-3 rounded-lg hover:bg-secondary/5 transition-all duration-300 flex items-center justify-center"
              >
                Explore Our Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cybersecurity-themed decorative elements */}
      <div className="absolute bottom-10 right-10 cyber-card p-4 rounded-lg hidden md:block">
        <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span>secure_communication_protocol</span>
        </div>
      </div>
      
      {/* Binary code pattern */}
      <div className="absolute top-10 left-10 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
        01000111<br />
        10100101<br />
        00101101<br />
        11001010
      </div>
    </div>
  );
}