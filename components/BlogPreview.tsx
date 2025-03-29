"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Shield, Terminal, Code } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  published: boolean;
  slug: string;
  author: Author;
  category: Category;
}

export default function BlogPreview() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get("/api/blog");
      if (response.statusText.toLowerCase() !== "ok") {
        throw new Error("Failed to fetch blogs");
      }
      if (response.data.status === "success") {
        // Only take the first 3 published blogs for the preview
        setBlogs(
          response.data.posts
            .filter((post: BlogPost) => post.published)
            .slice(0, 3)
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-dark">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-32 bg-dark relative overflow-hidden cyber-scanline">
      {/* Cybersecurity-themed background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-soft-light"></div>
        
        {/* Glow effects */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary/5 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-accent/5 filter blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Data flow line */}
        <div className="absolute right-20 top-0 bottom-0">
          <div className="data-flow h-full"></div>
        </div>
      </div>

      <div className="w-full lg:w-[1280px] mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <div className="inline-block relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-lg blur"></div>
            <motion.span
              variants={itemVariants}
              className="relative px-4 py-1 bg-dark text-secondary text-sm font-mono rounded-lg inline-block"
            >
              <Code className="inline-block w-4 h-4 mr-2 mb-1" />
              Security Insights
            </motion.span>
          </div>
          
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-bold mb-6 text-white leading-normal"
          >
            Latest <span className="text-gradient">Security</span> Resources
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Stay updated with our latest insights and security intelligence
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl transform rotate-1 scale-[1.02] opacity-30 group-hover:rotate-2 transition-transform duration-300"></div>
              <Link href={`/blogs/${blog.slug}`}>
                <div className="relative rounded-2xl bg-dark/80 backdrop-blur-sm border border-secondary/20 overflow-hidden transition-all duration-300 group-hover:border-secondary/30 shadow-lg hover:shadow-secondary/5 h-[600px] cyber-card">
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/90"></div>
                    
                    {/* Security badge overlay */}
                    <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-sm px-3 py-1 rounded-full border border-secondary/30 flex items-center">
                      <Shield className="w-3 h-3 text-secondary mr-1" />
                      <span className="text-xs font-mono text-secondary">security_intel</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col h-[300px]">
                    <div className="flex items-center text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm leading-normal">
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-secondary transition-colors duration-300 leading-normal line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {blog.content}
                    </p>
                    <div className="inline-flex items-center text-secondary hover:text-accent group/link mt-auto transition-colors duration-300">
                      <span className="mr-2 leading-normal font-mono text-sm">read_details</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Cyber code decoration */}
        <div className="absolute bottom-10 left-10 opacity-20 text-secondary font-mono text-xs leading-none hidden md:block">
          010010<br />
          110100<br />
          001011
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center cyber-border bg-dark text-secondary font-medium px-6 py-3 rounded-lg hover:bg-secondary/5 transition-all duration-300"
          >
            <Terminal className="w-4 h-4 mr-2" />
            <span>View All Articles</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
