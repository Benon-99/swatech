import { motion } from "framer-motion";
import { Cpu, Database, Shield, Server } from "lucide-react";

interface AchievementsSectionProps {
  stats: {
    id: number;
    number: string;
    label: string;
  }[];
}

export default function AchievementsSection({ stats }: AchievementsSectionProps) {
  // Icons for each stat based on index
  const statIcons = [<Shield className="text-secondary w-5 h-5" />, <Database className="text-secondary w-5 h-5" />, <Cpu className="text-secondary w-5 h-5" />, <Server className="text-secondary w-5 h-5" />];

  return (
    <div className="py-20 bg-dark text-white relative overflow-hidden cyber-scanline">
      {/* Cyber-themed background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]"></div>
      </div>
      
      {/* Data flow lines */}
      <div className="absolute left-0 top-0 bottom-0">
        <div className="data-flow h-full"></div>
      </div>
      <div className="absolute right-0 top-0 bottom-0">
        <div className="data-flow h-full" style={{animationDelay: '1.3s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
            <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
              performance_metrics
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Security <span className="text-gradient">Achievements</span></h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our track record speaks for itself - years of excellence in advanced security solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-lg blur-lg group-hover:bg-secondary/10 transition-all duration-500 opacity-70"></div>
              <div className="relative p-6 rounded-lg cyber-card border border-secondary/20 backdrop-blur-sm text-center">
                {/* Terminal-like header */}
                <div className="absolute top-2 left-3 flex items-center space-x-2 opacity-70">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                  <div className="text-xs font-mono text-secondary">{`stat_${index+1}`}</div>
                </div>
                
                <div className="mt-4">
                  <p className="text-5xl font-bold text-gradient mb-2">
                    {stat.number}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-gray-300 font-medium">
                    {statIcons[index % statIcons.length]}
                    <span>{stat.label}</span>
                  </div>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-secondary/60 to-accent/60 transition-all duration-700 mx-auto"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Binary code decoration */}
        <div className="absolute bottom-5 left-5 text-secondary/20 font-mono text-xs leading-none hidden md:block">
          10101<br />
          01010<br />
          11011
        </div>
      </div>
    </div>
  );
}
