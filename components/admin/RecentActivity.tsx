"use client";

import { apiClient } from "@/lib/api";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface Activity {
  id: number;
  type: string;
  details: string;
  timestamp: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await apiClient.get("/api/admin/activities?limit=3");

        if (response.statusText.toLowerCase() !== "ok") {
          throw new Error("Failed to fetch activities");
        }

        setActivities(response.data.activities);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load activities"
        );
        console.error("Error fetching activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-6 last:mb-0">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-sm">{error}</div>;
  }

  return (
    <div className="bg-[#0f1035] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        <Clock className="text-gray-400 w-5 h-5" />
      </div>
      <div className="space-y-6">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="border-b border-[#2a2d52] last:border-0 pb-6 last:pb-0"
            >
              <h3 className="text-white font-medium">{activity.type}</h3>
              <p className="text-gray-400 text-sm mt-1">{activity.details}</p>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <time dateTime={activity.timestamp}>
                  {new Date(activity.timestamp).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
