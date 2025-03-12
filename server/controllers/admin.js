import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStats = async (req, res) => {
  try {
    const [blogs, messages] = await Promise.all([
      prisma.blog.findMany(),
      prisma.message.findMany(),
    ]);

    // Calculate trends (for demo, using static values)
    const stats = {
      blogs: {
        total: blogs.length,
        trend: blogs.length > 0 ? 12.5 : 0,
      },
      messages: {
        total: messages.length,
        trend: messages.length > 0 ? 8.2 : 0,
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
};

export const getActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const [recentBlogs, recentMessages] = await Promise.all([
      prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          createdAt: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
    ]);

    // Combine and format activities
    const activities = [
      ...recentBlogs.map((blog) => ({
        id: `blog-${blog.id}`,
        type: "Blog Published",
        details: blog.title,
        timestamp: blog.createdAt,
      })),
      ...recentMessages.map((message) => ({
        id: `message-${message.id}`,
        type: "New Message",
        details: `From ${message.name} (${message.email})`,
        timestamp: message.createdAt,
      })),
    ]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
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
};
