"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
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

export default function EnhancedBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await apiClient.get("/api/blog");
      console.log(response);

      if (response.statusText.toLowerCase() != "ok") {
        throw new Error("Failed to fetch blogs");
      }
      if (response.data.status == "success") {
        setBlogs(
          response.data.posts.filter((post: BlogPost) => post.published)
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const getExcerpt = (content: string) => {
    // Remove markdown syntax and get first 150 characters
    const plainText = content.replace(/[#*`_\[\]]/g, "");
    return plainText.substring(0, 150).trim() + "...";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getGradient = (index: number) => {
    const gradients = [
      "from-[#3785CC] to-[#4A9BE4]",
      "from-[#4A9BE4] to-[#8590EA]",
      "from-[#8590EA] to-[#B5C6F4]",
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="relative overflow-hidden bg-[#111240]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
          </div>

          <div className="relative w-full lg:w-[1280px] mx-auto px-4 py-32">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-white/10 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-white/10 rounded w-1/2 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 400% 400%;
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-[#111240]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#181c52] via-[#181c52] to-[#3785CC] animate-gradient"></div>
          </div>

          <div className="relative w-full lg:w-[1280px] mx-auto px-4 py-32">
            <div className="text-center opacity-0 animate-fade-in">
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/80 backdrop-blur-sm mb-6 inline-block">
                Our Blog
              </span>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-[#3785CC] via-[#4A9BE4] to-[#5B8AF0] bg-clip-text text-transparent mb-6 leading-normal">
                Latest Insights
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Stay updated with the latest insights on consultancy, IT
                solutions, and business strategies. Explore topics from tech
                advancements to HR best practices and more.
              </p>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <section className="py-32 bg-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full bg-[url('/noise.png')] opacity-5"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3785CC]/5 via-[#5B8AF0]/5 to-[#8590EA]/5 animate-gradient"></div>
          </div>

          <div className="w-full lg:w-[1280px] mx-auto px-4 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-[500px]"
                >
                  <div className="relative h-64">
                    <Image
                      src={
                        blog.image ||
                        `https://source.unsplash.com/random/800x600?${index}`
                      }
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-[#111240] mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-[#111240]/60 text-sm mb-2">
                        {formatDate(blog.date)}
                      </p>
                      <p className="text-[#111240]/60 line-clamp-3">
                        {getExcerpt(blog.content)}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
