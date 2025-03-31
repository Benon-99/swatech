"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Linkedin, Twitter, Youtube, ChevronRight, Shield, Lock, Database } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer = () => {  
  const quickLinksCategories = [
    {
      title: "Main",
      links: [
        { text: 'Home', href: '/' },
        { text: 'About Us', href: '/about' },
        { text: 'Contact Us', href: '/contact' },
      ]
    },
    {
      title: "Services",
      links: [
        { text: 'Solutions', href: '/solutions' },
        
      ]
    },
    // {
    //   title: "Resources",
    //   links: [
    //     { text: 'News', href: '/news' },
    //     { text: 'Blog', href: '/blog' },
    //     { text: 'Support', href: '/support' },
    //   ]
    // }
  ];

  const companyInfo = [
    { Icon: MapPin, text: 'Headquarters: 90/3 Adawi Enshaat, Damascus, Syria' },
    { Icon: Mail, text: 'Email: info@swatech.com' },
    { Icon: Phone, text: 'Phone: +963 44 20 567' },
  ];

  const socialLinks = [
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  const pathname = usePathname();

  if (pathname.startsWith('/admin') || pathname.startsWith('/blogs/')) {
    return null; // Hide Footer on admin and blog post pages
  }
  
  return (
    <footer className="bg-dark relative overflow-hidden cyber-scanline border-t-2 border-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-secondary/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-accent/5 rounded-full filter blur-[80px]"></div>
        
        {/* Data flow lines */}
        <div className="absolute left-10 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        <div className="absolute right-1/3 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        <div className="absolute right-1/4 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 py-16"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="block group">
              <div className="relative">
                {/* <Image 
                  src="/logo_ow.webp" 
                  alt="SwaTech Logo" 
                  width={140}
                  height={56}
                  className="h-14 w-auto group-hover:scale-105 transition-transform duration-300"
                /> */}
                <span className="text-2xl font-bold text-secondary">SWATECH</span>
                <div className="absolute inset-0 bg-secondary/20 filter blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              SwaTech is a leading provider of innovative technology solutions and services, empowering businesses to thrive in the digital era.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full cyber-border bg-dark hover:opacity-90
                    transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5 text-secondary/80 group-hover:text-secondary transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Organized by Categories */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gradient mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {quickLinksCategories.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-secondary font-medium text-sm">{category.title}</h4>
                  <ul className="space-y-2">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link 
                          href={link.href}
                          className="group flex items-center text-gray-300 hover:text-secondary transition-colors duration-300 text-sm"
                        >
                          <ChevronRight className="w-3 h-3 mr-1 text-secondary/70" />
                          <span>{link.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Company Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-semibold text-gradient">Company Information</h3>
            <ul className="space-y-4">
              {companyInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg cyber-border bg-secondary/5">
                    <item.Icon className="w-5 h-5 text-secondary/80" />
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Security Icons */}
        <div className="relative flex justify-center space-x-20 py-8 opacity-20">
          <Shield className="w-10 h-10 text-secondary" />
          <Lock className="w-10 h-10 text-secondary" />
          <Database className="w-10 h-10 text-secondary" />
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative py-8 border-t border-secondary/10"
        >
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} SwaTech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-secondary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-secondary transition-colors duration-300">
                Terms of Service
              </Link>
            </div> 
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;