import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../scripts/authenticate.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// Get admin stats (posts and messages count)
router.get("/stats", authenticate, async (req, res) => {
  try {
    const [posts, messages, solutions, services] = await Promise.all([
      prisma.post.count(),
      prisma.message.count(),
      prisma.solution.count(),
      prisma.services.count(),
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
      solutions: {
        total: solutions,
        trend: solutions > 0 ? 5.3 : 0,
      },
      services: {
        total: services,
        trend: services > 0 ? 7.1 : 0,
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

// --------------------------------------
// HOME PAGE CONTENT MANAGEMENT
// --------------------------------------
router.get("/home", authenticate, async (req, res) => {
  try {
    const homeContent = await prisma.home.findFirst();
    res.json({
      status: "success",
      result: homeContent,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch home content",
    });
  }
});

router.post("/home", authenticate, async (req, res) => {
  try {
    const { aboutUs, advantages, services } = req.body;
    const homeContent = await prisma.home.upsert({
      where: { id: 1 },
      update: {
        aboutUs,
        advantages,
        services,
      },
      create: {
        aboutUs,
        advantages,
        services,
      },
    });
    res.json({
      status: "success",
      result: homeContent,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update home content",
    });
  }
});

// --------------------------------------
// ABOUT PAGE CONTENT MANAGEMENT
// --------------------------------------
router.get("/about", authenticate, async (req, res) => {
  try {
    const aboutContent = await prisma.about.findFirst({
      include: {
        values: true,
        stats: true,
      },
    });
    res.json({
      status: "success",
      result: aboutContent,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch about content",
    });
  }
});

router.post("/about", authenticate, upload.single("img"), async (req, res) => {
  try {
    const { title, subtitle, description, mission, vision } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Parse JSON strings if they came from form data
    const parsedDescription = typeof description === "string" ? JSON.parse(description) : description;

    const aboutContent = await prisma.about.upsert({
      where: { id: 1 },
      update: {
        title,
        subtitle,
        description: parsedDescription,
        mission,
        vision,
        ...(imgPath && { img: imgPath }),
      },
      create: {
        title,
        subtitle,
        description: parsedDescription,
        mission,
        vision,
        ...(imgPath && { img: imgPath }),
      },
    });
    res.json({
      status: "success",
      result: aboutContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to update about content",
    });
  }
});

// Values management for About page
router.post("/about/values", authenticate, async (req, res) => {
  try {
    const { icon, title, text, aboutId } = req.body;
    const value = await prisma.value.create({
      data: {
        icon,
        title,
        text,
        aboutId: parseInt(aboutId),
      },
    });
    res.json({
      status: "success",
      result: value,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create value",
    });
  }
});

router.put("/about/values/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, title, text } = req.body;
    const value = await prisma.value.update({
      where: { id: parseInt(id) },
      data: { icon, title, text },
    });
    res.json({
      status: "success",
      result: value,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update value",
    });
  }
});

router.delete("/about/values/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.value.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: "success",
      message: "Value deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete value",
    });
  }
});

// Stats management for About page
router.post("/about/stats", authenticate, async (req, res) => {
  try {
    const { number, label, aboutId } = req.body;
    const stat = await prisma.stat.create({
      data: {
        number,
        label,
        aboutId: parseInt(aboutId),
      },
    });
    res.json({
      status: "success",
      result: stat,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create stat",
    });
  }
});

router.put("/about/stats/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { number, label } = req.body;
    const stat = await prisma.stat.update({
      where: { id: parseInt(id) },
      data: { number, label },
    });
    res.json({
      status: "success",
      result: stat,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update stat",
    });
  }
});

router.delete("/about/stats/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.stat.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: "success",
      message: "Stat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete stat",
    });
  }
});

// --------------------------------------
// SOLUTIONS MANAGEMENT
// --------------------------------------
router.get("/solutions", authenticate, async (req, res) => {
  try {
    const solutions = await prisma.solution.findMany();
    res.json({
      status: "success",
      result: solutions,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch solutions",
    });
  }
});

router.get("/solutions/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await prisma.solution.findUnique({
      where: { id: parseInt(id) },
    });
    if (!solution) {
      return res.status(404).json({
        status: "fail",
        message: "Solution not found",
      });
    }
    res.json({
      status: "success",
      result: solution,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch solution",
    });
  }
});

router.post("/solutions", authenticate, upload.single("image"), async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const solution = await prisma.solution.create({
      data: {
        title,
        description,
        icon,
        ...(imagePath && { image: imagePath }),
      },
    });
    res.json({
      status: "success",
      result: solution,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create solution",
    });
  }
});

router.put("/solutions/:id", authenticate, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const solution = await prisma.solution.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        icon,
        ...(imagePath && { image: imagePath }),
      },
    });
    res.json({
      status: "success",
      result: solution,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update solution",
    });
  }
});

router.delete("/solutions/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await prisma.solution.findUnique({
      where: { id: parseInt(id) },
    });

    if (solution?.image) {
      const imagePath = path.join(".", solution.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.solution.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: "success",
      message: "Solution deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete solution",
    });
  }
});

// --------------------------------------
// CATEGORIES AND SERVICES MANAGEMENT
// --------------------------------------
router.get("/categories", authenticate, async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        services: true,
      },
    });
    res.json({
      status: "success",
      result: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch categories",
    });
  }
});

router.post("/categories", authenticate, async (req, res) => {
  try {
    const {
      category,
      title,
      mainDescription,
      overviewTitle,
      overviewContent,
      offeringsTitle,
      offeringsContent,
    } = req.body;

    const newCategory = await prisma.categories.create({
      data: {
        category,
        title,
        mainDescription,
        overviewTitle,
        overviewContent,
        offeringsTitle,
        offeringsContent,
      },
    });
    res.json({
      status: "success",
      result: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create category",
    });
  }
});

router.put("/categories/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      category,
      title,
      mainDescription,
      overviewTitle,
      overviewContent,
      offeringsTitle,
      offeringsContent,
    } = req.body;

    const updatedCategory = await prisma.categories.update({
      where: { id: parseInt(id) },
      data: {
        category,
        title,
        mainDescription,
        overviewTitle,
        overviewContent,
        offeringsTitle,
        offeringsContent,
      },
    });
    res.json({
      status: "success",
      result: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update category",
    });
  }
});

router.delete("/categories/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.categories.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete category",
    });
  }
});

// Services endpoints
router.get("/services", authenticate, async (req, res) => {
  try {
    const services = await prisma.services.findMany({
      include: {
        features: true,
        category: true,
      },
    });
    res.json({
      status: "success",
      result: services,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch services",
    });
  }
});

router.post("/services", authenticate, async (req, res) => {
  try {
    const {
      title,
      description,
      servicelink,
      overviewtitle,
      overviewcontent,
      categoryId,
      status,
    } = req.body;

    const service = await prisma.services.create({
      data: {
        title,
        description,
        servicelink,
        overviewtitle,
        overviewcontent,
        categoryId: categoryId ? parseInt(categoryId) : null,
        status: status === "true" || status === true,
      },
    });
    res.json({
      status: "success",
      result: service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Failed to create service",
    });
  }
});

router.put("/services/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      servicelink,
      overviewtitle,
      overviewcontent,
      categoryId,
      status,
    } = req.body;

    const service = await prisma.services.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        servicelink,
        overviewtitle,
        overviewcontent,
        categoryId: categoryId ? parseInt(categoryId) : null,
        status: status === "true" || status === true,
      },
    });
    res.json({
      status: "success",
      result: service,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update service",
    });
  }
});

router.delete("/services/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.services.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: "success",
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete service",
    });
  }
});

// Features endpoints
router.post("/features", authenticate, async (req, res) => {
  try {
    const { title, description, serviceId } = req.body;
    const feature = await prisma.feature.create({
      data: {
        title,
        description,
        serviceId: serviceId ? parseInt(serviceId) : null,
      },
    });
    res.json({
      status: "success",
      result: feature,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create feature",
    });
  }
});

router.put("/features/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const feature = await prisma.feature.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
      },
    });
    res.json({
      status: "success",
      result: feature,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update feature",
    });
  }
});

router.delete("/features/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.feature.delete({
      where: { id: parseInt(id) },
    });
    res.json({
      status: "success",
      message: "Feature deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete feature",
    });
  }
});

export default router;
