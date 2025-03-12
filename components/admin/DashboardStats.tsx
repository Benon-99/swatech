"use client";

import { useEffect, useState } from "react";
import { FileText, MessageSquare, TrendingUp } from "lucide-react";
import axios from "axios";
import { apiClient } from "@/lib/api";

interface Stats {
  blogs: {
    total: number;
    trend: number;
  };
  messages: {
    total: number;
    trend: number;
  };
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    blogs: { total: 0, trend: 0 },
    messages: { total: 0, trend: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get("/api/blog/stats");

        if (response.statusText.toLowerCase() !== "ok") {
          throw new Error("Failed to fetch stats");
        }

        if (response.data.status === "success") {
          setStats(response.data.result);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Rest of your component code remains the same...

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Blogs Stats */}
      <div className="bg-[#0f1035] rounded-lg p-6 hover:bg-[#161849] transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Total Blogs
            </p>
            <h2 className="text-4xl font-bold text-white">
              {stats.blogs.total}
            </h2>
          </div>
          <div className="bg-blue-500/10 p-3 rounded-full">
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
          <span
            className={
              stats.blogs.trend >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {stats.blogs.trend}%
          </span>
          <span className="text-gray-400 ml-2">vs last month</span>
        </div>
      </div>

      {/* Messages Stats */}
      <div className="bg-[#0f1035] rounded-lg p-6 hover:bg-[#161849] transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-1 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Total Messages
            </p>
            <h2 className="text-4xl font-bold text-white">
              {stats.messages.total}
            </h2>
          </div>
          <div className="bg-purple-500/10 p-3 rounded-full">
            <MessageSquare className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
          <span
            className={
              stats.messages.trend >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {stats.messages.trend}%
          </span>
          <span className="text-gray-400 ml-2">vs last month</span>
        </div>
      </div>
    </div>
  );
}
