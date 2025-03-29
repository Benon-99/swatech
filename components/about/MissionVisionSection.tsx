import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Eye, Code } from "lucide-react";

interface MissionVisionSectionProps {
  aboutData: {
    mission: string;
    vision: string;
    img: string;
  };
}

export default function MissionVisionSection({ aboutData }: MissionVisionSectionProps) {
  return (
    <div className="bg-dark py-20 relative overflow-hidden">
      {/* Cybersecurity-themed backgrounds */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-[100px]"></div>
      
      {/* Data flow line */}
      <div className="absolute right-10 top-0 bottom-0">
        <div className="data-flow h-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image with cyber effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-30"></div>
            <div className="cyber-border p-1 rounded-xl relative">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={aboutData.img}
                  alt="Secure Wave Advanced Technologies"
                  width={800}
                  height={600}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                
                {/* Terminal-like overlay */}
                <div className="absolute top-4 left-4 cyber-card p-2 rounded bg-dark/70 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span>secure_feed_active</span>
                  </div>
                </div>
                
                {/* Scan effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-transparent w-full h-3"
                  animate={{ 
                    top: [0, "100%", 0],
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </div>
            
            {/* Binary code decoration */}
            <div className="absolute -bottom-8 -right-8 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
              10110<br />
              01101<br />
              10011
            </div>
          </motion.div>
          
          {/* Mission & Vision Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Mission */}
            <div className="space-y-4 cyber-card p-6 rounded-lg bg-dark/70 backdrop-blur-sm">
              <div className="inline-block relative mb-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <div className="relative flex items-center gap-2 px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg">
                  <Target className="w-4 h-4" />
                  <span>mission_protocol</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white">{aboutData.mission}</h2>
              <p className="text-gray-300 leading-relaxed">
                We combine cutting-edge security technology with years of expertise to create solutions that anticipate, identify, and neutralize threats before they become problems.
              </p>
            </div>
            
            {/* Vision */}
            <div className="space-y-4 cyber-card p-6 rounded-lg bg-dark/70 backdrop-blur-sm">
              <div className="inline-block relative mb-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <div className="relative flex items-center gap-2 px-4 py-1.5 bg-dark text-accent text-sm font-mono rounded-lg">
                  <Eye className="w-4 h-4" />
                  <span>vision_framework</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white">{aboutData.vision}</h2>
              <p className="text-gray-300 leading-relaxed">
                We envision a world where advanced security systems don't just respond to incidents but predict and prevent them, creating safer environments for everyone.
              </p>
            </div>
            
            {/* Code decoration */}
            <div className="absolute -left-4 bottom-4 opacity-10">
              <Code className="w-20 h-20 text-secondary" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
