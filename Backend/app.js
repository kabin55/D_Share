import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import fileRoutes from "./routes/fileRoute.js";
import popularityRoute from "./routes/popularityRoute.js"; // ✅ NEW IMPORT
import activityRoute from "./routes/activityRoute.js"; // ✅ NEW IMPORT

const app = express();
const __dirname = path.resolve();

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "/Frontend/dist")));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // ✅ fallback for dev
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);
app.use("/api", uploadRoute);
app.use("/api", fileRoutes);
app.use("/api/popularity", popularityRoute); //  NEW ROUTE
app.use("/api/activity", activityRoute); // NEW ROUTE

// Catch-all route to serve React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

export default app;
