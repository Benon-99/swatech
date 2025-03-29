"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ChevronRight, Map, Globe, Smartphone, Shield, Terminal, Scan } from 'lucide-react';
import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  // Office locations with random content
  const officeLocations = [
    {
      name: "SwaTech Headquarters",
      address: "123 Tech Avenue, Innovation District, Silicon Valley, CA 94025, USA",
      phone: "+1 (650) 555-7890",
      email: "info@swatech.com",
      hours: "Monday-Friday: 8:00 AM - 6:00 PM PST"
    },
    {
      name: "SwaTech Europe Office",
      address: "27 Technology Park, Cambridge CB2 1TN, United Kingdom",
      phone: "+44 20 7946 0523",
      email: "europe@swatech.com",
      hours: "Monday-Friday: 9:00 AM - 5:30 PM GMT"
    },
    {
      name: "SwaTech Asia Pacific",
      address: "50 Science Park Road, #02-07 The Kendall, Singapore 117406",
      phone: "+65 6333 8721",
      email: "apac@swatech.com",
      hours: "Monday-Friday: 9:00 AM - 6:00 PM SGT"
    },
    {
      name: "SwaTech Africa Hub",
      address: "Kilimani Business Center, Nairobi, Kenya",
      phone: "+254 20 5157 8900",
      email: "africa@swatech.com",
      hours: "Monday-Friday: 8:30 AM - 5:00 PM EAT"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section with Cybersecurity Theme */}
      <div className="relative bg-dark cyber-scanline overflow-hidden">
        {/* Cyber-themed background */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        
        {/* Glow effects */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-secondary/10 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 filter blur-[100px]"
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
        <div className="absolute left-0 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        <div className="absolute right-1/3 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1.2s'}}></div>
        </div>

        {/* Terminal-like decoration */}
        <div className="absolute top-10 right-10 cyber-card p-2 rounded opacity-20 hidden md:block">
          <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span>com_channel_secure</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative min-h-[50vh] flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                  secure_communication
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                <span className="text-gradient">Connect</span> With Our Team
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to enhance your security infrastructure? Our experts are here to help you build a resilient protection system for your organization.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Binary code pattern */}
        <div className="absolute bottom-10 left-10 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
          01100101<br />
          10010111<br />
          00110010
        </div>
      </div>

      {/* Main Contact Section */}
      <section className="py-20 px-4 bg-dark relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          >
            {/* Left Column: Contact Form */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">How can we <span className="text-gradient">secure</span> your business?</h2>
                <p className="text-lg text-gray-400">Fill out the form below and our security experts will get back to you as soon as possible</p>
              </div>

              {/* Contact Form */}
              <div className="cyber-card rounded-lg bg-dark/70 backdrop-blur-sm p-6 border border-secondary/20">
                <ContactForm />
              </div>
            </motion.div>

            {/* Right Column: Map and Office Locations */}
            <motion.div variants={itemVariants} className="space-y-10">
              {/* Map */}
              <div className="rounded-lg overflow-hidden cyber-border p-1 shadow-lg h-[300px] relative">
                <div className="absolute top-3 left-3 cyber-card p-2 rounded bg-dark/70 backdrop-blur-sm z-10">
                  <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span>global_network</span>
                  </div>
                </div>
                <Image 
                  src="/contact.webp" 
                  alt="SwaTech Global Offices" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  className="relative z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent"></div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Our <span className="text-gradient">Secure Operations</span> Centers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {officeLocations.map((office, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="cyber-card p-5 rounded-lg bg-dark/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
                    >
                      <h4 className="text-lg font-bold text-white mb-3">{office.name}</h4>
                      
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-start">
                          <MapPin className="text-secondary w-5 h-5 mt-1 flex-shrink-0" />
                          <span className="ml-3 text-sm">{office.address}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Phone className="text-secondary w-5 h-5 flex-shrink-0" />
                          <span className="ml-3 text-sm">{office.phone}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Mail className="text-secondary w-5 h-5 flex-shrink-0" />
                          <span className="ml-3 text-sm">{office.email}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="text-secondary w-5 h-5 flex-shrink-0" />
                          <span className="ml-3 text-sm">{office.hours}</span>
                        </div>
                      </div>
                      
                      {/* Terminal-like decoration */}
                      <div className="text-xs font-mono text-secondary/50 mt-4 pt-4 border-t border-secondary/20">
                        {`location_${index + 1}_active`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="bg-dark py-20 relative overflow-hidden">
        {/* Cyber-themed background */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light"></div>
        
        {/* Glow effects */}
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary/10 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
              <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                ready_to_protect
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need an <span className="text-gradient">Immediate Response</span>?
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              For urgent security consultations or immediate support, contact our 24/7 security team.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <motion.a 
                href="tel:+16505557890" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="cyber-card p-6 rounded-lg bg-dark/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 group transition-all duration-300"
              >
                <div className="bg-dark/70 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-all duration-300">
                  <Phone className="text-secondary w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-gray-300">+1 (650) 555-7890</p>
                <div className="text-xs font-mono text-secondary/50 mt-4 pt-4 border-t border-secondary/20">
                  direct_line_secure
                </div>
              </motion.a>
              
              <motion.a 
                href="mailto:security@swatech.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="cyber-card p-6 rounded-lg bg-dark/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 group transition-all duration-300"
              >
                <div className="bg-dark/70 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-all duration-300">
                  <Mail className="text-secondary w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                <p className="text-gray-300">security@swatech.com</p>
                <div className="text-xs font-mono text-secondary/50 mt-4 pt-4 border-t border-secondary/20">
                  encrypted_channel
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      </div>
  );
}