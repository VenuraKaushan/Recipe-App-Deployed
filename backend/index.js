import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dbConnect from "./configs/dbConfig.js";
import AuthRoutes from "./routes/auth.routes.js";
import ReceipeRoute from "./routes/recipes.routes.js";

const app = express();
const PORT = process.env.PORT || 6001;

// CORS configuration
app.use(cors({
  origin: 'https://recipe-app-deployed-frontend.vercel.app/*', // Allowed origin (frontend)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'] // Allowed headers
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Logging middleware (for debugging purposes)
app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Recipe-App!"); 
});

// Define your routes after the middleware
app.use("/api/auth", AuthRoutes);
app.use("/receipe", ReceipeRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀💀 Server is started on port ${PORT}!`);
  dbConnect();
});
