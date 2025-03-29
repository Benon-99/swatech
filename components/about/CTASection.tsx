import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock, ServerCrash } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <div className="bg-dark py-20 relative overflow-hidden cyber-scanline">
      {/* Cybersecurity-themed background */}
      <div className="absolute inset-0">
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
      </div>
      
      {/* Data flow lines */}
      <div className="absolute left-0 top-0 bottom-0">
        <div className="data-flow h-full"></div>
      </div>
      <div className="absolute right-1/3 top-0 bottom-0">
        <div className="data-flow h-full" style={{animationDelay: '1.2s'}}></div>
      </div>
      
      {/* Security icons */}
      <div className="absolute top-10 right-10 opacity-10">
        <Shield className="w-24 h-24 text-secondary" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <Lock className="w-20 h-20 text-secondary" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto cyber-card p-8 rounded-lg bg-dark/50 backdrop-blur-sm"
        >
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
            <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
              security_consultation.exe
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Elevate Your <span className="text-gradient">Security Infrastructure</span> With Advanced Solutions
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg">
            Ready to transform your security operations with cutting-edge video management and analytics? 
            Our team of experts is here to design the perfect security solution for your specific needs.
          </p>
          
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg cyber-pulse"
          >
            Connect With Security Experts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
      
      {/* Binary code pattern */}
      <div className="absolute bottom-5 right-5 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
        01011<br />
        10101<br />
        01110
      </div>
      
      {/* Terminal-like decoration */}
      <div className="absolute top-5 left-5 cyber-card p-2 rounded opacity-20 hidden md:block">
        <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span>system_secured</span>
        </div>
      </div>
    </div>
  );
}
