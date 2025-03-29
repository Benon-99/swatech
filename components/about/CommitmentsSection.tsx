import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

interface CommitmentsSectionProps {
  commitments: {
    id: number;
    icon: string;
    title: string;
    text: string;
  }[];
}

// Dynamic icon component
const DynamicIcon = ({ iconName }: { iconName: string }) => {
  if (!iconName) return null;
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
  return Icon ? <Icon className="w-6 h-6 text-secondary" /> : null;
};

export default function CommitmentsSection({ commitments }: CommitmentsSectionProps) {
  return (
    <div className="py-20 bg-dark relative overflow-hidden">
      {/* Cyber-themed backgrounds */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full filter blur-[100px] -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full filter blur-[120px] translate-x-1/4"></div>
      
      {/* Data flow lines */}
      <div className="absolute left-20 top-0 bottom-0">
        <div className="data-flow h-full"></div>
      </div>
      <div className="absolute right-40 top-0 bottom-0">
        <div className="data-flow h-full" style={{animationDelay: '1.5s'}}></div>
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
              security_principles
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-gradient">Core Security</span> Commitments
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We stand behind these core principles in everything we do, from solution development to security implementation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((commitment, index) => (
            <motion.div
              key={commitment.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark/40 backdrop-blur-sm rounded-lg cyber-card group"
            >
              <div className="p-8 relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon with cyber styling */}
                <div className="cyber-border p-3 rounded-lg inline-flex mb-6 bg-dark/70 relative z-10 group-hover:bg-dark/90 transition-colors duration-300">
                  <DynamicIcon iconName={commitment.icon} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-secondary transition-colors duration-300 relative z-10">
                  {commitment.title}
                </h3>
                
                <p className="text-gray-300 relative z-10">{commitment.text}</p>
                
                {/* Animated border effect */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary to-accent w-0 group-hover:w-full transition-all duration-700"></div>
                
                {/* Terminal style decoration */}
                <div className="absolute bottom-2 right-2 text-secondary/30 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {`<${commitment.title.toLowerCase().replace(/\s+/g, '_')}>`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
