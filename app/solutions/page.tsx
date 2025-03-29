"use client";

import { motion } from 'framer-motion';
import { 
  Shield, 
  ArrowRight, 
  Video, 
  BarChart3, 
  Database,
  Building2,
  Factory,
  Store,
  LandPlot,
  Search,
  Bell,
  BarChart2,
  LineChart,
  PieChart,
  Activity,
  Zap,
  Clock,
  Brain,
  Lock,
  Users,
  TrendingUp,
  Settings,
  Eye,
  Building,
  FileBarChart,
  UserCheck,
  ShieldAlert,
  Timer,
  Scan,
  AlertTriangle,
  Lightbulb as LightbulbIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Solution {
  id: number;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  link?: string;
}

export default function SolutionsPage() {
  const router = useRouter();

  // Smooth scroll function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Remove the # from the targetId
    const elementId = targetId.replace('#', '');
    const targetElement = document.getElementById(elementId);
    
    if (targetElement) {
      // Update URL without reload
      window.history.pushState({}, '', targetId);
      
      // Smooth scroll to the element
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    }
  };

  const solutions: Solution[] = [
    {
      id: 1,
      title: "Milestone XProtect® – Open-Platform VMS",
      description: "Premier open-platform Video Management Software (VMS) that enables organizations to manage video surveillance systems efficiently.",
      icon: Video,
      gradient: "from-[#1E40AF] to-[#3B82F6]",
      link: "#milestone-xprotect"
    },
    {
      id: 2,
      title: "BriefCam Video Analytics",
      description: "Industry-leading Video Content Analytics solutions that transform raw video data into actionable intelligence.",
      icon: BarChart3,
      gradient: "from-[#15803D] to-[#22C55E]",
      link: "#BriefCam"
    },
    {
      id: 3,
      title: "O-Insights for Milestone",
      description: "Operational intelligence solution that enhances Milestone XProtect with powerful business analytics and insights.",
      icon: Database,
      gradient: "from-[#7E22CE] to-[#A855F7]",
      link: "#O-Insights"
    },
  ];

  return (
    <div className="bg-dark">
      {/* Hero Section - Cybersecurity Theme */}
      <div className="relative overflow-hidden bg-dark cyber-scanline">
        <div className="absolute inset-0 overflow-hidden">
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
        </div>
        
        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
              <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                security_solutions
              </span>
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6">Advanced <span className="text-gradient">Security Solutions</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive security solutions designed to protect your assets from evolving threats while providing actionable insights and operational intelligence.
            </p>
          </motion.div>
        </div>
        
        {/* Security icon decoration */}
        <div className="absolute top-10 right-10 opacity-10">
          <Shield className="w-32 h-32 text-secondary" />
        </div>
        
        {/* Binary code pattern */}
        <div className="absolute bottom-10 left-10 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
          01100101<br />
          10010111<br />
          00110010
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-dark/40 cyber-card rounded-lg overflow-hidden border border-secondary/20 hover:border-secondary/40 backdrop-blur-sm transition-all duration-300"
              >
                <div className="p-8 relative overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon with cyber styling */}
                  <div className="cyber-border p-3 rounded-lg inline-flex mb-6 bg-dark/70 relative z-10">
                    <IconComponent className="text-secondary w-10 h-10" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-secondary transition-colors duration-300 relative z-10">{solution.title}</h3>
                  <p className="text-gray-300 mb-6 relative z-10">{solution.description}</p>
                  
                  <a 
                    href={solution.link ?? "#"} 
                    className="inline-flex items-center text-secondary hover:text-accent transition-colors duration-300 font-medium mt-auto relative z-10"
                    onClick={(e) => solution.link ? handleSmoothScroll(e, solution.link) : null}
                  >
                    <span className="font-mono text-sm">view_details</span> <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  
                  {/* Terminal style decoration */}
                  <div className="absolute bottom-3 right-3 text-secondary/30 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {`<secure_solution>`}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Milestone XProtect Section */}
      <div id="milestone-xprotect" className="bg-dark py-20 relative overflow-hidden">
        {/* Cyber-themed background */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]"></div>
        
        {/* Data flow lines */}
        <div className="absolute right-20 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden cyber-border p-1 shadow-lg"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src="/pic1.jpg"
                  alt="Milestone XProtect VMS"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                
                {/* Terminal-like overlay */}
                <div className="absolute top-4 left-4 cyber-card p-2 rounded bg-dark/70 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span>analytics_engine</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="inline-block relative mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                  analytics_system
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6"><span className="text-gradient">Milestone XProtect</span> – Open-Platform Video Management System (VMS)</h2>
              <p className="text-lg text-gray-300 mb-6">
                Milestone's XProtect is a premier open-platform Video Management Software (VMS) that enables organizations to manage video surveillance systems efficiently. Its flexible architecture supports seamless integration with a wide array of cameras, sensors, and third-party applications, making it adaptable to diverse security needs.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { text: "Open-Platform Architecture: XProtect's design allows integration with over 14,000 devices and more than 1,000 third-party applications, providing unparalleled flexibility in building tailored security solutions.", icon: Settings },
                { text: "Scalability: Whether for small businesses or large enterprises, XProtect offers scalable solutions. Its various editions—Essential+, Express+, Professional+, Expert, and Corporate—cater to different organizational sizes and requirements.", icon: TrendingUp },
                { text: "Advanced Video Analytics: By integrating with AI-powered analytics, XProtect enhances situational awareness, enabling proactive security measures and efficient incident management.", icon: Brain },
                { text: "Cybersecurity and Compliance: Designed with robust cybersecurity measures, XProtect supports external identity providers (OIDC) and complies with GDPR, ensuring data protection and regulatory adherence.", icon: Lock },
                { text: "User-Friendly Interface: The intuitive design of XProtect ensures ease of use, reducing training time and enhancing operational efficiency. Features like customizable dashboards and smart maps facilitate quick access to critical information.", icon: Users }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start cyber-card p-4 rounded-lg bg-dark/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
                >
                  <feature.icon className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-gray-300">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Enhanced Security",
                  description: "Real-time monitoring and intelligent analytics lead to faster threat detection and response.",
                  icon: Eye
                },
                {
                  title: "Operational Efficiency",
                  description: "Streamlined workflows and automated processes reduce manual intervention, saving time and resources.",
                  icon: Activity
                },
                {
                  title: "Future-Proof Investment",
                  description: "The open-platform approach ensures compatibility with emerging technologies, protecting your investment over time.",
                  icon: Clock
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark/40 p-6 rounded-lg cyber-card backdrop-blur-sm hover:bg-dark/60 transition-all duration-300 border border-secondary/20"
                >
                  <benefit.icon className="text-secondary w-10 h-10 mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                  
                  {/* Terminal-like decoration */}
                  <div className="text-xs font-mono text-secondary/50 mt-4 pt-4 border-t border-secondary/20">
                    {`analysis_${index + 1}_active`}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Applications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Corporate Security", icon: Building2 },
                { name: "Critical Infrastructure", icon: Factory },
                { name: "Retail & Public Spaces", icon: Store },
                { name: "Government & Law Enforcement", icon: Shield }
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark/40 p-6 rounded-lg cyber-card backdrop-blur-sm hover:bg-dark/60 transition-all duration-300 border border-secondary/20"
                >
                  <industry.icon className="text-secondary w-10 h-10 mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">{industry.name}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* BriefCam Section */}
      <div id='BriefCam' className="bg-dark py-20 relative overflow-hidden">
        {/* Cyber-themed background */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]"></div>
        
        {/* Data flow lines */}
        <div className="absolute right-20 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden cyber-border p-1 shadow-lg"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src="/pic2.webp"
                  alt="BriefCam Video Analytics"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                
                {/* Terminal-like overlay */}
                <div className="absolute top-4 left-4 cyber-card p-2 rounded bg-dark/70 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span>analytics_engine</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="inline-block relative mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                  analytics_system
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6"><span className="text-gradient">BriefCam</span> Video Analytics</h2>
              <p className="text-lg text-gray-300 mb-6">
                BriefCam is an industry-leading provider of Video Content Analytics (VCA) solutions, transforming raw video data into actionable intelligence. By leveraging advanced AI and deep learning technologies, BriefCam enables organizations to extract value from video insights, accelerate investigations, and optimize operational efficiency.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { text: "Video Analytics: BriefCam's advanced computer vision algorithms identify and classify objects, people, and their attributes in video footage, enabling sophisticated filtering and search capabilities.", icon: Eye },
                { text: "Research platform: Powered by deep learning and artificial intelligence, BriefCam's Research platform offers unparalleled video analysis capabilities for research and development purposes, pushing the boundaries of video content understanding.", icon: LightbulbIcon },
                { text: "Face Recognition: BriefCam's face recognition technology identifies known individuals in video footage, enhancing security and operational workflows with high accuracy and minimal false positives.", icon: Scan },
                { text: "Behavior Detection: This function identifies specific activities and behaviors in video footage, enabling proactive analysis for commercial development, security monitoring, and traffic congestion mitigation.", icon: AlertTriangle },
                
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start cyber-card p-4 rounded-lg bg-dark/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
                >
                  <feature.icon className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-gray-300">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Enhanced Security",
                  description: "Improve security operations and response times with rapid search capabilities and real-time alerts.",
                  icon: ShieldAlert
                },
                {
                  title: "Operational Intelligence",
                  description: "Gain valuable insights into business operations, customer behavior, and space utilization.",
                  icon: LineChart
                },
                {
                  title: "Reduced Investigation Time",
                  description: "Dramatically decrease the time spent on video review and investigations with intuitive search tools.",
                  icon: Timer
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark/40 p-6 rounded-lg cyber-card backdrop-blur-sm hover:bg-dark/60 transition-all duration-300 border border-secondary/20"
                >
                  <benefit.icon className="text-secondary w-10 h-10 mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                  
                  {/* Terminal-like decoration */}
                  <div className="text-xs font-mono text-secondary/50 mt-4 pt-4 border-t border-secondary/20">
                    {`analysis_${index + 1}_active`}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Binary code pattern */}
          <div className="absolute top-5 right-5 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
            10110101<br />
            01001010<br />
            11010101
          </div>
        </div>
      </div>
      
      {/* O-Insights Section */}
      <div id='O-Insights' className="bg-dark py-20 relative overflow-hidden">
        {/* Cyber-themed background */}
        <div className="absolute inset-0 cyber-grid opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full filter blur-[100px]"></div>
        
        {/* Data flow lines */}
        <div className="absolute right-20 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden cyber-border p-1 shadow-lg"
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
                <Image
                  src="/pic3.webp"
                  alt="O-Insights for Milestone"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                
                {/* Terminal-like overlay */}
                <div className="absolute top-4 left-4 cyber-card p-2 rounded bg-dark/70 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                    <span>analytics_engine</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/2"
            >
              <div className="inline-block relative mb-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
                <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                  analytics_system
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-6"><span className="text-gradient">O-Insights</span> for Milestone</h2>
              <p className="text-lg text-gray-300 mb-6">
                Developed by Conexao Technology Solutions, O-Insights is a powerful analytics platform designed to integrate seamlessly with Milestone's XProtect VMS. It enhances surveillance systems by providing real-time data analysis, operational intelligence, and actionable insights, thereby improving security measures and operational workflows.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { text: "Comprehensive Data Visualization: O-Insights offers intuitive data visualization tools, allowing users to monitor trends, detect anomalies, and gain a holistic understanding of their security environment.", icon: PieChart },
                { text: "Customizable Reports: The platform enables the generation of tailored reports that align with specific business needs, facilitating targeted analysis and informed decision-making.", icon: FileBarChart },
                { text: "Seamless Integration: Designed to work natively within the Milestone ecosystem, O-Insights ensures smooth data flow and interoperability, enhancing the overall functionality of the surveillance system.", icon: Settings },
                { text: "Enhanced Decision-Making: By providing timely and relevant insights, O-Insights supports proactive security measures and strategic operational planning.", icon: Brain },
                
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start cyber-card p-4 rounded-lg bg-dark/40 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
                >
                  <feature.icon className="text-secondary w-6 h-6 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-gray-300">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Improved Risk Management",
                  description: "Identify potential threats and vulnerabilities through continuous monitoring and analysis.",
                  icon: Shield
                },
                {
                  title: "Operational Efficiency",
                  description: "Streamline processes and optimize resource allocation based on data-driven insights.",
                  icon: TrendingUp
                },
                {
                  title: "Enhanced Collaboration",
                  description: "Facilitate better communication and coordination across teams with shared insights and reporting.",
                  icon: UserCheck
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-dark/40 p-6 rounded-lg cyber-card backdrop-blur-sm hover:bg-dark/60 transition-all duration-300 border border-secondary/20"
                >
                  <benefit.icon className="text-secondary w-10 h-10 mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">{benefit.title}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                  
                  {/* Terminal-like decoration */}
                  <div className="text-xs font-mono text-secondary/50 mt-4 pt-4 border-t border-secondary/20">
                    {`analysis_${index + 1}_active`}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          
        </div>
      </div>

      {/* Call to Action - Cybersecurity Theme */}
      <div className="bg-dark py-20 relative overflow-hidden cyber-scanline">
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
        <div className="absolute left-1/4 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
        <div className="absolute right-1/4 top-0 bottom-0">
          <div className="data-flow h-full" style={{animationDelay: '1.2s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto cyber-card p-8 rounded-lg bg-dark/50 backdrop-blur-sm"
          >
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
              <span className="relative px-4 py-1.5 bg-dark text-secondary text-sm font-mono rounded-lg inline-block">
                security_consultation.exe
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to <span className="text-gradient">Secure Your Business</span>?
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Contact our team today to discuss how our advanced security solutions can help protect your organization from evolving threats.
            </p>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg cyber-pulse"
            >
              Connect With Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
        
        {/* Terminal-like decoration */}
        <div className="absolute top-5 right-5 cyber-card p-2 rounded opacity-20 hidden md:block">
          <div className="flex items-center space-x-2 text-secondary text-xs font-mono">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span>security_protocol_secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}