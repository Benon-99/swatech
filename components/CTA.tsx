"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Lock, Database } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 bg-dark relative overflow-hidden cyber-scanline">
      {/* Cyber-themed Background */}
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
        <div className="absolute left-0 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        <div className="absolute right-1/4 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1.2s'}}></div>
        </div>
        <div className="absolute right-0 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '0.6s'}}></div>
        </div>
        
        {/* Floating security icons */}
        <div className="absolute top-20 right-20 opacity-10">
          <Shield className="w-32 h-32 text-secondary" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <Lock className="w-24 h-24 text-secondary" />
        </div>
        <div className="absolute top-1/2 left-1/3 opacity-10">
          <Database className="w-16 h-16 text-accent" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block relative mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
            <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
              {`<secure_connection>`}
            </span>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-gradient">
            Ready to Secure Your Operation?
          </h2>
          
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
{`            Let's discuss how Secure Wave Advanced Technologies can strengthen your security infrastructure with our cutting-edge solutions.
`}          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-secondary text-primary rounded-lg 
                overflow-hidden transition-all duration-300 hover:opacity-90 cyber-pulse"
            >
              <span className="relative flex items-center font-medium">
                Secure Your Future Today
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="/solutions"
              className="group relative px-8 py-4 rounded-lg cyber-border bg-dark
                backdrop-blur-sm transition-all duration-300 hover:bg-secondary/5"
            >
              <span className="text-secondary flex items-center font-medium">
                Explore Security Solutions
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Binary code pattern */}
      <div className="absolute bottom-10 right-10 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
        11000101<br />
        01011011<br />
        10101100
      </div>
      
      {/* Terminal-like section */}
      <div className="absolute top-10 left-10 cyber-card p-3 rounded opacity-20 hidden md:block">
        <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span>security_protocol_active</span>
        </div>
      </div>
    </section>
  );
}