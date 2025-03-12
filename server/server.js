import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import prisma from "./prisma/client.js";
import blogRouter from "./routes/blog.js";
import messageRouter from "./routes/message.js";
import authRouter from "./routes/auth.js";
import emailRouter from "./routes/email.js";
import adminRouter from "./routes/admin.js";
import homeRouter from "./routes/home.js";
import categoriesRouter from "./routes/categories.js";
import servicesRouter from "./routes/services.js";
import AdminFeatureRouter from "./routes/adminRoutes/adminPanel.js";
import aboutRouter from "./routes/about.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Essential middleware in this specific order
app.use(cookieParser());
app.use(express.json());

// const allowedOrigins =
//   process.env.NODE_ENV === "production"
//     ? [process.env.FRONTEND_URL] // Use environment variable in production
//     : ["http://localhost:3001"]; // Allow localhost in development

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) === -1) {
//         return callback(
//           new Error(
//             "The CORS policy for this site does not allow access from the specified Origin."
//           ),
//           false
//         );
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Request logging middleware
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
    );
  }
  next();
});

app.use((req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Request:", {
      method: req.method,
      path: req.path,
      body: req.body,
      cookies: req.cookies,
    });
  }
  next();
});

// Routes
app.use("/api/messages", messageRouter);
app.use("/api/blog", blogRouter);
app.use("/api/auth", authRouter);
app.use("/api/email", emailRouter);
app.use("/api/admin", adminRouter);
app.use("/home", homeRouter);
app.use("/categories", categoriesRouter);
app.use("/services", servicesRouter);
app.use("/about", aboutRouter);
app.use(express.static("uploads"));

app.use("/admin", AdminFeatureRouter);
// Database connection test
async function testDbConnection() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection is Ready");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

testDbConnection();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Catch All Route for 404 Errors
app.use((req, res) => {
  console.error("404 Error: Route not found -", req.originalUrl);
  res.status(404).json({
    status: "fail",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({
    status: "fail",
    message: error.message || "Internal server error",
    path: req.originalUrl,
  });
});
