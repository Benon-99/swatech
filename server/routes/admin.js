import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../scripts/authenticate.js";
const router = express.Router();
const prisma = new PrismaClient();

// Get admin stats (posts and messages count)
router.get("/stats", authenticate, async (req, res) => {
  try {
    const [posts, messages] = await Promise.all([
      prisma.post.count(),
      prisma.message.count(),
    ]);

    const stats = {
      posts: {
        total: posts,
        trend: posts > 0 ? 12.5 : 0,
      },
      messages: {
        total: messages,
        trend: messages > 0 ? 8.2 : 0,
      },
    };

    res.json({
      status: "success",
      result: stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch stats",
    });
  }
});

// Get recent activities (posts and messages)
router.get("/activities", authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const [recentPosts, recentMessages] = await Promise.all([
      prisma.post.findMany({
        orderBy: { created_at: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          created_at: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.message.findMany({
        orderBy: { created_at: "desc" },
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
        },
      }),
    ]);

    // Combine and format activities
    const activities = [
      ...recentPosts.map((post) => ({
        id: `post-${post.id}`,
        type: "Blog Published",
        details: `${post.title} by ${post.author?.name || "Unknown Author"}`,
        timestamp: post.created_at,
      })),
      ...recentMessages.map((message) => ({
        id: `message-${message.id}`,
        type: "New Message",
        details: `From ${message.name} (${message.email})`,
        timestamp: message.created_at,
      })),
    ]
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    res.json({
      status: "success",
      activities,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch activities",
    });
  }
});

export default router;
