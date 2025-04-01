import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Shield, LockKeyhole, BarChart2, Fingerprint } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div className="py-20 bg-dark relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]"></div>
      
      {/* Decorative data flows */}
      <div className="absolute left-10 top-20 h-40">
        <div className="data-flow"></div>
      </div>
      <div className="absolute right-20 bottom-20 h-60">
        <div className="data-flow"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary inline-block">
              Why Choose Us
            </span>
            <h2 className="text-4xl font-bold text-white">
              <span className="text-gradient">Cutting-Edge Security Technology</span> That Makes a Difference
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our AI-driven solutions provide unparalleled security coverage with features that traditional systems simply can't match.
            </p>
            
            <div className="space-y-4">
              {[
                "Advanced threat detection with behavioral analytics",
                "Real-time monitoring with instant alerts",
                "Seamless integration with existing security infrastructure",
                "Customizable dashboards and reporting",
                "24/7 technical support and maintenance"
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 cyber-border p-3 bg-dark/70 backdrop-blur-sm rounded-lg"
                >
                  <CheckCircle2 className="text-secondary mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </div>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-lg hover:opacity-90 transition-colors duration-300 cyber-pulse"
            >
              Talk to Our Team
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          {/* Image Grid with Cyber Effects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6 relative"
          >
            {/* Decorative icons */}
            <div className="absolute -right-5 top-1/2 transform -translate-y-1/2">
              <Shield className="w-20 h-20 text-secondary/10" />
            </div>
            <div className="absolute -left-5 top-20">
              <LockKeyhole className="w-16 h-16 text-secondary/10" />
            </div>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
              <BarChart2 className="w-14 h-14 text-secondary/10" />
            </div>
            
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden cyber-border h-48 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-dark/10 to-dark/60 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src="/about2.webp"
                  alt="Security System"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
                
              </div>
              <div className="rounded-lg overflow-hidden cyber-border h-64 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-dark/10 to-dark/60 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src="/about3.webp"
                  alt="Security Technology"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
                
              </div>
            </div>
            <div className="space-y-6 mt-8">
              <div className="rounded-lg overflow-hidden cyber-border h-64 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-dark/10 to-dark/60 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src="/about4.webp"
                  alt="AI Security"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
                
              </div>
              <div className="rounded-lg overflow-hidden cyber-border h-48 relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-dark/10 to-dark/60 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src="/about5.webp"
                  alt="Surveillance System"
                  width={300}
                  height={200}
                  className="w-full h-full object-cover"
                />
                
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
